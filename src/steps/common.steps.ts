import { NavbarMenuItem, NavbarSubMenuItem } from '../models/enums';

import { HomePage } from '../pageObjects/pages/HomePage';
import { ICustomWorld } from '../helpers/custom-world';
import { Given } from '@cucumber/cucumber';

let homePage: HomePage;

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
