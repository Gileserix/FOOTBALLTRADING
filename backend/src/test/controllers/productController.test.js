import request from 'supertest';
import app from '../../../app.js';
import { Product, Ropa, Carta, Accesorio } from '../../models/product.js';
import connectDB from '../../loaders/mongo.js';
import User from '../../models/user.js';
import bcrypt from 'bcrypt';

describe('Product Controller', () => {
  beforeAll(async () => {
    // Conectar a la base de datos de prueba
    await connectDB();
  });

  afterAll(async () => {
    // Desconectar de la base de datos de prueba
  });

  afterEach(async () => {
    // Limpiar la base de datos de prueba
    await Product.deleteMany({});
  });

  test('should create a new product', async () => {
    const user = new User({
      username: 'testuser',
      password: await bcrypt.hash('password1234', 10), // Asegúrate de que la contraseña coincida
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St',
    });
    await user.save();

    // Generar un token de autenticación
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'password1234' }) // Asegúrate de que los datos coincidan
      .expect(200);

    const token = loginResponse.body.token;
    console.log('Generated Token:', token); // Depuración del token

    const newProduct = {
      titulo: 'Test Product',
      precio: 30,
      descripcion: 'This is a test card',
      tipo: 'Ropa',
      talla: 'M',
      createdBy: 'testuser',
    };

    const response = await request(app)
      .post('/api/upload-product')
      .set('Authorization', `Bearer ${token}`) // Enviar el token en el encabezado
      .send(newProduct)
      .expect(201);

    console.log('Response:', response.body); // Depuración de la respuesta

    expect(response.body.message).toBe('Producto creado exitosamente');
    expect(response.body.product.titulo).toBe(newProduct.titulo);
    expect(response.body.product.tipo).toBe(newProduct.tipo);
});

  test('should get all products', async () => {
    const product1 = new Ropa({ titulo: 'Product 1', precio: 50, descripcion: 'Description 1', talla: 'S', createdBy: 'testuser' });
    const product2 = new Ropa({ titulo: 'Product 2', precio: 75, descripcion: 'Description 2', talla: 'M', createdBy: 'testuser' });

    await product1.save();
    await product2.save();

    const response = await request(app)
      .get('/api/products')
      .expect(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].titulo).toBe(product1.titulo);
    expect(response.body[1].titulo).toBe(product2.titulo);
  });

  test('should delete a product by ID', async () => {
    const product = new Ropa({ titulo: 'Product to delete', precio: 100, descripcion: 'Description', talla: 'L', createdBy: 'testuser' });
    await product.save();

    const response = await request(app)
      .delete(`/api/products/${product._id}`)
      .expect(200);

    expect(response.body.message).toBe('Producto borrado exitosamente');
    expect(response.body.product._id).toBe(product._id.toString());
  });

  test('should update a product by ID', async () => {
    const product = new Ropa({ titulo: 'Product to update', precio: 100, descripcion: 'Description', talla: 'L', createdBy: 'testuser' });
    await product.save();

    const updatedProduct = {
      titulo: 'Updated Product',
      precio: 150,
      descripcion: 'Updated Description',
      talla: 'XL'
    };

    const response = await request(app)
      .put(`/api/products/${product._id}`)
      .send(updatedProduct)
      .expect(200);

    expect(response.body.message).toBe('Producto actualizado exitosamente');
    expect(response.body.product.titulo).toBe(updatedProduct.titulo);
  });

  test('should create a new card', async () => {

        const user = new User({
      username: 'usertest',
      password: await bcrypt.hash('password123', 10),
      email: 'usertest@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St',
    });
    await user.save();

    // Generar un token de autenticación
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ username: 'usertest', password: 'password123' })
      .expect(200);

    const token = loginResponse.body.token;

    const newCard = {
      titulo: 'Test Card',
      precio: 30,
      descripcion: 'This is a test card',
      tipo: 'Carta',
      certificadoAutenticidad: true,
      createdBy: 'usertest'
    };

    const response = await request(app)
      .post('/api/upload-product')
      .set('Authorization', `Bearer ${token}`) // Enviar el token en el encabezado
      .send(newCard)
      .expect(201);

    expect(response.body.message).toBe('Producto creado exitosamente');
    expect(response.body.product.titulo).toBe(newCard.titulo);
    expect(response.body.product.tipo).toBe(newCard.tipo);
  });

  test('should create a new accessory', async () => {
        const user = new User({
      username: 'pruebauser',
      password: await bcrypt.hash('password123', 10),
      email: 'pruebauser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St',
    });
    await user.save();

    // Generar un token de autenticación
    const loginResponse = await request(app)
      .post('/api/login')
      .send({ username: 'pruebauser', password: 'password123' })
      .expect(200);

    const token = loginResponse.body.token;

    const newAccessory = {
      titulo: 'Test Card',
      precio: 30,
      descripcion: 'This is a test card',
      tipo: 'Carta',
      certificadoAutenticidad: true,
      createdBy: 'pruebauser'
    };

    const response = await request(app)
      .post('/api/upload-product')
      .set('Authorization', `Bearer ${token}`) // Enviar el token en el encabezado
      .send(newAccessory)
      .expect(201);

    expect(response.body.message).toBe('Producto creado exitosamente');
    expect(response.body.product.titulo).toBe(newAccessory.titulo);
    expect(response.body.product.tipo).toBe(newAccessory.tipo);
});


  test('should return an error when failing to retrieve products', async () => {
    jest.spyOn(Product, 'find').mockImplementation(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .get('/api/products')
      .expect(500);

    expect(response.body.message).toBe('Error al obtener los productos');
    expect(response.body.error).toBe('Database error');
  });

  test('should return an error for invalid product type', async () => {
    const user = new User({
      username: 'testuser',
      password: await bcrypt.hash('password1234', 10),
      email: 'testuser@example.com',
      firstName: 'Test',
      lastName: 'User',
      birthDate: '1990-01-01',
      address: '123 Test St',
    });
    await user.save();

    const loginResponse = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'password1234' })
      .expect(200);

    const token = loginResponse.body.token;

    const invalidProduct = {
      titulo: 'Invalid Product',
      precio: 50,
      descripcion: 'This is an invalid product',
      tipo: 'InvalidType',
    };

    const response = await request(app)
      .post('/api/upload-product')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidProduct)
      .expect(400);

    expect(response.body.message).toBe('Tipo de producto no válido');
  });
});