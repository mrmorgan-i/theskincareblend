'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Session } from "next-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SettingsSchema } from "@/types/settings-schema"
import { ExecuteResultSync } from "drizzle-orm/sqlite-core"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { FormSuccess } from "@/components/auth/form-success"
import { FormError } from "@/components/auth/form-error"
import { useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { settings } from "@/server/actions/settings"
import { InfoIcon } from "lucide-react"
import { UploadButton } from "@/app/api/uploadthing/upload"


type SettingsForm = {
    session: Session
}  

export default function SettingsCard(session: SettingsForm) {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [avatarUploading, setAvatarUploading] = useState(false)

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            password: undefined,
            newPassword: undefined,
            name: session.session.user?.name || undefined,
            email: session.session.user?.email || undefined,
            image: session.session.user?.image || undefined,
            isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || false,
        },
    })

    const {execute, status} = useAction(settings, {
        onSuccess: (data) => {
            if (data?.success) setSuccess(data.success)
            if (data?.error) setError(data.error)
          },
          onError: (error) => {
            setError("Something went wrong")
          },
    })

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        execute(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Settings</CardTitle>
                <CardDescription>Update your account settings</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormDescription className="text-xs">
                This is your public display name.
              </FormDescription>
              <FormControl>
                <Input placeholder="Customer" 
                    disabled={status === 'executing'} 
                    {...field} 
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <div className="flex items-center gap-4">
                {!form.getValues('image') && (
                    <div className="font-bold">
                        {session.session.user?.name?.charAt(0).toUpperCase()}
                    </div>
                )}
                {form.getValues('image') && (
                    <Image className="rounded-full"
                            src={form.getValues('image')!} 
                            alt="User Image"
                            width={42}
                            height={42}
                            />
                )}
                <UploadButton 
                  className="scale-75 ut-button:ring-primary  ut-label:bg-red-50  ut-button:bg-primary/75  hover:ut-button:bg-primary/100 ut:button:transition-all ut-button:duration-500  ut-label:hidden ut-allowed-content:hidden"
                  endpoint="avatarUploader" 
                  onUploadBegin={() => {
                    setAvatarUploading(true)
                  }}
                  onUploadError={(error) => {
                    form.setError('image', {
                      type: 'validate',
                      message: error.message
                    })
                    setAvatarUploading(false)
                    return
                  }}
                  onClientUploadComplete={(res) => {
                    form.setValue('image', res[0].url!)
                    setAvatarUploading(false)
                    return
                  }}
                  content={{button({ready}) {
                  if(ready) return <div>Change Avatar</div>
                  return <div> Uploading... </div>
                },
                }}
                />
              </div>
              <FormControl>
                <Input placeholder="User Image" 
                       type="hidden"
                    disabled={status === 'executing'} 
                    {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              {session.session.user?.isOAuth && (
                    <FormDescription className="text-xs flex">
                        <InfoIcon size={14} className="m-2" />Please note that as an OAuth user, you cannot manage your password or enable Two-Factor Authentication (2FA) through this interface. These features are not supported for OAuth authenticated accounts.
                    </FormDescription>
                )}
              <FormControl>
                <Input placeholder="********" 
                    type="password"
                    disabled={
                        status === 'executing' || 
                        session.session.user.isOAuth === true
                    } 
                    {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormDescription className="text-xs">
                Set a new password.
              </FormDescription>
              <FormControl>
                <Input placeholder="********" 
                    type="password"
                    disabled={
                        status === 'executing' || 
                        session.session.user.isOAuth === true
                    } 
                    {...field} 
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Two Factor Authentication</FormLabel>
              <FormDescription className="text-xs">
                Secure your account with two factor authentication.
              </FormDescription>
              <FormControl>
                <Switch 
                    disabled={
                        status === 'executing' || 
                        session.session.user.isOAuth === true
                    }
                    checked={field.value}
                    onCheckedChange={field.onChange}
                />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSuccess message={success} />
        <FormError message={error} />
        <Button type="submit" disabled={status === 'executing' || avatarUploading}>Save Changes</Button>
      </form>
    </Form>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <p>The Skincare Blend.. Cosmetics | Perfumes | and more...</p>
            </CardFooter>
        </Card>

    )
}