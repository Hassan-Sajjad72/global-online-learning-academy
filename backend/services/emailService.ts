import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {


    const info = await transporter.sendMail({
      from: `"Global Online Learning Academy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("=================================");
    console.log("Email Sent Successfully");
    console.log(info.messageId);
    console.log("=================================");

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }

};