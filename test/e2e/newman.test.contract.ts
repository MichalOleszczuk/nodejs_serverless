import * as newman from "newman";
import { runPrismServer } from "./prism/launchProviders.mock";

describe("Newman contract testing", () => {
  it("Check PerformScreening call", async () => {
    const prismServerInstances = await runPrismServer();
    // TODO: implement serverless local run
    const server = await Promise.resolve({} as any);
    const newmanRseult = await (() => {
      return new Promise((resolve, reject) => {
        newman.run(
          {
            collection: require("./collections/test.postman_collection.json"),
            environment: require("./collections/test.postman_environment.json"),
            reporters: "cli",
          },
          (err) => {
            if (err) {
              reject(false);
            }
            // eslint-disable-next-line no-console
            console.log("collection run complete!");
            resolve(true);
          }
        );
      });
    })();
    expect(newmanRseult).toEqual(true);
    server.close();
    prismServerInstances.forEach((instance) => instance.close());
  });
});
