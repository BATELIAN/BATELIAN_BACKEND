import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { SMTP_HOST, SMTP_MAIL, SMTP_SERVICE, SMTP_PORT, SMTP_PASSWORD } from "../config/config";


interface MailOptions {
  email: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export const sendMail = async (options: MailOptions): Promise<void> => {
  try {
    // Check if required environment variables are provided
    // const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_SERVICE", "SMTP_MAIL", "SMTP_PASSWORD"];
    // if (!requiredEnvVars.every((envVar) => process.env[envVar])) {
    //   throw new Error("One or more required environment variables are missing.");
    // }
    // console.log(SMTP_HOST)
    // console.log(SMTP_PORT)
    // console.log(SMTP_SERVICE)
    // console.log(SMTP_MAIL)
    // console.log(SMTP_PASSWORD)

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      service: SMTP_SERVICE,
      auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const { email, subject, template, data } = options;
    const temPath = path.join( "./src/mails", template);
    console.log({ temPath });

    // Render the EJS template
    const html = await ejs.renderFile(temPath, data);

    const mailOption = {
      from: SMTP_MAIL as string,
      to: email,
      subject,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOption);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
