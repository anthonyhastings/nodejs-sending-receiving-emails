import imaps from 'imap-simple';
import Jabber from 'jabber';
import nodemailer from 'nodemailer';
import mailparser from 'mailparser';

// Retrieves the first unread email from the account given.
const retrieveEmail = async (account) => {
  // Connect via IMAP to the account.
  const connection = await imaps.connect({
    imap: {
      user: account.user,
      password: account.pass,
      host: account.imap.host,
      port: account.imap.port,
      tls: account.imap.secure
    }
  });

  // Select and open the INBOX mailbox.
  await connection.openBox('INBOX');

  // Search for the first unread email, parse it and return it. Can be attempted a finite number of times.
  let email = null;
  let remainingFetchAttempts = 5;
  while (remainingFetchAttempts > 0) {
    const [fetchedEmail] = await connection.search(['UNSEEN'], { bodies: [''], markSeen: false });

    if (fetchedEmail) {
      const { subject, textAsHtml } = await mailparser.simpleParser(fetchedEmail.parts[0].body);
      email = { subject, textAsHtml };
      break;
    }

    remainingFetchAttempts--;
    console.log(`Fetching email failed - (${remainingFetchAttempts} attempts remaining)`);
    await sleep(2000);
  }

  // Close the socket connection to the IMAP server.
  connection.end();

  return email;
}

// Simple function to simluate a pause of a specified duration.
const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

// Constructs a dummy paragraph of words for the body of the email.
const jabber = new Jabber();
const paragraph = jabber.createParagraph(30);

// Creates an SMTP email test account via ethereal email.
const testAccount = await nodemailer.createTestAccount();
console.log('Email Test Account:', testAccount, "\n");

// Sets up a transporter object for sending and receiving mail.
const transporter = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// Send an HTML email (with text fallback) via transport object.
const receipt = await transporter.sendMail({
  from: '"Fred Foo 👻" <foo@example.com>',
  to: testAccount.user,
  subject: "Test Email",
  text: paragraph,
  html: `<p>${paragraph}</p>`
});
console.log('Send Receipt:', receipt, "\n");
console.log("Preview URL:", nodemailer.getTestMessageUrl(receipt), "\n");

// Fetch the email's subject and html via IMAP.
const email = await retrieveEmail(testAccount);

// Exit if the email couldn't be retrieved.
if (!email) {
  console.error('Error: Could not retrieve email!');
  process.exit(1);
}

console.log('Email Retrieved:', email);
