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
 *         - createdBy
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
 *         createdBy:
 *           type: string
 *           description: ID del usuario que creó el producto
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
    titulo: { type: String, required: true, trim: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true, trim: true },
    imagenesAdjuntas: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { discriminatorKey: 'tipo' });

const Product = mongoose.model('Product', productSchema);

const Ropa = Product.discriminator('Ropa', new mongoose.Schema({
    talla: { type: String, required: true },
}));

const Carta = Product.discriminator('Carta', new mongoose.Schema({
    certificadoAutenticidad: { type: Boolean, required: true },
}));

const Accesorio = Product.discriminator('Accesorio', new mongoose.Schema({
    categoria: { type: String, enum: ['Balones', 'Espinilleras', 'Otro'], required: true },
}));

export { Product, Ropa, Carta, Accesorio };