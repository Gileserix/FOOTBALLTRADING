import { Router } from 'express';
import upload from '../services/multerConfig.js';
import { createUserController, deleteUserController, loginUserController, getUserProfileController } from '../controllers/userController.js';
import { createProductController, deleteProductController, updateProductController } from '../controllers/productController.js';
import { Product } from '../models/product.js'; // Asegúrate de importar el modelo Product

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al crear el usuario
 */
router.post('/users', createUserController);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *       400:
 *         description: Nombre de usuario o contraseña incorrectos
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/login', loginUserController);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Obtener el perfil del usuario
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                 address:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el perfil del usuario
 */
router.get('/users/profile', getUserProfileController);

/**
 * @swagger
 * /upload-product:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               precio:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               tipo:
 *                 type: string
 *               talla:
 *                 type: string
 *               certificadoAutenticidad:
 *                 type: boolean
 *               categoria:
 *                 type: string
 *               imagenesAdjuntas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error al crear el producto
 */
router.post('/upload-product', upload.array('imagenesAdjuntas', 10), createProductController);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error al obtener los productos
 */
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Borrar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario borrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error al borrar el usuario
 */
router.delete('/users/:id', deleteUserController);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Borrar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto borrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al borrar el producto
 */
router.delete('/products/:id', deleteProductController);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               precio:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               tipo:
 *                 type: string
 *               talla:
 *                 type: string
 *               certificadoAutenticidad:
 *                 type: boolean
 *               categoria:
 *                 type: string
 *               imagenesAdjuntas:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *       400:
 *         description: Error al actualizar el producto
 */
router.put('/products/:id', updateProductController);

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        // 1. Decodifica el token para obtener el id
        const decoded = jwt.decode(token);
        if (!decoded?.id) {
            return res.status(400).json({ message: 'Token inválido.' });
        }

        // 2. Busca el usuario
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // 3. Verifica el token usando la contraseña encriptada como clave
        jwt.verify(token, user.password);

        // 4. Marca el usuario como verificado
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error al verificar el correo:', error);
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
});

export default router;