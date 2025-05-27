import { Given, Then } from "@cucumber/cucumber";
import { WeatherActions } from './action.ts'; // Make sure path is correct
import { expect } from '@wdio/globals';

Given('I open the Weather Shopper homepage', async () => {
    await WeatherActions.openWeatherPage();
});


Then('I should see the temperature displayed', async () => {
    const temperature = await WeatherActions.checkWeather();
    await expect(temperature).toBeLessThan(19);
});
