'use client'

import { createContext, useContext, useState } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => {
          const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
          if (existingItemIndex !== -1) {
            // If the item already exists, update its quantity
            const updatedCart = [...prevCart];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              quantity: updatedCart[existingItemIndex].quantity + 1,
            };
            return updatedCart;
          } else {
            // If the item doesn't exist, add it to the cart with quantity 1
            return [...prevCart, { ...item, quantity: 1 }];
          }
        });
      };

      const updateQuantity = (itemId, newQuantity) => {
        setCart((prevCart) => {
          const updatedCart = prevCart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          );
          return updatedCart.filter((item) => item.quantity > 0); // Remove item if quantity is 0
        });
      };

    // remove an item from the cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };
    // clear the cart
    const clearCart = () => {
        setCart([]); //set the cart to an empty array
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);