# NodeJS Sending Receiving Emails

## Introduction
![Demonstration](https://user-images.githubusercontent.com/167421/133517417-3adb8e57-782e-46d4-b922-9ac942d51114.gif)

This repository demonstrates working with emails in NodeJS;
- Using `nodemailer` to create a test email account (via Ethereal) and to send an email.
- Using `imap-simple` to connect to the test email account via the Ethereal IMAP server and search for unread messages.
- Using `mailparser` to take an entire email (headers and body) and parse it.

## Instructions
These instructions assume you are running a version of NodeJS equal to or greater than the version mentioned in the `.nvmrc` file, and have Yarn installed:

1) Install dependencies.

```shell
yarn install
```

2) Run the `start` command and observe the output.

```shell
yarn start
```

Note: The credentials shown in the terminal output will be valid for a short period of time. You can use them to log into [Ethereal](https://ethereal.email/) and see the email in their web based email client.

## Further Information
- [Ethereal](https://ethereal.email/)
- [Nodemailer](https://nodemailer.com/about/)
- [MailParser](https://nodemailer.com/extras/mailparser/)
- [Quickstart with Nodemailer](https://dev.to/weaponxii/quickstart-with-nodemailer-3427)