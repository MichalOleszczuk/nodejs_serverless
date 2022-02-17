import { IHttpConfig } from "@stoplight/prism-http";

export interface IPrismConfiguration {
  serverConfiguration: IPrismServerConfiguration[];
  httpConfiguration?: IHttpConfig;
}

export interface IPrismServerConfiguration {
  filesPath: string[];
  operations?: IAdditionalOperations[];
  port: number;
}

export interface IAdditionalOperations {
  filePath: string;
}
