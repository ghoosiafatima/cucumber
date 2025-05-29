import { When, Then, Given } from "@cucumber/cucumber";
import { WeatherActions } from './action.ts';

let temperature: number;

Given('I open the Weather Shopper homepage', async () => {
    await WeatherActions.openWeatherPage();
});

When('I check the temperature and navigate accordingly', async () => {
    // temperature = await WeatherActions.getTemperature();
    temperature = 11;
    await WeatherActions.navigateBasedOnTemperature(temperature);
});

When('I add the products to the cart', async () => {
    await WeatherActions.addProductsToCart(temperature);
    await browser.pause(3000)
});

Then('Successfully bought the product based upon temperature', async () => {
    console.log("then::: Successfully bought the product based upon temperature")
});
