package com.DSI.springjwt.services;

import com.DSI.springjwt.DTOs.CitoyenDetailsDto;
import com.DSI.springjwt.DTOs.DetailsDto;
import com.DSI.springjwt.DTOs.EmployeDetailsDto;
import com.DSI.springjwt.DTOs.RendezvousDetailsDto;
import com.DSI.springjwt.enums.EEtat;
import com.DSI.springjwt.models.Citoyen;
import com.DSI.springjwt.models.Rendezvous;
import com.DSI.springjwt.models.User;
import com.DSI.springjwt.repository.CitoyenRepo;
import com.DSI.springjwt.repository.RendevousRepo;
import com.DSI.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class RendezvousServiceImpl implements RendezvousService{
    @Autowired
    private RendevousRepo rendezvousRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CitoyenRepo citoyenRepository;

    @Override
    public List<Rendezvous> getRendezvousForToday() {
        LocalDate today = LocalDate.now();
        return rendezvousRepository.findByDateRDVAndEtat(today, EEtat.EnAttente);
    }
    @Override
    public List<Rendezvous> getRendezvousByDate(LocalDate date) {
        List<Rendezvous> rendezvousBydate = rendezvousRepository.findByDateRDV(date);
        if (rendezvousBydate.isEmpty()) {
            throw new NoSuchElementException("No rendezvous found for the date: " + date);
        }
        return rendezvousRepository.findByDateRDV(date);
    }
    @Override
    public List<Rendezvous> getAllRendezvous() {
        return rendezvousRepository.findAll();
    }
    @Override
    public List<Rendezvous> getRendezvousByAgentId(Long id) {
        return rendezvousRepository.findByIdEmployeId(id);
    }

    @Override
    public List<Rendezvous> getPendingRendezvous() {
        return rendezvousRepository.findByEtat(EEtat.EnAttente);
    }
    @Override
    public List<Rendezvous> getFinishedRendezvous() {
        return rendezvousRepository.findByEtat(EEtat.Terminé);
    }
    @Override
    public List<Rendezvous> getCanceledRendezvous() {
        return rendezvousRepository.findByEtat(EEtat.Annulé);
    }
    @Override
    public void chooseRendezvous(Integer idRDV, Long id) {
        // Find the Rendezvous by ID
        Optional<Rendezvous> optionalRendezvous = rendezvousRepository.findById(idRDV);

        // Check if the Rendezvous is present
        Rendezvous rendezvous = optionalRendezvous.orElseThrow(() ->
                new IllegalArgumentException("Rendezvous not found with ID: " + idRDV));
        // Check if the Rendezvous is in the enAttente state
        if (rendezvous.getEtat() != EEtat.EnAttente) {
            throw new IllegalArgumentException("Cannot choose Rendezvous with ID " + idRDV +
                    " because it is not in the enAttente state.");
        }
        // Find the User by CIN
        Optional<User> user = userRepository.findById(id);

        // Update the Rendezvous details
        rendezvous.setIdEmploye(user.orElseThrow(() ->
                new IllegalArgumentException("User not found with ID: " + id)));
        rendezvous.setEtat(EEtat.EnCours);

        // Save the updated Rendezvous
        rendezvousRepository.save(rendezvous);
    }

    @Override
    public void endRendezvous(Integer idRDV, Long idEmploye, Rendezvous observations) {
        // Find the Rendezvous by ID
        Optional<Rendezvous> optionalRendezvous = rendezvousRepository.findById(idRDV);

        // Check if the Rendezvous is present
        Rendezvous rendezvous = optionalRendezvous.orElseThrow(() ->
                new IllegalArgumentException("Rendezvous not found with ID: " + idRDV));

        // Check if the Rendezvous is in the EnCours state
        if (rendezvous.getEtat() != EEtat.EnCours) {
            throw new IllegalArgumentException("Cannot end Rendezvous with ID " + idRDV +
                    " because it is not in the EnCours state.");
        }

        // Check if the User has the same CIN as the id_citoyen of the chosen Rendezvous
        if (!idEmploye.equals(rendezvous.getIdEmploye().getId())) {
            throw new IllegalArgumentException("Cannot end Rendezvous with ID " + idRDV +
                    " because the userCIN does not match the id_citoyen of the Rendezvous.");
        }

        // Update the Rendezvous details
        rendezvous.setObservations(observations.getObservations());
        rendezvous.setEtat(EEtat.Terminé);

        // Save the updated Rendezvous
        rendezvousRepository.save(rendezvous);
    }
    @Scheduled(cron = "0 0 1 * * ?")
    public void scheduledCancelPastEnAttenteRendezvous() {
        cancelPastEnAttenteRendezvous();

    }
    @Override
    public void cancelPastEnAttenteRendezvous() {
        LocalDate currentDate = LocalDate.now();

        // Find all EnAttente Rendezvous with dateRDV in the past
        List<Rendezvous> pastEnAttenteRendezvous = rendezvousRepository.findByDateRDVBeforeAndEtat(currentDate, EEtat.EnAttente);

        // Update the etat to Annulé for past EnAttente Rendezvous
        pastEnAttenteRendezvous.forEach(rendezvous -> {
            rendezvous.setEtat(EEtat.Annulé);
            rendezvousRepository.save(rendezvous);
        });
    }


    @Override
    public DetailsDto getDetailsForTerminatedRendezvous(Integer idRDV) {
        // Find the Rendezvous by ID
        Optional<Rendezvous> optionalRendezvous = rendezvousRepository.findById(idRDV);
        Rendezvous rendezvous = optionalRendezvous.orElseThrow(() ->
                new IllegalArgumentException("Rendezvous not found with ID: " + idRDV));

        //Check if the Rendezvous is in the Terminé state
        if (!(rendezvous.getEtat() == EEtat.Terminé || rendezvous.getEtat() == EEtat.EnAttente)) {
            throw new IllegalArgumentException("Rendezvous with ID " + idRDV +
                    " is not in the Terminé or EnAttente state.");
        }

        // Get details of the Citoyen
        Citoyen citoyen = rendezvous.getIdCitoyen();

        CitoyenDetailsDto citoyenDetails = new CitoyenDetailsDto();
        citoyenDetails.setNom(citoyen.getNom());
        citoyenDetails.setPrenom(citoyen.getPrenom());
        citoyenDetails.setPasseport(citoyen.getPasseport());
        citoyenDetails.setPays(citoyen.getPays());
        citoyenDetails.setGouvernerat(citoyen.getGouvernerat());
        citoyenDetails.setVille(citoyen.getVille());
        citoyenDetails.setCodePostal(citoyen.getCodePostal());
        citoyenDetails.setAdresse(citoyen.getAdresse());
        citoyenDetails.setTypeEtab(citoyen.getTypeEtab());
        citoyenDetails.setNomEtab(citoyen.getNomEtab());

        // Get details of the Employe (User)
        User employe = rendezvous.getIdEmploye();

        EmployeDetailsDto employeDetails = new EmployeDetailsDto();
        employeDetails.setNom(employe.getNom());
        employeDetails.setPrenom(employe.getPrenom());
        employeDetails.setCin(employe.getCin());

        RendezvousDetailsDto rendezvousDetails = new RendezvousDetailsDto(
                rendezvous.getDateRDV(),
                rendezvous.getDateSaisie(),
                rendezvous.getObservations()
        );


        // Create and return a DTO containing both sets of details
        return new DetailsDto(citoyenDetails, employeDetails,rendezvousDetails );
    }
//    @Override
//    public DetailsDto getDetailsRendezvous(Integer idRDV) {
//        // Find the Rendezvous by ID
//        Optional<Rendezvous> optionalRendezvous = rendezvousRepository.findById(idRDV);
//        Rendezvous rendezvous = optionalRendezvous.orElseThrow(() ->
//                new IllegalArgumentException("Rendezvous not found with ID: " + idRDV));
//
//
//
//        // Get details of the Citoyen
//        Citoyen citoyen = rendezvous.getIdCitoyen();
//
//        CitoyenDetailsDto citoyenDetails = new CitoyenDetailsDto();
//        citoyenDetails.setNom(citoyen.getNom());
//        citoyenDetails.setPrenom(citoyen.getPrenom());
//        citoyenDetails.setPasseport(citoyen.getPasseport());
//        citoyenDetails.setPays(citoyen.getPays());
//        citoyenDetails.setGouvernerat(citoyen.getGouvernerat());
//        citoyenDetails.setVille(citoyen.getVille());
//        citoyenDetails.setCodePostal(citoyen.getCodePostal());
//        citoyenDetails.setAdresse(citoyen.getAdresse());
//        citoyenDetails.setTypeEtab(citoyen.getTypeEtab());
//        citoyenDetails.setNomEtab(citoyen.getNomEtab());
//        // Get details of the Employe (User)
//        User employe = rendezvous.getIdEmploye();
//
//        EmployeDetailsDto employeDetails = new EmployeDetailsDto();
//        employeDetails.setNom(employe.getNom());
//        employeDetails.setPrenom(employe.getPrenom());
//        employeDetails.setCin(employe.getCin());
//
//        RendezvousDetailsDto rendezvousDetails = new RendezvousDetailsDto(
//                rendezvous.getDateRDV(),
//                rendezvous.getDateSaisie(),
//                rendezvous.getObservations()
//        );
//
//
//        // Create and return a DTO containing both sets of details
//        return new DetailsDto(citoyenDetails, employeDetails,rendezvousDetails );
//    }

    @Override
    public DetailsDto getDetailsRendezvous(Integer idRDV) {
        // Find the Rendezvous by ID
        Optional<Rendezvous> optionalRendezvous = rendezvousRepository.findById(idRDV);
        Rendezvous rendezvous = optionalRendezvous.orElseThrow(() ->
                new IllegalArgumentException("Rendezvous not found with ID: " + idRDV));

        // Get details of the Citoyen
        Citoyen citoyen = rendezvous.getIdCitoyen();

        CitoyenDetailsDto citoyenDetails = new CitoyenDetailsDto();
        if (citoyen != null) {
            citoyenDetails.setNom(citoyen.getNom());
            citoyenDetails.setPrenom(citoyen.getPrenom());
            citoyenDetails.setPasseport(citoyen.getPasseport());
            citoyenDetails.setPays(citoyen.getPays());
            citoyenDetails.setGouvernerat(citoyen.getGouvernerat());
            citoyenDetails.setVille(citoyen.getVille());
            citoyenDetails.setCodePostal(citoyen.getCodePostal());
            citoyenDetails.setAdresse(citoyen.getAdresse());
            citoyenDetails.setTypeEtab(citoyen.getTypeEtab());
            citoyenDetails.setNomEtab(citoyen.getNomEtab());
        }

        // Get details of the Employe (User)
        User employe = rendezvous.getIdEmploye();

        EmployeDetailsDto employeDetails = new EmployeDetailsDto();
        if (employe != null) {
            employeDetails.setNom(employe.getNom());
            employeDetails.setPrenom(employe.getPrenom());
            employeDetails.setCin(employe.getCin());
        }

        RendezvousDetailsDto rendezvousDetails = new RendezvousDetailsDto(
                rendezvous.getDateRDV(),
                rendezvous.getDateSaisie(),
                rendezvous.getObservations()
        );

        // Create and return a DTO containing both sets of details
        return new DetailsDto(citoyenDetails, employeDetails, rendezvousDetails);
    }
}
