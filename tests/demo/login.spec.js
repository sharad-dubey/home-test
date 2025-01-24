import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login'

test('Successful Login with credential', async ({ page }) => {

  const Login = new LoginPage(page)

  const welcome_message = page.getByRole('heading', { name: 'Welcome!' });
  const uname = 'johndoe19';
  const pname = 'supersecret'

  await Login.gotoLoginPage()
  await Login.login(uname, pname)

  await expect(welcome_message).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(uname);


})

test('Wrong username OR password', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login('wrongjohndoe19', 'notsupersecret')

  await expect(page.locator('#message')).toContainText('Wrong credentials');


})

test('Empty username and password', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login('', '')

  await expect(page.locator('#message')).toContainText('Fields can not be empty');

})

;