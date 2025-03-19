package com.projet.quizzapp.repositories;

import com.projet.quizzapp.entities.Quizz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizzRepository extends JpaRepository<Quizz, Long> {


}
