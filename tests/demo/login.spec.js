import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { LoginPageEvent } from '../../pageEvents/loginPageEvent';

const testdata = require('../../data/logintestdata.json');
const testurl = require('../../data/environmentalConfig.json');

test.beforeEach(async ({ page }) => {
    await page.goto(`${testurl.baseurl}/login`);
});

test('Successful Login with credential', async ({ page }) => {
    const login = new LoginPage(page);
    const loginEvent = new LoginPageEvent(page);

    await loginEvent.login(testdata.username, testdata.password);
    await expect(login.welcome_message_text).toBeVisible();
    await expect(login.welcome_message_username).toContainText(testdata.username);
});

test('Wrong username OR password', async ({ page }) => {
    const login = new LoginPage(page);
    const loginEvent = new LoginPageEvent(page);

    await loginEvent.login(testdata.wrongusername, testdata.wrongpassword);
    await expect(page.locator('#message')).toContainText(testdata.wrongcredentialmessage);
});

test('Empty username and password', async ({ page }) => {
    const login = new LoginPage(page);
    const loginEvent = new LoginPageEvent(page);

    await loginEvent.login(testdata.emptyusername, testdata.emptypassword);
    await expect(page.locator('h2#message')).toContainText(testdata.emptyfieldmessage);
});
