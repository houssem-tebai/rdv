package com.DSI.springjwt.controllers;

import javax.validation.Valid;

import com.DSI.springjwt.models.User;
import com.DSI.springjwt.payload.response.MessageResponse;
import com.DSI.springjwt.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.DSI.springjwt.payload.request.LoginRequest;
import com.DSI.springjwt.payload.request.SignupRequest;

@CrossOrigin(origins = {"http://localhost:3000"} , allowedHeaders = "*" )
@RestController
@RequestMapping("/auth")
public class AuthController {
  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    return authService.authenticateUser(loginRequest);
  }

  @PutMapping("/changePassword")
  public ResponseEntity<String> updatePassword(@RequestBody LoginRequest loginRequest) {
    authService.changePassword(loginRequest);
    return ResponseEntity.ok("password changed successfuly");
  }

}
