import { CognitoUserPool } from 'amazon-cognito-identity-js'

import awsmobile from './aws-exports';

const poolData = {
    UserPoolId: awsmobile.aws_user_pools_id,
    ClientId: awsmobile.aws_user_pools_web_client_id
}

export default new CognitoUserPool(poolData)