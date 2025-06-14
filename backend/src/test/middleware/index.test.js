import authMiddleware  from '../../middleware/authMiddleware.js';
import  errorHandlerMiddleware  from '../../middleware/errorHandlerMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import request from 'supertest';
import express from 'express';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../../models/user.js');

describe('Middlewares', () => {
  describe('authMiddleware', () => {
    it('should call next if token is valid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer valid_token'
        }
      };
      const res = {};
      const next = jest.fn();

      jwt.verify.mockReturnValue({ id: 'user_id', password: 'hashed_password' });
      User.findById.mockResolvedValue({ _id: 'user_id', password: 'hashed_password' });
      bcrypt.compare.mockResolvedValue(true);

      await authMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('valid_token', expect.any(String));
      expect(User.findById).toHaveBeenCalledWith('user_id');
      expect(bcrypt.compare).toHaveBeenCalledWith('hashed_password', 'hashed_password');
      expect(req.user).toEqual({ _id: 'user_id', password: 'hashed_password' });
      expect(next).toHaveBeenCalled();
    });

    it('should return 401 if token is missing', () => {
      const req = {
        headers: {}
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
    });

    it('should return 401 if token is invalid', async () => {
      const req = {
        headers: {
          authorization: 'Bearer invalid_token'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });
  });

  describe('errorHandlerMiddleware', () => {
    it('should return 500 if an error occurs', () => {
      const err = new Error('Test error');
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      errorHandlerMiddleware(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Something broke!', error: err.message });
    });
  });

  describe('Error Handler Middleware', () => {
    let app;

    beforeAll(() => {
      app = express();

      // Ruta que lanza un error para probar el middleware
      app.get('/error', (req, res, next) => {
        const error = new Error('Test error');
        next(error);
      });

      // Middleware de manejo de errores
      app.use(errorHandlerMiddleware);
    });

    test('should handle errors and return a 500 status code', async () => {
      const response = await request(app)
        .get('/error')
        .expect(500);

      expect(response.body.message).toBe('Something broke!');
      expect(response.body.error).toBe('Test error');
    });
  });
});