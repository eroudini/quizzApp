package com.projet.quizzapp.services.question;

import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.exceptions.QuestionNotFoundException;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {

    QuestionDTO createQuestion(QuestionDTO questionDTO) throws Exception;

    List<QuestionDTO> getAllQuestions(Long quizzId) throws Exception;

    QuestionDTO getQuestionById(Long id) throws Exception;

    //Question updateQuestion(Long id, QuestionDTO questionDTO) throws ChangeSetPersister.NotFoundException;

    //void  deleteQuestion(Long id);

    //List<Question> getQuestionsForUser(Integer numOfQuestions, String subject);

}
