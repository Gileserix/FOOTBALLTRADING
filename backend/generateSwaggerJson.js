import fs from 'fs';
import { swaggerSpec } from './src/services/swaggerConfig.js';

// Generar el archivo JSON de Swagger
const outputFile = './swagger.json';
const swaggerJson = JSON.stringify(swaggerSpec, null, 2);

fs.writeFileSync(outputFile, swaggerJson, 'utf8', (err) => {
  if (err) {
    console.error('Error al generar el archivo JSON de Swagger:', err);
  } else {
    console.log('Archivo JSON de Swagger generado exitosamente:', outputFile);
  }
});