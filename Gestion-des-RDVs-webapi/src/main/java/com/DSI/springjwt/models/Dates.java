package com.DSI.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Dates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate dateRDV;
    private Integer maxRDV;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idInst")
    public Institution idInst  ;
}
