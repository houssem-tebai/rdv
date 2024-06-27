package com.DSI.springjwt.repository;

import com.DSI.springjwt.enums.EEtat;
import com.DSI.springjwt.models.Citoyen;
import com.DSI.springjwt.models.Rendezvous;
import com.DSI.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RendevousRepo extends JpaRepository<Rendezvous,Integer> {
    Rendezvous findByDateRDVAndIdCitoyen(LocalDate dateRDV, Citoyen idCitoyen);

    List<Rendezvous> findByDateRDV(LocalDate date);
    List<Rendezvous> findByIdEmploye(Long idEmploye);
    List<Rendezvous> findByEtat(EEtat etat);
    Optional<Rendezvous> findById(Integer idRDV);
    List<Rendezvous> findByIdEmployeId(Long idEmploye);

    List<Rendezvous> findByDateRDVBeforeAndEtat (LocalDate date,EEtat etat);
    List<Rendezvous> findByDateRDVAndEtat(LocalDate dateRDV, EEtat etat);


}
