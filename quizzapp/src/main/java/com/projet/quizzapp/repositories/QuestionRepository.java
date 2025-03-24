package com.projet.quizzapp.repositories;

import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.entities.Quizz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

        // cettte methode permet de recuperer les questions d'un quizz
    public List<Question> findByQuizz(Quizz quizz);
}
