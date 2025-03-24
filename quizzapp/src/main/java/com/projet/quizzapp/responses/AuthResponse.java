package com.projet.quizzapp.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private boolean success;
    private String message;
    private String token;
}