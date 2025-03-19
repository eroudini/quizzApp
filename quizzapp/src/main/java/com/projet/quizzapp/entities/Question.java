package com.projet.quizzapp.entities;
import com.projet.quizzapp.dto.QuestionDTO;
import  com.projet.quizzapp.entities.Answer;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.awt.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Question {


    @Id
    @GeneratedValue
    private Long id;

    private String questionText;

    private String optionA;

    private String optionB;

    private String optionC;

    private String optionD;

    private String correctOption;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quizz quiz;


    public QuestionDTO getDto() {
        return null;
    }

    public void setTest(Quizz quizz) {
    }
}
