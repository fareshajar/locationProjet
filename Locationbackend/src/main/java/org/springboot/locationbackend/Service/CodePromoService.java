package org.springboot.locationbackend.Service;
import org.springboot.locationbackend.Model.codePromo;
import org.springboot.locationbackend.Model.codePromo;
import org.springboot.locationbackend.Repository.CodePromoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CodePromoService {

    @Autowired
    private CodePromoRepository codePromoRepository;

    public List<codePromo> getAllCodePromos() {
        return codePromoRepository.findAll();
    }

    public Optional<codePromo> getCodePromoById(int id) {
        return codePromoRepository.findById(id);
    }

    public codePromo createCodePromo(codePromo codePromo) {
        return codePromoRepository.save(codePromo);
    }

    public void deleteCodePromo(int  id) {
        codePromoRepository.deleteById(id);
    }

}
