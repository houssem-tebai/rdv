package com.DSI.springjwt.repository;

import com.DSI.springjwt.models.Citoyen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CitoyenRepo extends JpaRepository<Citoyen,String> {
    Citoyen findByPasseport(String passeport);

}
