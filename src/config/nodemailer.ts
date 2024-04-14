import nodemailer from 'nodemailer';

const { EMAIL } = process.env;
const { PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

export default transporter;
