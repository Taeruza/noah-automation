import { Locator, Page } from '@playwright/test';

export abstract class Base {
  protected readonly _page: Page;
  protected readonly pageName: string;

  protected constructor(page: Page, pageObjName: string) {
    this._page = page;
    this.pageName = pageObjName;
  }

  get page(): Page {
    return this._page;
  }

  protected async getLocatorText(locator: Locator): Promise<string> {
    return (
      (await locator?.textContent())?.trim() ||
      (await locator?.innerText())?.trim() ||
      (await locator?.inputValue())?.trim() ||
      ''
    );
  }

  public async scrollToTheTop(): Promise<void> {
    await this.page.mouse.wheel(0, -100000000);
  }
}
