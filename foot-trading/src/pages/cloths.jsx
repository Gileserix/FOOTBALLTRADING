import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/cloths.css';
import OpcionCompra from '../components/buyOption';
import { ProductContext } from '../services/productContext.js';
import { CartContext } from '../services/cartContext.js'; // <-- Importa el contexto del carrito

function Ropa() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsToShow, setItemsToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showOpcionCompra, setShowOpcionCompra] = useState(false);
    const { products, setProducts } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext); // <-- Usa el método del carrito
    const defaultUserImg = 'assets/images/Unknown.jpg';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://footballtrading.onrender.com/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [setProducts]);

    const items = products.filter(product => product.tipo === 'Ropa');

    const filteredItems = items.filter(item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredItems.length / itemsToShow);
    const startIndex = (currentPage - 1) * itemsToShow;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsToShow);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        alert('Producto añadido al carrito');
    };

    const handleCloseOpcionCompra = () => {
        setShowOpcionCompra(false);
    };

    const handleFinalizePurchase = () => {
        alert('Añadido al carrito con éxito');
        setShowOpcionCompra(false);
    };

    return (
        <div className="ropa-container">
            <input
                type="text"
                className="search-bar"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                }}
            />
            {paginatedItems.map(item => (
                <div key={item._id} className="ropa-item">
                    <img src={item.imagenesAdjuntas[0]} alt={item.titulo} />
                    <div className="ropa-item-info">
                        <div className="info-box title-box">
                            <h3>{item.titulo}</h3>
                        </div>
                        <div className="info-box price-box">
                            <p className="price-title">Precio</p>
                            <p className="price">{item.precio} €</p>
                        </div>
                        <div className="info-box">
                            <p className="price-title">Talla</p>
                            <p className="price">{item.talla}</p>
                        </div>
                        <div className="info-box uploader">
                            <img src={defaultUserImg} alt="Uploader" />
                            <p>Subido por: {item.uploader}</p>
                        </div>
                    </div>
                    <button onClick={() => handleAddToCart(item)}>Añadir al carrito</button>
                </div>
            ))}
            <div className="breadcrumb">
                <select value={itemsToShow} onChange={e => setItemsToShow(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange('prev')}
                    className={currentPage === 1 ? 'disabled' : ''}
                >
                    Anterior
                </button>
                <span className="page-number">{currentPage}</span>
                {currentPage + 1 <= totalPages && <span className="page-number">{currentPage + 1}</span>}
                {currentPage + 2 <= totalPages && <span className="page-number">{currentPage + 2}</span>}
                <button
                    onClick={() => handlePageChange('next')}
                    className={currentPage === totalPages ? 'disabled' : ''}
                >
                    Siguiente
                </button>
            </div>
            {showOpcionCompra && (
                <OpcionCompra
                    onClose={handleCloseOpcionCompra}
                    onFinalize={handleFinalizePurchase}
                />
            )}
        </div>
    );
}

export default Ropa;