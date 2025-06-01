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

export const sendVerificationEmail = async (to, token) => {
    const verificationUrl = `https://footballtrading.vercel.app/verify-email?token=${token}`; // Cambiar al dominio del frontend
    const mailOptions = {
        from: '"Foot Trading" <no-reply@footballtrading.com>',
        to,
        subject: 'Verifica tu cuenta en Foot Trading',
        html: `
            <h1>Verifica tu cuenta</h1>
            <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo de verificación enviado a ${to}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};