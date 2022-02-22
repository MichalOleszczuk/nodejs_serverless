/* eslint-disable no-console */
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<any> => {
  console.log("STEP ONE:", event);
  return {
    name: "Michal",
  };
};
