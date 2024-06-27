package com.DSI.springjwt.repository;

import com.DSI.springjwt.models.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepo extends JpaRepository<Settings, Long > {
}
