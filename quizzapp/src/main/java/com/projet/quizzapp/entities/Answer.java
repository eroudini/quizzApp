package com.projet.quizzapp.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Answer {
    @Id
    @GeneratedValue
    private Long id;
    private String answer;
    private boolean isCorrect;
/*
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
*/
}
