package org.springboot.locationbackend.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name="reservations")
public class reservations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "bien_id")
    private biens biens ;

    private LocalDate dateArrivee;
    private LocalDate dateDepart;

    private int nombreNuits;

    private  String etat ;

    @Column(nullable = false)
    private Boolean cautionEtat;
    @Column(nullable = false)
    private Boolean animauxAdmis;

    private String codePromo;

    // Getters et setters pour codePromo
    public String getCodePromo() {
        return codePromo;
    }

    public void setCodePromo(String codePromo) {
        this.codePromo = codePromo;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    // getters et setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public org.springboot.locationbackend.Model.biens getBiens() {
        return biens;
    }

    public void setBiens(org.springboot.locationbackend.Model.biens biens) {
        this.biens = biens;
    }





    public LocalDate getDateArrivee() {
        return dateArrivee;
    }

    public void setDateArrivee(LocalDate dateArrivee) {
        this.dateArrivee = dateArrivee;
    }

    public LocalDate getDateDepart() {
        return dateDepart;
    }

    public void setDateDepart(LocalDate dateDepart) {
        this.dateDepart = dateDepart;
    }

    public int getNombreNuits() {
        return nombreNuits;
    }

    public void setNombreNuits(int nombreNuits) {
        this.nombreNuits = nombreNuits;
    }
    public boolean isCautionEtat() {
        return cautionEtat;
    }

    public void setCautionEtat(boolean cautionEtat) {
        this.cautionEtat = cautionEtat;
    }

    public boolean isAnimauxAdmis() {
        return animauxAdmis;
    }

    public void setAnimauxAdmis(boolean animauxAdmis) {
        this.animauxAdmis = animauxAdmis;
    }
   public reservations(){}

    public reservations(org.springboot.locationbackend.Model.biens biens, LocalDate dateArrivee, LocalDate dateDepart,String etat, int nombreNuits, double prixLocation, double montantArrhes, double montantSolde, boolean cautionEtat, boolean animauxAdmis) {
        this.biens = biens;
        this.dateArrivee = dateArrivee;
        this.dateDepart = dateDepart;
        this.etat=etat;
        this.nombreNuits = nombreNuits;
        this.cautionEtat = cautionEtat;
        this.animauxAdmis = animauxAdmis;
    }

    @Override
    public String toString() {
        return "reservations{" +
                "biens=" + biens +
                ", dateArrivee=" + dateArrivee +
                ", dateDepart=" + dateDepart +
                ",etat="+etat+
                ", nombreNuits=" + nombreNuits +
                ", cautionEtat=" + cautionEtat +
                ", animauxAdmis=" + animauxAdmis +
                '}';
    }
}
