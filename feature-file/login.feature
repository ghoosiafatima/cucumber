Feature: SauceDemo Login

  Scenario: Successful login with valid credentials

    Given I open the SauceDemo login page
    When I enter valid credentials
    Then I should see the inventory page