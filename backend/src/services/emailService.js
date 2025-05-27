import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'localhost', // MailHog escucha en localhost
    port: 1025,        // Puerto SMTP de MailHog
    secure: false,     // No se usa TLS
});

export const sendVerificationEmail = async (to, token) => {
    const verificationUrl = `https://footballtrading.onrender.com/verify-email?token=${token}`;
    const mailOptions = {
        from: '"Foot Trading" <no-reply@footballtrading.com>',
        to,
        subject: 'Verifica tu correo electrónico',
        html: `
            <h1>Verifica tu correo electrónico</h1>
            <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${to}`);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};