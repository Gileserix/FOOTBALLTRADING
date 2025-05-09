import request from 'supertest';
import app from '../../../app.js';
import User from '../../models/user.js';
import connectDB from '../../services/mongo.js';
import bcrypt from 'bcrypt';

describe('User Controller', () => {
  beforeAll(async () => {
    // Conectar a la base de datos de prueba
    await connectDB();
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

  test('should login a user', async () => {
    const newUser = new User({
      username: 'testuser',
      password: await bcrypt.hash('password123', 10),
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St'
    });
    await newUser.save();

    const loginData = {
      username: 'testuser',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/login')
      .send(loginData)
      .expect(200);

    expect(response.body.message).toBe('Inicio de sesión exitoso');
    expect(response.body.user.username).toBe(newUser.username);
  });

  test('should get user profile', async () => {
    const newUser = new User({
      username: 'testuser',
      password: await bcrypt.hash('password123', 10),
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St'
    });
    await newUser.save();

    const response = await request(app)
      .get('/api/users/profile')
      .query({ username: 'testuser' })
      .expect(200);

    expect(response.body.username).toBe(newUser.username);
    expect(response.body.email).toBe(newUser.email);
  });

  test('should delete a user by ID', async () => {
    const newUser = new User({
      username: 'testuser',
      password: await bcrypt.hash('password123', 10),
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St'
    });
    await newUser.save();

    const response = await request(app)
      .delete(`/api/users/${newUser._id}`)
      .expect(200);

    expect(response.body.message).toBe('Usuario borrado exitosamente');
    expect(response.body.user._id).toBe(newUser._id.toString());
  });
});