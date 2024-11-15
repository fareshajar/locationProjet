package org.springboot.locationbackend.Repository;

import org.springboot.locationbackend.Model.PropertyImage;
import org.springboot.locationbackend.Model.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageBienRepository extends JpaRepository<PropertyImage, Integer> {
    List<PropertyImage> findByBienId(int biensId);

}