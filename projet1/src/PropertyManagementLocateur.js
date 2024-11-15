import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './PropertyManagement.css';
import { FaEdit, FaTrash,FaArrowLeft } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

function PropertyManagementLocateur() {
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [afficherFormulaireAjout, setAfficherFormulaireAjout] = useState(false);
    const [isUserIdLoaded, setIsUserIdLoaded] = useState(false);
    const [properties, setProperties] = useState([]);
    const [types, setTypes] = useState([]);
    const [options, setOptions] = useState([]);
    const [locateurs, setLocateurs] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [newProperty, setNewProperty] = useState({
        name: '',
        address: '',
        codeBien: '',
        description: '',
        pieces: '',
        surface: '',
        constructionYear: '',
        typeId: '',
        caution: '',
        locateurcode: '',
        prix: '',
        images: [],
        imageUrls: [],
        options: []
    });
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
            setIsUserIdLoaded(true);
            console.log('Setting userId to:', location.state.userId);
        }
    }, [location.state]);

    useEffect(() => {
        if (isUserIdLoaded) {
            console.log('Fetching properties for userId:', userId);
            fetchProperties();
            setIsUserIdLoaded(false); // Réinitialiser après avoir récupéré les propriétés
        }
    }, [isUserIdLoaded, userId]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [typesResponse, optionsResponse, locateursResponse] = await Promise.all([
                axios.get('http://localhost:8083/types'),
                axios.get('http://localhost:8083/options'),
                axios.get('http://localhost:8083/locateurs')
            ]);
            setTypes(typesResponse.data);
            setOptions(optionsResponse.data);
            setLocateurs(locateursResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchProperties = async () => {
        try {
            if (userId) {
                console.log('Fetching properties for userId:', userId);
                const propertiesResponse = await axios.get(`http://localhost:8083/properties/locateurbien/${userId}`);
                console.log(propertiesResponse)
                const propertiesWithImages = await Promise.all(propertiesResponse.data.map(async property => {
                    const imageResponse = await axios.get(`http://localhost:8083/properties/${property.id}/images`);
                    console.log(imageResponse)
                    return {
                        ...property,
                        imageUrls: imageResponse.data
                    };
                }));
                console.log('Properties response:', propertiesWithImages);
                setProperties(propertiesWithImages);
            } else {
                console.error('User ID is not set.');
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProperty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewProperty(prevState => ({
            ...prevState,
            images: [...prevState.images, ...files]
        }));
    };

    const removeImage = (index) => {
        setNewProperty(prevState => ({
            ...prevState,
            images: prevState.images.filter((_, i) => i !== index)
        }));
    };

    const handleOptionChange = (e) => {
        const { options } = e.target;
        const selectedOptions = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setNewProperty(prevState => ({
            ...prevState,
            options: selectedOptions
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newProperty.typeId || newProperty.typeId === 'undefined') {
            alert('Veuillez sélectionner un type de bien valide.');
            return;
        }

        const formData = new FormData();
        Object.keys(newProperty).forEach(key => {
            if (key === 'images') {
                newProperty.images.forEach(image => {
                    formData.append('images', image);
                });
            } else if (key === 'options') {
                newProperty.options.forEach(option => formData.append('options', option));
            } else {
                formData.append(key, newProperty[key]);
            }
        });

        const url = selectedProperty
            ? `http://localhost:8083/properties/update/${selectedProperty.id}`
            : 'http://localhost:8083/properties';

        const method = selectedProperty ? 'put' : 'post';

        axios({
            method,
            url,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => {
                fetchProperties(); // Re-fetch properties after submit
                resetForm();
            })
            .catch(error => {
                console.error('Erreur lors de la soumission de la propriété :', error);
                console.error('Erreur détails :', error.response ? error.response.data : 'Pas de réponse du serveur');
            });
    };

    const handleEdit = (property) => {
        setSelectedProperty(property);
        setNewProperty({
            ...property,
            images: [],
            imageUrls: property.imageUrls,
            locateurcode: property.locateur ? property.locateur.locateurCode : '',
            options: property.options.map(option => option.id),
            typeId: property.typeId ? property.typeId.id : ''
        });
        setAfficherFormulaireAjout(true);
    };

    const handleDelete = (propertyId) => {
        axios.delete(`http://localhost:8083/properties/${propertyId}`)
            .then(() => {
                fetchProperties();
            })
            .catch(error => console.error('Error deleting property:', error));
    };

    const resetForm = () => {
        setNewProperty({
            name: '',
            address: '',
            codeBien: '',
            description: '',
            pieces: '',
            surface: '',
            constructionYear: '',
            typeId: '',
            locateurcode: '',
            prix: '',
            images: [],
            options: []
        });
        setSelectedProperty(null);
        setAfficherFormulaireAjout(false);
    };
    const handleBack = () => {
        navigate('/PlaningLocateur',{ state: { userId } });
    };
    return (
        <div className="property-management">
            <button className="back-button" onClick={handleBack}><FaArrowLeft /></button>
            <h2>Liste des Biens</h2>
            <button className="add-property-button" onClick={() => setAfficherFormulaireAjout(true)}>Ajouter un Bien</button>
            <div className="property-cards">
                {properties.map(property => (
                    <div className="property-card" key={property.id}>
                        <div className="property-images">
                            {property.imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={`data:image/png;base64,${url}`}
                                    alt={`Image ${index}`}
                                />
                            ))}
                        </div>
                        <div className="property-details">
                            <h3>{property.name}</h3>
                            <p><strong>Adresse:</strong> {property.address}</p>
                            <p><strong>Code Bien:</strong> {property.codeBien}</p>
                            <p><strong>Description:</strong> {property.description}</p>
                            <p><strong>Pièces:</strong> {property.pieces}</p>
                            <p><strong>Surface:</strong> {property.surface}</p>
                            <p><strong>Prix par nuit:</strong> {property.prix}</p>
                            <p><strong>Année de Construction:</strong> {property.constructionYear}</p>
                            <p><strong>Type:</strong> {property.typeId ? property.typeId.name : ''}</p>
                            <div className="property-actions">
                                <button onClick={() => handleEdit(property)}><FaEdit/></button>
                                <button onClick={() => handleDelete(property.id)}><FaTrash/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {afficherFormulaireAjout && (
                <div>
                        <h2>{selectedProperty ? 'Modifier Bien' : 'Ajouter Bien'}</h2>
                        <form onSubmit={(e) => handleSubmit(e, newProperty)} className="form-container">
                                <label htmlFor="name">Nom:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newProperty.name}
                                    onChange={handleInputChange}
                                    placeholder="Nom du bien"
                                    required
                                />

                                <label htmlFor="address">Adresse:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={newProperty.address}
                                    onChange={handleInputChange}
                                    placeholder="Adresse du bien"
                                    required
                                />

                                <label htmlFor="codeBien">Code:</label>
                                <input
                                    type="text"
                                    id="codeBien"
                                    name="codeBien"
                                    value={newProperty.codeBien}
                                    onChange={handleInputChange}
                                    placeholder="Code du bien"
                                    required
                                />
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={newProperty.description}
                                    onChange={handleInputChange}
                                    placeholder="Description du bien"
                                />
                                <label htmlFor="pieces">Pièces:</label>
                                <input
                                    type="number"
                                    id="pieces"
                                    name="pieces"
                                    value={newProperty.pieces}
                                    onChange={handleInputChange}
                                    placeholder="Nombre de pièces"
                                    required
                                />
                                <label htmlFor="surface">Surface:</label>
                                <input
                                    type="number"
                                    id="surface"
                                    name="surface"
                                    min="10"
                                    max="10000"
                                    value={newProperty.surface}
                                    onChange={handleInputChange}
                                    placeholder="Surface en m²"
                                    required
                                />
                                <label htmlFor="prix">Prix:</label>
                                <input
                                    type="number"
                                    id="prix"
                                    name="prix"
                                    min="50"
                                    value={newProperty.prix}
                                    onChange={handleInputChange}
                                    placeholder="Prix par nuit"
                                    required
                                />
                                <label htmlFor="constructionYear">Année de Construction:</label>
                                <input
                                    type="number"
                                    id="constructionYear"
                                    name="constructionYear"
                                    max={currentYear}
                                    value={newProperty.constructionYear}
                                    onChange={handleInputChange}
                                    placeholder="Année de construction"
                                    required
                                />
                                <label htmlFor="typeId">Type:</label>
                                <select
                                    id="typeId"
                                    name="typeId"
                                    value={newProperty.typeId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Sélectionner un type</option>
                                    {types.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="locateurcode">Code du Locateur:</label>
                                <select
                                    id="locateurcode"
                                    name="locateurcode"
                                    value={newProperty.locateurcode}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Sélectionner votre code</option>
                                    {locateurs.map(locateur => (
                                        <option key={locateur.id} value={locateur.locateurCode}>
                                            {locateur.locateurCode}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="images">Images:</label>
                                <input
                                    type="file"
                                    id="images"
                                    name="images"
                                    multiple
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />

                                    {newProperty.images.map((image, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                            <span>{image.name}</span>
                                            <button type="button" onClick={() => removeImage(index)}>Supprimer</button>
                                        </div>
                                    ))}
                                <label htmlFor="options">Options:</label>
                                <select
                                    id="options"
                                    name="options"
                                    multiple
                                    value={newProperty.options}
                                    onChange={handleInputChange}
                                >
                                    {options.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <button type="submit">{selectedProperty ? 'Modifier' : 'Ajouter'}</button>
                                <button type="button" className="cancel-button" onClick={resetForm}>Annuler</button>
                        </form>
            </div>
            )}

        </div>
    );
}

export default PropertyManagementLocateur;
