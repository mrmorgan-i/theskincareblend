import React from 'react';
import Link from 'next/link';

const DFooter: React.FC = () => {
  return (
    <footer className="py-1 bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <p className="text-white text-sm text-center">
          Developed by{' '}
          <Link
            href="https://instagram.com/klmdesignsig"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:underline transition-all duration-300"
          >
            KLM Designs Corp
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default DFooter;