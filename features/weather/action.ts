import { temperatureSelectors } from './selectors';


export class WeatherActions {
  static async openWeatherPage(): Promise<void> {
    await browser.url('https://weathershopper.pythonanywhere.com/');
  }

  static async getTemperature(): Promise<number> {
    const temperatureElement = await $(temperatureSelectors.temperatureValue);
    const temperatureText = await temperatureElement.getText(); // e.g., "19°C"
    const temperature = parseInt(temperatureText.replace(/\D/g, ''), 10);
    console.log(`The current temperature is: ${temperature}°C`);
    return temperature;
  }

  static async navigateBasedOnTemperature(temperature: number): Promise<void> {
    if (temperature < 19) {
      console.log('Temperature is below 19°C. Navigating to moisturizers.');
      const moisturizersButton = await $('button=Buy moisturizers');
      await moisturizersButton.click();
    } else if (temperature > 38) {
      console.log('Temperature is above 38°C. Navigating to sunscreens.');
      const sunscreensButton = await $('button=Buy sunscreens');
      await sunscreensButton.click();
    } else {
      console.log('Temperature is moderate. No navigation required.');
    }
  }
}