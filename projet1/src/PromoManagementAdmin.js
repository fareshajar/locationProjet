import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PromoManagement.css';
import {useLocation, useNavigate} from "react-router-dom";
import {FaArrowLeft, FaEdit, FaTrash} from "react-icons/fa"; // Assurez-vous que le chemin est correct

const PromoManagementAdmin= () => {
    const [promos, setPromos] = useState([]);
    const [newPromo, setNewPromo] = useState({
        codePromo: '',
        pourcentage: ''
    });

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/Planing' );
    };

    // Fonction pour récupérer les promos existants
    useEffect(() => {
        axios.get('http://localhost:8083/api/codePromos')
            .then(response => {
                // Affiche les données récupérées dans la console
                console.log('Promos récupérées:', response.data);

                // Met à jour l'état avec les données récupérées
                setPromos(response.data);
            })
            .catch(error => console.error('Erreur lors de la récupération des promos:', error));
    }, []);

    // Fonction pour ajouter un nouveau promo
    const handleAddPromo = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8083/api/codePromos', newPromo)
            .then(response => {
                setPromos([...promos, response.data]);
                setNewPromo({ codePromo: '', pourcentage: '' });
            })
            .catch(error => console.error('Erreur lors de l\'ajout du promo:', error));
    };

    // Fonction pour gérer les changements de formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPromo({ ...newPromo, [name]: value });
    };
    const handleDeletePromo = (id) => {
        axios.delete(`http://localhost:8083/api/codePromos/${id}`)
            .then(() => {
                // Filtrer les promos après suppression
                setPromos(promos.filter(promo => promo.id !== id));
            })
            .catch(error => console.error('Erreur lors de la suppression du promo:', error));
    };

    return (
        <div className="promo-management">
            <button className="back-button" onClick={handleBack}><FaArrowLeft/></button>
            <h2>Gestion des Codes Promo</h2>
            {/* Formulaire pour ajouter un nouveau code promo */}
            <form onSubmit={handleAddPromo} className="promo-form">
                <div>
                    <label>Code Promo:</label>
                    <input
                        type="text"
                        name="codePromo"
                        value={newPromo.codePromo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Pourcentage:</label>
                    <input
                        type="number"
                        name="pourcentage"
                        value={newPromo.pourcentage}
                        onChange={handleInputChange}
                        required
                        min="0"
                        max="100"
                    />
                </div>
                <button type="submit">Ajouter Promo</button>
            </form>

            {/* Affichage des codes promo existants */}
            <div className="promo-list">
                <h3>Promos Existants</h3>
                <div className="promo-cards">
                    {promos.map(promo => (
                        <div className="promo-card" key={promo.id}>
                            <div className="promo-card-content">
                                <h4>{promo.codePromo}</h4>
                                <p>{promo.pourcentage}% de réduction</p>
                            </div>
                            <button
                                className="delete-button"
                                onClick={() => handleDeletePromo(promo.id)}
                            >
                                <FaTrash/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoManagementAdmin;
