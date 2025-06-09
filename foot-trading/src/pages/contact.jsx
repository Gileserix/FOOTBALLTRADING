import React from 'react';
import '../styles/contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Contacto</h2>
            <div className="contact-info">
                <p><strong>Dirección:</strong> Calle Falsa 123, Sevilla, España</p>
                <p><strong>Teléfono:</strong> +34 123 456 789</p>
                <p><strong>Correo:</strong> contacto@footballtrading.com</p>
            </div>
            <div className="map-container">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.349347744841!2d-5.984458684692798!3d37.38909297983188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126e4c2f0f0f0f%3A0x80858064f0f0f0f0!2sSevilla%2C%20España!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;