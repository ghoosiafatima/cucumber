Feature: Weather Shopper Site

  Scenario: Check temperature is displayed and below 19°C
    Given I open the Weather Shopper homepage
    Then I should see the temperature displayed
   