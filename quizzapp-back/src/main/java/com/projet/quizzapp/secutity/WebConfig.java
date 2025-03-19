package com.projet.quizzapp.secutity;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permet toutes les routes de l'API
                .allowedOrigins("http://localhost:3000") // Remplace par l'URL de ton frontend React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permet ces méthodes HTTP
                .allowedHeaders("*"); // Permet tous les en-têtes
    }
}