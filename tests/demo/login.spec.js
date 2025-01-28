import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login'
const testdata=JSON.parse(JSON.stringify(require("../../data/logintestdata.json")))

test('Successful Login with credential', async ({ page }) => {

  const Login = new LoginPage(page)

  const welcome_message = page.getByRole('heading', { name: 'Welcome!' });

  await Login.gotoLoginPage()
  await Login.login(testdata.username, testdata.password) // With correct credentials

  await expect(welcome_message).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(testdata.username);


})

test('Wrong username OR password', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login(testdata.wrongusername, testdata.wrongpassword) // With incorrect credentials

  await expect(page.locator('#message')).toContainText('Wrong credentials');


})

test('Empty username and password', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.gotoLoginPage()
  await Login.login(testdata.emptyusername, testdata.emptypassword) // With empty credentials

  await expect(page.locator('#message')).toContainText('Fields can not be empty');

})

;