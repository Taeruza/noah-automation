import { Base } from '../base';
import { Navbar } from '../components/Navbar';
import { config } from '../../helpers/config';
import { Locator, Page, Response } from '@playwright/test';

export abstract class BasePage extends Base {
  protected url = ''; // Will be same as host by default.
  navbar: Navbar;
  _waitPageSelector: Locator;

  protected constructor(page: Page, pageName: string) {
    super(page, pageName);
    this._waitPageSelector = this.page.locator('html');
    this.navbar = new Navbar(page);
  }

  public async navigate(): Promise<Response | null> {
    return await this.page.goto(new URL(this.url, config.BASE_URL).href);
  }

  public async waitLoaded(timeout = 60000): Promise<void> {
    try {
      await this._waitPageSelector.waitFor({ timeout: timeout });
      await this.page.waitForLoadState('networkidle');
    } catch (e) {
      throw Error(`[${this.pageName}] page not loaded. ${e}`);
    }
  }

  public async bringToFront(): Promise<void> {
    try {
      await this.page.bringToFront();
    } catch (e) {
      throw Error(`[${this.pageName}] page not bringed to front. ${e}`);
    }
  }

  public async reload(): Promise<void> {
    await this.page.reload();
    await this.waitLoaded();
  }
}
