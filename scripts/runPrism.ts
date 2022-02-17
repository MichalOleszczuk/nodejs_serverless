import {
  loadPrismConfigurationFile,
  runPrismServer,
} from "../test/e2e/prism/launchProviders.mock";

(async function () {
  const prismConfigurationFile = await loadPrismConfigurationFile();
  await runPrismServer();
  // eslint-disable-next-line no-console
  console.log(
    `Prism server running locally on port: ${prismConfigurationFile.serverConfiguration[0].port}`
  );
})();
