import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../services/userContext';
import { useSearchParams } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const { user } = useContext(UserContext); // Usuario actual
    const [editingField, setEditingField] = useState(null);
    const [updatedValue, setUpdatedValue] = useState('');
    const [searchParams] = useSearchParams(); // Obtener parámetros de la URL
    const username = searchParams.get('username') || user; // Si no hay parámetro, usa el usuario actual

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('https://footballtrading.onrender.com/api/users/profile', {
                    params: { username }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            }
        };

        if (username) {
            fetchUserProfile();
        }
    }, [username]);

    const handleEdit = (field, value) => {
        setEditingField(field);
        setUpdatedValue(value);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put('https://footballtrading.onrender.com/api/users/profile', {
                username: user, // El nombre de usuario para identificar al usuario actual
                [editingField]: updatedValue // El campo que se está editando y su nuevo valor
            });
            alert('Datos actualizados exitosamente');
            setUserProfile({ ...userProfile, [editingField]: updatedValue }); // Actualiza el estado local
            setEditingField(null); // Finaliza la edición
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            alert('Error al actualizar los datos');
        }
    };

    if (!userProfile) {
        return <div>Cargando...</div>;
    }

    const formattedBirthDate = new Date(userProfile.birthDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const isCurrentUser = username === user; // Verificar si el perfil pertenece al usuario actual

    return (
        <div className="profile-container">
            <h2>Perfil de Usuario</h2>
            <div className="profile-info">
                {Object.entries(userProfile).map(([key, value]) => (
                    <div key={key} className="profile-row">
                        <p><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {key === 'birthDate' ? formattedBirthDate : value}</p>
                        {isCurrentUser && key !== 'username' && (
                            editingField === key ? (
                                <>
                                    <input
                                        type="text"
                                        value={updatedValue}
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                    />
                                    <button onClick={handleSave}>Guardar</button>
                                </>
                            ) : (
                                <button onClick={() => handleEdit(key, value)}>Editar</button>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;