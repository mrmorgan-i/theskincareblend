"use server"

import getBaseURL from "@/lib/base-url"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseURL()

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "🔒 TheSkincareBlend - Your Two-Factor (2FA) Code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.imgur.com/MgPGIgt.png" alt="TheSkincareBlend Logo" style="width: 150px; height: auto;">
        </div>
        <h2 style="color: #555;">Your Confirmation Code</h2>
        <p>Dear Customer,</p>
        <p>Your two-factor authentication (2FA) code is:</p>
        <h1 style="color: #111;">${token}</h1>
        <p>Please use this code to complete your login process. If you did not request this, please contact our support team immediately.</p>
        <p>Thank you,<br>TheSkincareBlend Team</p>
      </div>
    `,
  })
  if (error) return console.log(error)
  if (data) return data
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "✅ TheSkincareBlend - Confirm Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.imgur.com/MgPGIgt.png" alt="TheSkincareBlend Logo" style="width: 150px; height: auto;">
        </div>
        <h2 style="color: #555;">Email Confirmation</h2>
        <p>Dear Customer,</p>
        <p>Thank you for registering with TheSkincareBlend! Please confirm your email address by clicking the link below:</p>
        <p><a href="${confirmLink}" style="color: #1a73e8;">Confirm Your Email</a></p>
        <p>If you did not create an account, no further action is required.</p>
        <p>Thank you,<br>TheSkincareBlend Team</p>
      </div>
    `,
  })
  if (error) return console.log(error)
  if (data) return data
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "🔑 TheSkincareBlend - Password Reset Request",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://i.imgur.com/MgPGIgt.png" alt="TheSkincareBlend Logo" style="width: 150px; height: auto;">
        </div>
        <h2 style="color: #555;">Password Reset</h2>
        <p>Dear Customer,</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <p><a href="${resetLink}" style="color: #1a73e8;">Reset Your Password</a></p>
        <p>If you did not request a password reset, please ignore this email or contact our support team if you have questions.</p>
        <p>Thank you,<br>TheSkincareBlend Team</p>
      </div>
    `,
  })
  if (error) return console.log(error)
  if (data) return data
}
