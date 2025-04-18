'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthCard } from "./auth-card"
import { RegisterSchema } from "@/types/register-schema"
import * as z from 'zod'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { emailSignIn } from "@/server/actions/email-signin"
import {useAction} from "next-safe-action/hooks"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { emailRegister } from "@/server/actions/email-register"
import { FormSuccess } from "./form-success"
import { FormError } from "./form-error"


export const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

const [error, setError] = useState("")
const [success, setSuccess] = useState("")
const { execute, status } = useAction(emailRegister, {
    onSuccess(data){
        if(data.error) setError(data.error)
        if(data.success) setSuccess(data.success)
    }
})

const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("before server action runs")
   execute(values)
}

    return (
        <AuthCard 
        cardTitle="Create an Account" 
        backButtonHref="/auth/login" 
        backButtonLabel="Login"
        backButtonPrefix="Already have an account?"
        showSocials>

            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                {...field} 
                                placeholder="Customer" 
                                type="text" 
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                {...field} 
                                placeholder="example@gmail.com" 
                                type="email" 
                                autoComplete="email"
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                {...field} 
                                placeholder="********" 
                                type="password"
                                autoComplete="current-password"
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    {/*<Button size={"sm"} variant={"link"} asChild>
                        <Link href="/auth/reset">Forgot Password?</Link>
                    </Button>*/}
                    </div>
                    <Button 
                    type="submit" 
                    className={cn(
                        'w-full mt-4', 
                        status === 'executing' ? 'animate-pulse' : ''
                        )}>
                        {"Register"}
                    </Button>
                    </form>
                </Form>
            </div>
        
        </AuthCard>
    )
}