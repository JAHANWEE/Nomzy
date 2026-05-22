import { RESTAURANTS } from "./discoveryData";

/**
 * Given a home-screen restaurant item (name, image, cuisines, rating, time, distance, price),
 * returns a full restaurant object compatible with RestaurantDetail by merging with
 * the matching discovery entry (matched by name), or building a stub if not found.
 */
export function enrichRestaurant(homeItem) {
  const match = RESTAURANTS.find(
    (r) => r.name.toLowerCase() === homeItem.name.toLowerCase()
  );

  if (match) return match;

  // Stub for restaurants that exist in home data but not in discovery data
  return {
    id: homeItem.id || homeItem.name,
    name: homeItem.name,
    tagline: homeItem.cuisines,
    cuisines: homeItem.cuisines,
    rating: homeItem.rating,
    time: homeItem.time,
    distance: homeItem.distance,
    price: homeItem.price || "₹300 for one",
    image: homeItem.image,
    dishes: [],
    description: `Experience the finest ${homeItem.cuisines} cuisine in a warm, elegant setting.`,
    reviews: [],
    menu: [
      { id: "m1", name: "Chef's Special", desc: "Ask your server for today's recommendation", price: "₹399", image: homeItem.image },
    ],
  };
}
