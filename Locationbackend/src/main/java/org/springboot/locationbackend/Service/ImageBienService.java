package org.springboot.locationbackend.Service;

import jakarta.persistence.EntityNotFoundException;
import org.springboot.locationbackend.Model.PropertyImage;
import org.springboot.locationbackend.Model.biens;
import org.springboot.locationbackend.Repository.ImageBienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ImageBienService {

    @Autowired
    private ImageBienRepository imageBienRepository;



    public List<PropertyImage> findImagesByBienId(int biensId) {
        return imageBienRepository.findByBienId(biensId);
    }
    public void saveImages(List<MultipartFile> images, biens property) throws IOException {
        for (MultipartFile image : images) {
            PropertyImage propertyImage = new PropertyImage();
            propertyImage.setImageData(image.getBytes());  // Sauvegarde en tant que BLOB
            propertyImage.setBien(property);
            imageBienRepository.save(propertyImage);
        }
    }

    public void removeImageById(int biensId, int imageId) {
        imageBienRepository.deleteById(imageId);
    }
}
