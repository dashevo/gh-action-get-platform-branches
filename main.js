const core = require('@actions/core');
const getBranchFromVersion = require('./src/getBranchFromVersion');

core.setOutput('cache-url', process.env['ACTIONS_CACHE_URL']);
core.setOutput('cache-token', process.env['ACTIONS_RUNTIME_TOKEN']);

const overrideMajorVersion = core.getInput('override-major-version') || undefined;
const overrideTestSuiteBranch = core.getInput('override-testsuite-branch') || undefined;
const overrideDashmateBranch = core.getInput('override-dashmate-branch') || undefined;

const { version } = require(`${process.env['GITHUB_WORKSPACE']}/package.json`);

const platformBranch = getBranchFromVersion(version, overrideMajorVersion);

core.setOutput('testsuite-branch', overrideTestSuiteBranch || platformBranch);
core.setOutput('dashmate-branch', overrideDashmateBranch || platformBranch);

let currentBranchName = process.env['GITHUB_HEAD_REF'];
if (currentBranchName === undefined) {
    currentBranchName = `${process.env['GITHUB_REF']}#refs/tags/`;
}

core.setOutput('current-branch', currentBranchName);
