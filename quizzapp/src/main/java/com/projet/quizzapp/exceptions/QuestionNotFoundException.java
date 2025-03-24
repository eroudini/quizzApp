package com.projet.quizzapp.exceptions;

public class QuestionNotFoundException extends Exception {
  public QuestionNotFoundException() {
    super();
  }

  public QuestionNotFoundException(String message) {
    super(message);
  }
}
