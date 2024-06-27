package com.DSI.springjwt.services;

import com.DSI.springjwt.DTOs.CitoyenRendezVousDTO;
import com.DSI.springjwt.models.Citoyen;
import com.DSI.springjwt.enums.EEtat;
import com.DSI.springjwt.models.Rendezvous;
import com.DSI.springjwt.repository.CitoyenRepo;
import com.DSI.springjwt.repository.RendevousRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;

@Service
@Transactional

public class CitoyenServiceImpl implements CitoyenService{
    @Autowired
    private CitoyenRepo citoyenRepository;

    @Autowired
    private RendevousRepo rendezvousRepository;


    public void saveCitoyenAndRendezvous(CitoyenRendezVousDTO citoyenRendezVousDTO) {

        // Check if the Citoyen already exists
        Citoyen citoyen = citoyenRepository.findByPasseport(citoyenRendezVousDTO.getPasseport());

        // If not, create a new Citoyen
        if (citoyen == null) {
            citoyen = new Citoyen();
            citoyen.setPasseport(citoyenRendezVousDTO.getPasseport());
            citoyen.setNom(citoyenRendezVousDTO.getNom());
            citoyen.setPrenom(citoyenRendezVousDTO.getPrenom());
            citoyen.setNumTel(citoyenRendezVousDTO.getNumTel());
            citoyen.setPays(citoyenRendezVousDTO.getPays());
            citoyen.setGouvernerat(citoyenRendezVousDTO.getGouvernerat());
            citoyen.setVille(citoyenRendezVousDTO.getVille());
            citoyen.setCodePostal(citoyenRendezVousDTO.getCodePostal());
            citoyen.setAdresse(citoyenRendezVousDTO.getAdresse());
            citoyen.setTypeEtab(citoyenRendezVousDTO.getTypeEtab());
            citoyen.setNomEtab(citoyenRendezVousDTO.getNomEtab());

            citoyenRepository.save(citoyen);
        }

        // Check if a Rendezvous with the same date already exists for the Citoyen
        //Rendezvous existingRendezvous = rendezvousRepository.findByDateRDVAndIdCitoyen(dateRDV, citoyen);
        Rendezvous existingRendezvous = rendezvousRepository.findByDateRDVAndIdCitoyen(citoyenRendezVousDTO.getDateRDV(),citoyen);

        // If not, create a new Rendezvous
        if (existingRendezvous == null) {
            Rendezvous rendezvous = new Rendezvous();
            rendezvous.setDateRDV(citoyenRendezVousDTO.getDateRDV());
            rendezvous.setDateSaisie(citoyenRendezVousDTO.getDateSaisie());
            rendezvous.setEtat(citoyenRendezVousDTO.getEtat());
            rendezvous.setIdCitoyen(citoyen);

            // Save the new Rendezvous
            rendezvousRepository.save(rendezvous);

            // Add the Rendezvous to the Citoyen's list and save again
            citoyen.getRendezvousList().add(rendezvous);
            citoyenRepository.save(citoyen);
        }
    else {
        throw new RuntimeException("A Rendezvous already exists for the same date and Citoyen");
    }
    }

}
