import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/swagger.js';

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

router.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        console.log('Token recibido:', token);
        const decoded = jwt.verify(token, secretKey);
        console.log('Token decodificado:', decoded);

        const user = await User.findById(decoded.id);
        console.log('Usuario encontrado:', user);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar que la contraseña encriptada coincida
        if (user.password !== decoded.password) {
            return res.status(400).json({ message: 'Token inválido o expirado.' });
        }

        // Marcar el correo como verificado
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error al verificar el correo:', error);
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;