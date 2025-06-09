import React, { useState, useContext } from 'react';
import '../styles/productDetails.css';
import { CartContext } from '../services/cartContext';

const ProductDetails = ({ item, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { cartItems, addToCart } = useContext(CartContext); // Accede al contexto del carrito

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === item.imagenesAdjuntas.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? item.imagenesAdjuntas.length - 1 : prevIndex - 1
        );
    };

    const handleAddToCart = () => {
        const isAlreadyInCart = cartItems.some((cartItem) => cartItem._id === item._id);
        if (isAlreadyInCart) {
            alert('Este producto ya está en el carrito');
        } else {
            addToCart(item); // Añade el producto al carrito
            alert('Producto añadido al carrito');
        }
    };

    return (
        <div className="product-details">
            <button className="close-button" onClick={onClose}>&times;</button>
            <div className="carousel">
                <button className="carousel-button prev" onClick={handlePreviousImage}>
                    &#8249;
                </button>
                <img
                    src={item.imagenesAdjuntas[currentImageIndex]}
                    alt={`Imagen ${currentImageIndex + 1}`}
                    className="carousel-image"
                />
                <button className="carousel-button next" onClick={handleNextImage}>
                    &#8250;
                </button>
            </div>
            <h2>{item.titulo}</h2>
            <p>Precio: €{item.precio}</p>
            <p>{item.descripcion}</p>
            <p>Subido por: {item.createdBy}</p>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Añadir al carrito</button>
        </div>
    );
};

export default ProductDetails;