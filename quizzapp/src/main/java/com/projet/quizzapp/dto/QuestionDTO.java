package com.projet.quizzapp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
    private String text;
    private Long quizId;
    private List<AnswerDTO> answers; // Include answers in the response
}

