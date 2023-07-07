import { BasePage } from './BasePage';
import { JobDescriptionPage } from './JobDescriptionPage';
import { CareersRoleItem } from '../../models/enums';
import { Navbar } from '../components/Navbar';
import { Locator, Page } from '@playwright/test';

export class CareersPage extends BasePage {
  readonly navbar: Navbar;
  private readonly _roleItem: Locator;

  constructor(page: Page) {
    super(page, 'CareersPage');
    this.navbar = new Navbar(this.page);
    this.url = `/careers`;
    this._roleItem = this.page.locator(
      '.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation0.MuiCard-root',
    );
  }

  roleItem(item: CareersRoleItem) {
    return {
      element: this._roleItem.filter({ hasText: item }),
      clickAndGetJobDecription: async (): Promise<JobDescriptionPage> => {
        const roleItem = this._roleItem.filter({ hasText: item });
        if (!(await roleItem.isVisible())) throw Error(`Can not find role item: "${item}"`);

        const [newPage] = await Promise.all([
          this.page.context().waitForEvent('page', { timeout: 30000 }),
          await roleItem.locator('a').filter({ hasText: item }).click(),
        ]);

        const jobDescriptionPage = new JobDescriptionPage(newPage);
        await jobDescriptionPage.waitLoaded();
        return jobDescriptionPage;
      },
    };
  }
}
