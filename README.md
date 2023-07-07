# Automation of Application Form Submission

## To run your tests

`npm run test` or `npx cucumber-js` runs all tests
`npm run test <feature name>` or `npx cucumber-js <feature name>` run the single feature

## Browser selection

By default we will use chromium. You can define an envrionment variable called BROWSER and
set the name of the browser. Available options: chromium, firefox, webkit

On Linux and Mac you can write:

`BROWSER=firefox npm run test` or `BROWSER=firefox npx cucumber-js` runs all tests using Firefox

On Windows you need to write

```
set BROWSER=firefox
npm run test
```

## To choose a reporter

The last reporter/formatter found on the cucumber-js command-line wins:

```text
--format summary --format @cucumber/pretty-formatter --format cucumber-console-formatter
```

In [cucumber.mjs](cucumber.mjs) file, modify the options.

To use Allure reporting, you can run with env param: `USE_ALLURE=1`, and then use the `npm run allure` to show the report.

## To check for typescript, linting and gherkin errors

- run the command `npm run build`.

## To view the html report of the last run

- run the command `npm run report`.

## To view allure report

- run the command `npm run allure`.
# noah-automation
