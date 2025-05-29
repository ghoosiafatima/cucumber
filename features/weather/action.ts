import { temperatureSelectors } from './selectors';

export class WeatherActions {
  static async openWeatherPage(): Promise<void> {
    await browser.url('https://weathershopper.pythonanywhere.com/');
  }

  static async getTemperature(): Promise<number> {
    const temperatureElement = await $(temperatureSelectors.temperatureValue);
    const temperatureText = await temperatureElement.getText();
    const temperature = parseInt(temperatureText.replace(/\D/g, ''), 10);
    return temperature;
  }

  static async startMoisturizerFlow() {
    console.log('Temperature is below 19°C. Navigating to moisturizers.');
    const moisturizersButton = await $('button=Buy moisturizers');
    await moisturizersButton.click();
  }

  static async startSunscreenFlow() {
    console.log('Temperature is above 38°C. Navigating to sunscreens.');
    const sunscreensButton = await $('button=Buy sunscreens');
    await sunscreensButton.click();
  }

  static async navigateBasedOnTemperature(temperature: number): Promise<void> {
    if (temperature < 19) {
      this.startMoisturizerFlow()
    } else if (temperature > 38) {
      this.startSunscreenFlow()
    } else {
      console.log('Temperature is moderate. No navigation required.');
    }
  }

  static async addMoisturizerProductsToCart(): Promise<void> {
    const products = await $$('div.text-center.col-4');

    let cheapestAloe = { price: Infinity, button: null as WebdriverIO.Element | null };
    let cheapestAlmond = { price: Infinity, button: null as WebdriverIO.Element | null };

    for (const product of products) {
      const name = await product.$('p').getText();
      const priceText = await product.$('p:nth-child(3)').getText(); // e.g., "Price: 250"
      const price = parseInt(priceText.replace(/\D/g, ''), 10);
      const button = await product.$('button'); // ← fetch button early

      if (/aloe/i.test(name) && price < cheapestAloe.price) {
        cheapestAloe = {
          price,
          button
        };
      }

      if (/almond/i.test(name) && price < cheapestAlmond.price) {
        cheapestAlmond = {
          price,
          button
        };
      }
    }

    if (cheapestAloe.button) {
      console.log(`Adding Aloe moisturizer at ₹${cheapestAloe.price}`);
      await cheapestAloe.button.click();
    }

    if (cheapestAlmond.button) {
      console.log(`Adding Almond moisturizer at ₹${cheapestAlmond.price}`);
      await cheapestAlmond.button.click();
    }

    const cartButton = await $('button=Cart');
    await cartButton.click();
  }

  static async addSunscreenProductsToCart(): Promise<void> {

  }

  static async addProductsToCart(temperature: number): Promise<void> {
    if (temperature < 19) {
      this.addMoisturizerProductsToCart();
    } else if (temperature > 38) {
      this.addSunscreenProductsToCart()
    } else {
      console.log('Temperature is moderate. No need to add product to cart.');
    }
  }
}