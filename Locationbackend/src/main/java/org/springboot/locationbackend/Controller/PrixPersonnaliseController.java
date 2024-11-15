package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.biens;
import org.springboot.locationbackend.Model.prix_personnalise;
import org.springboot.locationbackend.Repository.BienRepository;
import org.springboot.locationbackend.Repository.PrixPersonnaliseRepository;
import org.springboot.locationbackend.Service.PrixPersonnaliseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class PrixPersonnaliseController {


    @Autowired
    private PrixPersonnaliseRepository prixPersonnaliseRepository;



    // Endpoint pour ajouter un prix personnalisé
    @PostMapping("/custom_prices")
    public ResponseEntity<?> addCustomPrice(@RequestBody prix_personnalise prixPersonnalise) {
        System.out.println(prixPersonnalise);
        try {
            // Vérifie si le bien est bien présent
            if (prixPersonnalise.getBien() == null ) {
                return ResponseEntity.badRequest().body("Bien non spécifié");
            }

            prix_personnalise savedPrix = prixPersonnaliseRepository.save(prixPersonnalise);
            return ResponseEntity.ok(savedPrix);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'ajout du prix personnalisé: " + e.getMessage());
        }
    }
}
