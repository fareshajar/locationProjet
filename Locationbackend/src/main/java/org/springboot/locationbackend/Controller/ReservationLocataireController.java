package org.springboot.locationbackend.Controller;
import org.springboot.locationbackend.Service.ReservationLocataireServiceAssociation;
import org.springboot.locationbackend.dtp.ReservationLocataireAssociationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ReservationLocataireController {

    @Autowired
    private ReservationLocataireServiceAssociation reservationLocataireService;

    @PostMapping("/reservation-locataires")
    public ResponseEntity<String> associateLocataire(@RequestBody ReservationLocataireAssociationRequest request) {
        try {
            reservationLocataireService.addReservationLocataire(request.getReservationId(), request.getLocataireId());
            return ResponseEntity.ok("Association réussie.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Erreur : données invalides.");
        }
    }
}
