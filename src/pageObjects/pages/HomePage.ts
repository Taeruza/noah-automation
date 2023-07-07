import { BasePage } from './BasePage';
import { Navbar } from '../components/Navbar';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  readonly navbar: Navbar;

  constructor(page: Page) {
    super(page, 'HomePage');
    this.navbar = new Navbar(this.page);
  }
}
