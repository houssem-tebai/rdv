package com.DSI.springjwt.DTOs;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CitoyenDetailsDto {
    private String nom;
    private String prenom;
    private String passeport;
    private String pays;
    private String gouvernerat;
    private String ville;
    private String codePostal;
    private String adresse;
    private String typeEtab;
    private String nomEtab;
}
