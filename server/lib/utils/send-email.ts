"use server";
import { transporter } from "@/server/nodemailer";

import { render } from "@react-email/render";
import { ReactElement } from "react";

export const sendEmail = async (
  receiver: string,
  subject: string,
  template: ReactElement
) => {
  const options = {
    from: "IT-Organisation@drk-rostock.de",
    to: receiver,
    subject: subject,
    html: render(template),
  };

  await transporter
    .sendMail(options)
    .then()
    .catch((error: string) => {
      throw new Error(error);
    });
};
