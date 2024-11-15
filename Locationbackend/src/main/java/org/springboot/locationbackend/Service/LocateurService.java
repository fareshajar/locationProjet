package org.springboot.locationbackend.Service;

import org.springboot.locationbackend.Model.utilisateurs;
import org.springboot.locationbackend.Repository.LocateurRepository;
import org.springboot.locationbackend.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocateurService {

    @Autowired
    private LocateurRepository locateurRepository;
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Optional<utilisateurs> getLocateurById(int id) {
        return locateurRepository.findById(id);
    }

    public utilisateurs createLocateur(utilisateurs locateur) {
        locateur.setNom(locateur.getNom());
        locateur.setPrenom(locateur.getPrenom());
        locateur.setAdresse(locateur.getAdresse());
        locateur.setGsm(locateur.getGsm());
        locateur.setCommentaire(locateur.getCommentaire());
        locateur.setLocateurCode(locateur.getLocateurCode());
        locateur.setEmail(locateur.getEmail());
        return locateurRepository.save(locateur);

    }

    public utilisateurs updateLocateur(utilisateurs locateurDetails) {
        Optional<utilisateurs> locateurOptional = locateurRepository.findByNomAndPrenomAndGsmAndEmail(
                locateurDetails.getNom(),
                locateurDetails.getPrenom(),
                locateurDetails.getGsm(),
                locateurDetails.getEmail()
        );
        if (locateurOptional.isPresent()) {
            utilisateurs locateur = locateurOptional.get();
            locateur.setNom(locateurDetails.getNom());
            locateur.setPrenom(locateurDetails.getPrenom());
            locateur.setAdresse(locateurDetails.getAdresse());
            locateur.setGsm(locateurDetails.getGsm());
            locateur.setCommentaire(locateurDetails.getCommentaire());
            return locateurRepository.save(locateur);
        } else {
            // Handle case when locateur is not found
            throw new RuntimeException("Locateur non trouvé");
        }
    }

    public void deleteLocateur(int id) {
        locateurRepository.deleteById(id);
    }

        public List<utilisateurs> getAllLocateurs() {
            return utilisateurRepository.findByTypeUtilisateur("locateur");
        }
    public Integer searchLocateur(String locateurcode) {
        Optional<Integer> optionalId = utilisateurRepository.findByCode(locateurcode);
        return optionalId.orElseThrow(() -> new RuntimeException("Locateur non trouvé"));  // Gère l'absence d'utilisateur
    }




}

