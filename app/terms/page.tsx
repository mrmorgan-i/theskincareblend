import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | The Skincare Blend',
  description: 'Understand the terms and conditions for using our products and services.',
}

const termsContent = [
  {
    title: "Use of Website",
    content: "By accessing and using our website, you agree to comply with these Terms of Service and all applicable laws and regulations. You may not use our website for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks."
  },
  {
    title: "Product Information",
    content: "We strive to provide accurate product descriptions and pricing information. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition."
  },
  {
    title: "User Accounts",
    content: "When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately of any breach of security or unauthorized use of your account."
  },

{
    title: "Intellectual Property",
    content: "The content on our website, including text, graphics, logos, and images, is the property of The Skincare Blend and is protected by copyright and other intellectual property laws. You may not use, reproduce, distribute, or create derivative works based on this content without our express written consent."
  }
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-8">
          Terms of Service
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Please read these terms carefully before using our website or purchasing our products.
        </p>

        <Tabs defaultValue={termsContent[0].title} className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {termsContent.map((term, index) => (
              <TabsTrigger key={index} value={term.title}>{term.title}</TabsTrigger>
            ))}
          </TabsList>
          {termsContent.map((term, index) => (
            <TabsContent key={index} value={term.title}>
              <Card>
                <CardHeader>
                  <CardTitle>{term.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{term.content}</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            By using our website or purchasing our products, you agree to these terms. If you have any questions, please contact us.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
