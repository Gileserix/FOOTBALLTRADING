import request from 'supertest';
import app from '../../app.js';
import User from '../models/user.js';
import connectDB from '../services/mongo.js';

describe('User Controller', () => {
  beforeAll(async () => {
    // Conectar a la base de datos de prueba
    connectDB();
  });

  afterAll(async () => {
    // Desconectar de la base de datos de prueba
  });

  afterEach(async () => {
    // Limpiar la base de datos de prueba
    await User.deleteMany({});
  });

  test('should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password123',
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);

    expect(response.body.message).toBe('Usuario creado exitosamente');
    expect(response.body.user.username).toBe(newUser.username);
  });

  // Añadir más pruebas según sea necesario
});