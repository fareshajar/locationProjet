package org.springboot.locationbackend.Repository;

import org.springboot.locationbackend.Model.Locataire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocataireRepository extends JpaRepository<Locataire,Integer> {
}
