package org.springboot.locationbackend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "types_options")
public class option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    // getters and setters

    public option() {
    }

    public option(int id) {
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
