/* eslint-disable no-console */
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as _ from "lodash";

export const handler: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<any> => {
  console.log("STEP TWO:", _event);
  return {
    name: "TWO",
  };
};
