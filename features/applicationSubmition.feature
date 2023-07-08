Feature: Application form submission

  Background:
    Given User navigates to the application
    And User click on the "Company" menu link
    And User click on the "Careers" menu link

  Scenario: Application form should be automatically filled after CV was uploaded
    Given User click on the "Software Development Engineer in Test (SDET)" role link
    And User click on the "Apply for this job" button

    When User upload a CV
    Then File should be uploaded
    And All required fields should be automatically filled

  Scenario: Application form that allready filled should not be automatically filled after CV was uploaded
    Given User click on the "Software Development Engineer in Test (SDET)" role link
    And User click on the "Apply for this job" button
    And User fill out all the required fields of the application form

    When User upload a CV
    Then File should be uploaded
    And All required fields should not be overwritten
