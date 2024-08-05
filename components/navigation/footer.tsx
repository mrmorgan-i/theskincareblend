'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">The Skincare Blend</h3>
            <p className="text-sm">Providing quality skincare products since 2022.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Products', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Products' ? '/' : `/${item.toLowerCase()}`} className="text-sm hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {['FAQ', 'Terms', 'Returns', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-2">Subscribe to our newsletter for exclusive offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-secondary text-secondary-foreground"
              />
              <Button type="submit" variant={'secondary'}>Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} The Skincare Blend. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=61556911727911" passHref>
                <Button variant="ghost" size="icon">
                  <FaFacebook className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://instagram.com/theskincareblendgh" passHref>
                <Button variant="ghost" size="icon">
                  <FaInstagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com/theskincareblendgh" passHref>
                <Button variant="ghost" size="icon">
                  <FaTwitter className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://wa.me/message/5QXFADE5PAK6D1" passHref>
                <Button variant="ghost" size="icon">
                  <FaWhatsapp className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
