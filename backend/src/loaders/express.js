import express from 'express';
import routes from '../routes/index.js';
import cors from 'cors';
import path from 'path';

const __filename = path.join(process.cwd(), 'backend/src/loaders/express.js');
const __dirname = path.dirname(__filename);

export default (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const corsOptions = {
        origin: ['https://footballtrading.onrender.com', 'https://footballtrading.vercel.app', 'localhost:3000'], // Agregar el dominio de Vercel
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true // Permitir el uso de cookies o credenciales
    };
    app.use(cors(corsOptions));

    // Load API routes with /api prefix
    app.use('/api', routes);

    // Serve static files from the "public" directory
    app.use(express.static('public'));

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
};