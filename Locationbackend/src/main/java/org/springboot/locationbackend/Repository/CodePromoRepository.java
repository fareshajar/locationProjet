package org.springboot.locationbackend.Repository;


import org.springboot.locationbackend.Model.codePromo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodePromoRepository extends JpaRepository<codePromo, Integer> {
    codePromo findByCodePromo(String codePromo);
}
