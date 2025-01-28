# Playwright UI Automation Project

This project is a UI automation framework built with [Playwright](https://playwright.dev/) and JavaScript. It supports cross-browser testing, configurable environments, JSON-based test data management, and generates detailed reports using Allure.

---

## Features

- **Cross-Browser Testing**: Supports Chromium, Firefox, and WebKit browsers.
- **Built-in Reporting**: Generates beautiful and interactive test reports using Allure.
- **Easy-to-Maintain Test Structure**: Organized with reusable page objects, test utilities, and modular components.
- **Configurable Test Environments**: Easily manage settings in `playwright.config.js`.
- **JSON-Based Test Data**: Store and manage test data in structured JSON files.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Steps to Install](#steps-to-install)
   - [Install Node.js](#install-nodejs)
   - [Install Playwright](#install-playwright)
   - [Install Allure Reporting](#install-allure-reporting)
3. [Project Structure](#project-structure)
4. [Running Tests](#running-tests)
5. [Generating Allure Reports](#generating-allure-reports)
6. [Configuration](#configuration)
7. [Test Data Management](#test-data-management)
8. [Writing Tests](#writing-tests)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version >= 16)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Allure Commandline](https://docs.qameta.io/allure/#_get_started) (for report generation)

---

## Steps to Install

### Install Node.js

1. Download the latest stable version of Node.js from [Node.js Official Website](https://nodejs.org/).
2. Run the installer and follow the setup instructions.
3. Verify the installation:
   ```bash
   node -v
   npm -v
## Clone the repository:
 
   git clone https://github.com/sharad-dubey/home-test.git
   

### Install Playwright
npm init playwright@latest
npx playwright install

### Install Allure Reporting
1. Install the Allure Commandline tool globally:
npm install -g allure-commandline --save-dev

2. Verify the installation:
allure --version
If the allure command is not recognized, ensure the bin folder is added to your system's PATH.

### Project Structure

├── allure-results/        # Allure test results (generated)
└── allure-report/         # Allure reports (generated)
├── data/                  # JSON test data files
│   ├── users.json         # Example test data
├── pages/                 # Page Object Model files
│   ├── login.js       # Example page object
├── tests/demo/                 # Test scripts
│   ├── login.spec.js    # Example test file
├── playwright.config.js   # Playwright configuration
├── package.json           # Project dependencies
├── README.md              # Project documentation


## Running Tests
1.Run all tests:npx playwright test

2.Run tests for a specific browser:npx playwright test --project=chromium

3.Run tests in headed mode: npx playwright test --headed

4,Run a specific test:npx playwright test tests/example.spec.js

## Generating Allure Reports
Run the tests with the Allure reporter: npx playwright test --reporter=allure-playwright

Generate the Allure report: allure generate ./allure-results -o ./allure-report --clean

Open the Allure report: allure open ./allure-report

## Configuration
All configurations are defined in playwright.config.js

## Test Data Management
All test data is maintained in JSON files within the data/ directory. 
Example: logintestdata.json
{
    "loginurl":"http://localhost:3100/login",
    "username":"johndoe19",
    "password":"supersecret",
    "wrongusername":"eweweewe",
    "wrongpassword":"wewewee",
    "emptyusername":"",
    "emptypassword":""
}

## Writing Tests
Write your test files in the tests/ directory using Playwright’s test functions.

## Troubleshooting
Allure Command Not Found: Ensure Allure CLI is installed and added to your system's PATH.
Browser Installation Issues: Re-run npx playwright install to reinstall browsers.














