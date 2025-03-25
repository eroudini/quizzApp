package com.projet.quizzapp.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Getter
@Setter
public class Quizz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String title;

    private String description;

    private Long time;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    /*@OneToMany(mappedBy = "quizz", cascade = CascadeType.ALL)
    private List<Question> questionDTOS;*/
}

