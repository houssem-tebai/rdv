package com.DSI.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Citoyen {
    @Id
    private String passeport;
    private String nom;
    private String prenom;
    private Long numTel;
    private String pays;
    private String gouvernerat;
    private String ville;
    private String codePostal;
    private String adresse;

    private String typeEtab;
    private String nomEtab;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "idCitoyen")
    @JsonIgnore
    public List<Rendezvous> rendezvousList = new ArrayList<>();
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idInst")
    public Institution idInst;
}


