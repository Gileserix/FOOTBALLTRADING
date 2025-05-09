import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - email
 *         - firstName
 *         - lastName
 *         - birthDate
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *         lastName:
 *           type: string
 *           description: Apellidos del usuario
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del usuario
 *         address:
 *           type: string
 *           description: Dirección del usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true // Almacenar en minúsculas
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true // Almacenar en minúsculas
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;