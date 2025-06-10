import request from 'supertest';
import app from '../../../app.js';

describe('Password Controller', () => {
  test('should send a password reset email', async () => {
    const response = await request(app)
      .post('/api/forgot-password')
      .send({ email: 'test@example.com' })
      .expect(200);

    expect(response.body.message).toBe('Correo de recuperación enviado');
  });

  test('should reset the password', async () => {
    const response = await request(app)
      .post('/api/reset-password')
      .send({ token: 'valid-token', newPassword: 'newPassword123' })
      .expect(200);

    expect(response.body.message).toBe('Contraseña actualizada exitosamente');
  });
});