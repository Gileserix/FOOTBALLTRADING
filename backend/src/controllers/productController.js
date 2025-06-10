import { Product, Ropa, Carta, Accesorio } from '../models/product.js';
export const createProductController = async (req, res) => {
    const { titulo, precio, descripcion, tipo, talla, certificadoAutenticidad, categoria } = req.body;
    const createdBy = req.user?.username || 'Unknown'; // Asume que el usuario está disponible en req.user
    try {
        // Obtener las URLs de las imágenes subidas a Cloudinary
        const imagenesAdjuntas = req.files ? req.files.map(file => file.path) : [];
        console.log('Datos recibidos:', { titulo, precio, descripcion, tipo, talla, certificadoAutenticidad, categoria, imagenesAdjuntas, createdBy });
        let newProduct;
        if (tipo === 'Ropa') {
            newProduct = new Ropa({ titulo, precio, descripcion, imagenesAdjuntas, talla: talla.toUpperCase(), createdBy });
        } else if (tipo === 'Carta') {
            newProduct = new Carta({ titulo, precio, descripcion, imagenesAdjuntas, certificadoAutenticidad, createdBy });
        } else if (tipo === 'Accesorio') {
            newProduct = new Accesorio({ titulo, precio, descripcion, imagenesAdjuntas, categoria, createdBy });
        } else {
            return res.status(400).json({ message: 'Tipo de producto no válido' });
        }
        // Guardar el producto en la base de datos
        await newProduct.save();

        res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(400).json({ message: 'Error al crear el producto', error: error.message });
    }
};
export const deleteProductController = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar y eliminar el producto por ID
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto borrado exitosamente', product: deletedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al borrar el producto', error: error.message });
    }
};
export const updateProductController = async (req, res) => {
    const { id } = req.params;
    const { titulo, precio, descripcion, imagenesAdjuntas, tipo, talla, certificadoAutenticidad, categoria } = req.body;

    try {
        let updatedProduct;
        if (tipo === 'Ropa') {
            updatedProduct = await Ropa.findByIdAndUpdate(id, { titulo, precio, descripcion, imagenesAdjuntas, talla }, { new: true });
        } else if (tipo === 'Carta') {
            updatedProduct = await Carta.findByIdAndUpdate(id, { titulo, precio, descripcion, imagenesAdjuntas, certificadoAutenticidad }, { new: true });
        } else if (tipo === 'Accesorio') {
            updatedProduct = await Accesorio.findByIdAndUpdate(id, { titulo, precio, descripcion, imagenesAdjuntas, categoria }, { new: true });
        } else {
            updatedProduct = await Product.findByIdAndUpdate(id, { titulo, precio, descripcion, imagenesAdjuntas }, { new: true });
        }

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};
export const getProductsController = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};