package com.projet.quizzapp.exceptions;

public class QuizzNotFoundException extends Exception{

    public QuizzNotFoundException() {
        super();
    }

    public QuizzNotFoundException(String message) {
        super(message);
    }
}
