package com.DSI.springjwt.controllers;

import com.DSI.springjwt.DTOs.CitoyenRendezVousDTO;
import com.DSI.springjwt.services.CitoyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"} , allowedHeaders = "*" )

@RestController
@RequestMapping("/citoyens")
public class CitoyenController {
    @Autowired
    private CitoyenService citoyenService;

    @PostMapping("/save")
    public ResponseEntity<String> saveCitoyenAndRendezvous(@RequestBody CitoyenRendezVousDTO citoyenrendezvousDto) {
        try {
            citoyenService.saveCitoyenAndRendezvous(citoyenrendezvousDto);

            return new ResponseEntity<>("Citoyen and Rendezvous saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving Citoyen and Rendezvous: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
