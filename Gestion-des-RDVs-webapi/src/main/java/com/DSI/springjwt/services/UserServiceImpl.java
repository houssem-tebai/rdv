package com.DSI.springjwt.services;

import com.DSI.springjwt.enums.ERole;
import com.DSI.springjwt.enums.Statut;
import com.DSI.springjwt.models.Role;
import com.DSI.springjwt.models.User;
import com.DSI.springjwt.payload.request.SignupRequest;
import com.DSI.springjwt.payload.request.UpdateRequest;
import com.DSI.springjwt.payload.response.MessageResponse;
import com.DSI.springjwt.repository.RoleRepository;
import com.DSI.springjwt.repository.UserRepository;
import com.DSI.springjwt.utils.MailSenderService;
import com.DSI.springjwt.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private MailSenderService mailSenderService;

    @Override
    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Générer un mot de passe aléatoire
        String generatedPassword = PasswordUtils.generateRandomPassword();
        mailSenderService.sendMail(signUpRequest.getEmail(), "Paramétres d'accés du compte",
                "Votre login est :"+signUpRequest.getUsername() + " Votre mot de passe généré est : " + generatedPassword);

        User user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .nom(signUpRequest.getNom())
                .prenom(signUpRequest.getPrenom())
                .cin(signUpRequest.getCin())
                .password(encoder.encode(generatedPassword))
                .build();

        String strRole = signUpRequest.getRole();
        Role role;

        switch (strRole) {
            case "superadmin":
                role = roleRepository.findByName(ERole.SUPER_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                break;
            case "admin":
                role = roleRepository.findByName(ERole.ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                break;
            case "agent":
                role = roleRepository.findByName(ERole.AGENT)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                break;
            default:
                throw new IllegalArgumentException("Invalid role: " + strRole);
        }

        user.setRole(role);
        if ("superadmin".equals(strRole)) {
            user.setStatut(Statut.ACTIF);
        } else {
            user.setStatut(Statut.NON_ACTIF);
        }
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /*public User updateUser(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User existingEntity = existingUser.get();

            // Mettez à jour les champs du user avec les valeurs fournies
            existingEntity.setNom(user.getNom());
            existingEntity.setPrenom(user.getPrenom());
            existingEntity.setUsername(user.getUsername());
            existingEntity.setCin(user.getCin());
            existingEntity.setEmail(user.getEmail());

            // Mettez à jour le rôle s'il est fourni dans la requête
            if (user.getRole() != null && user.getRole().getName() != null) {
                String roleName = user.getRole().getName().toString(); // Utilisez name() pour obtenir le nom de l'énumération
                Optional<Role> role = roleRepository.findByName(ERole.valueOf(roleName));

                existingEntity.setRole(role.orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleName)));
            }

            // Enregistrez les modifications dans la base de données
            return userRepository.save(existingEntity);
        } else {
            throw new IllegalArgumentException("User not found with ID: " + id);
        }
    }*/

    public User updateUser(Long id, UpdateRequest user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User existingEntity = existingUser.get();

            // Mettez à jour les champs du user avec les valeurs fournies
            existingEntity.setNom(user.getNom());
            existingEntity.setPrenom(user.getPrenom());
            existingEntity.setUsername(user.getUsername());
            existingEntity.setCin(user.getCin());
            existingEntity.setEmail(user.getEmail());

            String strRole = user.getRole();
            Role role;

            switch (strRole) {
                case "SUPER_ADMIN":
                    role = roleRepository.findByName(ERole.SUPER_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    break;
                case "ADMIN":
                    role = roleRepository.findByName(ERole.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    break;
                case "AGENT":
                    role = roleRepository.findByName(ERole.AGENT)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    break;
                default:
                    throw new IllegalArgumentException("Invalid role: " + strRole);
                 }
                existingEntity.setRole(role);
                return userRepository.save(existingEntity);
        } else {
            throw new IllegalArgumentException("User not found with ID: " + id);
        }
    }


    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void disableUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        user.setStatut(Statut.BLOQUE);
        userRepository.save(user);
    }

    @Override
    public void enableUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        user.setStatut(Statut.ACTIF);
        userRepository.save(user);
    }
}