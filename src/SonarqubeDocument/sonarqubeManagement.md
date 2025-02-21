SonarQube and Jest Configuration Guide

Introduction

This document provides step-by-step instructions to set up SonarQube for code quality analysis and Jest for unit testing in a React project using JSX files.

Prerequisites

Before proceeding, ensure you have the following installed:
Node.js (Latest LTS version recommended)
npm or yarn
Java 11 or later (for SonarQube server)
SonarQube Community Edition and sonarScanner file

Setting up SonarQube

Download and Install SonarQube
Windows / macOS / Linux
Download the latest SonarQube version from SonarQube Downloads.
Extract the files.

Navigate to the extracted directory and start SonarQube:

And before sonarQube starting always start the StartSonar which is find out in

For Windows:
sonarqube\bin\windows-x86-64\StartSonar.bat
For macOS/Linux:
sonarqube\bin/linux-x86-64/sonar.sh start

Open http://localhost:9000 in your browser.

Default login credentials:

Username: admin
Password: admin

Configure SonarQube in a React Project

For Creating a new project:-

1. Click on "Create new local project".
2. Enter the Project Name.
3. Click on "Use the global setting" and then "Create Project".
4. Set the project to Locally.
5. Choose "No expiration", then Generate the token.
6. Save the displayed token, as it serves as the Project Key.
7. Click Continue, then select the Programming Language and Operating System.
8. A SonarQube command will be generated—save it for future reference.
9. To run the command, prepend the SonarQube installation path from your system and execute it in the terminal.
10. The process will take approximately 2–3 minutes.
11. After execution, navigate to http://localhost:9000 to check the status of the 7 Quality Gates for your code.
12. Focus on resolving issues related to Reliability and Maintainability to improve code quality.

Create a sonar-project.properties file in the root of your project:

sonar.exclusions=**/*.test.js, **/*.spec.js, node_modules/**
sonar.sourceEncoding=UTF-8

Add SonarQube script to package.json:

"scripts": {
  "sonar": "sonar-scanner"
}

Setting Up Jest for React Testing

Install Jest & Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest

Configure Jest in package.json or jest.config.js

Option 1: Inside package.json

"jest": {
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  "moduleFileExtensions": ["js", "jsx", "ts", "tsx", "json"],
  "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"]
}

Option 2: Using a jest.config.js file

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

Create a jest.setup.js File

import '@testing-library/jest-dom';

Run tests using:

npm run test

Running SonarQube with Jest Coverage
Modify sonar-project.properties to include:

sonar.javascript.lcov.reportPaths=coverage/lcov.info

Run SonarQube analysis again with modify the command with jest:

For example:

C:\sonar-scanner-6.2.0.4584-windows-x64\bin\sonar-scanner.bat -D"sonar.projectKey=Sample" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_e9f43e46549153609a8e9c6e183e554f7f647734" -D"sonar.javascript.lcov.reportPaths=./coverage/lcov.info"


Video detail :- https://drive.google.com/file/d/18Il-Y8b1pCWoejJBplLqKoxLV8S-e1Cc/view?usp=sharing