package com.DSI.springjwt.controllers;


import com.DSI.springjwt.models.User;
import com.DSI.springjwt.payload.request.SignupRequest;
import com.DSI.springjwt.payload.request.UpdateRequest;
import com.DSI.springjwt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000"} , allowedHeaders = "*" )
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<User> GetAllUsers()
    {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id)
    {
        return userService.findById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> saveUser(@Valid @RequestBody SignupRequest user)
    {
        return userService.registerUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") Long id)
    {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable("id") Long id,@RequestBody UpdateRequest user)
    {
        return userService.updateUser(id,user);
    }

    @PutMapping("/disable/{id}")
    public ResponseEntity<String> disableUser(@PathVariable("id") Long id)
    {
        userService.disableUser(id);
        return ResponseEntity.ok("User disabled successfully");

    }

    @PutMapping("/enable/{id}")
    public ResponseEntity<String> enableUser(@PathVariable("id") Long id)
    {
        userService.enableUser(id);
        return ResponseEntity.ok("User enabled successfully");

    }

}
