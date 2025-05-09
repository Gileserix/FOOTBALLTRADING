import React from 'react';
import '../styles/homePage.css';
import Newsletter from '../components/newsletter';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="logo-large">
        <img src="../assets/images/Topps.png" alt="Logo Grande" />
      </div>
      <div className="welcome-text">
        <p>Bienvenido a la nueva página de tradeos de fútbol profesional. En esta página web encontrarás la mejor calidad de productos tanto sellados como productos firmados, serigrafiados y de cualquier momento de la historia.</p>
        <p>Podéis, desde un solo click, encontrar productos tanto profesionales como la venta en mano de productos actuales hasta la década de los 80/90 las cuales ilusionan hasta los más coleccionistas.</p>
      </div>
      <div className="content-section">
        <div className="content-left">
          <img src="../assets/images/Camion.png" alt="Imagen 1" />
        </div>
        <div className="content-right">
          <p>Entregas rapidas</p>
        </div>
      </div>
      <div className="content-section">
        <div className="content-right">
          <p>Productos de calidad</p>
        </div>
        <div className="content-left">
          <img src="../assets/images/CamisetaDepor.png" alt="Imagen 2" />
        </div>
      </div>
      <div className="content-section">
        <div className="content-left">
          <img src="../assets/images/CartaFirmada.png" alt="Imagen 3" />
        </div>
        <div className="content-right">
          <p>Productos firmados</p>
        </div>
      </div>
      <div className="newsletter-container">
        <Newsletter />
      </div>
    </div>
  );
};

export default HomePage;
