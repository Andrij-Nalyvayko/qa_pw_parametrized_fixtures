import { test } from '../_fixtures/fixtures';
import {
  EMPTY_USERNAME_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
} from '../../src/ui/constants/authErrorMessages';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';


const user = generateNewUserData();
const testParameters = [
  {
    username: '',
    email: user.email, 
    password: user.password, 
    message: EMPTY_USERNAME_MESSAGE, 
    title: 'empty username'
  }, 
  {
    username: user.username, 
    password: user.password,
    email: '', 
    message: INVALID_EMAIL_MESSAGE, 
    title: 'empty email'
  }, 
  {
    username: user.username,
    password: '',
    email: user.email,
    message: EMPTY_PASSWORD_MESSAGE, 
    title: 'empty password'
  }
]

test.describe('Sign up negative tests', () => {
testParameters.forEach(({email, password, message, title, username}) => {
  test(`Sign up with ${title}`, async ({ signUpPage }) => {
    await signUpPage.open();
    await signUpPage.fillEmailField(email);
    await signUpPage.fillPasswordField(password);
    await signUpPage.clickSignUpButton();
    await signUpPage.assertErrorMessageContainsText(message);
  })
})
})
