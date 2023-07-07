import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class JobApplicationFormPage extends BasePage {
  constructor(page: Page) {
    super(page, 'JobApplicationFormPage');
  }
}
