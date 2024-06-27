package com.DSI.springjwt.DTOs;

import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DateDto {
    private LocalDate dateRDV;
}
