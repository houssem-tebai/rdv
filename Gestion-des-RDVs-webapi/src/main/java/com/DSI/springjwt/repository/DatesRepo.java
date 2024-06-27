package com.DSI.springjwt.repository;

import com.DSI.springjwt.models.Dates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DatesRepo extends JpaRepository<Dates, Long> {

    Dates findByDateRDV(LocalDate dateRDV);

    @Query("SELECT d.dateRDV FROM Dates d WHERE d.maxRDV <= (SELECT COUNT(r) FROM Rendezvous r WHERE r.dateRDV = d.dateRDV)")
    List<LocalDate> findDatesWithMatchingMaxRDV();

    @Query("SELECT DISTINCT r.dateRDV FROM Rendezvous r, Settings  s WHERE r.dateRDV NOT IN (SELECT d.dateRDV FROM Dates d) AND s.maxRDVG <= (SELECT COUNT(r2) FROM Rendezvous r2 WHERE r2.dateRDV = r.dateRDV)")
    List<LocalDate> findDatesFromRendezvousWithMaxRDVG();

}


