import mongoose from 'mongoose';

const connectDB = async () => {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'Foot-trading' // Asegúrate de que el nombre de la base de datos sea correcto
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;