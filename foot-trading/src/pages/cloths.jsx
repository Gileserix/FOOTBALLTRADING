import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/cloths.css';
import ProductDetails from '../components/productDetails.jsx';
import { ProductContext } from '../services/productContext.js';
import { useNavigate } from 'react-router-dom';

function Ropa() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsToShow, setItemsToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { products, setProducts } = useContext(ProductContext);
    const navigate = useNavigate();
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

    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setShowProductDetails(true);
    };

    const handleCloseProductDetails = () => {
        setShowProductDetails(false);
    };

    const handleViewProfile = (username) => {
        navigate(`/profile?username=${username}`); // Redirigir a la página de perfil del usuario
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
                            <p className="price">€{item.precio}</p>
                        </div>
                        <div className="info-box uploader">
                            <img src={defaultUserImg} alt="Uploader" />
                            <p>
                                Subido por: <br />
                                <a href="" onClick={() => handleViewProfile(item.createdBy)}>
                                    {item.createdBy}
                                </a>
                            </p>
                        </div>
                    </div>
                    <button onClick={() => handleViewDetails(item)}>Ver detalles</button>
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
            {showProductDetails && (
                <ProductDetails
                    item={selectedItem}
                    onClose={handleCloseProductDetails}
                />
            )}
        </div>
    );
}

export default Ropa;