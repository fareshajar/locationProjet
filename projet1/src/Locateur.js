import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaTrash, FaEdit, FaArrowLeft} from 'react-icons/fa';
import './locateur.css';
import {useNavigate} from "react-router-dom";

const Locateur = () => {
    const [locateurs, setLocateurs] = useState([]);
    const [newLocateur, setNewLocateur] = useState({
        nom: '',
        prenom: '',
        adresse: '',
        gsm: '',
        email: '',
        commentaire: '',
        locateur_code:'',
        password:''
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/Planing' );
    };

    useEffect(() => {
        fetchLocateurs();
    }, []);

    const fetchLocateurs = async () => {
        try {
            const response = await axios.get('http://localhost:8083/locateurs');
            setLocateurs(response.data);
        } catch (error) {
            console.error('Error fetching locateurs:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLocateur({ ...newLocateur, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const locateurToSubmit = {
            ...newLocateur,
            typeUtilisateur: "locateur" // Ajout automatique du type utilisateur
        };
        console.log(newLocateur)
        try {
            if (isEditing) {
                await axios.put('http://localhost:8083/locateurs/update', locateurToSubmit, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                await axios.post('http://localhost:8083/locateurs/create', locateurToSubmit, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            setNewLocateur({
                nom: '',
                prenom: '',
                adresse: '',
                gsm: '',
                email: '',
                commentaire: '',
                locateur_code: '',
                password: ''
            });

            setIsEditing(false);
            fetchLocateurs();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/locateurs/${id}`);
            fetchLocateurs();
        } catch (error) {
            console.error('Error deleting locateur:', error);
        }
    };

    const handleEdit = (locateur) => {
        setNewLocateur(locateur);
        setIsEditing(true);
    };

    return (
        <div className="owner-list-container">
            <button className="back-button" onClick={handleBack}><FaArrowLeft/></button>
            <h3>Propriétaires </h3>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Adresse</th>
                    <th>GSM</th>
                    <th>Email</th>
                    <th>Commentaire</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {locateurs.map((locateur) => (
                    <tr key={locateur.id}>
                        <td>{locateur.nom}</td>
                        <td>{locateur.prenom}</td>
                        <td>{locateur.adresse}</td>
                        <td>{locateur.gsm}</td>
                        <td>{locateur.email}</td>
                        <td>{locateur.commentaire}</td>
                        <td>
                            <button onClick={() => handleDelete(locateur.id)} className="button">
                                <FaTrash/>
                            </button>
                            <button onClick={() => handleEdit(locateur)}>
                                <FaEdit/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>{isEditing ? 'Modifier le Propriétaire' : 'Ajouter un nouveau Propriétaire'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={newLocateur.nom}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={newLocateur.prenom}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    value={newLocateur.adresse}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="gsm"
                    placeholder="GSM"
                    value={newLocateur.gsm}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="locateur_code"
                    placeholder="locateur_code"
                    value={newLocateur.locateur_code}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    value={newLocateur.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newLocateur.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="commentaire"
                    placeholder="Commentaire"
                    value={newLocateur.commentaire}
                    onChange={handleChange}
                    required
                ></textarea>
                <button>{isEditing ? 'Modifier' : 'Ajouter'}</button>
            </form>
        </div>
    );
};

export default Locateur;
