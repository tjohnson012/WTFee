import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import { Construct } from 'constructs';

export class WTFeeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket for document storage (with auto-cleanup)
    const documentBucket = new s3.Bucket(this, 'WTFeeDocuments', {
      bucketName: `wtfee-documents-${this.account}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
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

    // Grant S3 permissions
    documentBucket.grantReadWrite(lambdaRole);

    // Environment variables for Lambda functions
    const lambdaEnv = {
      S3_BUCKET_NAME: documentBucket.bucketName,
      AWS_REGION: this.region,
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

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: documentBucket.bucketName,
      description: 'S3 Bucket for documents',
    });
  }
}
