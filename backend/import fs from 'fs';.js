import fs from 'fs';
import { jest } from '@jest/globals';
import { swaggerSpec } from './src/services/swaggerConfig.js';

// backend/generateSwaggerJson.test.js

jest.mock('fs');

describe('generateSwaggerJson.js', () => {
  const outputFile = './swagger.json';
  const swaggerJson = JSON.stringify(swaggerSpec, null, 2);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should generate the Swagger JSON file successfully', () => {
    fs.writeFileSync.mockImplementation(() => {});
    require('./generateSwaggerJson.js'); // Execute the file

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      outputFile,
      swaggerJson,
      'utf8',
      expect.any(Function)
    );
  });

  test('should log an error if file generation fails', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('File write error');
    fs.writeFileSync.mockImplementation(() => {
      throw error;
    });

    try {
      require('./generateSwaggerJson.js'); // Execute the file
    } catch (e) {
      // Catch the error to prevent test failure
    }

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error al generar el archivo JSON de Swagger:',
      error
    );

    consoleErrorSpy.mockRestore();
  });
});