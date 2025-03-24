package com.projet.quizzapp.dto;

import com.projet.quizzapp.entities.Question;
import lombok.Data;

@Data
public class QuestionDTO {
    private Long id;

    private Question question;

    private boolean isMultipleChoice;

    private int orderNumber;


    private Long quizzId;



}
