package org.springboot.locationbackend.Controller;


import org.springboot.locationbackend.Model.codePromo;
import org.springboot.locationbackend.Service.CodePromoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/codePromos")
public class CodePromoController {

    @Autowired
    private CodePromoService codePromoService;

    @GetMapping
    public List<codePromo> getAllCodePromos() {
        return codePromoService.getAllCodePromos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<codePromo> getCodePromoById(@PathVariable int id) {
        Optional<codePromo> codePromo = codePromoService.getCodePromoById(id);
        if (codePromo.isPresent()) {
            return ResponseEntity.ok(codePromo.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public codePromo createCodePromo(@RequestBody codePromo codePromo) {
        return codePromoService.createCodePromo(codePromo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodePromo(@PathVariable int id) {
        if (codePromoService.getCodePromoById(id).isPresent()) {
            codePromoService.deleteCodePromo(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
