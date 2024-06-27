package com.DSI.springjwt.models;

import com.DSI.springjwt.enums.Statut;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "EMPLOYE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_employe")
  private Long id;
  private String cin;
  private String username;
  private String password;
  private String nom;
  private String prenom;
  private String email;
  @Enumerated(EnumType.STRING)
  private Statut statut;

  @OneToOne
  private Role role;

  @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "idEmploye")
  @JsonIgnore
  public List<Rendezvous> rendezvousList = new ArrayList<>();

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idInst")
  public Institution idInst;

}
