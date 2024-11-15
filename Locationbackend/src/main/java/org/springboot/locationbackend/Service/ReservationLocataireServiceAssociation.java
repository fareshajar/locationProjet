package org.springboot.locationbackend.Service;


import org.springboot.locationbackend.Model.Locataire;
import org.springboot.locationbackend.Model.LocataireReservation;
import org.springboot.locationbackend.Model.reservations;
import org.springboot.locationbackend.Repository.LocataireRepository;
import org.springboot.locationbackend.Repository.ReservationLocataireRepository;
import org.springboot.locationbackend.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationLocataireServiceAssociation {

    @Autowired
    private ReservationLocataireRepository reservationLocataireRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private LocataireRepository locataireRepository;

    public void addReservationLocataire(int reservationId, int locataireId) {
        reservations reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Réservation non trouvée"));
        Locataire locataire = locataireRepository.findById(locataireId)
                .orElseThrow(() -> new IllegalArgumentException("Locataire non trouvé"));

        LocataireReservation reservationLocataire = new LocataireReservation();
        reservationLocataire.setReservation(reservation);
        reservationLocataire.setLocataire(locataire);

        reservationLocataireRepository.save(reservationLocataire);
    }

    // Autres méthodes si nécessaire...
}
