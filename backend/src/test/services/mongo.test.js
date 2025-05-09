import mongoose from 'mongoose';
import connectDB from '../../services/mongo.js';

jest.mock('mongoose');

describe('MongoDB Connection', () => {
  it('should connect to MongoDB', async () => {
    mongoose.connect.mockResolvedValueOnce({});
    await connectDB();
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should handle connection errors', async () => {
    const error = new Error('Connection error');
    mongoose.connect.mockRejectedValueOnce(error);

    try {
      await connectDB();
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});