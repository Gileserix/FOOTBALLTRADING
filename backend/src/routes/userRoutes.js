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
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

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