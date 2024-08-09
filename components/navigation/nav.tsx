import { auth } from '@/server/auth'
import { UserButton } from '@/components/navigation/user-button'
import { Button } from '../ui/button';
import Link from 'next/link';
import { LogIn, Menu } from 'lucide-react';
import Logo from './logo';
import CartDrawer from '../cart/cart-drawer';
import ThemeSwitcher from './theme-switcher';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default async function Nav() {
    const session = await auth();

    return (
        <header className='py-4 px-4 md:py-6 md:px-6'>
            <nav>
                <div className='flex justify-between items-center'>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Menu size={20} />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                                <nav className="flex flex-col space-y-4 mt-8">
                                    <ThemeSwitcher />
                                    {/* Add any other menu items here */}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    <Link href={"/"} aria-label='theskincareblend logo' className='flex-shrink-0'>
                        <Logo /> {/* Adjust size as needed */}
                    </Link>
                    <div className='flex items-center space-x-2 md:space-x-4'>
                        
                        <CartDrawer />
                        {!session ? (
                            <Button asChild size="sm">
                                <Link className='flex gap-1 items-center' href="/auth/login">
                                    <LogIn size={16} />
                                    <span className="hidden sm:inline">Login</span>
                                </Link>
                            </Button>
                        ) : (
                            <UserButton expires={session?.expires} user={session?.user} />
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}