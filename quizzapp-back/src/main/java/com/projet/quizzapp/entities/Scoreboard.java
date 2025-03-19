package com.projet.quizzapp.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Scoreboard {
    @Id
    @GeneratedValue
    private Long id;
    //private User user;
    private int score;
}
