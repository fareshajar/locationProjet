package org.springboot.locationbackend.dtp;

import org.springboot.locationbackend.Model.Locataire;
import org.springboot.locationbackend.Model.prix_personnalise;
import org.springboot.locationbackend.Model.reservations;
import org.springboot.locationbackend.Model.codePromo;
import java.util.List;

public class ReservationDetailsDTO {
    private reservations reservation;
    private Locataire locataire;
    private List<prix_personnalise> prixPersonnalises;

  private codePromo codePromo;

    public org.springboot.locationbackend.Model.codePromo getCodePromo() {
        return codePromo;
    }

    public void setCodePromo(org.springboot.locationbackend.Model.codePromo codePromo) {
        this.codePromo = codePromo;
    }

    public List<prix_personnalise> getPrixPersonnalises() {
        return prixPersonnalises;
    }

    public void setPrixPersonnalises(List<prix_personnalise> prixPersonnalises) {
        this.prixPersonnalises = prixPersonnalises;
    }

    public reservations getReservation() {
        return reservation;
    }

    public void setReservation(reservations reservation) {
        this.reservation = reservation;
    }

    public Locataire getLocataire() {
        return locataire;
    }

    public void setLocataire(Locataire locataire) {
        this.locataire = locataire;
    }

    @Override
    public String toString() {
        return "ReservationDetailsDTO{" +
                "reservation=" + reservation +
                ", locataire=" + locataire +
                ", prixPersonnalises=" + prixPersonnalises +
                '}';
    }
}
