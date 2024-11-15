package org.springboot.locationbackend.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name ="biens")
public class biens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String address;
    private String description;
    private int pieces;
    private double surface;
    private int constructionYear;
    private String code;
    private double prix;

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public String getCode_bien() {
        return code;
    }

    public void setCode_bien(String code_bien) {
        this.code = code_bien;
    }

    public String getCodeBien() {
        return code;
    }

    public void setCodeBien(String codeBien) {
        this.code = codeBien;
    }

    @ManyToOne
    @JoinColumn(name = "locateur_id")
    private utilisateurs locateur ;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeBien typebien;

    @ManyToMany
    @JoinTable(
            name = "biens_options",
            joinColumns = @JoinColumn(name = "biens_id"),
            inverseJoinColumns = @JoinColumn(name = "option_id")
    )
    private Set<option> options = new HashSet<>();


    public biens(int biensId) {
        this.id=biensId;
    }

    // Getters et Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public biens() {
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPieces() {
        return pieces;
    }

    public void setPieces(int pieces) {
        this.pieces = pieces;
    }

    public double getSurface() {
        return surface;
    }

    public void setSurface(double surface) {
        this.surface = surface;
    }

    public int getConstructionYear() {
        return constructionYear;
    }

    public void setConstructionYear(int constructionYear) {
        this.constructionYear = constructionYear;
    }


    public utilisateurs getLocateur() {
        return locateur;
    }

    public void setLocateur(utilisateurs locateur) {
        this.locateur = locateur;
    }

    public TypeBien getTypeId() {
        return typebien;
    }



    public void setLocateurId(utilisateurs locateurId) {
        this.locateur= locateurId;
    }

    public void setTypeId(TypeBien typeId) {
        this.typebien = typeId;
    }

    public Set<option> getOptions() {
        return options;
    }

    public void setOptions(Set<option> options) {
        this.options = options;
    }



}
