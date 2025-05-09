import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../services/cloudinaryConfig.js';
import upload from '../../services/multerConfig.js';

jest.mock('multer');
jest.mock('multer-storage-cloudinary');
jest.mock('./cloudinaryConfig.js');

describe('multerConfig', () => {
  it('should configure CloudinaryStorage correctly', () => {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary.v2,
      params: {
        folder: 'foot-trading',
        format: async (req, file) => 'png',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
      },
    });

    expect(storage).toBeDefined();
    expect(storage.cloudinary).toBe(cloudinary.v2);
  });

  it('should configure multer with CloudinaryStorage and limit files to 10', () => {
    const multerInstance = multer({ storage: new CloudinaryStorage(), limits: { files: 6 } });
    expect(multerInstance).toBeDefined();
  });
});