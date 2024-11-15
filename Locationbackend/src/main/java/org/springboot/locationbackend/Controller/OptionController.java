package org.springboot.locationbackend.Controller;

import org.springboot.locationbackend.Model.TypeBien;
import org.springboot.locationbackend.Model.option;
import org.springboot.locationbackend.Service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/options")
public class OptionController {
    @Autowired
    private OptionService optionService;

    @GetMapping
    public List<option> getAllOptions() {
        System.out.println("je suis appele option");
        System.out.println(optionService.getAllOptions());
        return optionService.getAllOptions();
    }
    @PostMapping
    public option createPropertyoption(@RequestBody option propertyoption) {
        return optionService.createPropertyType(propertyoption);
    }
    @PutMapping("/{id}")
    public ResponseEntity<option> updateOption(@PathVariable int id, @RequestBody option option) {
        option updatedOption = optionService.updateOption(id, option);
        if (updatedOption != null) {
            return ResponseEntity.ok(updatedOption);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOption(@PathVariable int id) {
        optionService.deleteOption(id);
        return ResponseEntity.noContent().build();
    }
}
