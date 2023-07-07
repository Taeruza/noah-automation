import { BasePage } from './BasePage';
import { JobApplicationFormPage } from './JobApplicationFormPage';
import { Locator, Page } from '@playwright/test';

export class JobDescriptionPage extends BasePage {
  private readonly _applyForJobBtn: Locator;

  constructor(page: Page) {
    super(page, 'JobDescriptionPage');
    this._applyForJobBtn = this.page.locator('.postings-btn.template-btn-submit.cerulean');
  }

  applyForJob() {
    return {
      element: this._applyForJobBtn.first(),
      clickAndGetApplicationForm: async (): Promise<JobApplicationFormPage> => {
        const applyBtn = this._applyForJobBtn.first();
        if (!(await applyBtn.isVisible())) throw Error(`Can not find "APPLY FOR THIS JOB" button.`);
        await applyBtn.first().click();

        const jobApplicationFormPage = new JobApplicationFormPage(this.page);
        await jobApplicationFormPage.waitLoaded();
        return jobApplicationFormPage;
      },
    };
  }
}
