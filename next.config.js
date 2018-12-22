const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const conf = withTypescript(withSass({
  cssModules: true,
}));

module.exports = {
  pageExtensions: ['jsx', 'js'],
  ...conf,
}
