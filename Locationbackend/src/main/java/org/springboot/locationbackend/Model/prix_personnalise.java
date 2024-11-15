package org.springboot.locationbackend.Model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "prix_personnalise")  // Nom de ta table dans la base de données
public class  prix_personnalise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @Column(name = "prix", nullable = false)
    private Double prix;

    @ManyToOne
    @JoinColumn(name = "idbiens", nullable = false)
    private biens bien;  // Association avec l'entité Bien

    // Constructeurs
    public prix_personnalise() {}

    public prix_personnalise(LocalDate dateDebut, LocalDate dateFin, Double prix, biens bien) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.prix = prix;
        this.bien = bien;
    }

    // Getters et setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public biens getBien() {
        return bien;
    }

    public void setBien(biens bien) {
        this.bien = bien;
    }
}
