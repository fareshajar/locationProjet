package org.springboot.locationbackend.Service;
import org.springboot.locationbackend.Model.*;
import org.springboot.locationbackend.Repository.*;
import org.springboot.locationbackend.dtp.ReservationDetailsDTO;
import org.springboot.locationbackend.dtp.ReservationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LocationReservationService {

    @Autowired
    private BienRepository bienRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ReservationLocataireRepository ReservationLocataireRepository;
    @Autowired
    private LocataireRepository LocataireRepository;
    @Autowired
    private CodePromoRepository codePromoRepository;
    @Autowired
    private PrixPersonnaliseService PrixPersonnaliseService;
    public reservations updateReservation(int id, ReservationRequest request) {
        Optional<reservations> optionalReservation = reservationRepository.findById(id);

        // Vérifie si la réservation est présente
        if (optionalReservation.isEmpty()) {
            // Gère le cas où la réservation n'existe pas, par exemple en lançant une exception ou en retournant une valeur d'erreur
            System.out.println("Réservation non trouvée pour l'ID: " + id);
        }

        // Récupère la réservation
        reservations reservation = optionalReservation.get();

        // Cherche le bien par code
        biens bien = bienRepository.findByCode(request.getBienCode());

        reservation.setBiens(bien);
        reservation.setDateArrivee(request.getDateArrivee());
        reservation.setDateDepart(request.getDateDepart());
        reservation.setNombreNuits(request.getNombreNuits());
        reservation.setEtat(request.getEtat());
        reservation.setCautionEtat(request.isCautionEtat());
        reservation.setAnimauxAdmis(request.isAnimauxAdmis());
        reservation.setCodePromo(request.getCodePromo());

        reservations updatedReservation = reservationRepository.save(reservation);

        return updatedReservation;
    }
    public List<reservations> getAllLocationReservations() {
        List<reservations> reservationsList = reservationRepository.findAll();
        return reservationsList;

    }
    public List<reservations> findReservationsByLocateurId(int locateurId) {
        return reservationRepository.findReservationsByLocateurId(locateurId);
    }
    public ResponseEntity<reservations> updateReservation(int id, reservations reservation) {
        if (!reservationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reservation.setId(id);
        reservations updatedReservation = reservationRepository.save(reservation);
        return ResponseEntity.ok(updatedReservation);
    }
    public ResponseEntity<Void> deleteReservation(int id) {
        if (!reservationRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        reservationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    public ReservationDetailsDTO getReservationDetails(int id, int bienId) {
        reservations reservation = reservationRepository.findById(id).orElse(null);
        if (reservation == null) {
            return null;
        }

        LocataireReservation locataireReservation = ReservationLocataireRepository.findByReservationId(id);
        Locataire locataire = LocataireRepository.findById(locataireReservation.getLocataire().getId()).orElse(null);

        // Récupérer les prix personnalisés pour le bien dans la période de réservation
        List<prix_personnalise> prixPersonnalises = PrixPersonnaliseService.getPrixPersonnalises(
                bienId, reservation.getDateArrivee(), reservation.getDateDepart()
        );
        codePromo  codePromo=codePromoRepository.findByCodePromo(reservation.getCodePromo());
        System.out.println("nous somme les prix " + prixPersonnalises);
        System.out.println("nous somme les prix "+prixPersonnalises);
        ReservationDetailsDTO dto = new ReservationDetailsDTO();
        dto.setReservation(reservation);
        dto.setLocataire(locataire);
        dto.setPrixPersonnalises(prixPersonnalises);
        dto.setCodePromo(codePromo);// Utilisation de la liste
        return dto;
    }



}