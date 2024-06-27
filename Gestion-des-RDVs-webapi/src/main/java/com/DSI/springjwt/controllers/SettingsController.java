package com.DSI.springjwt.controllers;

import com.DSI.springjwt.models.Settings;
import com.DSI.springjwt.services.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
@CrossOrigin(origins = {"http://localhost:3000"} , allowedHeaders = "*" )

@RestController
@RequestMapping("/settings")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    @PutMapping("/updateMaxRDVG/{id}/{newMaxRDVG}")
    public ResponseEntity<String> updateMaxRDVG(
            @PathVariable Long id,
            @PathVariable Integer newMaxRDVG) {
        try {
            settingsService.updateMaxRDVG(id, newMaxRDVG);
            return new ResponseEntity<>("MaxRDVG updated successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Settings not found with ID: " + id, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update MaxRDVG", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public Settings findById(@PathVariable Long id) {
        return settingsService.findById(id);
    }
}
