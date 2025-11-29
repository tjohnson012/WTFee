import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as cloudwatch_actions from 'aws-cdk-lib/aws-cloudwatch-actions';
import { Construct } from 'constructs';

export interface WTFeeStackProps extends cdk.StackProps {
  domainName?: string;
  certificateArn?: string;
}

export class WTFeeStack extends cdk.Stack {
  public readonly distribution: cloudfront.Distribution;
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props?: WTFeeStackProps) {
    super(scope, id, props);

    // ============================================
    // S3 BUCKETS
    // ============================================

    // S3 Bucket for document storage (with auto-cleanup)
    const documentBucket = new s3.Bucket(this, 'WTFeeDocuments', {
      bucketName: `wtfee-documents-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      cors: [{
        allowedMethods: [s3.HttpMethods.PUT, s3.HttpMethods.GET],
        allowedOrigins: ['*'],
        allowedHeaders: ['*'],
      }],
      lifecycleRules: [{
        expiration: cdk.Duration.hours(24),
        prefix: 'uploads/',
      }],
    });

    // S3 Bucket for frontend static hosting
    const frontendBucket = new s3.Bucket(this, 'WTFeeFrontend', {
      bucketName: `wtfee-frontend-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // ============================================
    // CLOUDWATCH LOG GROUPS
    // ============================================

    // Centralized log group for all Lambda functions
    const lambdaLogGroup = new logs.LogGroup(this, 'WTFeeLambdaLogs', {
      logGroupName: '/wtfee/lambda',
      retention: logs.RetentionDays.TWO_WEEKS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // API Gateway access logs
    const apiLogGroup = new logs.LogGroup(this, 'WTFeeApiLogs', {
      logGroupName: '/wtfee/api-gateway',
      retention: logs.RetentionDays.TWO_WEEKS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ============================================
    // SNS TOPIC FOR ALERTS
    // ============================================

    const alertTopic = new sns.Topic(this, 'WTFeeAlerts', {
      topicName: 'wtfee-alerts',
      displayName: 'WTFee Application Alerts',
    });

    // ============================================
    // IAM ROLES
    // ============================================

    // Lambda execution role with Textract permissions
    const lambdaRole = new iam.Role(this, 'WTFeeLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ],
    });

    // Grant Textract permissions
    lambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: [
        'textract:AnalyzeDocument',
        'textract:AnalyzeExpense',
        'textract:DetectDocumentText',
      ],
      resources: ['*'],
    }));

    // Grant Bedrock permissions for Claude API
    lambdaRole.addToPolicy(new iam.PolicyStatement({
      actions: [
        'bedrock:InvokeModel',
        'bedrock:InvokeModelWithResponseStream',
      ],
      resources: ['*'],
    }));

    // Grant S3 permissions
    documentBucket.grantReadWrite(lambdaRole);

    // Environment variables for Lambda functions
    const lambdaEnv = {
      S3_BUCKET_NAME: documentBucket.bucketName,
      AWS_REGION: this.region,
      LOG_LEVEL: 'INFO',
    };

    // Upload Handler Lambda
    const uploadHandler = new lambda.Function(this, 'UploadHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/uploadHandler.handler',
      code: lambda.Code.fromAsset('../dist'),
      role: lambdaRole,
      environment: lambdaEnv,
      timeout: cdk.Duration.seconds(30),
    });

    // Process Handler Lambda
    const processHandler = new lambda.Function(this, 'ProcessHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/processHandler.handler',
      code: lambda.Code.fromAsset('../dist'),
      role: lambdaRole,
      environment: lambdaEnv,
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
    });

    // Status Handler Lambda
    const statusHandler = new lambda.Function(this, 'StatusHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/statusHandler.handler',
      code: lambda.Code.fromAsset('../dist'),
      role: lambdaRole,
      environment: lambdaEnv,
      timeout: cdk.Duration.seconds(10),
    });

    // Explain Handler Lambda (Claude AI explanations)
    const explainHandler = new lambda.Function(this, 'ExplainHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/explainHandler.handler',
      code: lambda.Code.fromAsset('../dist'),
      role: lambdaRole,
      environment: lambdaEnv,
      timeout: cdk.Duration.minutes(2),
      memorySize: 512,
    });

    // Cleanup Handler Lambda (scheduled)
    const cleanupHandler = new lambda.Function(this, 'CleanupHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handlers/cleanupHandler.handler',
      code: lambda.Code.fromAsset('../dist'),
      role: lambdaRole,
      environment: lambdaEnv,
      timeout: cdk.Duration.minutes(5),
    });

    // Schedule cleanup every hour
    new events.Rule(this, 'CleanupSchedule', {
      schedule: events.Schedule.rate(cdk.Duration.hours(1)),
      targets: [new targets.LambdaFunction(cleanupHandler)],
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'WTFeeApi', {
      restApiName: 'WTFee API',
      description: 'API for WTFee medical bill processing',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    // API Endpoints
    const apiResource = api.root.addResource('api');
    
    const uploadResource = apiResource.addResource('upload');
    uploadResource.addMethod('POST', new apigateway.LambdaIntegration(uploadHandler));

    const processResource = apiResource.addResource('process');
    processResource.addMethod('POST', new apigateway.LambdaIntegration(processHandler));

    const statusResource = apiResource.addResource('status');
    const billStatusResource = statusResource.addResource('{billId}');
    billStatusResource.addMethod('GET', new apigateway.LambdaIntegration(statusHandler));

    const explainResource = apiResource.addResource('explain');
    explainResource.addMethod('POST', new apigateway.LambdaIntegration(explainHandler));

    // Store API reference
    this.api = api;

    // ============================================
    // CLOUDFRONT DISTRIBUTION
    // ============================================

    // Origin Access Identity for S3
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'WTFeeOAI', {
      comment: 'OAI for WTFee frontend',
    });

    // Grant CloudFront access to frontend bucket
    frontendBucket.grantRead(originAccessIdentity);

    // CloudFront distribution for frontend + API
    this.distribution = new cloudfront.Distribution(this, 'WTFeeDistribution', {
      comment: 'WTFee Medical Bill Decoder CDN',
      defaultRootObject: 'index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // US, Canada, Europe
      
      defaultBehavior: {
        origin: new origins.S3Origin(frontendBucket, {
          originAccessIdentity,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress: true,
      },

      additionalBehaviors: {
        '/api/*': {
          origin: new origins.RestApiOrigin(api),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        },
      },

      // Custom error responses for SPA routing
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    // ============================================
    // CLOUDWATCH MONITORING & ALARMS
    // ============================================

    // Dashboard for monitoring
    const dashboard = new cloudwatch.Dashboard(this, 'WTFeeDashboard', {
      dashboardName: 'WTFee-Monitoring',
    });

    // Lambda error rate alarm
    const lambdaErrorAlarm = new cloudwatch.Alarm(this, 'LambdaErrorAlarm', {
      alarmName: 'WTFee-Lambda-Errors',
      alarmDescription: 'Alert when Lambda error rate exceeds threshold',
      metric: processHandler.metricErrors({
        period: cdk.Duration.minutes(5),
        statistic: 'Sum',
      }),
      threshold: 5,
      evaluationPeriods: 2,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    lambdaErrorAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(alertTopic));

    // API Gateway 5xx error alarm
    const api5xxAlarm = new cloudwatch.Alarm(this, 'Api5xxAlarm', {
      alarmName: 'WTFee-API-5xx-Errors',
      alarmDescription: 'Alert when API 5xx errors exceed threshold',
      metric: api.metricServerError({
        period: cdk.Duration.minutes(5),
        statistic: 'Sum',
      }),
      threshold: 10,
      evaluationPeriods: 2,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    api5xxAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(alertTopic));

    // Lambda duration alarm (for performance monitoring)
    const lambdaDurationAlarm = new cloudwatch.Alarm(this, 'LambdaDurationAlarm', {
      alarmName: 'WTFee-Lambda-Duration',
      alarmDescription: 'Alert when Lambda duration exceeds threshold',
      metric: processHandler.metricDuration({
        period: cdk.Duration.minutes(5),
        statistic: 'Average',
      }),
      threshold: 30000, // 30 seconds
      evaluationPeriods: 3,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
    lambdaDurationAlarm.addAlarmAction(new cloudwatch_actions.SnsAction(alertTopic));

    // Add widgets to dashboard
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Invocations',
        left: [
          uploadHandler.metricInvocations(),
          processHandler.metricInvocations(),
          statusHandler.metricInvocations(),
          explainHandler.metricInvocations(),
        ],
        width: 12,
      }),
      new cloudwatch.GraphWidget({
        title: 'Lambda Errors',
        left: [
          uploadHandler.metricErrors(),
          processHandler.metricErrors(),
          statusHandler.metricErrors(),
          explainHandler.metricErrors(),
        ],
        width: 12,
      }),
    );

    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Duration',
        left: [
          uploadHandler.metricDuration(),
          processHandler.metricDuration(),
          statusHandler.metricDuration(),
          explainHandler.metricDuration(),
        ],
        width: 12,
      }),
      new cloudwatch.GraphWidget({
        title: 'API Gateway Requests',
        left: [
          api.metricCount(),
          api.metricServerError(),
          api.metricClientError(),
        ],
        width: 12,
      }),
    );

    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'CloudFront Requests',
        left: [
          new cloudwatch.Metric({
            namespace: 'AWS/CloudFront',
            metricName: 'Requests',
            dimensionsMap: {
              DistributionId: this.distribution.distributionId,
              Region: 'Global',
            },
            statistic: 'Sum',
            period: cdk.Duration.minutes(5),
          }),
        ],
        width: 12,
      }),
      new cloudwatch.GraphWidget({
        title: 'CloudFront Error Rate',
        left: [
          new cloudwatch.Metric({
            namespace: 'AWS/CloudFront',
            metricName: '4xxErrorRate',
            dimensionsMap: {
              DistributionId: this.distribution.distributionId,
              Region: 'Global',
            },
            statistic: 'Average',
            period: cdk.Duration.minutes(5),
          }),
          new cloudwatch.Metric({
            namespace: 'AWS/CloudFront',
            metricName: '5xxErrorRate',
            dimensionsMap: {
              DistributionId: this.distribution.distributionId,
              Region: 'Global',
            },
            statistic: 'Average',
            period: cdk.Duration.minutes(5),
          }),
        ],
        width: 12,
      }),
    );

    // ============================================
    // OUTPUTS
    // ============================================

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: documentBucket.bucketName,
      description: 'S3 Bucket for documents',
    });

    new cdk.CfnOutput(this, 'FrontendBucketName', {
      value: frontendBucket.bucketName,
      description: 'S3 Bucket for frontend static files',
    });

    new cdk.CfnOutput(this, 'CloudFrontUrl', {
      value: `https://${this.distribution.distributionDomainName}`,
      description: 'CloudFront Distribution URL',
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront Distribution ID',
    });

    new cdk.CfnOutput(this, 'DashboardUrl', {
      value: `https://${this.region}.console.aws.amazon.com/cloudwatch/home?region=${this.region}#dashboards:name=WTFee-Monitoring`,
      description: 'CloudWatch Dashboard URL',
    });

    new cdk.CfnOutput(this, 'AlertTopicArn', {
      value: alertTopic.topicArn,
      description: 'SNS Topic ARN for alerts (subscribe your email)',
    });
  }
}
