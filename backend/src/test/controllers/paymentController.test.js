import request from 'supertest';
import app from '../../../app.js';

describe('Payment Controller', () => {
  test('should process a payment', async () => {
    const paymentData = {
      amount: 100,
      currency: 'EUR',
      description: 'Test Payment',
    };

    const response = await request(app)
      .post('/api/create-payment-intent')
      .send(paymentData)
      .expect(200);

    expect(response.body.message).toBe('Pago procesado exitosamente');
    expect(response.body.paymentId).toBeDefined();
  });
});