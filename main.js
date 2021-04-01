const core = require('@actions/core');
const getBranchFromVersion = require('./src/getBranchFromVersion');

core.setOutput('cache-url', process.env['ACTIONS_CACHE_URL']);
core.setOutput('cache-token', process.env['ACTIONS_RUNTIME_TOKEN']);

const overrideMajorVersion = core.getInput('override-major-version') || undefined;
const overrideTestSuiteBranch = core.getInput('override-testsuite-branch') || undefined;
const overrideDashmateBranch = core.getInput('override-dashmate-branch') || undefined;

const { version } = require(`${process.env['GITHUB_WORKSPACE']}/package.json`);

const branch = getBranchFromVersion(version, overrideMajorVersion)

core.setOutput('testsuite-branch', overrideTestSuiteBranch || branch);
core.setOutput('dashmate-branch', overrideDashmateBranch || branch);
