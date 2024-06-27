package com.DSI.springjwt.services;

import com.DSI.springjwt.payload.request.LoginRequest;
import com.DSI.springjwt.payload.request.SignupRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);

    void changePassword(LoginRequest loginRequest);
}