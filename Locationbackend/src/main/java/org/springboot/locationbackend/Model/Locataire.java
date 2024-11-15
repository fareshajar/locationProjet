package org.springboot.locationbackend.Model;

import jakarta.persistence.*;

@Entity
public class Locataire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nom;
    private String prenom;
    private String gsm;
    private String email;
    private String CIM;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getGsm() {
        return gsm;
    }

    public void setGsm(String gsm) {
        this.gsm = gsm;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCIM() {
        return CIM;
    }

    public void setCIM(String CIM) {
        this.CIM = CIM;
    }

    // Constructors
    public Locataire() {}

    public Locataire(String nom, String prenom, String gsm, String email, String CIM) {
        this.nom = nom;
        this.prenom = prenom;
        this.gsm = gsm;
        this.email = email;
        this.CIM = CIM;
    }

    public Locataire(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Locataire{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", gsm='" + gsm + '\'' +
                ", email='" + email + '\'' +
                ", CIM='" + CIM + '\'' +
                '}';
    }
}
