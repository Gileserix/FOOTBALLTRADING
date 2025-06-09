import Stripe from 'stripe';
import { Product } from '../models/product.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    const { cartItems } = req.body;

    try {
        // Calcular el total del carrito
        const totalAmount = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);

        // Crear un PaymentIntent en Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Stripe usa centavos
            currency: 'eur',
            payment_method_types: ['card'],
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error al crear PaymentIntent:', error);
        res.status(500).json({ message: 'Error al crear PaymentIntent', error: error.message });
    }
};

export const handlePaymentSuccess = async (req, res) => {
    const { cartItems } = req.body;

    try {
        // Eliminar los productos comprados de la base de datos
        const productIds = cartItems.map(item => item._id);
        await Product.deleteMany({ _id: { $in: productIds } });

        res.status(200).json({ message: 'Productos eliminados exitosamente' });
    } catch (error) {
        console.error('Error al eliminar productos:', error);
        res.status(500).json({ message: 'Error al eliminar productos', error: error.message });
    }
};