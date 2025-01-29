import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login'
const testdata=JSON.parse(JSON.stringify(require("../../data/logintestdata.json")))
const testurl=JSON.parse(JSON.stringify(require("../../data/urldata.json")))

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/login`);
  });

test('Successful Login with credential', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.login(testdata.username, testdata.password) // With correct credentials
  await expect(Login.welcome_message_text).toBeVisible();
  await expect(Login.welcome_message_username).toContainText(testdata.username);


})

test('Wrong username OR password', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.login(testdata.wrongusername, testdata.wrongpassword) // With incorrect credentials

  await expect(page.locator('#message')).toContainText('Wrong credentials');


})

test('Empty username and password', async ({ page }) => {

  const Login = new LoginPage(page)

  await Login.login(testdata.emptyusername, testdata.emptypassword) // With empty credentials

  await expect(page.locator('#message')).toContainText('Fields can not be empty');

})

;