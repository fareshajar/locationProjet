package org.springboot.locationbackend.Repository;
import org.springboot.locationbackend.Model.option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<option, Integer> {
}

