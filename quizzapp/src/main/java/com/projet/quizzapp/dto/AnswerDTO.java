package com.projet.quizzapp.dto;

import lombok.Data;

@Data
public class AnswerDTO {
    private Long id;
    private String text;
    private Boolean correct; // Changed from isCorrect to correct
}
