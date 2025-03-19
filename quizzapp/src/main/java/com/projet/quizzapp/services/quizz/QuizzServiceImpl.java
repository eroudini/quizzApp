package com.projet.quizzapp.services.quizz;


import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.dto.QuizzDTO;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.entities.Quizz;
import com.projet.quizzapp.repository.QuestionRepository;
import com.projet.quizzapp.repository.QuizzRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizzServiceImpl implements QuizzService{

    @Autowired
    private QuizzRepository quizzRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public QuizzDTO createTest(QuizzDTO dto){
        Quizz quizz = new Quizz();

        quizz.setTitle(dto.getTitle());
        quizz.setDescription(dto.getDescription());
        quizz.setTime(dto.getTime());

        return quizzRepository.save(quizz).getDto();
    }

    public QuestionDTO addQuestionInQuizz(QuestionDTO dto){
        Optional<Quizz> optionalQuizz = quizzRepository.findById(dto.getId());

        if(optionalQuizz.isPresent()){
            Question question = new Question();

            question.setTest(optionalQuizz.get());
            question.setQuestionText(dto.getQuestionText());
            question.setOptionA(dto.getOptionA());
            question.setOptionB(dto.getOptionB());
            question.setOptionD(dto.getOptionC());
            question.setOptionD(dto.getOptionD());
            question.setCorrectOption(dto.getCorrectOption());

            return questionRepository.save(question).getDto();

        }
        throw new EntityNotFoundException("Question non trouver");
    }
}
