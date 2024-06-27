package com.DSI.springjwt.services;

import com.DSI.springjwt.models.User;
import com.DSI.springjwt.payload.request.SignupRequest;
import com.DSI.springjwt.payload.request.UpdateRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<?> registerUser(SignupRequest signUpRequest);
    User findById(Long id);

     void deleteUser(Long id);

    User updateUser (Long id, UpdateRequest user);

    List<User> findAllUsers();

     void disableUser(Long id);
    void enableUser(Long id);



}
