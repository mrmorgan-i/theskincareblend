'use client'

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { BarChart, HomeIcon, LogOutIcon, Package, PenSquare, Settings, TruckIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const UserButton = ({ user }: Session) => {
    const router = useRouter()

    const isAdmin = user.role === "admin";

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Avatar className="w-7 h-7 ring-2 ring-primary ring-offset-2 ring-offset-background transition-all duration-300 hover:ring-offset-4">
                    {user.image ? (
                        <AvatarImage src={user.image} alt={user.name || ''} />
                    ) : (
                        <AvatarFallback className="bg-primary/25">
                            <div className="font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        </AvatarFallback>
                    )}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-6" align="end">
                <div className="mb-4 p-4 flex flex-col items-center gap-1 rounded-lg bg-primary/10 transition-all duration-300 hover:bg-primary/20">
                    {user.image && (
                        <Image
                            src={user.image}
                            alt={user.name || ''}
                            width={36}
                            height={36}
                            className="rounded-full ring-2 ring-primary"
                        />
                    )}
                    <p className="font-bold text-sm text-center">{user.name}</p>
                    <span className="text-xs font-medium text-secondary-foreground">{user.email}</span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/')} className="group py-2 font-medium cursor-pointer">
                    <HomeIcon size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-primary group-hover:rotate-12" />Home
                </DropdownMenuItem>
                {isAdmin && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-center text-sm font-bold">Admin Tools</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push('/dashboard/analytics')} className="group py-2 font-medium cursor-pointer">
                            <BarChart size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-primary group-hover:scale-110" />Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/dashboard/add-product')} className="group py-2 font-medium cursor-pointer">
                            <PenSquare size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-primary group-hover:-rotate-12" />Create Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/dashboard/products')} className="group py-2 font-medium cursor-pointer">
                            <Package size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-primary group-hover:translate-y-[-2px]" />Products
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem onClick={() => router.push('/dashboard/orders')} className="group py-2 font-medium cursor-pointer">
                    <TruckIcon size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-primary group-hover:translate-x-1" />My Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="group py-2 font-medium cursor-pointer">
                    <Settings size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-primary group-hover:rotate-90" />Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}
                    className="group focus:bg-destructive/40 py-2 font-medium cursor-pointer">
                    <LogOutIcon size={14} className="mr-3 transition-all duration-300 ease-in-out group-hover:text-destructive group-hover:-translate-x-1" />Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}