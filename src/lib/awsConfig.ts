import { ResourcesConfig } from "aws-amplify";

export const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_90pgqTGkj',
      userPoolClientId: '1qb99eia5d16lj7rr6tf6kifin',
    }
  }
}