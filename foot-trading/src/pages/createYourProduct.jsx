import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/createYourProduct.css';
import { ProductContext } from '../services/productContext.js';

const CreaTuProducto = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: 'Ropa', // Asegúrate de que los valores coincidan con los esperados en el backend
    talla: '',
    certificadoAutenticidad: false,
    categoriaAccesorio: ''
  });

  const { addProduct } = useContext(ProductContext);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 6) {
      alert('No puedes subir más de 6 imágenes.');
      return;
    }
    setImages([...images, ...files]);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('titulo', formData.productName);
    data.append('descripcion', formData.description);
    data.append('precio', formData.price);
    data.append('tipo', formData.category);

    if (formData.category === 'Ropa') {
      data.append('talla', formData.talla);
    } else if (formData.category === 'Carta') {
      data.append('certificadoAutenticidad', formData.certificadoAutenticidad);
    } else if (formData.category === 'Accesorio') {
      data.append('categoria', formData.categoriaAccesorio);
    }

    // Añadir imágenes al formulario
    images.forEach(image => {
      data.append('imagenesAdjuntas', image);
    });

    try {
      // Crear producto en la base de datos
      const response = await axios.post('http://localhost:3000/api/upload-product', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Producto añadido exitosamente');
      addProduct(response.data.product); // Añadir el producto al contexto global
    } catch (error) {
      console.error('Error al añadir el producto:', error);
      alert('Error al añadir el producto');
    }
  };

  return (
    <div className="crea-tu-producto-container">
      <div className="left-div">
        <h2>Añadir Características del Producto</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del Producto:
            <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} />
          </label>
          <label>
            Descripción:
            <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
          </label>
          <label>
            Precio:
            <input type="number" name="price" className="input-price" value={formData.price} onChange={handleInputChange} />
          </label>
          <label>
            Categoría:
            <select name="category" value={formData.category} onChange={handleInputChange}>
              <option value="Ropa">Ropa</option>
              <option value="Carta">Cartas</option>
              <option value="Accesorio">Accesorios</option>
            </select>
          </label>
          {formData.category === 'Ropa' && (
            <label>
              Talla:
              <input type="text" name="talla" value={formData.talla} onChange={handleInputChange} />
            </label>
          )}
          {formData.category === 'Carta' && (
            <label>
              Certificado de Autenticidad:
              <input type="checkbox" name="certificadoAutenticidad" checked={formData.certificadoAutenticidad} onChange={handleInputChange} />
            </label>
          )}
          {formData.category === 'Accesorio' && (
            <label>
              Categoría del Accesorio:
              <select name="categoriaAccesorio" value={formData.categoriaAccesorio} onChange={handleInputChange}>
                <option value="Balones">Balones</option>
                <option value="Espinilleras">Espinilleras</option>
                <option value="Otro">Otro</option>
              </select>
            </label>
          )}
          <button type="submit">Añadir Producto</button>
        </form>
      </div>
      <div className="right-div">
        <h2>Añadir Imágenes del Producto</h2>
        <input type="file" multiple onChange={handleImageUpload} />
        <div className="image-preview">
          {images.map((image, index) => (
            <div key={image.name + index} className="image-slot">
              <img src={URL.createObjectURL(image)} alt={`Producto ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreaTuProducto;