import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Foot Trading API',
      version: '1.0.0',
      description: 'API documentation for Foot Trading project',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // Archivos donde se documentarán las rutas y modelos
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };