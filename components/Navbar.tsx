// app/component/Navbar.tsx

import Link from 'next/link';
import React from 'react';

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center max-w-7xl mx-auto mb-8 border-b pb-4">
      {/* Left side: Logo and Brand */}
      <div className="flex items-center space-x-2">
        <span className="bg-cream text-white p-2 rounded-full font-bold text-sm">💡</span>
        <span className="font-bold text-lg text-[#6b4e3d] tracking-wide">WEN EL DAHRA</span>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex space-x-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-brown cursor-pointer">Home</Link>
        <Link href="/explore" className="hover:text-brown cursor-pointer">Explore</Link>
        <Link href="/categories/More" className="hover:text-brown cursor-pointer">Categories</Link>
        <Link href="/about" className="hover:text-brown cursor-pointer">About Us</Link>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-black">OK</button>
        <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
          R
        </button>
      </div>
    </nav>
  );
};

export default Navigation;