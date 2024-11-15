package org.springboot.locationbackend.Service;

import org.springframework.stereotype.Service;
import org.springboot.locationbackend.Model.Locataire;
import org.springboot.locationbackend.Repository.LocataireRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class LocataireService {

    @Autowired
    private LocataireRepository locataireRepository;

    public List<Locataire> getAllLocataires() {
        return locataireRepository.findAll();
    }

    public Optional<Locataire> getLocataireById(int id) {
        return locataireRepository.findById(id);
    }

    public Locataire createLocataire(Locataire locataire) {
        return locataireRepository.save(locataire);
    }

    public Locataire updateLocataire(int id, Locataire locataireDetails) {
        Locataire locataire = locataireRepository.findById(id).orElseThrow(() -> new RuntimeException("Locataire not found"));
        locataire.setNom(locataireDetails.getNom());
        locataire.setPrenom(locataireDetails.getPrenom());
        locataire.setGsm(locataireDetails.getGsm());
        locataire.setEmail(locataireDetails.getEmail());
        locataire.setCIM(locataireDetails.getCIM());
        return locataireRepository.save(locataire);
    }

    public void deleteLocataire(int id) {
        locataireRepository.deleteById(id);
    }
}
