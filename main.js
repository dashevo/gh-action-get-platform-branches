const core = require('@actions/core');
const getBranchFromVersion = require('./src/getBranchFromVersion');

core.setOutput('cache-url', process.env['ACTIONS_CACHE_URL']);
core.setOutput('cache-token', process.env['ACTIONS_RUNTIME_TOKEN']);

const overrideMajorVersion = core.getInput('override-major-version') || undefined;

const { version } = require('./package.json');

console.log(version);

getBranchFromVersion(version, overrideMajorVersion)
  .then((version) => {
    core.setOutput('platform-branch', version);
  })
  .catch((e) => {
  console.error(e);
  process.exit(1);
});
