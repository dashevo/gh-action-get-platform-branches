const core = require('@actions/core');
const getBranchFromVersion = require('./src/getBranchFromVersion');

core.setOutput('cache-url', process.env['ACTIONS_CACHE_URL']);
core.setOutput('cache-token', process.env['ACTIONS_RUNTIME_TOKEN']);

const overrideMajorVersion = core.getInput('override-major-version') || undefined;
const overrideTestSuiteBranch = core.getInput('override-testsuite-branch') || undefined;
const overrideDashmateBranch = core.getInput('override-dashmate-branch') || undefined;

const { version } = require(`${process.env['GITHUB_WORKSPACE']}/package.json`);

const platformBranch = getBranchFromVersion(version, overrideMajorVersion);

const testSuiteBranch = overrideTestSuiteBranch || platformBranch;
const dashmateBranch = overrideDashmateBranch || platformBranch;

core.setOutput('testsuite-branch', testSuiteBranch);
core.setOutput('dashmate-branch', dashmateBranch);

let currentBranchName = process.env['GITHUB_HEAD_REF'];
if (currentBranchName === undefined) {
  currentBranchName = process.env['GITHUB_REF'].replace(/\/refs\/tags\//, '');
}

core.setOutput('current-branch', currentBranchName);

if (overrideMajorVersion != undefined) {
  console.log(`Major version overridden with ${overrideMajorVersion}`)
}
if (currentBranchName != undefined) {
  console.log(`Current branch is ${currentBranchName}`);
}
console.log(`Package version is ${version}`)

if (overrideTestSuiteBranch != undefined) {
  console.log(`Test Suite branch overridden with ${overrideTestSuiteBranch}`)
}
console.log(`Test Suite branch is ${testSuiteBranch}`)

if (overrideDashmateBranch != undefined) {
  console.log(`Dashmate branch overridden with ${overrideDashmateBranch}`)
}
console.log(`Dashmate branch is ${dashmateBranch}`)
