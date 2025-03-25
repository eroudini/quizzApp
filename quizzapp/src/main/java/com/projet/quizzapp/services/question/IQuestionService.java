package com.projet.quizzapp.services.question;

import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.exceptions.QuestionNotFoundException;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {

    Question createQuestion(Question question);

    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(Long id);

    List<String> getAllSubjects();

    Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException;

    void  deleteQuestion(Long id);

    List<Question> getQuestionsForUser(Integer numOfQuestions, String subject);


}

