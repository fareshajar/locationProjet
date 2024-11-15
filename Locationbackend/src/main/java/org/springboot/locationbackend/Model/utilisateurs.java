package org.springboot.locationbackend.Model;

import jakarta.persistence.*;


@Entity
@Table(name="utilisateurs")
public class utilisateurs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private String nom;
    private String prenom;
    private String adresse;
    private String gsm;
    private String email;
    private String commentaire;
    private String password ;
    private  String locateur_code;

    public String getLocateurCode() {
        return locateur_code;
    }

    public void setLocateurCode(String locateurCode) {
        this.locateur_code= locateurCode;
    }

    @Column(name = "type_utilisateur")
    private String typeUtilisateur;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getGsm() {
        return gsm;
    }

    public void setGsm(String gsm) {
        this.gsm = gsm;
    }

    public String getTypeUtilisateur() {
        return typeUtilisateur;
    }

    public void setTypeUtilisateur(String typeUtilisateur) {
        this.typeUtilisateur = typeUtilisateur;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public utilisateurs(int id) {
        this.id = id;
    }

    public utilisateurs(){

   }

    public utilisateurs(String nom, String prenom, String adresse, String gsm, String email, String commentaire, String password, String locateurCode, String typeUtilisateur) {
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.gsm = gsm;
        this.email = email;
        this.commentaire = commentaire;
        this.password = password;
        this.locateur_code = locateurCode;
        this.typeUtilisateur = typeUtilisateur;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "utilisateurs{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", adresse='" + adresse + '\'' +
                ", gsm='" + gsm + '\'' +
                ", email='" + email + '\'' +
                ", commentaire='" + commentaire + '\'' +
                ", password='" + password + '\'' +
                ", locateur_code='" + locateur_code + '\'' +
                ", typeUtilisateur='" + typeUtilisateur + '\'' +
                '}';
    }
}
