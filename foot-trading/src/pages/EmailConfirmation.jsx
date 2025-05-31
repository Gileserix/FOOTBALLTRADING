import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verificando tu correo...');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMessage('Token de verificación no proporcionado.');
      setSuccess(false);
      return;
    }
    axios.get(`https://footballtrading.onrender.com/api/users/verify-email?token=${token}`)
      .then(res => {
        setMessage('¡Tu correo ha sido verificado con éxito!');
        setSuccess(true);
      })
      .catch(err => {
        setMessage(err.response?.data?.message || 'Error al verificar el correo.');
        setSuccess(false);
      });
  }, [searchParams]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: success ? 'green' : 'red' }}>{message}</h1>
      {success && <p>Puedes iniciar sesión con tu cuenta verificada.</p>}
    </div>
  );
};

export default EmailConfirmation;