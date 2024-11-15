package org.springboot.locationbackend.dtp;

public class ReservationLocataireAssociationRequest {
    private int reservationId;
    private int locataireId;

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public int getLocataireId() {
        return locataireId;
    }

    public void setLocataireId(int locataireId) {
        this.locataireId = locataireId;
    }
}

