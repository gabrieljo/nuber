import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAIL_API || "",
  domain: process.env.MAIL_DOMAIN || ""
});

const sendEmail = (to: string, subject: string, html: string) => {
  const emailData = {
    from: "gabrieljo1302@gmail.com",
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, Please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://google.com/${key}">Click</a>`;
  return sendEmail("gabrieljo1302@gmail.com", emailSubject, emailBody);
};
