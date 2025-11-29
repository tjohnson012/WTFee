# WTFee Deployment Guide

This guide covers deploying WTFee to AWS for production use.

## Prerequisites

- AWS CLI configured with appropriate credentials
- Node.js 18+
- AWS CDK CLI (`npm install -g aws-cdk`)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      CloudFront CDN                         │
│                   (Global Edge Locations)                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
┌─────────────────┐     ┌─────────────────────┐
│   S3 Frontend   │     │    API Gateway      │
│  (Static Site)  │     │   (REST API)        │
└─────────────────┘     └─────────┬───────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
                    ▼             ▼             ▼
              ┌─────────┐  ┌─────────┐  ┌─────────┐
              │ Upload  │  │ Process │  │ Status  │
              │ Lambda  │  │ Lambda  │  │ Lambda  │
              └────┬────┘  └────┬────┘  └─────────┘
                   │            │
                   ▼            ▼
              ┌─────────┐  ┌─────────┐
              │   S3    │  │Textract │
              │ Bucket  │  │ + Claude│
              └─────────┘  └─────────┘
```

## Manual Deployment

### 1. Build the Frontend

```bash
npm install
npm run build
```

### 2. Build the Backend

```bash
cd backend
npm install
npm run build
```

### 3. Deploy Infrastructure

```bash
cd backend/infrastructure
npm install
cdk bootstrap  # First time only
cdk deploy
```

### 4. Upload Frontend to S3

After deployment, the CDK outputs will show the S3 bucket name:

```bash
# Get the bucket name from CDK outputs
aws s3 sync dist/ s3://wtfee-frontend-YOUR_ACCOUNT_ID --delete
```

### 5. Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Automated Deployment (GitHub Actions)

### Setup

1. Create an IAM role for GitHub Actions with OIDC:

```bash
# Create the OIDC provider (one-time setup)
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com
```

2. Create a deployment role with the following trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_ORG/WTFee:*"
        }
      }
    }
  ]
}
```

3. Add GitHub repository secrets:
   - `AWS_DEPLOY_ROLE_ARN`: The ARN of the deployment role
   - `API_URL`: Your API Gateway URL (optional, for custom domains)

### Triggering Deployments

- Push to `main` branch triggers automatic deployment
- Manual deployment via GitHub Actions "Run workflow" button

## Monitoring

### CloudWatch Dashboard

Access the monitoring dashboard at:
```
https://YOUR_REGION.console.aws.amazon.com/cloudwatch/home?region=YOUR_REGION#dashboards:name=WTFee-Monitoring
```

The dashboard includes:
- Lambda invocations and errors
- Lambda duration metrics
- API Gateway request counts
- CloudFront request and error rates

### Alerts

Subscribe to the SNS alert topic to receive notifications:

```bash
aws sns subscribe \
  --topic-arn YOUR_ALERT_TOPIC_ARN \
  --protocol email \
  --notification-endpoint your-email@example.com
```

Alerts are triggered for:
- Lambda error rate > 5 errors in 5 minutes
- API Gateway 5xx errors > 10 in 5 minutes
- Lambda duration > 30 seconds average

## Custom Domain Setup

To use a custom domain:

1. Request an ACM certificate in us-east-1 (required for CloudFront):

```bash
aws acm request-certificate \
  --domain-name wtfee.yourdomain.com \
  --validation-method DNS \
  --region us-east-1
```

2. Update the CDK stack with your domain:

```typescript
new WTFeeStack(app, 'WTFeeStack', {
  domainName: 'wtfee.yourdomain.com',
  certificateArn: 'arn:aws:acm:us-east-1:...',
});
```

3. Add a CNAME record pointing to the CloudFront distribution.

## Security Considerations

- All data encrypted in transit (HTTPS enforced)
- S3 buckets encrypted at rest
- Documents auto-deleted after 24 hours
- No permanent storage of PHI
- CloudFront provides DDoS protection
- API Gateway rate limiting enabled

## Cost Estimation

For a hackathon demo with moderate traffic:

| Service | Estimated Monthly Cost |
|---------|----------------------|
| Lambda | ~$1-5 |
| API Gateway | ~$1-3 |
| S3 | ~$1 |
| CloudFront | ~$1-5 |
| Textract | ~$1-10 (per document) |
| **Total** | **~$5-25/month** |

## Troubleshooting

### Deployment Fails

1. Ensure AWS credentials are configured
2. Run `cdk bootstrap` if first deployment
3. Check CloudFormation console for detailed errors

### Frontend Not Loading

1. Verify S3 sync completed successfully
2. Check CloudFront distribution status
3. Invalidate CloudFront cache

### API Errors

1. Check Lambda CloudWatch logs
2. Verify IAM permissions for Textract/Bedrock
3. Check API Gateway access logs
