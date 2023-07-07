import { NavbarMenuItem, NavbarSubMenuItem } from '../../models/enums';

import { Base } from '../base';
import { Locator, Page } from '@playwright/test';

export class Navbar extends Base {
  readonly container: Locator;
  _menuItem: Locator;

  constructor(page: Page) {
    super(page, 'Navbar');
    this.container = this.page.locator('header');
    this._menuItem = this.container.locator('span.MuiTypography-root');
  }

  menuItem(item: NavbarMenuItem | NavbarSubMenuItem) {
    return {
      element: this._menuItem.filter({ hasText: item }),
      clickOnRoleItemLinkByName: async (): Promise<void> => {
        const menuItem = this._menuItem.filter({ hasText: item });
        if (!(await menuItem.isVisible())) throw Error(`Can not find menu item: "${item}"`);
        await menuItem.click();
      },
    };
  }
}
