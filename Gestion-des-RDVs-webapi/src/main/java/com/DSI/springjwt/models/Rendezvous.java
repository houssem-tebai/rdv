package com.DSI.springjwt.models;

import com.DSI.springjwt.enums.EEtat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "RENDEZVOUS")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rendezvous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRDV;
    private LocalDate dateRDV;
    @Temporal(TemporalType.DATE)
    private Date dateSaisie;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "passeport")
    public Citoyen idCitoyen;

    @Enumerated(EnumType.STRING)
    @Column(name="etat")
    private EEtat etat = EEtat.EnAttente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id")
    public User idEmploye;

    private String observations;
    @PrePersist
    public void setDateSaisie() {
        this.dateSaisie = new Date();
    }
}
