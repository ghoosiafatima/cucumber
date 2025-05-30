import { temperatureSelectors } from './selectors';
import { paymentSelectors } from './selectors';

let cheapestAloe = { price: Infinity, name: "", button: null as WebdriverIO.Element | null };
let cheapestAlmond = { price: Infinity, name: "", button: null as WebdriverIO.Element | null };

export class WeatherActions {

  static async openWeatherPage() {
    await browser.url('https://weathershopper.pythonanywhere.com/');
  }

  static async getTemperature() {
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

  static async navigateBasedOnTemperature(temperature: number) {
    if (temperature < 19) {
      this.startMoisturizerFlow()
    } else if (temperature > 38) {
      this.startSunscreenFlow()
    } else {
      console.log('Temperature is moderate. No navigation required.');
    }
  }

  static async addMoisturizerProductsToCart() {
    const products = await $$('div.text-center.col-4');

    for (const product of products) {
      const name = await product.$('p').getText();
      const priceText = await product.$('p:nth-child(3)').getText();
      const price = parseInt(priceText.replace(/\D/g, ''), 10); // it removes strings from price and make it number
      const button = await product.$('button');

      if (name.toLowerCase().includes("aloe") && price < cheapestAloe.price) {
        cheapestAloe = {
          price,
          name,
          // @ts-ignore
          button
        };
      }

      if (name.toLowerCase().includes("almond") && price < cheapestAlmond.price) {
        cheapestAlmond = {
          price,
          name,
          // @ts-ignore
          button
        };
      }
    }

    if (cheapestAloe.button) {
      await cheapestAloe.button.click();
    }

    if (cheapestAlmond.button) {
      await cheapestAlmond.button.click();
    }

    const cartButton = await $('.thin-text.nav-link');
    await cartButton.click();
  };


  static async addProductsToCart(temperature: number) {
    if (temperature < 19) {
      this.addMoisturizerProductsToCart();
    } else if (temperature > 38) {
      this.addSunscreenProductsToCart()
    } else {
      console.log('Temperature is moderate. No need to add product to cart.');
    }
  }

  static async verifyCartContents(expectedItems: { name: string; price: number }[]) {
    const cartItems = await $$('table.table tbody tr');
    for (const expectedItem of expectedItems) {
      let itemFound = false;
      for (const row of cartItems) {
        const name = await row.$('td:nth-child(1)').getText();
        if (name === expectedItem.name) {
          const priceText = await row.$('td:nth-child(2)').getText();
          const price = parseInt(priceText.replace(/\D/g, ''), 10);
          if (price !== expectedItem.price) {
            throw new Error(`Price mismatch for ${expectedItem.name}: expected ${expectedItem.price}, found ${price}.`);
          }
          itemFound = true;
          break;
        }
      }
      if (!itemFound) {
        throw new Error(`Item ${expectedItem.name} not found in cart.`);
      }
    }
  }
  static async addSunscreenProductsToCart() {
    // Use a more specific selector to target all product containers
    const products = await $$('div.row.justify-content-center div.text-center.col-4');
    let cheapestSPF50: { price: number; name: string; button: WebdriverIO.Element | null } = { price: Infinity, name: '', button: null };
    let cheapestSPF30: { price: number; name: string; button: WebdriverIO.Element | null } = { price: Infinity, name: '', button: null };

    for (const product of products) {
      const name = await product.$('p').getText();
      const priceText = await product.$('p:nth-child(3)').getText();
      const price = parseInt(priceText.replace(/\D/g, ''), 10);
      const button = await product.$('button');

      if (name.toLowerCase().includes('spf-50') && price < cheapestSPF50.price) {
        // @ts-ignore
        cheapestSPF50 = { price, name, button };
      } else if (name.toLowerCase().includes('spf-30') && price < cheapestSPF30.price) {
        // @ts-ignore
        cheapestSPF30 = { price, name, button };
      }
    }

    if (cheapestSPF50.button) {
      await cheapestSPF50.button.click();
    } else {
      console.log('No SPF-50 sunscreen found.');
    }

    if (cheapestSPF30.button) {
      await cheapestSPF30.button.click();
    } else {
      console.log('No SPF-30 sunscreen found.');
    }
    const cartButton = await $('.thin-text.nav-link'); // Adjusted selector for the cart button
    await cartButton.click();
  }

  static async openCardForm() {
    const payWithCardButton = await $(paymentSelectors.payWithCardButton);
    await payWithCardButton.click();
  }
  static async submitCardInfoInForm() {
    await browser.pause(3000);

    // Switch to the Stripe iframe
    const stripeIframe = await $('iframe[name="stripe_checkout_app"]');
    if (await stripeIframe.isExisting()) {
      console.log('Switching to Stripe iframe...');
      await browser.switchFrame(stripeIframe);
    } else {
      throw new Error('Stripe iframe not found.');
    }

    // Enter email
    const emailInput = await $('input#email.control'); // Updated selector to use id
    if (await emailInput.isExisting()) {
      console.log('Entering email...');
      await emailInput.setValue('test@example.com');
    } else {
      throw new Error('Email input field not found.');
    }

    // Enter card number
    const cardNumberInput = await $('input#card_number.control'); // Updated selector to use id
    if (await cardNumberInput.isExisting()) {
      console.log('Entering card number...');
      await cardNumberInput.setValue('4242424242424242'); // Stripe test card number
    } else {
      throw new Error('Card number input field not found.');
    }

    // Enter expiration date
    const expiryInput = await $('#cc-exp'); // Updated selector to use id
    if (await expiryInput.isExisting()) {
      console.log('Entering expiration date...');
      await expiryInput.setValue('12/34'); // Example expiration date
    } else {
      throw new Error('Expiration date input field not found.');
    }

    // Enter CVC
    const cvcInput = await $('#cc-csc'); // Updated selector to use id
    if (await cvcInput.isExisting()) {
      console.log('Entering CVC...');
      await cvcInput.setValue('123'); // Example CVC
    } else {
      throw new Error('CVC input field not found.');
    }

    // Submit the payment form
    const payButton = await $('button[type="submit"]');
    if (await payButton.isExisting()) {
      console.log('Submitting payment form...');
      await payButton.click();
    } else {
      throw new Error('Pay button not found.');
    }

    // Switch back to the main content
    await browser.switchToParentFrame();
    console.log('Payment details entered and submitted successfully.');

    await browser.pause(2000);
    this.verifyCardSuccess()
  }

  static async verifyCardSuccess() {
    // Wait for the success message to appear
    const successMessage = await $('p.text-justify');
    if (await successMessage.isExisting()) {
      const messageText = await successMessage.getText();
      if (messageText === "Your payment was successful. You should receive a follow-up call from our sales team.") {
        console.log('Payment success message verified.');
      } else {
        throw new Error(`Unexpected success message: "${messageText}"`);
      }
    } else {
      throw new Error('Success message not found.');
    }
  }
}