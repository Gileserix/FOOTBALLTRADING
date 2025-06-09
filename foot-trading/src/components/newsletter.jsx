import React, { useState } from 'react';
import '../styles/newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para manejar la suscripción
    console.log(`Email suscrito: ${email}`);
  };

  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h2>Suscríbete a nuestro boletín</h2>
        <div className="newsletter-form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Introduce tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </div>
      <img src="../assets/images/Newsletter.png" alt="Newsletter" />
    </div>
  );
};

export default Newsletter;
