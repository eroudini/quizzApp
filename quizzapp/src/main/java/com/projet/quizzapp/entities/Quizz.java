package com.projet.quizzapp.entities;

import com.projet.quizzapp.dto.QuizzDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Quizz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    private String description;

    private Long time;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public QuizzDTO getDto(){

        QuizzDTO quizzDTO = new QuizzDTO();

        quizzDTO.setId(id);
        quizzDTO.setTitle(title);
        quizzDTO.setDescription(description);
        quizzDTO.setTime(time);

        return quizzDTO;
    }

}
