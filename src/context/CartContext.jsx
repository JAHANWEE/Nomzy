import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState({});

  const addItem = (nextRestaurant, dishId) => {
    setRestaurant(nextRestaurant);
    setCart((prev) => {
      const sameRestaurant = restaurant?.id === nextRestaurant.id;
      const currentCart = sameRestaurant ? prev : {};

      return { ...currentCart, [dishId]: (currentCart[dishId] || 0) + 1 };
    });
  };

  const removeItem = (nextRestaurant, dishId) => {
    if (restaurant?.id !== nextRestaurant.id) return;

    setCart((prev) => {
      const next = { ...prev, [dishId]: (prev[dishId] || 1) - 1 };
      if (next[dishId] <= 0) delete next[dishId];
      return next;
    });
  };

  const clearCart = () => {
    setRestaurant(null);
    setCart({});
  };

  const itemCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ restaurant, cart, itemCount, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
