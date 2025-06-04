import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../services/userContext.js';
import '../styles/myProducts.css';

const MyProducts = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const response = await axios.get('https://footballtrading.onrender.com/api/products', {
                    params: { createdBy: user }
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        if (user) {
            fetchMyProducts();
        }
    }, [user]);

    const handleEdit = (productId) => {
        alert(`Editar producto con ID: ${productId}`);
        // Implementa la lógica de edición aquí
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            alert('Producto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto');
        }
    };

    const paginatedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(products.length / itemsPerPage);

    return (
        <div className="my-products-container">
            <h2>Mis Productos</h2>
            {products.length > 0 ? (
                <div className="products-list">
                    {paginatedProducts.map(product => (
                        <div key={product._id} className="product-item">
                            <img src={product.imagenesAdjuntas[0]} alt={product.titulo} />
                            <div className="product-item-info">
                                <h3>{product.titulo}</h3>
                                <p>Precio: €{product.precio}</p>
                                <p>Descripción: {product.descripcion}</p>
                            </div>
                            <div className="product-item-buttons">
                                <button onClick={() => handleEdit(product._id)}>Editar</button>
                                <button onClick={() => handleDelete(product._id)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No tienes productos creados.</p>
            )}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? 'disabled' : ''}
                >
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? 'disabled' : ''}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default MyProducts;