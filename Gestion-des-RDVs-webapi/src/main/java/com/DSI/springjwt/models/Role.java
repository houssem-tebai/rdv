package com.DSI.springjwt.models;

import com.DSI.springjwt.enums.ERole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Table(name = "ROLE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID_ROLE")
  private Integer id;
  @Enumerated(EnumType.STRING)
  @Column(name="ROLE_NAME",length = 20)
  private ERole name;

}