package com.DSI.springjwt.services;

import com.DSI.springjwt.models.Dates;
import com.DSI.springjwt.repository.DatesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DatesServiceImpl implements DatesService{
    @Autowired
    private DatesRepo datesRepository;

    @Override
    public void createNewDate(LocalDate dateRDV, Integer maxRDV) {
        Dates dateexistante = datesRepository.findByDateRDV(dateRDV);
        if (dateexistante == null) {
            Dates newDate = new Dates();
            newDate.setDateRDV(dateRDV);
            newDate.setMaxRDV(maxRDV);
            datesRepository.save(newDate);
        } else {
            throw new IllegalArgumentException("This date already exists with a maxRDV");
        }
    }
    @Override

    public Dates findByDateRDV(LocalDate dateRDV) {
        return datesRepository.findByDateRDV(dateRDV);
    }
    @Override


    public List<LocalDate> findDatesWithMatchingMaxRDV() {
        return datesRepository.findDatesWithMatchingMaxRDV();
    }
    @Override

    public List<LocalDate> findDatesFromRendezvousWithMaxRDVG() {
        return datesRepository.findDatesFromRendezvousWithMaxRDVG();
    }

    @Override
    public Map<String, Integer> getExistingMaxRDVForAllDates() {
        List<Dates> allDates = datesRepository.findAll(); // Adjust based on your repository

        // Use Java streams to convert the list to a map
        Map<String, Integer> existingMaxRDVMap = allDates.stream()
                .collect(Collectors.toMap(
                        dateEntity -> dateEntity.getDateRDV().toString(), // Assuming dateEntity.getDateRDV() returns a LocalDate
                        Dates::getMaxRDV
                ));

        return existingMaxRDVMap;
    }

}
