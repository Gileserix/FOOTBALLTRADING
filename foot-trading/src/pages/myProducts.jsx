import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../services/userContext.js';
import '../styles/myProducts.css';

const MyProducts = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setCurrentImageIndex(0); // Reinicia el índice de la imagen al abrir el modal
        setShowEditModal(true);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`https://footballtrading.onrender.com/api/products/${selectedProduct._id}`, selectedProduct);
            alert('Producto actualizado exitosamente');
            setProducts(products.map((product) =>
                product._id === selectedProduct._id ? response.data.product : product
            ));
            setShowEditModal(false);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            alert('Error al actualizar el producto');
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`https://footballtrading.onrender.com/api/products/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            alert('Producto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            alert('Error al eliminar el producto');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === selectedProduct.imagenesAdjuntas.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? selectedProduct.imagenesAdjuntas.length - 1 : prevIndex - 1
        );
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
                                <button onClick={() => handleEdit(product)}>Editar</button>
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
            {showEditModal && (
                <div className="edit-modal">
                    <div className="edit-modal-content">
                        <h2>Editar Producto</h2>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="titulo"
                                value={selectedProduct.titulo}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Precio:
                            <input
                                type="number"
                                name="precio"
                                value={selectedProduct.precio}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Descripción:
                            <textarea
                                name="descripcion"
                                value={selectedProduct.descripcion}
                                onChange={handleInputChange}
                            ></textarea>
                        </label>
                        <div className="carousel">
                            <button className="carousel-button prev" onClick={handlePreviousImage}>
                                &#8249;
                            </button>
                            <img
                                src={selectedProduct.imagenesAdjuntas[currentImageIndex]}
                                alt={`Imagen ${currentImageIndex + 1}`}
                                className="carousel-image"
                            />
                            <button className="carousel-button next" onClick={handleNextImage}>
                                &#8250;
                            </button>
                        </div>
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={() => setShowEditModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProducts;