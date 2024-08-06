'use client'

import Image from 'next/image';
import { Button } from '../ui/button';

export default function WelcomeBanner() {
  const handleScroll = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[400px] mb-8">
      <Image
        src="https://i.imgur.com/VKCm1pH.jpeg"
        alt="Welcome to The Skincare Blend Store"
        className="rounded-md"
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="rounded-md absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center leading-tight md:leading-normal">Welcome to The Skincare Blend Store</h1>
        <p className="text-xl md:text-2xl mb-6 text-center">Discover your perfect skincare routine</p>
        <Button onClick={handleScroll} className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
          Shop Now
        </Button>
      </div>
    </div>
  );
}
