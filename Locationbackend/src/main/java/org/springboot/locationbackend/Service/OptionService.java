package org.springboot.locationbackend.Service;

import org.springboot.locationbackend.Model.option;
import org.springboot.locationbackend.Repository.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionService {
    @Autowired
    private OptionRepository optionRepository;

    public List<option> getAllOptions() {
        return optionRepository.findAll();
    }
    public option updateOption(int id, option option) {
        return optionRepository.findById(id)
                .map(existingOption -> {
                    existingOption.setName(option.getName());
                    return optionRepository.save(existingOption);
                })
                .orElse(null);
    }
    public option createPropertyType(option propertyoption){
        return optionRepository.save(propertyoption);
    }
    public void deleteOption(int id) {
        optionRepository.deleteById(id);
    }
}
