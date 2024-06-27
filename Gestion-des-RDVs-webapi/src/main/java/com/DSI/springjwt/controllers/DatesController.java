package com.DSI.springjwt.controllers;

import com.DSI.springjwt.DTOs.DateDto;
import com.DSI.springjwt.models.Dates;
import com.DSI.springjwt.models.Institution;
import com.DSI.springjwt.models.Rendezvous;
import com.DSI.springjwt.repository.DatesRepo;
import com.DSI.springjwt.services.DatesService;
import com.DSI.springjwt.services.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin(origins = {"http://localhost:3000"} , allowedHeaders = "*" )
@RestController
@RequestMapping("/dates")
public class DatesController {
    @Autowired
    private DatesRepo datesRepository;
    @Autowired
    private DatesService datesService;
    @Autowired

    private SettingsService settingsService;

    @PostMapping("/changemax/{maxRDV}")
    public ResponseEntity<String> createNewDate(
            @PathVariable Integer maxRDV,
            @RequestBody DateDto request) {
        try {
            datesService.createNewDate(request.getDateRDV(), maxRDV);
            return new ResponseEntity<>("Date record created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create date record", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/unavailable-dates")
    public List<String> getUnavailableDates() {
       // LocalDate selectedDate = LocalDate.parse(dateStr);

        List<LocalDate> matchingMaxRDVDates = datesService.findDatesWithMatchingMaxRDV();
        List<LocalDate> maxRDVGDates = datesService.findDatesFromRendezvousWithMaxRDVG();

        List<LocalDate> unavailableDatesList = Stream.concat(matchingMaxRDVDates.stream(), maxRDVGDates.stream())
                .collect(Collectors.toList());

        return unavailableDatesList.stream()
                .map(LocalDate::toString)
                .collect(Collectors.toList());
    }

    @PostMapping("/findByDateRDV")
    public ResponseEntity<?> findByDateRDV(@RequestBody Map<String, Object> requestBody) {
        try {
            // Assuming the dateRDV is provided as a string in the format "yyyy-MM-dd"
            String dateString = (String) requestBody.get("dateRDV");
            LocalDate dateRDV = LocalDate.parse(dateString);

            Dates foundDate = datesService.findByDateRDV(dateRDV);

            if (foundDate != null) {
                return ResponseEntity.ok(foundDate);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing the request");
        }
    }

    @PutMapping("/updateMaxRdv/{maxRDV}")
    public ResponseEntity<?> updateDate(@PathVariable Integer maxRDV, @RequestBody Dates updatedDate) {
        try {
            LocalDate dateRDV = updatedDate.getDateRDV();

            // Check if the date exists before updating
            Dates existingDate = datesService.findByDateRDV(dateRDV);

            if (existingDate != null) {
                // You can perform additional checks or update logic here
                existingDate.setMaxRDV(maxRDV);

                // Save the updated date
                datesRepository.save(existingDate);

                return ResponseEntity.ok(existingDate);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while processing the request");
        }
    }

    @GetMapping("/existingMaxRDVForAllDates")
    public Map<String, Integer> getExistingMaxRDVForAllDates() {
        return datesService.getExistingMaxRDVForAllDates();
    }


}