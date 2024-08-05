"use server"

import { LoginSchema } from "@/types/login-schema"
import { createSafeActionClient } from "next-safe-action"
import { db } from ".."
import { eq } from "drizzle-orm"
import {
  generateEmailVerificationToken,
  generateTwoFactorToken,
  getTwoFactorTokenByEmail} from "./tokens"
import { signIn } from "../auth"
import { AuthError } from "next-auth"
import { twoFactorTokens, users } from "../schema"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "./email"


const action = createSafeActionClient()

export const emailSignIn = action(
    LoginSchema,
    async ({email, password, code}) => {
      try {
        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, email)
      })
  
      if(existingUser?.email !== email){
          return {error: "Email not found"}
      }
  
      //If the user is not verified
      if (existingUser && !existingUser.emailVerified) {
          const verificationToken = await generateEmailVerificationToken(existingUser.email);
          await sendVerificationEmail(
            verificationToken[0].email,
            verificationToken[0].token
          );
          return { success: "Confirmation Email Sent!" };
        }

        if(existingUser?.twoFactorEnabled && existingUser.email){
          if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
              existingUser.email
            )
            if (!twoFactorToken) {
              return { error: "Invalid Token" }
            }
            if (twoFactorToken.token !== code) {
              return { error: "Invalid Token" }
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date()
            if (hasExpired) {
              return { error: "Token has expired" }
            }
            await db
              .delete(twoFactorTokens)
              .where(eq(twoFactorTokens.id, twoFactorToken.id))
          } else {
            const token = await generateTwoFactorToken(existingUser.email)
  
            if (!token) {
              return { error: "Token not generated!" }
            }
  
            await sendTwoFactorTokenEmail(token[0].email, token[0].token)
            return { twoFactor: "Two Factor Token Sent!" }
          }
        }

        await signIn("credentials", {
          email,
          password,
          redirectTo: "/", // Redirect to the home page after sign in
        })
  
      return {success: "Sign in successful"}
      } catch (error) {
        console.log(error)
        if(error instanceof AuthError){
          switch(error.type){
            case 'CredentialsSignin':
              return {error: 'Incorrect email or password'}
            case 'AccessDenied':
              return {error: error.message}
            case 'OAuthSignInError':
              return {error: error.message}
            case 'CallbackRouteError':
              return {error: "Invalid email or password combination"}
            default:
              return {error: error.message}
          }
        }
        throw error
      }
    
})