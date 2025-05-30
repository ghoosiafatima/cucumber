export const temperatureSelectors = {
    temperatureValue: '#temperature',
};

export const pageSelectors = {
    moisturizersButton: 'button=Buy moisturizers',
    productCard: 'div.text-center.col-4',
    cartButton: 'button=Cart',
    cartButton1: '.thin-text.nav-link',
};
export const paymentSelectors = {
    payWithCardButton: "button.stripe-button-el",
    iframe: 'iframe[name^="__privateStripeFrame"]',
    cardNumber: 'input[name="cardnumber"]',
    expiryDate: 'input[name="exp-date"]',
    cvc: 'input[name="cvc"]',
    postalCode: 'input[name="postal"]',
    payButton: 'button[type="submit"]',
    successMessage: 'h2', // Adjust this selector based on your actual success message element
};