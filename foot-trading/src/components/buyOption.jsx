import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/buyOption.css';
import { CartContext } from '../services/cartContext.js';

const OpcionCompra = ({ item, onClose, onFinalize }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleFinalizePurchase = () => {
    try {
        addToCart({ ...item, selectedSize }); // Añade el producto al carrito
        alert('Producto añadido al carrito con éxito');
        onFinalize(); // Cierra el modal
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
        alert('Hubo un problema al añadir el producto al carrito.');
    }
};

  return (
    <div className="opcion-compra-overlay">
      <div className="opcion-compra">
        <button onClick={onClose} className="close-button">X</button>
        <div className="opcion-compra-content">
          <img src={item.imagenesAdjuntas[0]} alt={item.titulo} className="opcion-compra-img" />
          <div className="info-box">
            <h2>{item.titulo}</h2>
            <p className="price">€{item.precio}</p>
            <div className="size-selection">
              <h3>Selecciona una talla:</h3>
              <div className="size-buttons">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={selectedSize === size ? 'selected' : ''}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleFinalizePurchase} className="finalize-button">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

OpcionCompra.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onFinalize: PropTypes.func.isRequired,
};

export default OpcionCompra;