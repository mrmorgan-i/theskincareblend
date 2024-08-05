'use server'

import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrypt from 'bcrypt'
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./email"

const action = createSafeActionClient()

export const emailRegister = action(
    RegisterSchema, 
    async ({email, name, password}) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    })

    if(existingUser){
        if(!existingUser.emailVerified){
          const verificationToken = await generateEmailVerificationToken(email);
          await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token,)

          return {success: 'Email verification sent'}
        }
        return {error: "User already exists"}
    }

    //Logic for unregistered user
    await db.insert(users).values({
        email,
        name,
        password: hashedPassword,
    })

    const verificationToken = await generateEmailVerificationToken(email)

    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token,)

    return { success: 'Confirmation email sent' }
})