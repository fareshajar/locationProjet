package org.springboot.locationbackend.Service;
import org.springboot.locationbackend.Model.TypeBien;
import org.springboot.locationbackend.Repository.TypeBienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeBienService {
    @Autowired
    private TypeBienRepository propertyTypeRepository;



    public List<TypeBien> getAllPropertyTypes() {
        return propertyTypeRepository.findAll();
    }

    public TypeBien getPropertyTypeById(int id) {
        return propertyTypeRepository.findById(id).orElse(null);
    }

    public TypeBien createPropertyType(TypeBien propertyType) {
        return propertyTypeRepository.save(propertyType);
    }

    public TypeBien updatePropertyType(int id, TypeBien propertyType) {
        TypeBien existingPropertyType = propertyTypeRepository.findById(id).orElse(null);
        if (existingPropertyType != null) {
            existingPropertyType.setName(propertyType.getName());
            return propertyTypeRepository.save(existingPropertyType);
        }
        return null;
    }

    public void deletePropertyType(int id) {
        propertyTypeRepository.deleteById(id);
    }
}
