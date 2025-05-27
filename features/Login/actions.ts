import { LoginSelectors } from './selectors';

export class LoginActions {
    static async openLoginPage() {
        await browser.url('https://www.saucedemo.com/');
    }

    static async enterCredentials(username: string, password: string) {
        await $(LoginSelectors.usernameInput).setValue(username);
        await $(LoginSelectors.passwordInput).setValue(password);
    }

    static async clickLoginButton() {
        await $(LoginSelectors.loginButton).click();
    }

    static async isProductsPageDisplayed(): Promise<boolean> {
        return $(LoginSelectors.productsTitle).isDisplayed();
    }


    static async isErrorDisplayed(): Promise<boolean> {
        return $(LoginSelectors.errorBox).isDisplayed();
    }


    static async isFirstProductDisplayed(): Promise<boolean> {
        return $(LoginSelectors.inventoryItemName).isDisplayed();
    }

    static async getFirstProductText() {
        const expectedFirstProductText = 'Sauce Labs Backpack';
        const actualName = await $(LoginSelectors.inventoryItemName).getText();
        expect(actualName).toBe(expectedFirstProductText);
    }
}