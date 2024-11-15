package org.springboot.locationbackend.Controller;
import org.springboot.locationbackend.Model.utilisateurs;
import org.springboot.locationbackend.Service.LocateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/locateurs")
public class LocateurController {

    @Autowired
    private LocateurService locateurService;

    @GetMapping
    public List<utilisateurs> getAllLocateurs() {
        System.out.println(locateurService.getAllLocateurs());
        return locateurService.getAllLocateurs();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLocateur(@RequestBody utilisateurs locateur) {
        try {
            System.out.println(locateur.toString());
            utilisateurs savedLocateur = locateurService.createLocateur(locateur);
            return ResponseEntity.ok(savedLocateur);
        } catch (Exception e) {
            e.printStackTrace(); // Ajoute une trace de la pile d'exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating locateur");
        }
    }



    @PutMapping("/update")
    public utilisateurs updateLocateur(@RequestBody utilisateurs locateurDetails) {
        return locateurService.updateLocateur(locateurDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteLocateur(@PathVariable int id) {
        locateurService.deleteLocateur(id);
    }
}

