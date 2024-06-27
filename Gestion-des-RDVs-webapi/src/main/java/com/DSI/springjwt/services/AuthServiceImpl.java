package com.DSI.springjwt.services;

import com.DSI.springjwt.enums.Statut;
import com.DSI.springjwt.models.User;
import com.DSI.springjwt.payload.request.LoginRequest;
import com.DSI.springjwt.payload.response.JwtResponse;
import com.DSI.springjwt.repository.UserRepository;
import com.DSI.springjwt.security.jwt.JwtUtils;
import com.DSI.springjwt.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(loginRequest.getUsername());

        return optionalUser.map(user -> {
            if (Statut.ACTIF.equals(user.getStatut()) || Statut.NON_ACTIF.equals(user.getStatut())) {
                // User is active, proceed with authentication
                try {
                    Authentication authentication = authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    String jwt = jwtUtils.generateJwtToken(authentication);

                    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
                    String role = userDetails.getAuthorities().stream()
                            .findFirst()
                            .map(item -> item.getAuthority())
                            .orElse("ROLE_AGENT");

                    return ResponseEntity.ok(JwtResponse.builder()
                            .token(jwt)
                            .id(userDetails.getId())
                            .username(userDetails.getUsername())
                            .email(userDetails.getEmail())
                            .role(role)
                            .statut(userDetails.getStatut())
                            .build());
                } catch (AuthenticationException e) {
                    // Invalid username or password
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("Authentication failed. Invalid username or password.");
                }
            } else {
                // User is blocked, return an error response
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("User is blocked. Please contact support.");
            }

        }).orElseGet(() ->
                // User not found or other error occurred
                ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Authentication failed. Invalid username or password.")
        );
    }



    @Override
    public void changePassword(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + loginRequest.getUsername()));
        user.setPassword(encoder.encode(loginRequest.getPassword()));
        user.setStatut(Statut.ACTIF);
        userRepository.save(user);
    }
}