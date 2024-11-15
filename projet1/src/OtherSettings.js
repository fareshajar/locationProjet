import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OtherSettings.css';
import { FaArrowLeft, FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OtherSettings = () => {
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [options, setOptions] = useState([]);
    const [editingType, setEditingType] = useState(null);
    const [editingOption, setEditingOption] = useState(null);
    const [newTypeName, setNewTypeName] = useState('');
    const [newOptionName, setNewOptionName] = useState('');
    const [addingType, setAddingType] = useState(false);
    const [addingOption, setAddingOption] = useState(false);
    const [newType, setNewType] = useState('');
    const [newOption, setNewOption] = useState('');

    useEffect(() => {
        fetchPropertyTypes();
        fetchOptions();
    }, []);

    const fetchPropertyTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8083/types');
            setPropertyTypes(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des types de bien :", error);
        }
    };

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/Planing');
    };

    const fetchOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8083/options');
            setOptions(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des options :", error);
        }
    };

    const handleDeleteType = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/types/${id}`);
            fetchPropertyTypes();
        } catch (error) {
            console.error("Erreur lors de la suppression du type de bien :", error);
        }
    };

    const handleDeleteOption = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/options/${id}`);
            fetchOptions();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'option :", error);
        }
    };

    const handleEditType = (type) => {
        setEditingType(type);
        setNewTypeName(type.name);
    };

    const handleEditOption = (option) => {
        setEditingOption(option);
        setNewOptionName(option.name);
    };

    const handleUpdateType = async () => {
        try {
            await axios.put(`http://localhost:8083/types/${editingType.id}`, { name: newTypeName });
            setEditingType(null);
            setNewTypeName('');
            fetchPropertyTypes();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du type de bien :", error);
        }
    };

    const handleUpdateOption = async () => {
        try {
            await axios.put(`http://localhost:8083/options/${editingOption.id}`, { name: newOptionName });
            setEditingOption(null);
            setNewOptionName('');
            fetchOptions();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'option :", error);
        }
    };

    const handleAddType = async () => {
        try {
            await axios.post('http://localhost:8083/types', { name: newType });
            setNewType('');
            setAddingType(false);
            fetchPropertyTypes();
        } catch (error) {
            console.error("Erreur lors de l'ajout du type de bien :", error);
        }
    };

    const handleAddOption = async () => {
        try {
            await axios.post('http://localhost:8083/options', { name: newOption });
            setNewOption('');
            setAddingOption(false);
            fetchOptions();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'option :", error);
        }
    };

    return (
        <div className="other-settings-container">
            <button className="back-button" onClick={handleBack}><FaArrowLeft /></button>
            <h2>Paramètres</h2>
            <div className="settings-section">
                <h3>Types de Bien</h3>
                {addingType ? (
                    <div className="add-form">
                        <input
                            type="text"
                            placeholder="Nom du nouveau type"
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                        />
                        <button className="add-button" onClick={handleAddType}><FaPlus /></button>
                        <button className="cancel-button" onClick={() => setAddingType(false)}><FaTimes /></button>
                    </div>
                ) : (
                    <button className="add-button" onClick={() => setAddingType(true)}><FaPlus /></button>
                )}
                <div className="settings-table">
                    {propertyTypes.map((type) => (
                        <div key={type.id} className="settings-row">
                            <span className="settings-id">{type.id}</span>
                            <span className="settings-name">
                                {editingType && editingType.id === type.id ? (
                                    <input
                                        type="text"
                                        value={newTypeName}
                                        onChange={(e) => setNewTypeName(e.target.value)}
                                    />
                                ) : (
                                    type.name
                                )}
                            </span>
                            <span className="settings-actions">
                                {editingType && editingType.id === type.id ? (
                                    <button className="edit-button" onClick={handleUpdateType}><FaEdit /></button>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEditType(type)}><FaEdit /></button>
                                        <button className="delete-button" onClick={() => handleDeleteType(type.id)}><FaTrash /></button>
                                    </>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="settings-section">
                <h3>Options de Bien</h3>
                {addingOption ? (
                    <div className="add-form">
                        <input
                            type="text"
                            placeholder="Nom de la nouvelle option"
                            value={newOption}
                            onChange={(e) => setNewOption(e.target.value)}
                        />
                        <button className="add-button" onClick={handleAddOption}><FaPlus /></button>
                        <button className="cancel-button" onClick={() => setAddingOption(false)}><FaTimes /></button>
                    </div>
                ) : (
                    <button className="add-button" onClick={() => setAddingOption(true)}><FaPlus /></button>
                )}
                <div className="settings-table">
                    {options.map((option) => (
                        <div key={option.id} className="settings-row">
                            <span className="settings-id">{option.id}</span>
                            <span className="settings-name">
                                {editingOption && editingOption.id === option.id ? (
                                    <input
                                        type="text"
                                        value={newOptionName}
                                        onChange={(e) => setNewOptionName(e.target.value)}
                                    />
                                ) : (
                                    option.name
                                )}
                            </span>
                            <span className="settings-actions">
                                {editingOption && editingOption.id === option.id ? (
                                    <button className="edit-button" onClick={handleUpdateOption}><FaEdit /></button>
                                ) : (
                                    <>
                                        <button className="edit-button" onClick={() => handleEditOption(option)}><FaEdit /></button>
                                        <button className="delete-button" onClick={() => handleDeleteOption(option.id)}><FaTrash /></button>
                                    </>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OtherSettings;
