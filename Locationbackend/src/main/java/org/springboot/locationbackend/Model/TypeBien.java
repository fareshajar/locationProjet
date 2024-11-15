package org.springboot.locationbackend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "typebien")
public class TypeBien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    // getters and setters

    public TypeBien() {
    }

    public TypeBien(int id) {
        this.id = id;
    }

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
}
