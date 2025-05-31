import express from 'express';
import { verifyEmailController } from '../controllers/userController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/swagger.js';

const router = express.Router();
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

router.get('/verify-email', verifyEmailController);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;