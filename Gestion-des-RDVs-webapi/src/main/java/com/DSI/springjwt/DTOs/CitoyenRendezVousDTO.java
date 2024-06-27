package com.DSI.springjwt.DTOs;

import com.DSI.springjwt.enums.EEtat;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CitoyenRendezVousDTO {
    private String passeport;
    private String nom;
    private String prenom;
    private Long numTel;
    private String pays;
    private String gouvernerat;
    private String ville;
    private String codePostal;
    private String adresse;
    private LocalDate dateRDV;
    private String typeEtab;
    private String nomEtab;

    private Date dateSaisie;
    private EEtat etat = EEtat.EnAttente;
}
