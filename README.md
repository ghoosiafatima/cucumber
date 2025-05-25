# Cucumber WebdriverIO Automation

This project uses [WebdriverIO](https://webdriver.io/) with the [Cucumber](https://cucumber.io/) framework for end-to-end testing.

## Project Structure

- `features/` - Contains feature files, step definitions, and page objects
     - `login.feature` - Example feature file
     - `step-definitions/` - Step definitions for Cucumber
     - `pageobjects/` - Page Object Model classes
- `feature-file/` - Additional feature files
- `wdio.conf.ts` - Main WebdriverIO configuration (TypeScript)
- `wdio.conf.js` - WebdriverIO configuration (JavaScript, legacy)
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies and scripts

## Getting Started

### Install dependencies

```sh
npm install
```

### Run tests

```sh
npm run wdio
```

## Scripts

- `npm run wdio` - Runs the WebdriverIO test runner with Cucumber

## Notes

- Tests are written in TypeScript and use the Cucumber BDD syntax.
- Page Object Model is used for maintainable selectors and actions.
- Results are reported using the `spec` and `mochawesome` reporters.

## License

MIT
