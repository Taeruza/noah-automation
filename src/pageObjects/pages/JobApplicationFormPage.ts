import { BasePage } from './BasePage';
import { ApplicationFormLabels } from '../../models/enums';
import { FormInputWithLabel } from '../components/FormInputWithLabel';
import { Locator, Page } from '@playwright/test';
import path from 'path';

export class JobApplicationFormPage extends BasePage {
  private readonly _inputCV: Locator;
  private readonly _loaderIndicator: Locator;
  readonly fullName: FormInputWithLabel;
  readonly email: FormInputWithLabel;
  readonly phone: FormInputWithLabel;
  readonly currentCompany: FormInputWithLabel;

  constructor(page: Page) {
    super(page, 'JobApplicationFormPage');
    this._inputCV = this.page.locator('input[data-qa="input-resume"]');
    this._loaderIndicator = this.page.locator('.loading-indicator.completed');
    this.fullName = new FormInputWithLabel(this.page!, ApplicationFormLabels.fullName);
    this.email = new FormInputWithLabel(this.page!, ApplicationFormLabels.email);
    this.phone = new FormInputWithLabel(this.page!, ApplicationFormLabels.phone);
    this.currentCompany = new FormInputWithLabel(this.page!, ApplicationFormLabels.currentCompany);
  }

  inputCV() {
    return {
      element: this._inputCV,
      uploadFile: async (fileName: string): Promise<void> => {
        await this._inputCV.setInputFiles(
          path.resolve(__dirname, `../../../resources/${fileName}`),
        );
        await this._loaderIndicator.waitFor({ state: 'visible', timeout: 60000 });
      },
      getValue: async (): Promise<string> => {
        return await this._inputCV.inputValue();
      },
    };
  }
}
