Feature: SauceDemo Login

  Scenario: Successful login with valid credentials
    Given I open the SauceDemo login page
    When I enter valid credentials
    Then I should see the inventory page

  Scenario: Successful login with invalid credentials
    Given I open the SauceDemo login page
    When I enter invalid credentials
    Then I should see the error

  Scenario: Verify first product name on inventory page
    Given I open the SauceDemo login page
    When I enter valid credentials
    Then I should see the first product