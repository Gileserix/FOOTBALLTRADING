import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'foot-trading', // Nombre de la carpeta en Cloudinary
    format: async (req, file) => 'png', // Formato de las imágenes
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({
  storage,
  limits: { files: 6 } // Limitar la cantidad de archivos a 10
});

export default upload;