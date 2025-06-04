import express from 'express';
import { updateUserController } from '../controllers/userController.js';

const router = express.Router();

router.put('/profile', updateUserController);

export default router;