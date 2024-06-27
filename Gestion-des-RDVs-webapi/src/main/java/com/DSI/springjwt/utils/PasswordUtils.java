package com.DSI.springjwt.utils;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.annotation.Bean;

public class PasswordUtils {

    @Bean
    public static String generateRandomPassword() {
        return RandomStringUtils.randomAlphanumeric(10);
    }
}