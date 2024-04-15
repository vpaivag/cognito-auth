import { ResourcesConfig } from "aws-amplify";

export const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_123456789',
      userPoolClientId: '19v4kbmqjok9do6p63u35nic6',
    }
  }
}