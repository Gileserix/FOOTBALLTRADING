import React from 'react';
import '../../styles/footer.css'; // Asegúrate de que el archivo CSS esté importado

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <img src="../../assets/images/LogoGrande.png" alt="Logo" />
      </div>
      <div className="footer-message">
        <p>&copy; 2025 Football Trading. Todos los derechos reservados.</p>
      </div>
      <div className="footer-social">
        <p>Seguinos en nuestras redes:</p>
        <div className="social-icons">
          <img src="facebook.png" alt="Facebook" />
          <img src="twitter.png" alt="Twitter" />
          <img src="instagram.png" alt="Instagram" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
