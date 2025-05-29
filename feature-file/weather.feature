Feature: Weather Shopper Site
  Scenario: Navigate to product page based on current temperature
    Given I open the Weather Shopper homepage
    When I check the temperature and navigate accordingly
    When I add the products to the cart
    Then Successfully bought the product based upon temperature