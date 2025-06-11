import React, { useState, useContext } from 'react';
import '../styles/cloths.css'; // Puedes crear un archivo CSS específico para accesorios si lo prefieres
import OpcionCompra from '../components/productDetails.jsx';
import { ProductContext } from '../services/productContext.js';
import { UserContext } from '../services/userContext.js'; // Importar el contexto del usuario
import { useNavigate } from 'react-router-dom';

function Accesorios() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsToShow, setItemsToShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showOpcionCompra, setShowOpcionCompra] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { products } = useContext(ProductContext);
    const { user } = useContext(UserContext); // Obtener el usuario actual
    const navigate = useNavigate();
    const defaultUserImg = 'assets/images/Unknown.jpg';

    // Filtrar productos para excluir los del usuario actual
    const items = products.filter(product => product.tipo === 'Accesorio');

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
        setSelectedItem(item);
        setShowOpcionCompra(true);
    };

    const handleCloseOpcionCompra = () => {
        setShowOpcionCompra(false);
    };

    const handleFinalizePurchase = () => {
        alert('Añadido al carrito con éxito');
        setShowOpcionCompra(false);
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
                    item={selectedItem}
                    onClose={handleCloseOpcionCompra}
                    onFinalize={handleFinalizePurchase}
                />
            )}
        </div>
    );
}

export default Accesorios;