package com.DSI.springjwt.payload.response;

import com.DSI.springjwt.enums.Statut;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JwtResponse {
  private String token;
  //private String type = "Bearer";
  private Long id;
  private String username;
  private String email;
  private String role;

  private Statut statut;

  /*public JwtResponse(String accessToken, Long id, String username, String email, String role) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.email = email;
    this.role = role;
  }*/

}
