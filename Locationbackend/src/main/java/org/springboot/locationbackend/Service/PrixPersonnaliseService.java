package org.springboot.locationbackend.Service;

import org.springboot.locationbackend.Model.prix_personnalise;
import org.springboot.locationbackend.Repository.PrixPersonnaliseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrixPersonnaliseService {

    @Autowired
    private PrixPersonnaliseRepository prixPersonnaliseRepository;

    public List<prix_personnalise> getPrixPersonnalises(int bienId, LocalDate dateArrivee, LocalDate dateDepart) {
        List<prix_personnalise> prixPersonnalises = prixPersonnaliseRepository.findByBienIdAndDateRange(bienId, dateArrivee, dateDepart);
        System.out.println("Bien ID: " + bienId);
        System.out.println("Date Arrivée: " + dateArrivee);
        System.out.println("Date Départ: " + dateDepart);
        System.out.println("Prix Personnalisés: " + prixPersonnalises);
        return prixPersonnalises;
    }


}
