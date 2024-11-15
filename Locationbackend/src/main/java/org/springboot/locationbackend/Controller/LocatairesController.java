package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.Locataire;
import org.springboot.locationbackend.Service.LocataireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/locataires")
public class LocatairesController {

    @Autowired
    private LocataireService locataireService;

    @GetMapping
    public List<Locataire> getAllLocataires() {
        List<Locataire> locataires = locataireService.getAllLocataires();
        System.out.println("Locataires: " + locataires); // Vérifiez les données
        return locataires;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locataire> getLocataireById(@PathVariable int id) {
        Optional<Locataire> locataire = locataireService.getLocataireById(id);
        return locataire.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Locataire createLocataire(@RequestBody Locataire locataire) {
        return locataireService.createLocataire(locataire);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locataire> updateLocataire(@PathVariable int id, @RequestBody Locataire locataireDetails) {
        Locataire updatedLocataire = locataireService.updateLocataire(id, locataireDetails);
        return ResponseEntity.ok(updatedLocataire);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocataire(@PathVariable int id) {
        locataireService.deleteLocataire(id);
        return ResponseEntity.noContent().build();
    }
}
