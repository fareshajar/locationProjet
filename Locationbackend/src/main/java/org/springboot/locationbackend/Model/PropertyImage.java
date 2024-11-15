package org.springboot.locationbackend.Model;


import jakarta.persistence.*;

@Entity
public class PropertyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "bien_id", nullable = false)
    private biens bien;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public biens getBien() {
        return bien;
    }

    public void setBien(biens bien) {
        this.bien = bien;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public PropertyImage(biens bien, byte[] imageData) {
        this.bien = bien;
        this.imageData = imageData;
    }

    public PropertyImage() {
    }
}
