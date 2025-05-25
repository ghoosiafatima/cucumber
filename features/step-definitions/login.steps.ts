const { Given, When, Then } = require('@cucumber/cucumber');

Given('I open the SauceDemo login page', async () => {
    await browser.url('https://www.saucedemo.com/');
});

When('I enter valid credentials', async () => {
    const usernameField = await $('#user-name');
    const passwordField = await $('#password');
    const loginButton = await $('#login-button');

    await usernameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');
    await loginButton.click();
});

Then('I should see the inventory page', async () => {
    const inventoryPage = await $('.inventory_list');
    expect(await inventoryPage.isDisplayed()).toBe(true);
});