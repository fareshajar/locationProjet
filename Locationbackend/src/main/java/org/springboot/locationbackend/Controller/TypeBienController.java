package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.TypeBien;
import org.springboot.locationbackend.Service.TypeBienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/types")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class TypeBienController {
    @Autowired
    private    TypeBienService propertyTypeService;

    @GetMapping
    public List<TypeBien> getAllPropertyTypes() {
        return propertyTypeService.getAllPropertyTypes();
    }


    @GetMapping("/{id}")
    public ResponseEntity<TypeBien> getPropertyTypeById(@PathVariable int id) {
        TypeBien propertyType = propertyTypeService.getPropertyTypeById(id);
        if (propertyType != null) {
            return ResponseEntity.ok(propertyType);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public TypeBien createPropertyType(@RequestBody TypeBien propertyType) {
        return propertyTypeService.createPropertyType(propertyType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeBien> updatePropertyType(@PathVariable int id, @RequestBody TypeBien propertyType) {
        TypeBien updatedPropertyType = propertyTypeService.updatePropertyType(id, propertyType);
        if (updatedPropertyType != null) {
            return ResponseEntity.ok(updatedPropertyType);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePropertyType(@PathVariable int id) {
        propertyTypeService.deletePropertyType(id);
        return ResponseEntity.noContent().build();
    }
}
