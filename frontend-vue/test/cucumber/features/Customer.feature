Feature: Manage customers

  Scenario: Creating and activating a customer
    Given the starting page is loaded
    Given the current user is "foo+#testid#@bar.de"

    When the current user fills out the form and submits it
    Then the current user appears inactive in the table

    When the current user clicks on "Send activation"
    Then the current user appears pending in the table

    When the current user clicks on the activation link in the e-mail
    Then the confirmation page shows that the current user is active

    Given the starting page is loaded
    Then the current user appears active in the table
