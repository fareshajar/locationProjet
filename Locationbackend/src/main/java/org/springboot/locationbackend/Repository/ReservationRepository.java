package org.springboot.locationbackend.Repository;
import org.springboot.locationbackend.Model.reservations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ReservationRepository extends JpaRepository<reservations, Integer> {
    @Query("SELECT r FROM reservations r JOIN r.biens b WHERE b.locateur.id = :locateurId")
    List<reservations> findReservationsByLocateurId(@Param("locateurId") int locateurId);


}
