export interface Category {
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { name: "Cafés", icon: "☕", description: "Best coffee shops and cozy spots" },
  { name: "Restaurants", icon: "🍽️", description: "Dine at the finest restaurants" },
  { name: "Parks", icon: "🌳", description: "Relax in beautiful green spaces" },
  { name: "Shopping", icon: "🛍️", description: "Shop at top malls and boutiques" },
  { name: "Entertainment", icon: "🎭", description: "Movies, nightlife, and fun" },
  { name: "Gyms", icon: "💪", description: "Stay fit at premium gyms" },
  { name: "Hotels", icon: "🏨", description: "Luxury and budget accommodations" },
  { name: "Beaches", icon: "🏖️", description: "Beautiful coastal destinations" },
  { name: "Historical Sites", icon: "🏛️", description: "Explore Lebanon's rich history" },
  { name: "Spa & Wellness", icon: "💆", description: "Relax and rejuvenate" },
  { name: "Museums", icon: "🖼️", description: "Art and cultural exhibitions" },
  { name: "Bakeries", icon: "🥐", description: "Fresh pastries and baked goods" },
  { name: "Bookstores", icon: "📚", description: "Find your next great read" },
];