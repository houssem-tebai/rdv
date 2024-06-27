package com.DSI.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Settings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idParam;
    private Integer maxRDVG;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idInst")
    public Institution idInst;

}
