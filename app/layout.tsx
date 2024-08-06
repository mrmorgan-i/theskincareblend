import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

import Nav from "@/components/navigation/nav";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Toaster from "@/components/ui/toaster";
import Footer from "@/components/navigation/footer";
import DFooter from "@/components/navigation/dfooter";
import Algolia from "@/components/products/algolia";


const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "The Skincare Blend Store",
  description: "Cosmetics and skincare products for all skin types",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <div className="flex-grow px-6 md:px-12 mx-auto max-w-8xl">
          <Nav />
          <Toaster />
          <Algolia />
          {children}
          <div className="pt-6">
          <Footer />
          <DFooter />
          </div>
          </div>
        </ThemeProvider>
        </body>
        
    </html>
  );
}
