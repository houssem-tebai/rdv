package com.DSI.springjwt.controllers;

import java.security.Principal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	
  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('ROLE_ENSEIGNANT') or hasRole('ROLE_CUP')")
  public String userAccess() {
    return "enseignant/cup access done ";
  }

  @GetMapping("/current")
  public String currentUserName(Principal principal) {
      return principal.getName();
  }
  
}
