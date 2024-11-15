package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.biens;
import org.springboot.locationbackend.Model.reservations;
import org.springboot.locationbackend.Service.BienService;
import org.springboot.locationbackend.Repository.ReservationRepository;
import org.springboot.locationbackend.Service.LocationReservationService;
import org.springboot.locationbackend.dtp.ReservationDetailsDTO;
import org.springboot.locationbackend.dtp.ReservationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private LocationReservationService locationReservationService;
    @Autowired
    private BienService BienService;
    @Autowired
    private ReservationRepository ReservationRepository;
    @GetMapping
    public List<reservations> getAllLocationReservations() {
        List<reservations> reservations = locationReservationService.getAllLocationReservations();
        System.out.println("Réservations récupérées : " + reservations.toString()); // Afficher les réservations
        return reservations;
    }

    @GetMapping("locateur/{locateurId}")
    public List<reservations> getReservationsByLocateurId(@PathVariable int locateurId) {
        System.out.println("voila reservation de ce locateur"+locationReservationService.findReservationsByLocateurId(locateurId));
        return locationReservationService.findReservationsByLocateurId(locateurId);
    }
    @PostMapping("/create")
    public ReservationRequest createReservation(@RequestBody ReservationRequest request) {
        System.out.println("Request received: " + request);
        String bienCode = request.getBienCode();
        if (bienCode == null) {
            throw new RuntimeException("Bien code is null");
        }
        biens bien = BienService.findByCode(bienCode);
        if (bien == null) {
            throw new RuntimeException("Bien not found for code: " + bienCode);
        }

        reservations reservation = new reservations();
        reservation.setBiens(bien);
        reservation.setDateArrivee(request.getDateArrivee());
        reservation.setDateDepart(request.getDateDepart());
        reservation.setEtat(request.getEtat());
        reservation.setNombreNuits(request.getNombreNuits());
        reservation.setCautionEtat(request.isCautionEtat());
        reservation.setAnimauxAdmis(request.isAnimauxAdmis());
        reservation.setCodePromo(request.getCodePromo());

        reservations savedReservation = ReservationRepository.save(reservation);

        // Créer et retourner la réponse formatée
        ReservationRequest response = new ReservationRequest();
        response.setBienCode(bienCode);
        response.setDateArrivee(savedReservation.getDateArrivee());
        response.setDateDepart(savedReservation.getDateDepart());
        response.setNombreNuits(savedReservation.getNombreNuits());
        response.setCautionEtat(savedReservation.isCautionEtat());
        response.setAnimauxAdmis(savedReservation.isAnimauxAdmis());
        reservation.setEtat(savedReservation.getEtat());
        reservation.setCodePromo(savedReservation.getCodePromo());

        return response;
    }
    @PutMapping("/{id}")
    public ResponseEntity<reservations> updateReservation(@PathVariable int id, @RequestBody ReservationRequest request) {

        reservations reservation= locationReservationService.updateReservation(id,request);
        return ResponseEntity.ok(reservation);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable int id) {
        return locationReservationService.deleteReservation(id);
    }
    @GetMapping("/{id}/details")
    public ResponseEntity<ReservationDetailsDTO> getReservationDetails(
            @PathVariable("id") int id,
            @RequestParam("bienCode") String bienCode) {
        int bienId = BienService.findByCode(bienCode).getId();
        ReservationDetailsDTO reservationDetails = locationReservationService.getReservationDetails(id, bienId);
        System.out.println("je suis details ??????????"+reservationDetails);

        if (reservationDetails == null) {
            return ResponseEntity.notFound().build();
        }

        System.out.println("Reservation details: " + reservationDetails.toString());
        return ResponseEntity.ok(reservationDetails);
    }


}