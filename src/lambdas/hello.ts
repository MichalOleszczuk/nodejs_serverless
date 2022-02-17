import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as _ from "lodash";

export const handler: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const firstNameObj = { name: "NAME" };
    const lastNameObj = { lastName: "LAST_NAME" };
    const mergeObj = _.merge(firstNameObj, lastNameObj);
    const response = {
      statusCode: 200,
      body: JSON.stringify(mergeObj),
    };
    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: "An error occured",
    };
  }
};
