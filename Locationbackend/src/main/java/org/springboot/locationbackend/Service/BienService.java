package org.springboot.locationbackend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.springboot.locationbackend.Model.PropertyImage;
import org.springboot.locationbackend.Model.biens;
import org.springboot.locationbackend.Repository.BienRepository;
import org.springboot.locationbackend.Repository.ImageBienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BienService {

    @Autowired
    private BienRepository bienRepository;

    public biens saveProperty(biens property) {
        return bienRepository.save(property);
    }

    public List<biens> getAllProperties() {
        return bienRepository.findAllWithType();
    }
    public List<biens> getBiensByLocateurId(int locateurId) {
        return bienRepository.findByLocateur_Id(locateurId); // Utilisation correcte
    }


    public void deleteProperty(int id) {
        bienRepository.deleteById(id);
    }

    @Autowired
    private ImageBienRepository imageBienRepository;
    public biens fintById(int id){
       return  bienRepository.findById(id);
    }
    @Transactional
    public biens updateProperty(biens property) {
        return bienRepository.save(property);
    }
    public  biens findByCode(String Code){
        return bienRepository.findByCode(Code);
    }




}
