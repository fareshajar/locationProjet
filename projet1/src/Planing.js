import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './Planing.css';

const Planning = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [price, setPrice] = useState(""); // Pour stocker le prix entré par le propriétaire
    const [codeBien, setCodeBien] = useState(""); // Pour stocker le code du bien
    const [bienId, setBienId] = useState(null); // Pour stocker l'ID du bien une fois récupéré

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8083/reservations`);
                console.log('Données reçues:', response.data);

                const formattedReservations = response.data.map(item => {
                    const { id, biens, dateArrivee, dateDepart, ...rest } = item;
                    return {
                        id,
                        dateArrivee: new Date(dateArrivee),
                        dateDepart: new Date(dateDepart),
                        code: biens.codeBien,
                        etat: item.etat.trim().toLowerCase(),
                        ...rest,
                    };
                });

                setEvents(formattedReservations);
                console.log('Réservations formatées:', formattedReservations);
            } catch (error) {
                console.error('Erreur lors de la récupération des réservations:', error);
            }
        };
        fetchReservations();
    }, []);

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const event = events.find(event => date >= event.dateArrivee && date <= event.dateDepart);
            if (event) {
                return event.etat === 'pre-réservation' ? 'pre-reservation' : 'reservation';
            }
        }
        return 'no-reservation';
    };

    const onClickDay = (value) => {
        setSelectedDate(value);
        setDateRange((prev) => ({
            ...prev,
            start: value,  // Date sélectionnée comme début
        }));
    };

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);

        // Vérifie si la date de fin est supérieure à la date de début
        if (dateRange.start && endDate <= dateRange.start) {
            alert("La date de fin doit être supérieure à la date de début.");
            return;
        }

        // Si tout est bon, met à jour la date de fin
        setDateRange((prev) => ({
            ...prev,
            end: endDate,
        }));
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);  // Met à jour le prix entré
    };

    const getEventsForDate = (date) => {
        return events.filter(event => date >= event.dateArrivee && date <= event.dateDepart);
    };

    const handleCodeBienChange = (e) => {
        setCodeBien(e.target.value);  // Met à jour le code du bien
    };

    // Fonction pour récupérer l'ID du bien à partir du code
    const fetchBienIdByCode = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/properties/code/${codeBien}`);
            if (response.data) {
                setBienId(response.data.id);  // Stocke l'ID du bien récupéré
                return response.data.id;
            } else {
                console.error('Aucun bien trouvé pour ce code');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du bien:', error);
        }
    };

    const handleSubmitPrice = async () => {
        console.log('Date de début:', dateRange.start);
        console.log('Date de fin:', dateRange.end);
        console.log('Prix:', price);
        console.log('Code Bien:', codeBien);

        if (dateRange.start && dateRange.end && price && codeBien) {
            try {
                const idBien = await fetchBienIdByCode();
                if (idBien) {
                    const requestData = {
                        dateDebut: dateRange.start.toISOString().split('T')[0], // Format YYYY-MM-DD
                        dateFin: dateRange.end.toISOString().split('T')[0],   // Format YYYY-MM-DD
                        prix: price,
                        bien: { id: idBien }  // Envoie l'ID du bien dans l'objet bien
                    };

                    console.log('Données envoyées au backend:', requestData);

                    const response = await axios.post('http://localhost:8083/api/custom_prices', requestData);
                    console.log('Prix personnalisé ajouté avec succès', response.data);

                    // Affiche une alerte de succès
                    alert('Prix personnalisé ajouté avec succès !');

                    // Réinitialise les champs du formulaire
                    setPrice("");
                    setDateRange({ start: null, end: null });
                    setCodeBien("");
                }
            } catch (error) {
                console.error('Erreur lors de l\'ajout du prix personnalisé:', error.response ? error.response.data : error.message);
            }
        } else {
            console.error('Certains champs sont manquants.');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-title">Planning des Réservations</div>
                <div className="navbar-links">
                    <a href="/LocataireList">Locataire</a>
                    <a href="/Locateur">Locateur</a>
                    <a href="/ReservationList">Réservation</a>
                    <a href="/PropertyManagement">PropertyManagement</a>
                    <a href="/OtherSettings">parametre</a>
                    <a href="/PromoManagementAdmin">PromoManagement</a>
                    <a href="/LoginForm">Déconnexion</a>
                </div>
            </nav>
            <div className="planning-container">
                <Calendar
                    onClickDay={onClickDay}
                    tileClassName={tileClassName}
                />
                {selectedDate && (
                    <div className="event-details">
                        <h4>Détails des réservations pour {selectedDate.toDateString()}</h4>
                        {getEventsForDate(selectedDate).length > 0 ? (
                            getEventsForDate(selectedDate).map((event, index) => (
                                <div key={index} className="event-box">
                                    <p><strong>État :</strong> {event.etat}</p>
                                    <p><strong>Date d'arrivée :</strong> {event.dateArrivee.toDateString()}</p>
                                    <p><strong>Date de départ :</strong> {event.dateDepart.toDateString()}</p>
                                    <p><strong>Code Bien :</strong> {event.code}</p>
                                </div>
                            ))
                        ) : (
                            <p>Aucune réservation pour cette date.</p>
                        )}

                        {/* Formulaire pour ajouter un prix */}
                        <div className="price-form">
                            <h4>Définir un prix pour cette période</h4>
                            <label>
                                Code Bien :
                                <input type="text" value={codeBien} onChange={handleCodeBienChange} />
                            </label>
                            <label>
                                Date de fin :
                                <input type="date" onChange={handleEndDateChange} />
                            </label>
                            <label>
                                Prix :
                                <input type="number" value={price} onChange={handlePriceChange} />
                            </label>
                            <button onClick={handleSubmitPrice}>Définir le prix</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Planning;
