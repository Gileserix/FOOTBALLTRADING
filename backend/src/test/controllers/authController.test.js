import request from 'supertest';
import app from '../../../app.js';
import User from '../../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

describe('Auth Controller', () => {
  let token;
  let user;

  beforeAll(async () => {
    // Crear un usuario de prueba
    user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St',
    });
    await user.save();

    // Generar un token válido
    token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    // Limpiar la base de datos
    await User.deleteMany({});
  });

  test('should verify a valid token and return the user', async () => {
    const response = await request(app)
      .get('/api/verify-token') // Asegúrate de que la ruta coincida con tu implementación
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(user.email);
  });

  test('should return an error for missing token', async () => {
    const response = await request(app)
      .get('/api/verify-token') // Asegúrate de que la ruta coincida con tu implementación
      .expect(401);

    expect(response.body.message).toBe('Token no proporcionado');
  });

  test('should return an error for invalid token', async () => {
    const invalidToken = jwt.sign({ id: user._id, email: user.email }, 'wrong-secret', { expiresIn: '1h' });

    const response = await request(app)
      .get('/api/verify-token') // Asegúrate de que la ruta coincida con tu implementación
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);

    expect(response.body.message).toBe('Token inválido');
  });

  test('should return an error for non-existent user', async () => {
    const tokenForNonExistentUser = jwt.sign({ id: 'nonexistentid', email: 'nonexistent@example.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = await request(app)
      .get('/api/verify-token') // Asegúrate de que la ruta coincida con tu implementación
      .set('Authorization', `Bearer ${tokenForNonExistentUser}`)
      .expect(404);

    expect(response.body.message).toBe('Usuario no encontrado');
  });
});