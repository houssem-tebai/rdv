package com.DSI.springjwt.services;

import com.DSI.springjwt.DTOs.CitoyenRendezVousDTO;
import com.DSI.springjwt.enums.EEtat;

import java.time.LocalDate;
import java.util.Date;

public interface CitoyenService {
    void saveCitoyenAndRendezvous(CitoyenRendezVousDTO citoyenRendezVousDTO);
}


