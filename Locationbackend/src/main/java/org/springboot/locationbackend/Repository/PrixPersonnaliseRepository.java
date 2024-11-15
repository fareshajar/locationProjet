package org.springboot.locationbackend.Repository;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springboot.locationbackend.Model.prix_personnalise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PrixPersonnaliseRepository extends JpaRepository<prix_personnalise,Integer> {
    @Query("SELECT p FROM prix_personnalise p WHERE p.bien.id = :idbiens AND (" +
            "(p.dateDebut >= :dateArrivee AND p.dateDebut <= :dateDepart) OR " + // La date de début du prix est dans la période
            "(p.dateFin >= :dateArrivee AND p.dateFin <= :dateDepart) OR " +     // La date de fin du prix est dans la période
            "(p.dateDebut <= :dateArrivee AND p.dateFin >= :dateDepart))")
        // Le prix couvre complètement la période
    List<prix_personnalise> findByBienIdAndDateRange(@Param("idbiens") int bienId, @Param("dateArrivee") LocalDate dateArrivee, @Param("dateDepart") LocalDate dateDepart);
}