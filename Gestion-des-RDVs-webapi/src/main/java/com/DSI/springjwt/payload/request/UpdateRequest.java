package com.DSI.springjwt.payload.request;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
public class UpdateRequest {
    @NotBlank(message = "Nom cannot be blank")
    @Size(min = 3, max = 20)
    private String nom;
    @NotBlank(message = "Prenom cannot be blank")
    @Size(min = 3, max = 20)
    private String prenom;
    @NotBlank(message = "Username cannot be blank")
    @Size(min = 3, max = 20)
    private String username;
    @Size(min = 8, max = 8)
    @NotBlank(message = "Username cannot be blank")
    private String cin;

    @NotBlank(message = "Email cannot be blank")
    @Size(max = 50)
    @Email
    private String email;
    private String role;

}
