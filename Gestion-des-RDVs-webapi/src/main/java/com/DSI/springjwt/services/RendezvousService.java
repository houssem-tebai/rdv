package com.DSI.springjwt.services;

import com.DSI.springjwt.DTOs.DetailsDto;
import com.DSI.springjwt.models.Rendezvous;
import com.DSI.springjwt.models.User;

import java.time.LocalDate;
import java.util.List;

public interface RendezvousService {

    List<Rendezvous> getRendezvousForToday();

    List<Rendezvous> getRendezvousByDate(LocalDate date);

    List<Rendezvous> getAllRendezvous();


    List<Rendezvous> getRendezvousByAgentId(Long id);

    List<Rendezvous> getPendingRendezvous();

    List<Rendezvous> getFinishedRendezvous();

    List<Rendezvous> getCanceledRendezvous();
    void chooseRendezvous(Integer idRDV, Long id);

    void endRendezvous(Integer idRDV, Long id, Rendezvous observations);

    void cancelPastEnAttenteRendezvous();

    DetailsDto getDetailsForTerminatedRendezvous(Integer idRDV);

    DetailsDto getDetailsRendezvous(Integer idRDV);
}
