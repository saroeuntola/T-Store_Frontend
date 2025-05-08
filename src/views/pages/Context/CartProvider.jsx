/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  const areOptionsEqual = (a, b) =>
    JSON.stringify(a.selectedColors || []) ===
      JSON.stringify(b.selectedColors || []) &&
    JSON.stringify(a.selectedSizes || []) ===
      JSON.stringify(b.selectedSizes || []);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id && areOptionsEqual(cartItem, item)
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item, decrementOnly = false) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.id === item.id && areOptionsEqual(cartItem, item)
    );

    if (!existingItem) return;

    if (decrementOnly || existingItem.quantity > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(cartItems.filter((cartItem) => cartItem !== existingItem));
    }
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
