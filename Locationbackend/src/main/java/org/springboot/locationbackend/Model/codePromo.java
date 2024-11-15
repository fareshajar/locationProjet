package org.springboot.locationbackend.Model;
import jakarta.persistence.*;

@Entity
@Table(name = "code_promo")
public class codePromo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String codePromo;

    @Column(nullable = false)
    private double pourcentage;

    // Getters et setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCodePromo() {
        return codePromo;
    }

    public void setCodePromo(String codePromo) {
        this.codePromo = codePromo;
    }

    public double getPourcentage() {
        return pourcentage;
    }

    public void setPourcentage(double pourcentage) {
        this.pourcentage = pourcentage;
    }

    @Override
    public String toString() {
        return "CodePromo{" +
                "id=" + id +
                ", codePromo='" + codePromo + '\'' +
                ", pourcentage=" + pourcentage +
                '}';
    }
}

