import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - titulo
 *         - precio
 *         - descripcion
 *       properties:
 *         id:
 *           type: string
 *           description: ID del producto
 *         titulo:
 *           type: string
 *           description: Título del producto
 *         precio:
 *           type: number
 *           description: Precio del producto
 *         descripcion:
 *           type: string
 *           description: Descripción del producto
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del producto
 *         talla:
 *           type: string
 *           description: Talla del producto (solo para ropa)
 *         certificadoAutenticidad:
 *           type: boolean
 *           description: Certificado de autenticidad (solo para cartas)
 *         categoria:
 *           type: string
 *           description: Categoría del accesorio (solo para accesorios)
 *           enum:
 *             - Balones
 *             - Espinilleras
 *             - Otro
 *         imagenesAdjuntas:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs de las imágenes adjuntas
 */
const productSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagenesAdjuntas: {
        type: [String], // Array de strings para las URLs de las imágenes
        required: true
    },
    createdBy: {
        type: String,
        required: true // El usuario que creó el producto
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { discriminatorKey: 'tipo' });

const Product = mongoose.model('Product', productSchema);

// Discriminador para ropa
const Ropa = Product.discriminator('Ropa', new mongoose.Schema({
    talla: {
        type: String,
        required: true
    }
}));

// Discriminador para cartas
const Carta = Product.discriminator('Carta', new mongoose.Schema({
    certificadoAutenticidad: {
        type: Boolean,
        required: true
    }
}));

// Discriminador para accesorios
const Accesorio = Product.discriminator('Accesorio', new mongoose.Schema({
    categoria: {
        type: String,
        enum: ['Balones', 'Espinilleras', 'Otro'],
        required: true
    }
}));

export { Product, Ropa, Carta, Accesorio };