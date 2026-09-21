import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';

const testParameters = [
  { tagsNumber: 1, testNameEnding: 'one tag' },
  { tagsNumber: 2, testNameEnding: 'two tags' },
  { tagsNumber: 5, testNameEnding: 'five tags' },
];

testParameters.forEach(({ tagsNumber, testNameEnding }) => {
  test.describe('Remove all tags from an article', () => {
    test.beforeEach(async ({ page, user }) => {
      await signUpUser(page, user);
    });

    test(`Remove all tags from an article with ${testNameEnding}`, async ({
      page,
      logger,
      viewArticlePage,
      editArticlePage,
    }) => {
      const article = generateNewArticleData(logger, tagsNumber);

      await createArticle(page, article);

      await viewArticlePage.clickEditArticleLink();
      await editArticlePage.removeAllTags(article.tags);
      await editArticlePage.clickUpdateArticleButton();

      // Re-open the article to bypass the app's stale post-edit tag state.
      await viewArticlePage.open(article.url);

      await viewArticlePage.assertArticleHasNoTags();
    });
  });
});
