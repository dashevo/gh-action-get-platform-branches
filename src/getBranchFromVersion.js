const semver = require('semver');

/**
 * @param {string} packageVersion
 * @param {Object} [options]
 * @param {string} [options.overrideMajorVersion]
 *
 * @return {string}
 */
function getBranchFromVersion(packageVersion, options = {}) {
  console.log(`In getBranchFromVersion, packageVersion is ${packageVersion}`)
  const prerelease = semver.prerelease(packageVersion);
  const major = semver.major(packageVersion);
  const minor = semver.minor(packageVersion);

  const majorVersion = options.overrideMajorVersion !== undefined
    ? options.overrideMajorVersion
    : major;

  if (prerelease) {
    console.log(`In prerelease condition, returning v${majorVersion}.${minor}-${prerelease[0]}`)
    return `v${majorVersion}.${minor}-${prerelease[0]}`;
  }

  console.log(`In default condition, returning 'master'`);
  return 'master';
}

module.exports = getBranchFromVersion;
