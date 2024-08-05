import { Metadata } from 'next'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeftRight, Package, CreditCard, MailQuestion } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns Policy | The Skincare Blend',
  description: 'Learn about our hassle-free returns process.',
}

const returnSteps = [
  {
    title: "Initiate Return",
    description: "Log into your account and select the item(s) you wish to return. Fill out our simple return form.",
    icon: ArrowLeftRight
  },
  {
    title: "Pack Your Items",
    description: "Carefully pack the item(s) in their original packaging. Include all accessories and free gifts, if any.",
    icon: Package
  },
  {
    title: "Ship It Back",
    description: "Use our prepaid shipping label or choose your preferred carrier. Send it back within 30 days of purchase.",
    icon: MailQuestion
  },
  {
    title: "Get Your Refund",
    description: "Once we receive and process your return, we'll initiate your refund. It may take 5-10 business days to appear on your statement.",
    icon: CreditCard
  }
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-8">
          Hassle-Free Returns
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          We want you to love your purchase. If you&apos;re not completely satisfied, we&apos;re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {returnSteps.map((step, index) => (
            <Card key={index} className="bg-secondary/30">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {step.icon && <step.icon className="mr-2 h-6 w-6" />}
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer service team is always ready to assist you with any questions about returns or exchanges.
          </p>
          <Button size="lg">Contact Support</Button>
        </div>
      </div>
    </div>
  )
}
