package com.projet.quizzapp.dto;

import lombok.Data;

@Data
public class QuestionDTO {
    private Long id;

    private String questionText;

    private String OptionA;

    private String OptionB;

    private String OptionC;

    private String OptionD;

    private String correctOption;


}
