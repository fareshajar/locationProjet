import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationList.css';
import {FaEye, FaEdit, FaTrash, FaFilter, FaPlus, FaUserPlus, FaArrowLeft} from 'react-icons/fa';
import {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function ReservationListLocateur() {
    const [reservations, setReservations] = useState([]);
    const [filtre, setFiltre] = useState('all');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [afficherFormulaireAjout, setAfficherFormulaireAjout] = useState(false);
    const [editionMode, setEditionMode] = useState(false);
    const [reservationEnEdition, setReservationEnEdition] = useState(null);
    const [reservationDetails, setReservationDetails] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDetailsModalfacture, setShowDetailsModalfacture] = useState(false);

    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [isUserIdLoaded, setIsUserIdLoaded] = useState(false);


    const [nouvelleReservation, setNouvelleReservation] = useState({
        biens: '',
        dateArrivee: '',
        dateDepart: '',
        nombreNuits: '',
        cautionEtat: false,
        animauxAdmis: false,
        etat: '',
        codePromo:'',
    });
    const [optionsBiens, setOptionsBiens] = useState([]);
    const [locataires, setLocataires] = useState([]);
    const [afficherFormulaireAssociation, setAfficherFormulaireAssociation] = useState(false);
    const [locataireAAssocier, setLocataireAAssocier] = useState('');
    const [reservationAAssocier, setReservationAAssocier] = useState(null);

    useEffect(() => {
        const fetchBiens = async () => {
            try {
                const response = await axios.get('http://localhost:8083/properties');
                const biensList = response.data.map(bien => ({ id: bien.id, code: bien.codeBien }));
                setOptionsBiens(biensList);
            } catch (error) {
                console.error('Erreur lors de la récupération des biens:', error);
            }
        };

        fetchBiens();
    }, []);
    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
            setIsUserIdLoaded(true);
            console.log('Setting userId to:', location.state.userId);
        }
    }, [location.state]);

    useEffect(() => {
        if (isUserIdLoaded && userId) {
            console.log('Fetching reservations for userId:', userId);
            fetchReservations();
            setIsUserIdLoaded(false); // Réinitialiser après avoir récupéré les réservations
        }
    }, [isUserIdLoaded, userId]);
    const fetchReservations = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/reservations/locateur/${userId}`);
            console.log('Données reçues:', response.data);

            const formattedReservations = response.data.map(item => {
                const { id, biens, dateArrivee, dateDepart, ...rest } = item;

                return {
                    id,
                    dateArrivee,
                    dateDepart,
                    code: biens.codeBien,
                    ...rest,
                };
            });

            setReservations(formattedReservations);
            console.log('Réservations formatées:', formattedReservations);
        } catch (error) {
            console.error('Erreur lors de la récupération des réservations:', error);
        }
    };
    useEffect(() => {
        const fetchLocataires = async () => {
            try {
                const response = await axios.get('http://localhost:8083/locataires');
                setLocataires(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Erreur lors de la récupération des locataires:', error);
            }
        };

        fetchLocataires();
    }, []);





    const handleFilterChange = (event) => {
        setFiltre(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setDateDebut(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setDateFin(event.target.value);
    };

    const handleFormChange = (event) => {
        const { name, value, type, checked } = event.target;
        setNouvelleReservation(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const fetchReservationDetails = async (reservationId, bienCode) => {
        try {
            const response = await axios.get(`http://localhost:8083/reservations/${reservationId}/details`, {
                params: {
                    bienCode: bienCode // Inclure bienCode comme paramètre de requête
                }
            });
            console.log(response.data);
            setReservationDetails(response.data);
            setShowDetailsModal(true);
            setShowDetailsModalfacture(true);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de la réservation:', error);
        }
    };


    const handleAddReservation = () => {
        setAfficherFormulaireAjout(true);
        setEditionMode(false);
        setReservationEnEdition(null);
    };
    const handleEditReservation = (reservation) => {
        setNouvelleReservation({
            biens: reservation.code,
            dateArrivee: reservation.dateArrivee,
            dateDepart: reservation.dateDepart,
            nombreNuits: reservation.nombreNuits,
            cautionEtat: reservation.cautionEtat,
            animauxAdmis: reservation.animauxAdmis,
            etat: reservation.etat,
            codePromo: reservation.codePromo,
        });
        setReservationEnEdition(reservation.id);
        setAfficherFormulaireAjout(true);
        setEditionMode(true);
    };

    const handleDeleteReservation = async (id) => {
        try {
            await axios.delete(`http://localhost:8083/reservations/${id}`);
            setReservations(reservations.filter(reservation => reservation.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const reservationData = {
                bienCode: nouvelleReservation.biens,
                dateArrivee: nouvelleReservation.dateArrivee,
                dateDepart: nouvelleReservation.dateDepart,
                nombreNuits: nouvelleReservation.nombreNuits,
                cautionEtat: nouvelleReservation.cautionEtat,
                animauxAdmis: nouvelleReservation.animauxAdmis,
                etat: nouvelleReservation.etat,
                codePromo:nouvelleReservation.codePromo
            };

            if (editionMode && reservationEnEdition) {
                // Mise à jour d'une réservation existante
                await axios.put(`http://localhost:8083/reservations/${reservationEnEdition}`, reservationData);
            } else {
                // Création d'une nouvelle réservation
                await axios.post('http://localhost:8083/reservations/create', reservationData);
            }
            // Rafraîchir les réservations après l'ajout ou la mise à jour
            const response = await axios.get(`http://localhost:8083/reservations/locateur/${userId}`);
            const formattedReservations = response.data.map(item => ({
                id: item.id,
                biens: item.biens,
                dateArrivee: item.dateArrivee,
                dateDepart: item.dateDepart,
                prix: item.prix,
                nombreNuits: item.nombreNuits,
                cautionEtat: item.cautionEtat,
                animauxAdmis: item.animauxAdmis,
                etat: item.etat,
                code: item.biens.codeBien,
                codePromo:item.codePromo
            }));
            setReservations(formattedReservations);

            setAfficherFormulaireAjout(false);
            setNouvelleReservation({
                biens: '',
                dateArrivee: '',
                dateDepart: '',
                nombreNuits: '',
                cautionEtat: false,
                animauxAdmis: false,
                etat: '',
                codePromo: ''
            });
            setEditionMode(false);
            setReservationEnEdition(null);
        } catch (error) {
            console.error('Erreur lors de l\'ajout ou de la mise à jour de la réservation:', error);
        }
    };


    const handleAssociateLocataire = async (event) => {
        event.preventDefault(); // Assurez-vous que la requête POST ne cause pas un rechargement de la page

        console.log('Association en cours...');
        console.log('ID de la réservation :', reservationAAssocier);
        console.log('ID du locataire :', locataireAAssocier);

        try {
            const response = await fetch('http://localhost:8083/api/reservation-locataires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reservationId: reservationAAssocier,
                    locataireId: locataireAAssocier,
                }),

            });
            const responseData = await response.text();
            if (response.ok) {
                console.log('Locataire associé avec succès');
                alert('Locataire associé avec succès'); // Affiche un message de succès
                // Rafraîchir les données si nécessaire
                setAfficherFormulaireAssociation(false);
            } else {
                console.error('Erreur lors de l\'association :', responseData);
                alert(`Erreur lors de l'association : ${responseData}`); // Affiche un message d'erreur
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la requête :', error);
            alert('Erreur lors de l\'envoi de la requête');
        }
    };

    const handleShowAssociationFormLocataire = (reservation) => {
        console.log('Affichage du formulaire d\'association pour la réservation du locataire:', reservation);
        setReservationAAssocier(reservation.id);
        setAfficherFormulaireAssociation(true);
    };



    const filteredReservations = reservations.filter(reservation => {
        if (filtre === 'all') return true;
        const today = new Date();
        return filtre === 'future' ? new Date(reservation.dateArrivee) > today : new Date(reservation.dateArrivee) < today;
    });

    const filteredReservationsByDate = filteredReservations.filter(reservation => {
        if (dateDebut && dateFin) {
            const reservationDate = new Date(reservation.dateArrivee);
            const start = new Date(dateDebut);
            const end = new Date(dateFin);
            return reservationDate >= start && reservationDate <= end;
        }
        return true;
    });
    const InvoiceModal = ({ details, onClose }) => {
        const calculateTotal = () => {
            let total = 0;
            let prixParNuit = details.reservation.biens.prix; // Initialement prix par défaut
            const reservationStart = new Date(details.reservation.dateArrivee);
            const reservationEnd = new Date(details.reservation.dateDepart);
            let prixParNuitCalculé = prixParNuit;

            // Parcourez chaque jour de la période de réservation
            for (let date = new Date(reservationStart); date <= reservationEnd; date.setDate(date.getDate() + 1)) {
                let foundPrice = false;

                // Vérifiez si un prix personnalisé est applicable pour cette date
                if (details.prixPersonnalises && details.prixPersonnalises.length > 0) {
                    for (const prix of details.prixPersonnalises) {
                        const prixStart = new Date(prix.dateDebut);
                        const prixEnd = new Date(prix.dateFin);

                        if (date >= prixStart && date <= prixEnd) {
                            total += prix.prix;
                            prixParNuitCalculé = prix.prix; // Utilise le prix personnalisé si trouvé
                            foundPrice = true;
                            break;
                        }
                    }
                }

                // Si aucun prix personnalisé n'est trouvé, utilisez le prix par défaut du bien
                if (!foundPrice) {
                    total += details.reservation.biens.prix;
                }
            }

            // Vérification du code promo
            let reduction = 0;
            if (details.codePromo && details.codePromo.pourcentage) {
                reduction = (total * details.codePromo.pourcentage) / 100;
                total -= reduction;
            }

            return { total, prixParNuit: prixParNuitCalculé, reduction };
        };

        const { total, prixParNuit, reduction } = calculateTotal();

        const handlePrint = () => {
            const printWindow = window.open('', '', 'height=800,width=1000');
            printWindow.document.write('<html><head><title>Facture</title>');
            printWindow.document.write('<style>');
            printWindow.document.write(`
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { text-align: center; }
            .container { max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            .header { text-align: center; margin-bottom: 20px; }
            .header img { width: 150px; }
            .section { margin-top: 20px; }
            .section h2 { border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            .footer { margin-top: 20px; text-align: center; }
            .footer p { margin: 0; padding: 5px 0; }
        `);
            printWindow.document.write('</style></head><body>');
            printWindow.document.write('<div class="container">');

            // En-tête
            printWindow.document.write('<div class="header">');
            printWindow.document.write('<h1>Facture</h1>');
            printWindow.document.write('<p>Rue ouad AZIZ 3 ème étage Agdale Rabat </p>');
            printWindow.document.write('<p>Téléphone: 06 60 37 50 51 | Email: adconsulting.ma@gmail.com</p>');
            printWindow.document.write('</div>');

            // Détails de la facture
            printWindow.document.write('<div class="section">');
            printWindow.document.write('<h2>Détails de la Facture</h2>');
            printWindow.document.write('<table>');
            printWindow.document.write(`<tr><th>Date d'arrivée</th><td>${details.reservation.dateArrivee}</td></tr>`);
            printWindow.document.write(`<tr><th>Date de départ</th><td>${details.reservation.dateDepart}</td></tr>`);
            printWindow.document.write(`<tr><th>Prix par Nuit:</th><td>${prixParNuit} DH</td></tr>`);
            if (details.codePromo && details.codePromo.pourcentage) {
                printWindow.document.write(`<tr><th>Promotion (${details.codePromo.pourcentage}%):</th><td>- ${reduction} DH</td></tr>`);
            }
            printWindow.document.write(`<tr><th>Total:</th><td>${total} DH</td></tr>`);
            printWindow.document.write('</table>');
            printWindow.document.write('</div>');

            // Signature
            printWindow.document.write('<div class="section" style="display: flex; justify-content: space-between; margin-top: 40px;">');
            printWindow.document.write('<div style="flex: 1; text-align: center;"><p><strong>Signature Locataire:</strong></p><p>________________________</p></div>');
            printWindow.document.write('<div style="flex: 1; text-align: center;"><p><strong>Signature Locateur:</strong></p><p>________________________</p></div>');
            printWindow.document.write('</div>');

            // Pied de page
            printWindow.document.write('<div class="footer">');
            printWindow.document.write('<p>Merci pour votre confiance.</p>');
            printWindow.document.write('<p>Pour toute question, veuillez nous contacter à l\'adresse mentionnée ci-dessus.</p>');
            printWindow.document.write('</div>');

            printWindow.document.write('</div>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        };

        return (
            <div className="modal">
                <div className="modal-content">
                    <h2>Facture</h2>
                    {details ? (
                        <div>
                            <h3>Détails de la Facture</h3>
                            <p><strong>Date d'arrivée:</strong> {details.reservation.dateArrivee}</p>
                            <p><strong>Date de départ:</strong> {details.reservation.dateDepart}</p>
                            <p><strong>Prix par Nuit: {prixParNuit}dh</strong></p>
                            {details.codePromo && details.codePromo.pourcentage && (
                                <p><strong>Promotion </strong>: {details.codePromo.pourcentage}% (-{reduction} dh)</p>
                            )}
                            <p><strong>Total</strong>: {total} dh</p>
                            <div className="signature"
                                 style={{display: 'flex', justifyContent: 'space-between', marginTop: '40px'}}>
                                <div style={{flex: 1, textAlign: 'center'}}>
                                    <p><strong>Signature Locataire:</strong></p>
                                    <p>________________________</p>
                                </div>
                                <div style={{flex: 1, textAlign: 'center'}}>
                                    <p><strong>Signature Locateur:</strong></p>
                                    <p>________________________</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Chargement des détails...</p>
                    )}
                    <button onClick={handlePrint} className="btn btn-print">Imprimer</button>
                    <button onClick={onClose}>Fermer</button>
                </div>
            </div>
        );
    };


    const DetailsModal = ({ details, onClose }) => {
        const bien = details.reservation.biens;
        const locataire = details.locataire || {};

        const handlePrint = () => {
            const printWindow = window.open('', '', 'height=800,width=1000');
            printWindow.document.write('<html><head><title>Détails de la Réservation</title>');
            printWindow.document.write('<style>');
            printWindow.document.write(`
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1, h2 { text-align: center; }
        .container { max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
        .header, .footer { text-align: center; }
        .header img { width: 150px; }
        .section { margin-top: 20px; }
        .section h2 { border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        .signature { margin-top: 40px; text-align: center; }
        .signature p { margin: 0; padding: 5px 0; }
        .footer p { margin-top: 20px; font-style: italic; }
    `);
            printWindow.document.write('</style></head><body>');
            printWindow.document.write('<div class="container">');

            // En-tête
            printWindow.document.write('<div class="header">');
            printWindow.document.write('<h1>Détails de la Réservation</h1>');
            printWindow.document.write('<p>Rue ouad AZIZ 3 ème étage Agdale Rabat </p>');
            printWindow.document.write('<p>Téléphone: 06 60 37 50 51 | Email: adconsulting.ma@gmail.com</p>');
            printWindow.document.write('</div>');

            // Bien
            printWindow.document.write('<div class="section">');
            printWindow.document.write('<h2>Bien</h2>');
            printWindow.document.write('<table>');
            printWindow.document.write(`<tr><th>Nom</th><td>${bien.name}</td></tr>`);
            printWindow.document.write(`<tr><th>Adresse</th><td>${bien.address}</td></tr>`);
            printWindow.document.write(`<tr><th>Description</th><td>${bien.description}</td></tr>`);
            printWindow.document.write(`<tr><th>Pièces</th><td>${bien.pieces}</td></tr>`);
            printWindow.document.write(`<tr><th>Surface</th><td>${bien.surface} m²</td></tr>`);
            printWindow.document.write(`<tr><th>Année de construction</th><td>${bien.constructionYear}</td></tr>`);
            printWindow.document.write(`<tr><th>Locateur</th><td>${bien.locateur ? bien.locateur.nom : 'Non spécifié'}</td></tr>`);
            printWindow.document.write(`<tr><th>Code Bien</th><td>${bien.codeBien}</td></tr>`);
            printWindow.document.write(`<tr><th>Type</th><td>${bien.typeId ? bien.typeId.name : 'Non spécifié'}</td></tr>`);
            printWindow.document.write('</table>');
            printWindow.document.write('</div>');

            // Options
            printWindow.document.write('<div class="section">');
            printWindow.document.write('<h2>Options</h2>');
            printWindow.document.write('<ul>');
            bien.options.forEach(option => {
                printWindow.document.write(`<li>${option.name}</li>`);
            });
            printWindow.document.write('</ul>');
            printWindow.document.write('</div>');

            // Réservation
            printWindow.document.write('<div class="section">');
            printWindow.document.write('<h2>Réservation</h2>');
            printWindow.document.write('<table>');
            printWindow.document.write(`<tr><th>Date d'arrivée</th><td>${details.reservation.dateArrivee}</td></tr>`);
            printWindow.document.write(`<tr><th>Date de départ</th><td>${details.reservation.dateDepart}</td></tr>`);
            printWindow.document.write(`<tr><th>Nombre de nuits</th><td>${details.reservation.nombreNuits}</td></tr>`);
            printWindow.document.write(`<tr><th>Caution État</th><td>${details.reservation.etat}</td></tr>`);
            printWindow.document.write(`<tr><th>codePromo</th><td>${details.reservation.codePromo}</td></tr>`);
            printWindow.document.write(`<tr><th>Caution État</th><td>${details.reservation.cautionEtat ? 'Oui' : 'Non'}</td></tr>`);
            printWindow.document.write(`<tr><th>Animaux admis</th><td>${details.reservation.animauxAdmis ? 'Oui' : 'Non'}</td></tr>`);
            printWindow.document.write('</table>');
            printWindow.document.write('</div>');

            // Locataire
            printWindow.document.write('<div class="section">');
            printWindow.document.write('<h2>Locataire</h2>');
            printWindow.document.write('<table>');
            printWindow.document.write(`<tr><th>Nom</th><td>${locataire.nom || 'Non assigné'}</td></tr>`);
            printWindow.document.write(`<tr><th>Prénom</th><td>${locataire.prenom || 'Non assigné'}</td></tr>`);
            printWindow.document.write(`<tr><th>Adresse</th><td>${locataire.adresse || 'Non spécifiée'}</td></tr>`);
            printWindow.document.write(`<tr><th>GSM</th><td>${locataire.gsm || 'Non spécifié'}</td></tr>`);
            printWindow.document.write(`<tr><th>Email</th><td>${locataire.email || 'Non spécifié'}</td></tr>`);
            printWindow.document.write('</table>');
            printWindow.document.write('</div>');


            // Signature
            printWindow.document.write('<div class="signature" style="display: flex; justify-content: space-between; margin-top: 40px;">');
            printWindow.document.write('<div style="flex: 1; text-align: center;"><p><strong>Signature Locataire:</strong></p><p>________________________</p></div>');
            printWindow.document.write('<div style="flex: 1; text-align: center;"><p><strong>Signature Locateur:</strong></p><p>________________________</p></div>');
            printWindow.document.write('</div>');

            // Pied de page
            printWindow.document.write('<div class="footer">');
            printWindow.document.write('<p>Merci de votre confiance.</p>');
            printWindow.document.write('<p>Pour toute question, veuillez nous contacter à l\'adresse mentionnée ci-dessus.</p>');
            printWindow.document.write('</div>');

            printWindow.document.write('</div>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        };
        return (
            <div className="modal">

                <div className="modal-content">

                    <h2>Détails de la Réservation</h2>
                    {details ? (
                        <div>
                            <h3>Bien</h3>
                            <p><strong>Nom:</strong> {bien.name}</p>
                            <p><strong>Adresse:</strong> {bien.address}</p>
                            <p><strong>Description:</strong> {bien.description}</p>
                            <p><strong>Pièces:</strong> {bien.pieces}</p>
                            <p><strong>Surface:</strong> {bien.surface} m²</p>
                            <p><strong>Année de construction:</strong> {bien.constructionYear}</p>
                            <p><strong>Locateur:</strong> {bien.locateur ? bien.locateur.nom : 'Non spécifié'}</p>
                            <p><strong>Code Bien:</strong> {bien.codeBien}</p>
                            <p><strong>Type:</strong> {bien.typeId ? bien.typeId.name : 'Non spécifié'}</p>
                            <h3>Options</h3>
                            <ul>
                                {bien.options.map(option => (
                                    <li key={option.id}>{option.name}</li>
                                ))}
                            </ul>
                            <h3>Réservation</h3>
                            <p><strong>Date d'arrivée:</strong> {details.reservation.dateArrivee}</p>
                            <p><strong>Date de départ:</strong> {details.reservation.dateDepart}</p>
                            <p><strong>Nombre de nuits:</strong> {details.reservation.nombreNuits}</p>
                            <p><strong>codePromo:</strong> {details.reservation.codePromo}</p>
                            <p><strong>Caution État:</strong> {details.reservation.cautionEtat ? 'Oui' : 'Non'}</p>
                            <p><strong>Animaux admis:</strong> {details.reservation.animauxAdmis ? 'Oui' : 'Non'}</p>

                            <h3>Locataire</h3>
                            <p><strong>Nom:</strong> {locataire.nom || 'Non assigné'}</p>
                            <p><strong>Prénom:</strong> {locataire.prenom || 'Non assigné'}</p>
                            <p><strong>GSM:</strong> {locataire.gsm || 'Non spécifié'}</p>
                            <p><strong>Email:</strong> {locataire.email || 'Non spécifié'}</p>
                        </div>
                    ) : (
                        <p>Chargement des détails...</p>
                    )}
                    <button onClick={handlePrint} className="btn btn-print">Imprimer</button>
                    <button onClick={onClose}>Fermer</button>
                </div>
            </div>
        );
    };
    const handleBack = () => {
        navigate('/PlaningLocateur',{ state: { userId } });
    };
    return (
        <div className="container">
            <button className="back-button" onClick={handleBack}><FaArrowLeft/></button>
            <h1>Liste des réservations</h1>
            <div className="filter-container">
                <div>
                    <label htmlFor="filter">Filtre:</label>
                    <select id="filter" value={filtre} onChange={handleFilterChange}>
                        <option value="all">Tous les événements</option>
                        <option value="future">Événements futurs</option>
                        <option value="past">Événements passés</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="start-date">Date de début:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={dateDebut}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div>
                    <label htmlFor="end-date">Date de fin:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={dateFin}
                        onChange={handleEndDateChange}
                    />
                </div>
                <button onClick={handleAddReservation} className="btn btn-primary">
                    <FaPlus/> Ajouter Réservation
                </button>
            </div>
            {afficherFormulaireAjout && (
                <form onSubmit={handleSubmit} className="reservation-form">
                    <h2>{editionMode ? 'Modifier Réservation' : 'Ajouter Réservation'}</h2>
                    <select
                        id="biens"
                        name="biens"
                        value={nouvelleReservation.biens}
                        onChange={handleFormChange}
                        required
                    >
                        <option value="">Sélectionner un bien</option>
                        {optionsBiens.map(bien => (
                            <option key={bien.id} value={bien.code}>{bien.code}</option>
                        ))}
                    </select>
                    <label htmlFor="dateArrivee">Date d'arrivée:</label>
                    <input
                        type="date"
                        id="dateArrivee"
                        name="dateArrivee"
                        value={nouvelleReservation.dateArrivee}
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlFor="dateDepart">Date de départ:</label>
                    <input
                        type="date"
                        id="dateDepart"
                        name="dateDepart"
                        value={nouvelleReservation.dateDepart}
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlFor="nombreNuits">Nombre de nuits:</label>
                    <input
                        type="number"
                        id="nombreNuits"
                        name="nombreNuits"
                        value={nouvelleReservation.nombreNuits}
                        onChange={handleFormChange}
                        required
                    />
                    <label htmlFor="cautionEtat">Caution État:</label>
                    <input
                        type="checkbox"
                        id="cautionEtat"
                        name="cautionEtat"
                        checked={nouvelleReservation.cautionEtat}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="animauxAdmis">Animaux Admis:</label>
                    <input
                        type="checkbox"
                        id="animauxAdmis"
                        name="animauxAdmis"
                        checked={nouvelleReservation.animauxAdmis}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="etat">État:</label>
                    <select
                        id="etat"
                        name="etat"
                        value={nouvelleReservation.etat}
                        onChange={handleFormChange}
                        required
                    >
                        <option value="">Sélectionner l'état</option>
                        <option value="pre-réservation">Pré-réservation</option>
                        <option value="réservation">Réservation</option>
                    </select>
                    <label htmlFor="codePromo">codePromo:</label>
                    <input
                        type="codePromo"
                        id="codePromo"
                        name="codePromo"
                        value={nouvelleReservation.codePromo}
                        onChange={handleFormChange}
                        required
                    />
                    <button type="submit" className="btn btn-success">
                        {editionMode ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                    <button type="button" onClick={() => setAfficherFormulaireAjout(false)}
                            className="btn btn-secondary">
                        Annuler
                    </button>
                </form>
            )}
            {afficherFormulaireAssociation && (
                <form onSubmit={handleAssociateLocataire} className="association-form">
                    <h4>Associer Locataire</h4>
                    <label htmlFor="locataire">Locataire:</label>
                    <select
                        id="locataire"
                        value={locataireAAssocier}
                        onChange={(e) => setLocataireAAssocier(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un locataire</option>
                        {locataires.map(locataire => (
                            <option key={locataire.id}
                                    value={locataire.id}>{locataire.nom} - {locataire.email}-{locataire.cim}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-success">
                        Associer
                    </button>
                    <button type="button" onClick={() => setAfficherFormulaireAssociation(false)}
                            className="btn btn-secondary">
                        Annuler
                    </button>
                </form>
            )}
            <table className="reservation-table">
                <thead>
                <tr>
                    <th>Code Bien</th>
                    <th>Date d'arrivée</th>
                    <th>Date de départ</th>
                    <th>Nombre de nuits</th>
                    <th>Caution État</th>
                    <th>Animaux Admis</th>
                    <th>État</th>
                    <th>codePromo</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredReservationsByDate.map(reservation => (
                    <tr key={reservation.id}>
                        <td>{reservation.code}</td>
                        <td>{reservation.dateArrivee}</td>
                        <td>{reservation.dateDepart}</td>
                        <td>{reservation.nombreNuits}</td>
                        <td>{reservation.cautionEtat ? 'Oui' : 'Non'}</td>
                        <td>{reservation.animauxAdmis ? 'Oui' : 'Non'}</td>
                        <td>{reservation.etat}</td>
                        <td>{reservation.codePromo}</td>
                        <td>
                            <button onClick={() => handleEditReservation(reservation)} className="btn btn-edit">
                                <FaEdit/>
                            </button>
                            <button onClick={() => handleDeleteReservation(reservation.id)} className="btn btn-delete">
                                <FaTrash/>
                            </button>
                            <button onClick={() => handleShowAssociationFormLocataire(reservation)}
                                    className="btn btn-assign">
                                <FaUserPlus/>
                            </button>
                            <button onClick={() => fetchReservationDetails(reservation.id, reservation.code)}>
                                <FaEye/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showDetailsModal && (
                <DetailsModal details={reservationDetails} onClose={() => setShowDetailsModal(false)}/>
            )}
            {showDetailsModalfacture && (
                <InvoiceModal details={reservationDetails} onClose={() => setShowDetailsModalfacture(false)}/>
            )}

        </div>
    );
}

export default ReservationListLocateur;