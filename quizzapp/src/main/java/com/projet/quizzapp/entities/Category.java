package com.projet.quizzapp.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Quizz> quizzList = new ArrayList<>();

    public Category(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quizzList = new ArrayList<>();
    }

}
