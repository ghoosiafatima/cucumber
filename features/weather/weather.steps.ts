import { When, Then, Given } from "@cucumber/cucumber";
import { WeatherActions } from './action.ts';

let temperature: number;
let expectedItems: { name: string; price: number }[] = [];

Given('I open the Weather Shopper homepage', async () => {
    await WeatherActions.openWeatherPage();
});

When('I check the temperature and navigate accordingly', async () => {
    temperature = await WeatherActions.getTemperature();

    await WeatherActions.navigateBasedOnTemperature(temperature);
});

When('I add the products to the cart', async () => {
    await WeatherActions.addProductsToCart(temperature);
    await browser.pause(5000)
});



When('I verify the checkout page information', async () => {
    await WeatherActions.verifyCartContents(expectedItems);
    await browser.pause(3000);

});
When('I enter valid payment details', async () => {
    await WeatherActions.openCardForm()
    // Switch to the Stripe iframe
    await WeatherActions.submitCardInfoInForm();

});

Then('Successfully bought the product based upon temperature', async () => {
    console.log("then::: Successfully bought the product based upon temperature")
});