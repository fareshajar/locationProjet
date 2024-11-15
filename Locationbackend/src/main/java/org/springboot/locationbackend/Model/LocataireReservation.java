package org.springboot.locationbackend.Model;


import jakarta.persistence.*;

@Entity
public class LocataireReservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_reservation")
    private reservations reservation;

    @ManyToOne
    @JoinColumn(name = "id_locataire")
    private Locataire locataire;

    public LocataireReservation(reservations reservation, Locataire locataire) {
        this.reservation = reservation;
        this.locataire = locataire;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public LocataireReservation() {
    }
}
