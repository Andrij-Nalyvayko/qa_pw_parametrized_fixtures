import { expect, testStep } from '../../../common/pwHelpers/pw';

export class EditArticlePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.articleTitleHeader = page.getByRole('heading');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  tagPill(tagName) {
    return this.page.locator('.tag-pill').filter({ hasText: tagName });
  }

  removeTagIcon(tagName) {
    return this.tagPill(tagName).locator('.ion-close-round');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open(slug) {
    await this.step(`Open 'Edit article' page`, async () => {
      await this.page.goto(`/editor/${slug}`);
    });
  }

  async fillTagsField(tags) {
    await this.step(`Fill the 'Tags' field`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.tagField.fill(tags[i]);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async removeTag(tagName) {
    await this.step(`Remove the '${tagName}' tag`, async () => {
      await this.removeTagIcon(tagName).click();
    });
  }

  async removeAllTags(tags) {
    await this.step(`Remove all tags`, async () => {
      for (let i = 0; i < tags.length; i++) {
        await this.removeTag(tags[i]);
      }
    });
  }

  async clickUpdateArticleButton() {
    await this.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertArticleTitle(title) {
    await this.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await this.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
