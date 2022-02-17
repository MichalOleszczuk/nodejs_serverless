import { join, normalize } from "path";

export function setEnvVars() {
  process.env.RESOURCES_PATH = normalize(join(__dirname, "../../resources"));
}
