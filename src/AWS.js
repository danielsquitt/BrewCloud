import awsmobile from './aws-exports';
import AWS from 'aws-sdk';

AWS.config.region = awsmobile.aws_cognito_region

export default AWS