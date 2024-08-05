import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Contact Us | The SkinCare Blend',
  description: 'Get in touch with The Skincare Blend for any questions, concerns, or feedback.',
}

const contactInfo = [
  { icon: Mail, text: 'support@theskincareblend.store' },
  { icon: Phone, text: '+233 (26) 652 5370' },
  { icon: MapPin, text: '123 Skincare Ave, Accra, Ghana' },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/theskincareblendgh' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/theskincareblendgh' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/theskincareblendgh' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/message/5QXFADE5PAK6D1' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-8">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          We&apos;re here to help and answer any question you might have. We look forward to hearing from you!
        </p>

        <Card className="mb-12">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center">
                  <item.icon className="mr-2 h-5 w-5 text-primary" />
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <p className="text-muted-foreground mb-6">
            Follow us on social media for the latest updates, tips, and special offers.
          </p>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link, index) => (
              <Button key={index} variant="outline" size="icon" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
