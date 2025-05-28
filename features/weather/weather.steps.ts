import { When, Then } from "@cucumber/cucumber";
import { WeatherActions } from './action.ts'; // Make sure path is correct
// import { expect } from '@wdio/globals';


let temperature: number;

When('I open the Weather Shopper homepage', async () => {
    await WeatherActions.openWeatherPage();
});

Then('I check the temperature and navigate accordingly', async () => {
    temperature = await WeatherActions.getTemperature();
    await WeatherActions.navigateBasedOnTemperature(temperature);
});
