'use client'

import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Page Not Found</h2>
        </div>
        
        <p className="text-muted-foreground">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Contact support
            </Link>
          </Button>
        </div>
        
        <div className="pt-8 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Search our site</h3>
          <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
            <Input 
              type="text" 
              placeholder="What are you looking for?"
              className="flex-grow"
            />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
