// Packages whose "browser" export condition points to an ESM-only build.
const CJS_ONLY_PACKAGES = ['@hookform/resolvers', 'jsonpath-plus'];
// ESM-only packages exposing only the "import" export condition; they are
// transformed to CommonJS by @swc/jest (see transformIgnorePatterns).
const ESM_ONLY_PACKAGES = ['json-schema-faker'];

const matches = (path, packages) =>
  packages.some((pkg) => path === pkg || path.startsWith(`${pkg}/`));

module.exports = (path, options) => {
  // jest-environment-jsdom 28+ tries to use browser exports instead of default exports,
  // but @hookform/resolvers only offers an ESM browser export and not a CommonJS one. Jest does not yet
  // support ESM modules natively, so this causes a Jest error related to trying to parse
  // "export" syntax.
  //
  // This workaround resolves these packages with CommonJS/node export conditions instead of
  // the browser ones (Jest 30's resolver no longer supports `packageFilter`).
  if (matches(path, CJS_ONLY_PACKAGES)) {
    return options.defaultResolver(path, {
      ...options,
      conditions: ['require', 'node', 'default'],
    });
  }
  if (matches(path, ESM_ONLY_PACKAGES)) {
    return options.defaultResolver(path, {
      ...options,
      conditions: ['import', 'default'],
    });
  }
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, options);
};
