import { ApplicationFormLabels } from '../../models/enums';
import { Base } from '../base';
import { Locator, Page } from '@playwright/test';

export class FormInputWithLabel extends Base {
  readonly container: Locator;
  protected readonly _label: Locator;
  protected readonly _input: Locator;

  constructor(page: Page, labelText: ApplicationFormLabels) {
    super(page, 'FormInputWithLabel');
    this.container = this.page.locator('li.application-question').filter({ hasText: labelText });
    this._label = this.container.locator('.application-label');
    this._input = this.container.locator('.application-field input');
  }

  formInput() {
    return {
      label: {
        element: this._label,
      },
      input: {
        element: this._input,
        fill: async (text: string): Promise<void> => {
          await this._input.fill(text);
        },
      },
    };
  }
}
