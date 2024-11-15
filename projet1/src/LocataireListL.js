import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocataireList.css'; // Assurez-vous que le chemin est correct
import {FaArrowLeft, FaEdit, FaTrash} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";

const LocataireList = () => {
    const [locataires, setLocataires] = useState([]);
    const [form, setForm] = useState({ nom: '', prenom: '', gsm: '', email: '', cim: '' });
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchLocataires();
    }, []);

    const fetchLocataires = async () => {
        try {
            const response = await axios.get('http://localhost:8083/locataires');
            console.log(response.data);
            setLocataires(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des locataires:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddLocataire = async () => {
        try {
            await axios.post('http://localhost:8083/locataires', form);
            fetchLocataires();
            setForm({ nom: '', prenom: '', gsm: '', email: '', cim: '' });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du locataire:', error);
        }
    };

    const handleEditLocataire = async () => {
        try {
            await axios.put(`http://localhost:8083/locataires/${currentId}`, form);
            fetchLocataires();
            setEditMode(false);
            setCurrentId(null);
            setForm({ nom: '', prenom: '', gsm: '', email: '', cim: '' });
        } catch (error) {
            console.error('Erreur lors de la modification du locataire:', error);
        }
    };

    const handleDeleteLocataire = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/locataires/${id}`);
            fetchLocataires();
        } catch (error) {
            console.error('Erreur lors de la suppression du locataire:', error);
        }
    };

    const handleEditButtonClick = (locataire) => {
        setForm({
            nom: locataire.nom,
            prenom: locataire.prenom,
            gsm: locataire.gsm,
            email: locataire.email,
            cim: locataire.cim,
        });
        setCurrentId(locataire.id);
        setEditMode(true);
    };
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
            console.log('Setting userId to:', location.state.userId);
        }
    }, [location.state]);
    const handleBack = () => {
        navigate('/PlaningLocateur',{ state: { userId } });
    };

    return (
            <div className="form-container">
                <button className="back-button" onClick={handleBack}><FaArrowLeft/></button>
                <h2>Gestion des locataires </h2>

                <table>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>GSM</th>
                        <th>Email</th>
                        <th>CIM</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {locataires.map(locataire => (
                        <tr key={locataire.id}>
                            <td>{locataire.nom}</td>
                            <td>{locataire.prenom}</td>
                            <td>{locataire.gsm}</td>
                            <td>{locataire.email}</td>
                            <td>{locataire.cim}</td>
                            <td>
                                <button onClick={() => handleEditButtonClick(locataire)} className="button"><FaEdit/></button>
                                <button onClick={() => handleDeleteLocataire(locataire.id)}><FaTrash/></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={form.nom}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    value={form.prenom}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="gsm"
                    placeholder="GSM"
                    value={form.gsm}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                    className="form-input"
                />
                <input
                    type="text"
                    name="cim"
                    placeholder="CIM"
                    value={form.cim}
                    onChange={handleInputChange}
                />
                <button onClick={editMode ? handleEditLocataire : handleAddLocataire} className="ajoutermodifier">
                    {editMode ? 'Modifier' : 'Ajouter'}
                </button>
            </div>
    );
};

export default LocataireList;
