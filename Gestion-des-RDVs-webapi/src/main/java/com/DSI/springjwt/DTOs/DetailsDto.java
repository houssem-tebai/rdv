package com.DSI.springjwt.DTOs;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetailsDto {
    private CitoyenDetailsDto citoyenDetails;
    private EmployeDetailsDto employeDetails;
    private RendezvousDetailsDto rendezvousDetails;


}
