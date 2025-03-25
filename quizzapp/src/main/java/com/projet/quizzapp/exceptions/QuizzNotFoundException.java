package com.projet.quizzapp.exceptions;

public class QuizzNotFoundException extends RuntimeException {
    public QuizzNotFoundException(String message) {
        super(message);
    }
}
