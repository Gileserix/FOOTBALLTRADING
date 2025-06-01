import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = React.useCallback((product) => {
    // Validar las propiedades correctas del producto
    if (!product?.titulo || !product?.precio) {
      console.error('Producto inválido:', product);
      return;
    }

    setCartItems((prevItems) => [...prevItems, product]);
  }, []);

  const removeFromCart = React.useCallback((index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const value = React.useMemo(
    () => ({ cartItems, addToCart, removeFromCart }),
    [cartItems, addToCart, removeFromCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};