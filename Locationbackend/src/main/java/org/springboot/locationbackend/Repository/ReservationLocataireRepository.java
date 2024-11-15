package org.springboot.locationbackend.Repository;

import org.springboot.locationbackend.Model.LocataireReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationLocataireRepository extends JpaRepository<LocataireReservation, Integer> {
    LocataireReservation findByReservationId(int reservationId);
}
