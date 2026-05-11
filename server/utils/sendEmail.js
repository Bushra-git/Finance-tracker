import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Finance Tracker',
      html: `
        <h2>OTP Verification</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: #10b981; font-size: 32px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>Do not share this code with anyone.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send OTP');
  }
};
