import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story | The Skincare Blend',
  description: 'Discover the passion and innovation behind our skincare revolution.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Revolutionizing Skincare
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Your journey to radiant skin starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Born from a passion for natural beauty and powered by cutting-edge science, 
              The Skincare Blend is on a mission to transform the world of skincare. We believe that 
              everyone deserves to feel confident in their own skin.
            </p>
            <Link href='https://wa.me/message/5QXFADE5PAK6D1'>
                <Button size="lg">Learn More</Button>
            </Link>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="https://plus.unsplash.com/premium_photo-1674739375749-7efe56fc8bbb?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="YourBrand lab" 
              fill 
              style={{objectFit: "cover"}}
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovation", description: "Pushing the boundaries of skincare science" },
              { title: "Sustainability", description: "Committed to eco-friendly practices" },
              { title: "Inclusivity", description: "Beauty products for every skin type" }
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-8 mb-20">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "3", label: "Countries Served" },
              { number: "100%", label: "Natural Ingredients" },
              { number: "0", label: "Animal Testing" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className='text-center mt-5 text-sm text-secondary-foreground'>and we&apos;re only getting started...</div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Be part of the skincare revolution. Subscribe to our newsletter for exclusive 
            updates, tips, and special offers.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={'https://instagram.com/theskincareblendgh'}>
            <Button size="lg">Follow Us</Button>
            </Link>
            <Link href='/'>
                <Button size="lg" variant="outline">Explore Products</Button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}