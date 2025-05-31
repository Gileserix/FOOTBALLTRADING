import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verificando tu correo...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setMessage('Token de verificación no proporcionado.');
      return;
    }
    axios.get(`https://footballtrading.onrender.com/api/users/verify-email?token=${token}`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response?.data?.message || 'Error al verificar el correo.'));
  }, [searchParams]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message}</h1>
    </div>
  );
};

export default EmailConfirmation;