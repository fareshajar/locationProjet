package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.*;
import org.springboot.locationbackend.Repository.ImageBienRepository;
import org.springboot.locationbackend.Service.BienService;
import org.springboot.locationbackend.Service.TypeBienService;
import org.springboot.locationbackend.Service.ImageBienService;
import org.springboot.locationbackend.Service.LocateurService;
import org.springboot.locationbackend.Service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/properties")
public class BienController {

    @Autowired
    private BienService biensService;

    @Autowired
    private ImageBienService imageService;

    @Autowired
    private LocateurService LocateurService;

    @GetMapping("/locataires")
    public List<utilisateurs> getAllLocataires() {
        return LocateurService.getAllLocateurs();
    }

    @PostMapping
    public biens createProperty(
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam("codeBien") String codeBien,
            @RequestParam("description") String description,
            @RequestParam("pieces") int pieces,
            @RequestParam("surface") double surface,
            @RequestParam("constructionYear") int constructionYear,
            @RequestParam("typeId") int typeId,
            @RequestParam("prix") double prix,
            @RequestParam("locateurcode") String locateurcode,
            @RequestParam("options") List<Integer> options,
            @RequestParam("images") List<MultipartFile> images) throws IOException {

        Integer locataireId = LocateurService.searchLocateur(locateurcode);
        biens newProperty = new biens();
        newProperty.setName(name);
        newProperty.setAddress(address);
        newProperty.setCodeBien(codeBien);
        newProperty.setDescription(description);
        newProperty.setPieces(pieces);
        newProperty.setSurface(surface);
        newProperty.setConstructionYear(constructionYear);
        newProperty.setTypeId(new TypeBien(typeId));
        newProperty.setPrix(prix);
        newProperty.setLocateurId(new utilisateurs(locataireId));

        // Save property
        biens savedProperty = biensService.saveProperty(newProperty);

        // Save options
        savedProperty.setOptions(options.stream().map(option::new).collect(Collectors.toSet()));
        biensService.saveProperty(savedProperty);

        if (images != null && !images.isEmpty()) {
            imageService.saveImages(images, savedProperty);}
            biensService.saveProperty(savedProperty); // Ensure this is called after saving images


        return savedProperty;
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable("id") int id) {
        biensService.deleteProperty(id);
    }

    @GetMapping
    public ResponseEntity<List<biens>> getAllProperties() {
        return ResponseEntity.ok(biensService.getAllProperties());
    }

    @GetMapping("locateurbien/{id}")
    public ResponseEntity<List<biens>> getAllPropertiesLocateur(@PathVariable("id") int locateurId) {
        System.out.println(locateurId);
        System.out.println("je suis bien locateur"+biensService.getBiensByLocateurId(locateurId));
        return ResponseEntity.ok(biensService.getBiensByLocateurId(locateurId));
    }


   @DeleteMapping("/{biensId}/images")
public ResponseEntity<Void> removeImage(@PathVariable int biensId, @RequestParam int imageId) {
    imageService.removeImageById(biensId, imageId);
    return ResponseEntity.noContent().build();
}



    @GetMapping("/{id}/images")
    public ResponseEntity<List<String>> getImagesByPropertyId(@PathVariable int id) {
        // Ajoutez des logs pour vérifier la valeur de 'id'
        System.out.println("Fetching images for property ID: " + id);
        List<PropertyImage> propertyImages = imageService.findImagesByBienId(id);
        if (propertyImages == null || propertyImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<String> imageBase64 = propertyImages.stream()
                .map(image -> Base64.getEncoder().encodeToString(image.getImageData()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(imageBase64);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<biens> updateProperty(
            @PathVariable("id") Integer id,
            @RequestParam("name") String name,
            @RequestParam("address") String address,
            @RequestParam("codeBien") String codeBien,
            @RequestParam("description") String description,
            @RequestParam("pieces") int pieces,
            @RequestParam("surface") double surface,
            @RequestParam("constructionYear") int constructionYear,
            @RequestParam("typeId") int typeId,
            @RequestParam("prix") double prix,
            @RequestParam("locateurcode") String locateurcode,
            @RequestParam("options") List<Integer> options,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) throws IOException {
        System.out.println(id);
        System.out.println(name);
        System.out.println(address);
        System.out.println(codeBien);
        System.out.println(description);
        System.out.println(pieces);
        System.out.println(surface);
        System.out.println(typeId);
        System.out.println(prix);
        System.out.println(locateurcode);
        System.out.println(options);
        System.out.println(images);

        System.out.println("Updating property with ID: " + id);

        biens existingProperty = biensService.fintById(id);
        if (existingProperty == null) {
            System.out.println("Property not found with ID: " + id);
            return ResponseEntity.notFound().build();
        }

        existingProperty.setName(name);
        existingProperty.setAddress(address);
        existingProperty.setCodeBien(codeBien);
        existingProperty.setDescription(description);
        existingProperty.setPieces(pieces);
        existingProperty.setSurface(surface);
        existingProperty.setConstructionYear(constructionYear);
        existingProperty.setTypeId(new TypeBien(typeId));
        existingProperty.setPrix(prix);
        existingProperty.setLocateurId(new utilisateurs(LocateurService.searchLocateur(locateurcode)));


        biens savedProperty = biensService.saveProperty(existingProperty);

        savedProperty.setOptions(options.stream().map(option::new).collect(Collectors.toSet()));
        biensService.saveProperty(savedProperty);

        if (images != null && !images.isEmpty()) {
            imageService.saveImages(images, savedProperty);}
        biens updatedProperty = biensService.updateProperty(existingProperty);

        return ResponseEntity.ok(updatedProperty);

    }



    @GetMapping("/code/{code}")
    public ResponseEntity<biens> getBienByCode(@PathVariable String code) {
        biens bien = biensService.findByCode(code);
        if (bien != null) {
            return ResponseEntity.ok(bien);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{bienId}")
    public ResponseEntity<biens> getPropertyById(@PathVariable int bienId) {
        biens property = biensService.fintById(bienId);
        if (property != null) {
            return ResponseEntity.ok(property);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
