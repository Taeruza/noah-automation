import { CareersRoleItem, PredefinedPerson } from '../models/enums';

import { CareersPage } from '../pageObjects/pages/CareersPage';
import { ICustomWorld } from '../helpers/custom-world';
import { JobApplicationFormPage } from '../pageObjects/pages/JobApplicationFormPage';
import { JobDescriptionPage } from '../pageObjects/pages/JobDescriptionPage';
import { generateApplicantInfo } from '../fixtures';
import { expect } from '@playwright/test';
import { Given, Then, When } from '@cucumber/cucumber';

let careersPage: CareersPage;
let jobDescriptionPage: JobDescriptionPage;
let jobApplicationFormPage: JobApplicationFormPage;
const fileCV = 'resume_Khvaira.pdf';
const person = generateApplicantInfo();

Given(
  `User click on the {string} role link`,
  async function (this: ICustomWorld, role: CareersRoleItem) {
    careersPage = new CareersPage(this.page!);
    await careersPage.waitLoaded();
    await expect(
      careersPage.roleItem(role).element,
      `"${role}" is not visible on the page.`,
    ).toBeVisible();
    jobDescriptionPage = await careersPage.roleItem(role).clickAndGetJobDecription();
  },
);

Given(`User click on the {string} button`, async (button: string) => {
  switch (button) {
    case 'Apply for this job':
      jobApplicationFormPage = await jobDescriptionPage.applyForJob().clickAndGetApplicationForm();
      break;
    default:
      throw Error(`Button "${button}" does not exist.`);
  }
});

When(`User upload a CV`, async () => {
  await expect(jobApplicationFormPage.inputCV().element, 'CV input is not visible.').toBeVisible();
  await jobApplicationFormPage.inputCV().uploadFile(fileCV);
});

Then(`File should be uploaded`, async () => {
  const inputValue = await jobApplicationFormPage.inputCV().getValue();
  expect(inputValue, 'CV should be updated, wrong input value.').toContain(fileCV);
});

Given(`User fill out all the required fields of the application form`, async () => {
  await jobApplicationFormPage.fullName.formInput().input.fill(person.fullName);

  await jobApplicationFormPage.email.formInput().input.fill(person.email);

  await jobApplicationFormPage.phone.formInput().input.fill(person.phone ?? '');

  await jobApplicationFormPage.currentCompany.formInput().input.fill(person.currentCompany ?? '');
});

Then(`All required fields should be automatically filled`, async () => {
  await expect(
    jobApplicationFormPage.fullName.formInput().input.element,
    '"Full name" input is not automatically filled.',
  ).toHaveValue(PredefinedPerson.fullName);

  await expect(
    jobApplicationFormPage.email.formInput().input.element,
    '"Email" input is not automatically filled.',
  ).toHaveValue(PredefinedPerson.email);

  await expect(
    jobApplicationFormPage.phone.formInput().input.element,
    '"Phone" input is not automatically filled.',
  ).toHaveValue(PredefinedPerson.phone ?? '');

  await expect(
    jobApplicationFormPage.currentCompany.formInput().input.element,
    '"Current company" input is not automatically filled.',
  ).toHaveValue(PredefinedPerson.currentCompany ?? '');
});

Then(`All required fields should not be overwritten`, async () => {
  await expect(
    jobApplicationFormPage.fullName.formInput().input.element,
    '"Full name" input is not filled.',
  ).toHaveValue(person.fullName);

  await expect(
    jobApplicationFormPage.email.formInput().input.element,
    '"Email" input is not filled.',
  ).toHaveValue(person.email);

  await expect(
    jobApplicationFormPage.phone.formInput().input.element,
    '"Phone" input is not filled.',
  ).toHaveValue(person.phone ?? '');

  await expect(
    jobApplicationFormPage.currentCompany.formInput().input.element,
    '"Current company" input is not filled.',
  ).toHaveValue(person.currentCompany ?? '');
});
