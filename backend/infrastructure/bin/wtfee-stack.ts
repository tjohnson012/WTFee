#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WTFeeStack } from '../lib/wtfee-stack';

const app = new cdk.App();

// Get optional custom domain configuration from context
const domainName = app.node.tryGetContext('domainName');
const certificateArn = app.node.tryGetContext('certificateArn');

new WTFeeStack(app, 'WTFeeStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'WTFee - Medical Bill Decoder Backend Infrastructure',
  domainName,
  certificateArn,
});

app.synth();
