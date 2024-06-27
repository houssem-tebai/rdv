package com.DSI.springjwt.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RendezvousDetailsDto {
    private LocalDate dateRDV;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "UTC")

    private Date dateSaisie;
    private String observations;
}
