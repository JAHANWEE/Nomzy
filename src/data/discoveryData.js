export const C = {
  bg: "#120D0A",
  surface: "#1B1410",
  card: "#241A15",
  orange: "#FF9F2D",
  orangeDark: "#D89B3D",
  white: "#FFFFFF",
  secondary: "#A69385",
  border: "rgba(255,255,255,0.08)",
};

export const RESTAURANTS = [
  {
    id: "1",
    name: "Spice Route",
    tagline: "A journey through royal Mughal flavours",
    cuisines: "North Indian • Mughlai",
    rating: "4.8",
    time: "25-30 min",
    distance: "2.3 km",
    price: "₹250 for one",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=85",
    dishes: ["Butter Chicken", "Mutton Biryani", "Dal Makhani", "Kebabs"],
    description:
      "An intimate fine-dining experience inspired by the royal kitchens of Mughal India. Every dish is slow-cooked with hand-ground spices and served in warm, candlelit surroundings.",
    reviews: [
      { name: "Arjun M.", text: "Absolutely stunning ambiance and the biryani is unmatched.", rating: "5.0" },
      { name: "Priya S.", text: "Best butter chicken in the city. Period.", rating: "4.9" },
    ],
    menu: [
      { id: "m1", name: "Butter Chicken", desc: "Slow-cooked in a rich tomato-cream sauce", price: "₹349", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80" },
      { id: "m2", name: "Mutton Biryani", desc: "Dum-cooked with aged basmati and whole spices", price: "₹429", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
      { id: "m3", name: "Dal Makhani", desc: "Black lentils simmered overnight with butter", price: "₹229", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
      { id: "m4", name: "Garlic Naan", desc: "Stone-baked with roasted garlic and herbs", price: "₹89", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
    ],
  },
  {
    id: "2",
    name: "Ember & Smoke",
    tagline: "Wood-fired perfection, every single time",
    cuisines: "BBQ • Continental",
    rating: "4.7",
    time: "30-40 min",
    distance: "3.1 km",
    price: "₹400 for one",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=85",
    dishes: ["Smoked Brisket", "Truffle Fries", "Ribeye Steak", "Smoked Ribs"],
    description:
      "A sophisticated steakhouse where every cut is dry-aged in-house and finished over live wood fire. The smoke-kissed interiors and curated whisky list make it a destination in itself.",
    reviews: [
      { name: "Rahul K.", text: "The ribeye was cooked to absolute perfection.", rating: "5.0" },
      { name: "Sneha T.", text: "Truffle fries alone are worth the visit.", rating: "4.8" },
    ],
    menu: [
      { id: "m1", name: "Smoked Brisket", desc: "12-hour smoked with hickory wood", price: "₹649", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
      { id: "m2", name: "Ribeye Steak", desc: "Dry-aged 28 days, served with chimichurri", price: "₹899", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80" },
      { id: "m3", name: "Truffle Fries", desc: "Hand-cut fries with black truffle oil", price: "₹249", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
      { id: "m4", name: "Smoked Ribs", desc: "Fall-off-the-bone pork ribs with house BBQ", price: "₹549", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80" },
    ],
  },
  {
    id: "3",
    name: "Basil & Thyme",
    tagline: "Italian soul, modern expression",
    cuisines: "Italian • Continental",
    rating: "4.9",
    time: "20-25 min",
    distance: "1.8 km",
    price: "₹350 for one",
    image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=85",
    dishes: ["Truffle Pasta", "Burrata", "Tiramisu", "Risotto"],
    description:
      "A modern Italian trattoria with a focus on seasonal ingredients and handmade pasta. The open kitchen and warm terracotta interiors create an atmosphere of effortless elegance.",
    reviews: [
      { name: "Meera V.", text: "The truffle pasta is life-changing. Came back three times.", rating: "5.0" },
      { name: "Karan B.", text: "Best tiramisu outside of Rome.", rating: "4.9" },
    ],
    menu: [
      { id: "m1", name: "Truffle Pasta", desc: "Handmade tagliatelle with black truffle", price: "₹549", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80" },
      { id: "m2", name: "Burrata", desc: "Fresh burrata with heirloom tomatoes", price: "₹349", image: "https://images.unsplash.com/photo-1551183053-bf91798d9f2e?w=400&q=80" },
      { id: "m3", name: "Risotto", desc: "Saffron risotto with parmesan crisp", price: "₹449", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80" },
      { id: "m4", name: "Tiramisu", desc: "Classic recipe with Kahlúa-soaked ladyfingers", price: "₹249", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },
    ],
  },
  {
    id: "4",
    name: "Seoul Kitchen",
    tagline: "Authentic Korean flavours, elevated",
    cuisines: "Korean • Asian",
    rating: "4.6",
    time: "35-45 min",
    distance: "4.2 km",
    price: "₹300 for one",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&q=85",
    dishes: ["Korean BBQ", "Bibimbap", "Japchae", "Tteokbokki"],
    description:
      "An authentic Korean dining experience with tabletop grills and a curated selection of banchan. The minimalist interior draws inspiration from traditional Korean tea houses.",
    reviews: [
      { name: "Ji-ho L.", text: "Feels like Seoul. The galbi is incredible.", rating: "5.0" },
      { name: "Ananya R.", text: "Best Korean food in the city by far.", rating: "4.7" },
    ],
    menu: [
      { id: "m1", name: "Korean BBQ Set", desc: "Galbi, bulgogi & samgyeopsal with banchan", price: "₹699", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80" },
      { id: "m2", name: "Bibimbap", desc: "Stone pot rice with seasonal vegetables", price: "₹329", image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80" },
      { id: "m3", name: "Japchae", desc: "Glass noodles with stir-fried vegetables", price: "₹279", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80" },
      { id: "m4", name: "Tteokbokki", desc: "Spicy rice cakes in gochujang sauce", price: "₹229", image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400&q=80" },
    ],
  },
  {
    id: "5",
    name: "The Biryani Room",
    tagline: "Where every grain tells a story",
    cuisines: "Hyderabadi • Dum",
    rating: "4.8",
    time: "20-30 min",
    distance: "1.4 km",
    price: "₹220 for one",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=85",
    dishes: ["Dum Biryani", "Haleem", "Mirchi Ka Salan", "Sheer Khurma"],
    description:
      "A heritage dining room dedicated entirely to the art of dum biryani. The recipes have been passed down through three generations and the saffron-infused rice is cooked in sealed clay pots.",
    reviews: [
      { name: "Faiz A.", text: "The most authentic Hyderabadi biryani outside of Hyderabad.", rating: "5.0" },
      { name: "Divya N.", text: "Haleem is absolutely divine. Must try.", rating: "4.8" },
    ],
    menu: [
      { id: "m1", name: "Dum Biryani", desc: "Slow-cooked in sealed clay pot with saffron", price: "₹349", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80" },
      { id: "m2", name: "Haleem", desc: "Slow-cooked wheat and mutton stew", price: "₹299", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" },
      { id: "m3", name: "Mirchi Ka Salan", desc: "Green chilli curry in peanut-sesame gravy", price: "₹149", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80" },
      { id: "m4", name: "Sheer Khurma", desc: "Vermicelli pudding with dates and saffron", price: "₹129", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },
    ],
  },
];

export const MENU_CATEGORIES = ["Recommended", "Starters", "Main Course", "Biryani", "Desserts", "Drinks"];
