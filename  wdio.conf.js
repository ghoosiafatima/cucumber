exports.config = {
    runner: 'local',
    framework: 'cucumber',
    specs: ['./features/**/*.feature'],
    cucumberOpts: {
        require: ['./features/step-definitions/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    services: ['selenium-standalone'],
    reporters: ['spec'],
    baseUrl: 'https://www.saucedemo.com/',
};