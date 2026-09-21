import { expect, testStep } from '../../common/pwHelpers/pw';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  articlePreview(title) {
    return this.page
      .locator('.article-preview')
      .filter({ has: this.page.getByRole('heading', { name: title }) });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async clickNewArticleLink() {
    await this.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await this.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickYourFeedTab() {
    await this.step(`Click the 'Your Feed' tab`, async () => {
      await this.yourFeedTab.click();
    });
  }

  async clickGlobalFeedTab() {
    await this.step(`Click the 'Global Feed' tab`, async () => {
      await this.globalFeedTab.click();
    });
  }

  async assertArticleIsVisibleInFeed(title, authorUsername) {
    await this.step(
      `Assert the article "${title}" by "${authorUsername}" is visible in the feed`,
      async () => {
        const preview = this.articlePreview(title);

        await expect(preview).toBeVisible();
        await expect(
          preview.getByRole('link', { name: authorUsername }),
        ).toBeVisible();
      },
    );
  }
}
