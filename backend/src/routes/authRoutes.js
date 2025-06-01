// filepath: c:\Users\Fausto\Desktop\2DAW\EntornoServidor\FOOTBALLTRADING\backend\src\routes\authRoutes.js
import express from 'express';
import { loginUserController } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', loginUserController);

export default router;