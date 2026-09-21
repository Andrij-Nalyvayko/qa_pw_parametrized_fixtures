import { faker } from '@faker-js/faker';
import { test } from '@playwright/test';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../../src/ui/pages/article/EditArticlePage';


const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Add tags on edit to an article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Add a tag on edit to an article with ${testNameEnding}`, async ({
      page,
      logger,
      viewArticlePage,
      editArticlePage,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);
      const newTag = faker.lorem.word();

      await createArticle(page, article);

      await viewArticlePage.clickEditArticleLink();
      await editArticlePage.fillTagsField([newTag]);
      await editArticlePage.clickUpdateArticleButton();

      // Re-open the article to bypass the app's stale post-edit tag state.
      await viewArticlePage.open(article.url);

      await viewArticlePage.assertArticleTagsAreVisible([
        ...article.tags,
        newTag,
      ]);
    });
  });
});
