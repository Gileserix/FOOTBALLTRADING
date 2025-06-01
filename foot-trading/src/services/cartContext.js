import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = React.useCallback((item) => {
    setCartItems((prevItems) => [...prevItems, item]); // Actualiza el estado del carrito
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

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};