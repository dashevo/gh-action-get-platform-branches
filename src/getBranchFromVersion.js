const semver = require('semver');

/**
 * @param {string} packageVersion
 * @param {Object} [options]
 * @param {string} [options.overrideMajorVersion]
 *
 * @return {string}
 */
function getBranchFromVersion(packageVersion, options = {}) {
  const prerelease = semver.prerelease(packageVersion);
  const major = semver.major(packageVersion);
  const minor = semver.minor(packageVersion);

  const majorVersion = options.overrideMajorVersion !== undefined
    ? options.overrideMajorVersion
    : major;

  if (prerelease) {
    return `v${majorVersion}.${minor}-${prerelease[0]}`;
  }

  return 'master';
}

module.exports = getBranchFromVersion;
