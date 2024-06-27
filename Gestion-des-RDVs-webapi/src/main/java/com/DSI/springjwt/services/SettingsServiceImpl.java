package com.DSI.springjwt.services;

import com.DSI.springjwt.models.Settings;
import com.DSI.springjwt.repository.SettingsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class SettingsServiceImpl implements SettingsService {
    @Autowired
    private SettingsRepo settingsRepository;
    @Override
    public void updateMaxRDVG(Long id, Integer newMaxRDVG) {
        // Find the existing Settings entity by ID
        Settings existingSettings = settingsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Settings not found with id: " + id));

        // Update the maxRDVG field
        existingSettings.setMaxRDVG(newMaxRDVG);

        // Save the updated entity back to the database
        settingsRepository.save(existingSettings);
    }
    @Override
    public Settings findById(Long id) {
        Optional<Settings> settingsOptional = settingsRepository.findById(id);
        return settingsOptional.orElse(null);
    }
}
