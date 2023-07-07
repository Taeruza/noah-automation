import { CareersRoleItem, NavbarMenuItem, NavbarSubMenuItem } from '../models/enums';

import { CareersPage } from '../pageObjects/pages/CareersPage';
import { HomePage } from '../pageObjects/pages/HomePage';
import { ICustomWorld } from '../helpers/custom-world';
import { JobDescriptionPage } from '../pageObjects/pages/JobDescriptionPage';
import { Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

let homePage: HomePage;
let careersPage: CareersPage;
let jobDescriptionPage: JobDescriptionPage;

Given(`User navigates to the application`, async function (this: ICustomWorld) {
  homePage = new HomePage(this.page!);
  await homePage.navigate();
  await homePage.waitLoaded();
});

Given(
  `User click on the {string} menu link`,
  async (menuItem: NavbarMenuItem | NavbarSubMenuItem) => {
    await homePage.navbar.menuItem(menuItem).clickOnRoleItemLinkByName();
  },
);

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
      await jobDescriptionPage.applyForJob().clickAndGetApplicationForm();
      break;
    default:
      throw Error(`Button "${button}" does not exist.`);
  }
});
