import { Metadata } from 'next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | The Skincare Blend',
  description: 'Find answers to common questions about YourBrand products and services.',
}

const faqs = [
  {
    question: "How long does shipping usually take?",
    answer: "Shipping times vary depending on your location. Typically, domestic orders are delivered within 3-5 business days, while international orders may take 7-14 business days."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for all unused and unopened products. Please visit our Returns page for more detailed information on how to initiate a return."
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, all of our products are cruelty-free. We do not test on animals and do not use ingredients that have been tested on animals."
  },
  {
    question: "Do you offer samples?",
    answer: "We offer samples with every purchase. You can select up to 2 free samples at checkout for orders over $50."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's website."
  },
  {
    question: "Are your products suitable for sensitive skin?",
    answer: "Many of our products are formulated for sensitive skin. However, we always recommend performing a patch test before using a new product, especially if you have sensitive skin or allergies."
  }
]

const categories = ["Shipping", "Returns", "Products", "Orders"]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-center mb-8">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12">
          Find quick answers to your most pressing questions about our products and services.
        </p>

        {/* <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div> */}

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">FAQ Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <Button key={index} variant="outline">
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Card className="mb-12">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

<div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer support team is always here to help you with any questions or concerns.
          </p>
          <Button size="lg" asChild>
            <a href="/contact">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}