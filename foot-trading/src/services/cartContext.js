import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    if (!item || !item.titulo || typeof item.precio !== 'number') {
      console.error('Producto inválido:', item);
      return;
    }
    setCartItems((prevItems) => [...prevItems, item]);
  };

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