/* eslint-disable promise/no-callback-in-promise */
/* eslint-disable no-console */
import * as AWS from "aws-sdk";

export const handler = (event, context, callback) => {
  const stepFunctions = new AWS.StepFunctions({
    endpoint: "http://localhost:8083",
  });
  const stateMachineArn = process.env.OFFLINE_STEP_FUNCTIONS_ARN_WaitMachine;
  const params = {
    stateMachineArn,
  };
  console.log("siema", params);
  return stepFunctions
    .startExecution(params)
    .promise()
    .then(() => {
      callback(
        null,
        `Your state machine ${stateMachineArn} executed successfully`
      );
    })
    .catch((error) => {
      callback(error.message);
    });
};
