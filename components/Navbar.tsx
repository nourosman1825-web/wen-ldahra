"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto mb-8 border-b pb-4 px-4 sm:px-6 lg:px-8 border-beige">
      <div className="flex justify-between items-center">
        {/* Left side: Logo and Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-dark-brown text-white p-2 rounded-full font-bold text-sm">💡</span>
          <span className="font-bold text-base sm:text-lg text-dark-brown tracking-wide">WEN EL DAHRA</span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-brown transition">Home</Link>
          <Link href="/explore" className="hover:text-brown transition">Explore</Link>
          <Link href="/more" className="hover:text-brown transition">Categories</Link>
          <Link href="/about" className="hover:text-brown transition">About Us</Link>
        </div>

        {/* Right side: Action Buttons & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <button className="w-8 h-8 bg-cream text-dark-brown rounded-full flex items-center justify-center text-sm font-semibold">
            R
          </button>

          {/* Hamburger Menu Button (Shows only on Mobile) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-700 hover:text-black rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <span className="text-xl font-bold">✕</span>
            ) : (
              <span className="text-xl font-bold">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-beige/60 flex flex-col space-y-3 text-sm font-medium text-gray-700">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-brown py-1 transition"
          >
            Home
          </Link>
          <Link 
            href="/explore" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-brown py-1 transition"
          >
            Explore
          </Link>
          <Link 
            href="/categories/More" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-brown py-1 transition"
          >
            Categories
          </Link>
          <Link 
            href="/about" 
            onClick={() => setIsOpen(false)} 
            className="hover:text-brown py-1 transition"
          >
            About Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;