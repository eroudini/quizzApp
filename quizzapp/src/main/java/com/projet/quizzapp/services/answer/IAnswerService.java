package com.projet.quizzapp.services.answer;

import com.projet.quizzapp.dto.AnswerDTO;
import com.projet.quizzapp.entities.Answer;

import java.util.List;
import java.util.Optional;

public interface IAnswerService {
    AnswerDTO createAnswer(AnswerDTO answerDTO);
    List<Answer> getAllAnswers();
    List<Answer> getAnswersByQuestionId(Long questionId);
    Optional<Answer> getAnswerById(Long id);
    Answer updateAnswer(Long id, Answer answer);
    void deleteAnswer(Long id);
}
