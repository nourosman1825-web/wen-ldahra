// app/components/CategoryButtons.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  icon: string;
  description?: string;
}

interface CategoryButtonsProps {
  categories: Category[];
  onCategoryClick?: (categoryName: string) => void;
  className?: string;
  showDescriptions?: boolean;
}

export default function CategoryButtons({ 
  categories, 
  onCategoryClick,
  className = "",
  showDescriptions = false
}: CategoryButtonsProps) {
  const router = useRouter();

  const handleClick = (categoryName: string) => {
    if (categoryName === 'More') {
      router.push('/more');
    } else if (onCategoryClick) {
      onCategoryClick(categoryName);
    } else {
      router.push(`/result?category=${encodeURIComponent(categoryName)}`);
    }
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 ${className}`}>
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => handleClick(category.name)}
          className="bg-white/80 hover:bg-brown hover:text-white border border-beige rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2 group hover:-translate-y-1"
        >
          <span className="text-3xl group-hover:scale-110 transition-transform">
            {category.icon}
          </span>
          <span className="font-semibold text-xs sm:text-sm">
            {category.name}
          </span>
          {showDescriptions && category.description && (
            <p className="text-[10px] text-text/50 group-hover:text-cream/80 truncate max-w-full">
              {category.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}