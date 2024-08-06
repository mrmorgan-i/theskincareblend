import Image from 'next/image';

export default function WelcomeBanner() {
  return (
    <div className="relative w-full h-[400px] mb-8">
      <Image
        src="https://i.imgur.com/VKCm1pH.jpeg"
        alt="Welcome to The Skincare Blend Store"
        className='rounded-md'
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="rounded-md absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to The Skincare Blend Store</h1>
        <p className="text-xl md:text-2xl mb-6">Discover your perfect skincare routine</p>
        <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
          Shop Now
        </button>
      </div>
    </div>
  );
}