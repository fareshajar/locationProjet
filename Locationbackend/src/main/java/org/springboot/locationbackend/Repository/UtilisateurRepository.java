package org.springboot.locationbackend.Repository;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springboot.locationbackend.Model.utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<utilisateurs, Integer> {
    Optional<utilisateurs> findByEmailAndPassword(String email, String password);

    List<utilisateurs> findByTypeUtilisateur(String typeUtilisateur);

    @Query("SELECT u.id FROM utilisateurs u WHERE u.locateur_code = :locateurCode ")
    Optional<Integer> findByCode(@Param("locateurCode") String locateurCode);
}
