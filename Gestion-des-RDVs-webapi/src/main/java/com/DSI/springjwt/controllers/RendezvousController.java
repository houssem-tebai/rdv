package com.DSI.springjwt.controllers;

import com.DSI.springjwt.DTOs.DetailsDto;
import com.DSI.springjwt.models.Rendezvous;
import com.DSI.springjwt.models.User;
import com.DSI.springjwt.services.RendezvousService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
@CrossOrigin(origins = {"http://localhost:3000"} , allowedHeaders = "*" )

@RestController
@RequestMapping("/rendezvous")
public class RendezvousController {

    @Autowired
    private RendezvousService rendezvousService;

    @GetMapping("/today")
    public ResponseEntity<List<Rendezvous>> getRendezvousForToday() {
        try {
            List<Rendezvous> todayRendezvous = rendezvousService.getRendezvousForToday();
            return new ResponseEntity<>(todayRendezvous, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public List<Rendezvous> getAllRendezVous() {
        return rendezvousService.getAllRendezvous();
    }

    @GetMapping("/byDate/{date}")
    public ResponseEntity<?> getRendezvousByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<Rendezvous> rendezvousList = rendezvousService.getRendezvousByDate(date);

            if (rendezvousList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No rendezvous found for the date: " + date);
            }
            return ResponseEntity.ok(rendezvousList);

        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/byEmploye/{idEmploye}")
    public List<Rendezvous> getRendevousByAgent(@PathVariable Long idEmploye) {
        return rendezvousService.getRendezvousByAgentId(idEmploye);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Rendezvous>> getPendingRendezvous() {
        try {
            List<Rendezvous> pendingRendezvous = rendezvousService.getPendingRendezvous();
            return new ResponseEntity<>(pendingRendezvous, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/finished")
    public ResponseEntity<List<Rendezvous>> getFinishedRendezvous() {
        try {
            List<Rendezvous> finishedRendezvous = rendezvousService.getFinishedRendezvous();
            return new ResponseEntity<>(finishedRendezvous, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/canceled")
    public ResponseEntity<List<Rendezvous>> getCanceledRendezvous() {
        try {
            List<Rendezvous> canceledRendezvous = rendezvousService.getCanceledRendezvous();
            return new ResponseEntity<>(canceledRendezvous, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/choose/{idRDV}/{idEmploye}")
    public ResponseEntity<String> chooseRendezvous(
            @PathVariable Integer idRDV,
            @PathVariable Long idEmploye) {
        try {
            rendezvousService.chooseRendezvous(idRDV, idEmploye);
            return new ResponseEntity<>("Rendezvous chosen successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error choosing Rendezvous: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/end/{idRDV}/{idEmploye}")
    public ResponseEntity<String> endRendezvous(
            @PathVariable Integer idRDV,
            @PathVariable Long idEmploye,
            @RequestBody Rendezvous observations) {
        try {
            rendezvousService.endRendezvous(idRDV, idEmploye, observations);
            return new ResponseEntity<>("Rendezvous ended successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Error ending Rendezvous: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/detailsRDV/{idRDV}")
    public ResponseEntity<DetailsDto> getDetailsForTerminatedRendezvous(@PathVariable Integer idRDV) {
        try {
            DetailsDto detailsDto = rendezvousService.getDetailsForTerminatedRendezvous(idRDV);
            return new ResponseEntity<>(detailsDto, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/detailRDV/{idRDV}")
    public ResponseEntity<DetailsDto> getDetailsRendezvous(@PathVariable Integer idRDV) {
        try {
            DetailsDto detailsDto = rendezvousService.getDetailsRendezvous(idRDV);
            return new ResponseEntity<>(detailsDto, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}