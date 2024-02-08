import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  debug: true,
  logger: true,
  tls: {
    rejectUnAuthorized: false,
  },
  ignoreTLS: true,
});
