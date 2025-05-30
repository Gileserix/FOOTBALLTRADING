import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

const mailOptions = {
    from: '"Foot Trading" <no-reply@footballtrading.com>',
    to: 'flopezalba@adaits.es', // Cambia esto por tu correo para probar
    subject: 'Prueba de envío de correo',
    text: 'Este es un correo de prueba enviado desde nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo:', error);
    } else {
        console.log('Correo enviado:', info.response);
    }
});