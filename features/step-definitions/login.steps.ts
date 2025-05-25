import { Given, When, Then } from "@cucumber/cucumber"

Given('I open the SauceDemo login page', async () => {
    await browser.url('https://www.saucedemo.com/');
    console.log("🚀 ~ Given ~:")
});

When('I enter valid credentials', async () => {
    const usernameField = await $('#user-name');
    const passwordField = await $('#password');
    const loginButton = await $('#login-button');

    await usernameField.setValue('standard_user');
    await passwordField.setValue('secret_sauce');
    await loginButton.click()
});

Then('I should see the inventory page', async () => {
    const inventoryPage = await $('.inventory_list');
    console.log("🚀 ~ Then ~:")
    expect(await inventoryPage.isDisplayed()).toBe(true);
    await browser.pause(4000);
});