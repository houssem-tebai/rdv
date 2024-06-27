package com.DSI.springjwt.DTOs;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeDetailsDto {
    private String nom;
    private String prenom;
    private String cin;

}
