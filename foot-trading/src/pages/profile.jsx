import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../services/userContext';
import '../styles/profile.css';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users/profile', {
                    params: { username: user }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            }
        };

        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    if (!userProfile) {
        return <div>Cargando...</div>;
    }

    // Formatear la fecha de nacimiento
    const formattedBirthDate = new Date(userProfile.birthDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <div className="profile-container">
            <h2>Perfil de Usuario</h2>
            <div className="profile-info">
                <p><strong>Nombre de Usuario:</strong> {userProfile.username}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Nombre:</strong> {userProfile.firstName}</p>
                <p><strong>Apellidos:</strong> {userProfile.lastName}</p>
                <p><strong>Fecha de Nacimiento:</strong> {formattedBirthDate}</p>
                <p><strong>Dirección:</strong> {userProfile.address}</p>
            </div>
        </div>
    );
};

export default Profile;