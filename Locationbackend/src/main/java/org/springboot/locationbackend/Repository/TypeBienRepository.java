package org.springboot.locationbackend.Repository;
import org.springboot.locationbackend.Model.TypeBien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeBienRepository extends JpaRepository<TypeBien, Integer> {
    @Override
    Optional<TypeBien> findById(Integer integer);
}

