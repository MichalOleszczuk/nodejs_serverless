import * as path from "path";
import { IUnitTesting } from "./global.namespace";

const sampleResource = path.join(
  process.env.RESOURCES_PATH,
  "sampleScreeningReq"
);

(global.UnitTesting as IUnitTesting) = {
  sampleResource,
};
