package org.springboot.locationbackend.Repository;

import org.springboot.locationbackend.Model.utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocateurRepository extends JpaRepository<utilisateurs,Integer> {
    Optional<utilisateurs> findByNomAndPrenomAndGsmAndEmail(String nom,String prenom,String GSM,String email);
}
