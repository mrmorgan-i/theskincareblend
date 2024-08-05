import { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Bell } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | YourBrand',
  description: 'Understanding how we protect your personal information at YourBrand.',
}

const policyItems = [
  {
    title: "Information We Collect",
    content: "We collect personal information that you provide directly to us, such as your name, email address, and shipping information when you make a purchase. We also automatically collect certain information about your device and how you interact with our website.",
    icon: Eye
  },
  {
    title: "How We Use Your Information",
    content: "We use your information to process your orders, communicate with you about our products and services, improve our website, and comply with legal obligations.",
    icon: Shield
  },
  {
    title: "Data Protection",
    content: "We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.",
    icon: Lock
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided at the end of this policy.",
    icon: Bell
  }
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-8">
          Privacy Policy
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Your privacy is important to us. It is <strong>The Skincare Blend&apos;s</strong> policy to respect your privacy regarding any information we may collect from you across our website.
        </p>
        
        <Accordion type="single" collapsible className="mb-12">
          {policyItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg">
                <div className="flex items-center">
                  {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                  {item.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <Link href='/contact'>
          <Button size="lg">Contact Us for More Information</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
