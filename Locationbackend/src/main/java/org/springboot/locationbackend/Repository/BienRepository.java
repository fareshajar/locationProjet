package org.springboot.locationbackend.Repository;

import org.springboot.locationbackend.Model.biens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BienRepository extends JpaRepository<biens, Integer> {

    @Query("SELECT b FROM biens b JOIN FETCH b.typebien")
    List<biens> findAllWithType();
    biens findById(int integer);
    biens findByCode(String code);

    List<biens> findByLocateur_Id(Integer locateurId);
}
