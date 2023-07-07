const config = {
  requireModule: ['ts-node/register'],
  require: ['src/**/*.ts'],
  format: [
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};

if (process.env.USE_ALLURE) {
  config.format.push('./src/helpers/reporters/allure-reporter.ts');
} else {
  config.format.push('@cucumber/pretty-formatter');
}
export default config;
