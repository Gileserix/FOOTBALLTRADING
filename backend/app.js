import express from 'express';
import dotenv from 'dotenv';
import expressLoader from './src/loaders/express.js';
import loaders from './src/loaders/index.js';
import { swaggerUi, swaggerSpec } from './src/services/swaggerConfig.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

expressLoader(app);

// Configurar Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Lanzo la carga inicial Loaders*/

app.use((req, res, next) => {
    console.error(`Ruta no encontrada: ${req.url}`);
    res.status(404).send('Ruta no encontrada');
});

//Configuracion de los servicios
loaders.init(app);

export default app;