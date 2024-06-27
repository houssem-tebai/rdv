package com.DSI.springjwt.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idInst;
    private String nomInst;
    private String adresse;
    private String codePostal;
    private String gouvernerat;
    private String ville;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "idInst")
    @JsonIgnore
    public List<Dates> datesChanged;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "idInst")
    @JsonIgnore
    public List<Settings> settingsList;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "idInst")
    @JsonIgnore
    public List<Citoyen> citoyens;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "idInst")
    @JsonIgnore
    public List<User> employees;

}
