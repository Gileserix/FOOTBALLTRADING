import request from 'supertest';
import app from '../../../app.js';
import { Product, Ropa } from '../../models/product.js';
import connectDB from '../../services/mongo.js';

describe('Product Controller', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  test('should create a new product', async () => {
    const newProduct = {
      titulo: 'Test Product',
      precio: 100,
      descripcion: 'This is a test product',
      tipo: 'Ropa',
      talla: 'M'
    };

    const response = await request(app)
      .post('/api/upload-product')
      .send(newProduct)
      .expect(201);

    expect(response.body.message).toBe('Producto creado exitosamente');
    expect(response.body.product.titulo).toBe(newProduct.titulo);
  });

  test('should get all products', async () => {
    const product1 = new Ropa({ titulo: 'Product 1', precio: 50, descripcion: 'Description 1', talla: 'S' });
    const product2 = new Ropa({ titulo: 'Product 2', precio: 75, descripcion: 'Description 2', talla: 'M' });

    await product1.save();
    await product2.save();

    const response = await request(app)
      .get('/api/products')
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].titulo).toBe(product1.titulo);
    expect(response.body[1].titulo).toBe(product2.titulo);
  });
});