import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

const addToCart = React.useCallback((item) => {
  if (!item || typeof item.precio !== 'number') {
      console.error('El producto no tiene un precio válido:', item);
      return;
  }
  setCartItems((prevItems) => [...prevItems, item]);
}, []);

  const removeFromCart = React.useCallback((index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const value = React.useMemo(
    () => ({ cartItems, addToCart, removeFromCart }),
    [cartItems, addToCart, removeFromCart]
  );

  console.log('Contenido de cartItems:', cartItems);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};