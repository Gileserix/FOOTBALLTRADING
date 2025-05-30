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

        // Decodificar el token para obtener el ID del usuario
        const decoded = jwt.decode(token);
        console.log('Token decodificado:', decoded);

        // Buscar al usuario en la base de datos
        const user = await User.findById(decoded.id);
        console.log('Usuario encontrado:', user);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Comparar el token recibido con los datos del usuario
        const isTokenValid = jwt.verify(token, user.password); // Usar la contraseña encriptada como clave secreta
        if (!isTokenValid) {
            return res.status(400).json({ message: 'Token inválido o expirado.' });
        }

        // Marcar el correo como verificado
        user.isVerified = true;
        await user.save();
        console.log('Usuario actualizado:', user);

        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error al verificar el correo:', error);
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;