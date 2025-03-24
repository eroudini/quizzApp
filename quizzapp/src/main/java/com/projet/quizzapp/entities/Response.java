package com.projet.quizzapp.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String response;

    private boolean isCorrect;

    @ManyToOne
    private Question questionDTO;
}
