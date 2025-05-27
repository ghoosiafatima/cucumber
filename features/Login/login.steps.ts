import { Given, When, Then } from "@cucumber/cucumber";
import { LoginActions } from "./actions";

// Shared Given step
Given('I open the SauceDemo login page', async () => {
    await LoginActions.openLoginPage();
});

// Valid credentials scenario
When('I enter valid credentials', async () => {
    await LoginActions.enterCredentials('standard_user', 'secret_sauce');
    await LoginActions.clickLoginButton();
});

Then('I should see the inventory page', async () => {
    expect(await LoginActions.isProductsPageDisplayed()).toBe(true);
    await browser.pause(4000);
});

// Invalid credentials scenario
When('I enter invalid credentials', async () => {
    await LoginActions.enterCredentials('standard_user111', 'secret_sauce111');
    await LoginActions.clickLoginButton();
});

Then('I should see the error', async () => {
    await browser.pause(2000);
    expect(await LoginActions.isErrorDisplayed()).toBe(true);
    await browser.pause(1000);
});

Then('I should see the first product', async () => {
    await browser.pause(2000);
    await LoginActions.getFirstProductText();
    await browser.pause(1000);
});