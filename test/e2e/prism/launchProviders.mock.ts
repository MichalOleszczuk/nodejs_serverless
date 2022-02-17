import { createServer } from "@stoplight/prism-http-server";
import { createLogger } from "@stoplight/prism-core";
import { IHttpConfig } from "@stoplight/prism-http";
import { IHttpOperation } from "@stoplight/types";
import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations";
import {
  IPrismConfiguration,
  IPrismServerConfiguration,
} from "./interfaces/IPrismConfiguration";
import { readFileSync } from "fs";
import * as yaml from "js-yaml";
import * as _ from "lodash";
import { IPrismHttpServer } from "@stoplight/prism-http-server/dist/types";

export async function runPrismServer() {
  const prismConfigurationFile = await loadPrismConfigurationFile();
  const prismServerInstances = await createPrismServer(prismConfigurationFile);
  return prismServerInstances as IPrismHttpServer[];
}

async function createPrismServer(prismConfiguration: IPrismConfiguration) {
  const httpConfiguration = loadPrismHttpConfiguration(
    prismConfiguration.httpConfiguration
  );

  const prismServerInstances = await Promise.all(
    _.chain(prismConfiguration.serverConfiguration)
      .map(async (configuration) => {
        return registerPrismServer(configuration, httpConfiguration);
      })
      .value()
  );
  return prismServerInstances as IPrismHttpServer[];
}

async function registerPrismServer(
  prismServerConfiguration: IPrismServerConfiguration,
  config: IHttpConfig
) {
  const operations = await createOperationsFromFiles(
    prismServerConfiguration.filesPath
  );

  const server = createServer(operations, {
    components: {
      logger: createLogger("TestLogger"),
    },
    cors: true,
    config,
  });
  await server.listen(prismServerConfiguration.port);
  server.close.bind(server);
  return server as IPrismHttpServer;
}

export async function loadPrismConfigurationFile(fileName?: string) {
  const configurationFileName = fileName ? fileName : "prism-configuration";
  return yaml.load(
    readFileSync(`./src/${configurationFileName}.yml`, "utf8")
  ) as IPrismConfiguration;
}

function loadPrismHttpConfiguration(httpConfiguration: IHttpConfig) {
  return httpConfiguration
    ? httpConfiguration
    : ({
        checkSecurity: true,
        validateRequest: true,
        validateResponse: true,
        mock: { dynamic: false },
        errors: false,
      } as IHttpConfig);
}

async function createOperationsFromFiles(filesPath: string[]) {
  const operationsList = await Promise.all(
    _.chain(filesPath)
      .flatMap(async (filePath) => {
        const configurationObject = yaml.load(
          readFileSync(filePath, "utf8")
        ) as any;
        const operations = await getHttpOperationsFromSpec(configurationObject);
        return createCustomOperations(operations, configurationObject);
      })
      .value()
  );
  const flattenedOperationsList = _.chain(operationsList)
    .flatMap((arr) => arr)
    .value();
  return flattenedOperationsList as IHttpOperation[];
}

function createCustomOperations(
  operations: IHttpOperation[],
  configurationObject: any
) {
  if (configurationObject.basePath) {
    return _.chain(operations)
      .map((operation) => {
        const fullPath = (
          configurationObject.basePath + operation.path
        ).replace(/([^:]\/)\/+/g, "$1");
        return {
          ...operation,
          path: fullPath,
        };
      })
      .value();
  }
  return operations;
}
