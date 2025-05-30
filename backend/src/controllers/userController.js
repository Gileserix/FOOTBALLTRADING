import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../services/emailService.js';
import { Product } from '../models/product.js';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const createUserController = async (req, res) => {
    const { username, password, email, firstName, lastName, birthDate, address } = req.body;

    try {
        // Verificar si el usuario o correo ya existen
        const existingUser = await User.findOne({ $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario o correo ya están en uso' });
        }

        // Validar el formato del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|es)$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'El correo electrónico debe contener "@" y terminar en ".com" o ".es".',
            });
        }

        // Validar la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener entre 8 y 12 caracteres.',
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario con los datos en minúsculas
        const newUser = new User({
            username: username.toLowerCase(),
            password: hashedPassword,
            email: email.toLowerCase(),
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            birthDate,
            address: address.toLowerCase(),
            isVerified: false,
        });

        await newUser.save();

        // Generar token de verificación
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, secretKey, { expiresIn: '1h' });

        // Enviar correo de verificación
        await sendVerificationEmail(newUser.email, token);

        res.status(201).json({ message: 'Usuario creado. Verifica tu correo electrónico.', user: newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

export const loginUserController = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username: username.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Verificar si el correo está verificado
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Por favor, verifica tu correo electrónico antes de iniciar sesión.' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token, user: { username: user.username } });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};

export const getUserProfileController = async (req, res) => {
    const { username } = req.query;

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            address: user.address
        });
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al obtener el perfil del usuario', error: error.message });
    }
};

export const deleteUserController = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar y eliminar el usuario por ID
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar los productos asociados al usuario
        await Product.deleteMany({ createdBy: id });

        res.status(200).json({ message: 'Usuario y sus productos asociados eliminados exitosamente', user: deletedUser });
    } catch (error) {
        res.status(400).json({ message: 'Error al borrar el usuario', error: error.message });
    }
};