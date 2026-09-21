import { test } from '../../_fixtures/fixtures';
import { ViewArticlePage } from '../../../src/ui/pages/article/ViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { HomePage } from '../../../src/ui/pages/HomePage';

test.describe('View an article created by another user', () => {
  test.use({ contextsNumber: 2, usersNumber: 2 });

  test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
    await signUpUser(pages[0], users[0], 1);
    await signUpUser(pages[1], users[1], 2);
    await createArticle(pages[0], articleWithoutTags, 1);
  });

  test('View an article created by another user', async ({
    articleWithoutTags,
    pages,
    users,
  }) => {
    const viewArticlePage = new ViewArticlePage(pages[1], 2);

    await viewArticlePage.open(articleWithoutTags.url);

    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
    await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.text);
    await viewArticlePage.assertArticleAuthorNameIsVisible(users[0].username);
  });
});




test.describe('User can see in feed articles from two different users', () => {
  test.use({ contextsNumber: 3, usersNumber: 3 });

  test.beforeEach(
    async ({ pages, users, articleWithoutTags, articleWithOneTag }) => {
      await signUpUser(pages[0], users[0], 1);
      await signUpUser(pages[1], users[1], 2);
      await signUpUser(pages[2], users[2], 3);
      await createArticle(pages[0], articleWithoutTags, 1);
      await createArticle(pages[1], articleWithOneTag, 2);
    },
  );

  test('User can see in feed articles from two different users', async ({
    articleWithoutTags,
    articleWithOneTag,
    pages,
    users,
  }) => {
    const homePageUser3 = new HomePage(pages[2], 3);

    await homePageUser3.clickGlobalFeedTab();
    await homePageUser3.assertArticleIsVisibleInFeed(
      articleWithoutTags.title,
      users[0].username,
    );
    await homePageUser3.assertArticleIsVisibleInFeed(
      articleWithOneTag.title,
      users[1].username,
    );
  });
});
