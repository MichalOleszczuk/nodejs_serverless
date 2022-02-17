import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: "serverlessSetup",
  package: {
    individually: true,
  },
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
  },
  functions: {
    hello: {
      handler: "src/lambdas/hello.handler",
      events: [
        {
          http: {
            path: "serverlessSetup/hello",
            method: "get",
          },
        },
      ],
    },
    goodbye: {
      handler: "src/lambdas/goodbye.handler",
      events: [
        {
          http: {
            path: "serverlessSetup/goodbye",
            method: "post",
          },
        },
      ],
    },
    question: {
      handler: "src/lambdas/question.handler",
      dependsOn: ["SNSHelloEvent"],
      events: [
        {
          sns: {
            arn: "!Ref SNSHelloEvent",
            topicName: "hello-event",
          },
        },
      ],
    },
  },
  plugins: ["serverless-plugin-typescript", "serverless-offline"],
  resources: {
    Resources: {
      SNSHelloEvent: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "Hello Event Topic",
          TopicName: "hello-event",
        },
      },
    },
  },
};

export = serverlessConfiguration;
