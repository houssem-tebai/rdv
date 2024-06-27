package com.DSI.springjwt.services;

import com.DSI.springjwt.models.Settings;

public interface SettingsService {
    void updateMaxRDVG(Long id, Integer newMaxRDVG);

    Settings findById(Long id);
}
