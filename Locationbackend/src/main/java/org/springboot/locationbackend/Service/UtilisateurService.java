package org.springboot.locationbackend.Service;
import org.springboot.locationbackend.Model.utilisateurs;
import org.springboot.locationbackend.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UtilisateurService {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    public Optional<utilisateurs> findByEmailAndPassword(String email, String password){
        return utilisateurRepository.findByEmailAndPassword(email,password);
    }



}
