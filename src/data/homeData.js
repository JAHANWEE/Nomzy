// ─── Design tokens ────────────────────────────────────────────────────────────
export const C = {
  bg: "#120D0A",
  surface: "#1B1410",
  card: "#241A15",
  orange: "#FF9F2D",
  orangeDark: "#D87F12",
  white: "#FFFFFF",
  secondary: "#A69385",
  border: "rgba(255,255,255,0.08)",
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "1", label: "Biryani",  emoji: "🍛" },
  { id: "2", label: "Café",     emoji: "☕" },
  { id: "3", label: "Pizza",    emoji: "🍕" },
  { id: "4", label: "Chinese",  emoji: "🥢" },
  { id: "5", label: "Desserts", emoji: "🍮" },
  { id: "6", label: "Italian",  emoji: "🍝" },
  { id: "7", label: "Asian",    emoji: "🍜" },
  { id: "8", label: "BBQ",      emoji: "🥩" },
];

// ─── Featured banners ─────────────────────────────────────────────────────────
export const FEATURED = [
  {
    id: "1",
    title: "Fine Dining Near You",
    subtitle: "Exclusive offers from premium restaurants",
    cta: "Explore",
    // Unsplash cinematic food/restaurant images (free to use)
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    id: "2",
    title: "Chef's Table Experience",
    subtitle: "Curated tasting menus from top chefs",
    cta: "Discover",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  },
  {
    id: "3",
    title: "Weekend Specials",
    subtitle: "Limited-time offers on premium cuisines",
    cta: "View All",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
  },
];

// ─── Popular restaurants ──────────────────────────────────────────────────────
export const POPULAR = [
  {
    id: "1",
    name: "Spice Route",
    cuisines: "North Indian • Mughlai",
    rating: "4.8",
    time: "25-30 min",
    distance: "2.3 km",
    price: "₹250 for one",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  },
  {
    id: "2",
    name: "Ember & Smoke",
    cuisines: "BBQ • Continental",
    rating: "4.7",
    time: "30-40 min",
    distance: "3.1 km",
    price: "₹400 for one",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  },
  {
    id: "3",
    name: "Basil & Thyme",
    cuisines: "Italian • Continental",
    rating: "4.9",
    time: "20-25 min",
    distance: "1.8 km",
    price: "₹350 for one",
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80",
  },
  {
    id: "4",
    name: "Seoul Kitchen",
    cuisines: "Korean • Asian",
    rating: "4.6",
    time: "35-45 min",
    distance: "4.2 km",
    price: "₹300 for one",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
  },
];

// ─── Recommended ─────────────────────────────────────────────────────────────
export const RECOMMENDED = [
  {
    id: "1",
    name: "Urban Tandoor",
    cuisines: "Indian • Tandoor",
    rating: "4.7",
    time: "20-30 min",
    distance: "1.5 km",
    price: "₹200 for one",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  },
  {
    id: "2",
    name: "The Olive Garden",
    cuisines: "Mediterranean",
    rating: "4.8",
    time: "25-35 min",
    distance: "2.8 km",
    price: "₹450 for one",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  },
  {
    id: "3",
    name: "Sakura",
    cuisines: "Japanese • Sushi",
    rating: "4.9",
    time: "30-40 min",
    distance: "3.5 km",
    price: "₹500 for one",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80",
  },
  {
    id: "4",
    name: "La Maison",
    cuisines: "French • European",
    rating: "4.8",
    time: "35-45 min",
    distance: "4.0 km",
    price: "₹600 for one",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
];

// ─── Nearby ───────────────────────────────────────────────────────────────────
export const NEARBY = [
  {
    id: "1",
    name: "The Black Pearl",
    cuisines: "Seafood • Coastal",
    rating: "4.6",
    time: "15-20 min",
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&q=80",
  },
  {
    id: "2",
    name: "Copper Chimney",
    cuisines: "North Indian • Punjabi",
    rating: "4.5",
    time: "20-25 min",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
  },
  {
    id: "3",
    name: "Noodle House",
    cuisines: "Pan-Asian • Ramen",
    rating: "4.4",
    time: "25-30 min",
    distance: "1.9 km",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
  },
  {
    id: "4",
    name: "Grill & Chill",
    cuisines: "American • Burgers",
    rating: "4.3",
    time: "20-30 min",
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80",
  },
];
