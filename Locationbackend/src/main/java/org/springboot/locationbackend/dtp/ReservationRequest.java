package org.springboot.locationbackend.dtp;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReservationRequest {
    private String bienCode;
    private LocalDate dateArrivee;
    private LocalDate dateDepart;
    private int nombreNuits;

    private boolean cautionEtat;
    private boolean animauxAdmis;
    private String etat;
    private String codePromo;

    public String getCodePromo() {
        return codePromo;
    }

    public void setCodePromo(String codePromo) {
        this.codePromo = codePromo;
    }

    public String getBienCode() {
        return bienCode;
    }

    public void setBienCode(String bienCode) {
        this.bienCode = bienCode;
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

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    @Override
    public String toString() {
        return "ReservationRequest{" +
                "bienCode='" + bienCode + '\'' +
                ", dateArrivee=" + dateArrivee +
                ", dateDepart=" + dateDepart +
                ", nombreNuits=" + nombreNuits +
                ", cautionEtat=" + cautionEtat +
                ", animauxAdmis=" + animauxAdmis +
                ", etat='" + etat + '\'' +
                '}';
    }
}