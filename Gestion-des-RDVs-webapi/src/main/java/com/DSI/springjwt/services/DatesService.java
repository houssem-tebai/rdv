package com.DSI.springjwt.services;

import com.DSI.springjwt.models.Dates;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DatesService {
    void createNewDate(LocalDate dateRDV, Integer maxRDV);

    Dates findByDateRDV(LocalDate dateRDV);

    List<LocalDate> findDatesWithMatchingMaxRDV();

    List<LocalDate> findDatesFromRendezvousWithMaxRDVG();
    Map<String, Integer> getExistingMaxRDVForAllDates();


}
