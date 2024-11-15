package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.utilisateurs;
import org.springboot.locationbackend.Service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/Admin")
public class adminController {
    @Autowired
    public UtilisateurService utilisateurService;
    @PostMapping("/login")
    public Optional<utilisateurs> login(@RequestBody utilisateurs loginRequest) {
        Optional<utilisateurs> user = utilisateurService.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            return user;
        } else {
            return Optional.empty(); // or throw an appropriate exception
        }
    }
}
