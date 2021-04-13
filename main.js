const core = require('@actions/core');
const getBranchFromVersion = require('./src/getBranchFromVersion');

// Set action/cache variables to use in other steps

core.setOutput('cache-url', process.env['ACTIONS_CACHE_URL']);
core.setOutput('cache-token', process.env['ACTIONS_RUNTIME_TOKEN']);

// Get compatible platform branch name

const { version } = require(`${process.env['GITHUB_WORKSPACE']}/package.json`);

core.info(`Package version is ${version}`);

const overrideMajorVersion = core.getInput('override-major-version') || undefined;

const platformBranch = getBranchFromVersion(version, {
  overrideMajorVersion,
});

if (overrideMajorVersion) {
  core.info(`Compatible branch name with overridden major version is ${platformBranch}`);
} else {
  core.info(`Compatible branch name is ${platformBranch}`);
}

// Set test suite compatible branch

const overrideTestSuiteBranch = core.getInput('override-testsuite-branch') || undefined;

const testSuiteBranch = overrideTestSuiteBranch || platformBranch;

if (overrideTestSuiteBranch !== undefined) {
  core.info(`Test Suite branch overridden with ${overrideTestSuiteBranch}`);
} else {
  core.info(`Test Suite branch is ${testSuiteBranch}`);
}

core.setOutput('testsuite-branch', testSuiteBranch);

// Set dashmate compatible branch

const overrideDashmateBranch = core.getInput('override-dashmate-branch') || undefined;

const dashmateBranch = overrideDashmateBranch || platformBranch;

if (overrideDashmateBranch !== undefined) {
  core.info(`Dashmate branch overridden with ${overrideDashmateBranch}`);
} else {
  core.info(`Dashmate branch is ${dashmateBranch}`);
}

core.setOutput('dashmate-branch', dashmateBranch);

// Set current branch/tag name

let currentBranchName = process.env['GITHUB_HEAD_REF'];
if (currentBranchName !== undefined) {
  currentBranchName = process.env['GITHUB_REF'].replace(/\/refs\/tags\//, '');
  
  core.info(`Current tag name is ${currentBranchName}`);
} else {
  core.info(`Current branch name is ${currentBranchName}`);
}

core.setOutput('current-branch', currentBranchName);
