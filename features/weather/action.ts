import { temperatureSelectors } from './selectors';

export class WeatherActions {
  static async openWeatherPage() {
    await browser.url('https://weathershopper.pythonanywhere.com/');
  }

  static async checkWeather(): Promise<number> {
    const temperatureElement = await $(temperatureSelectors.temperatureValue);
    const temperatureText = await temperatureElement.getText(); // e.g., "19°C"
    const temperature = parseInt(temperatureText.replace(/\D/g, ''), 10);
    console.log(`The current temperature is: ${temperature}°C`);
    return temperature;
  }
}