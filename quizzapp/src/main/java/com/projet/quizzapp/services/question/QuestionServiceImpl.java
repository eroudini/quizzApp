package com.projet.quizzapp.services.question;

import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.dto.QuizzDTO;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.entities.Quizz;
import com.projet.quizzapp.exceptions.QuestionNotFoundException;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import com.projet.quizzapp.repositories.QuestionRepository;
import com.projet.quizzapp.repositories.QuizzRepository;
import com.projet.quizzapp.tools.DtoTools;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements IQuestionService {

    private final QuestionRepository questionRepository;

    private final QuizzRepository quizzRepository;

    /*Quizz quizz = DtoTools.convert(quizzDTO, Quizz.class);
    // associer categories et quizz
    Optional<Category> category = categoryRepository.findById(quizzDTO.getCategoryId());
        if (category.isPresent()) {
        quizz.setCategory(category.get());
    } else {
        throw new IllegalArgumentException("CategoryId not found");
    }
    Quizz quizzBDD = quizzRepository.save(quizz);

        return DtoTools.convert(quizzBDD, QuizzDTO .class);*/


    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) throws Exception {

        Question question = DtoTools.convert(questionDTO, Question.class);

        Optional<Quizz> quizz = quizzRepository.findById(questionDTO.getQuizzId());
        if (quizz.isPresent()) {
            question.setQuizz(quizz.get());
        } else {
            throw new QuizzNotFoundException("quizz not found");
        }
        Question questionBDD = questionRepository.save(question);

        return DtoTools.convert(questionBDD, QuestionDTO.class);

    }


    @Override
    public List<QuestionDTO> getAllQuestions(Long quizzId) throws Exception {
        Optional<Quizz> quizzOpt = quizzRepository.findById(quizzId);
        List<QuestionDTO> questionDTOList = new ArrayList<>();
        Quizz quizz = new Quizz();
        if (quizzOpt.isPresent()) {
            quizz = quizzOpt.get();
        } else {
            throw new QuizzNotFoundException("quizz not found");
        }

        List<Question> questions = questionRepository.findByQuizz(quizz);
        for (Question question : questions) {
            questionDTOList.add(DtoTools.convert(question, QuestionDTO.class));
        }
        return questionDTOList;

    }


    @Override
    public QuestionDTO getQuestionById(Long id) throws Exception {
        Optional<Question> question = questionRepository.findById(id);

        if (question.isPresent()) {
            return DtoTools.convert(question.get(), QuestionDTO.class);
        } else {
            throw new QuestionNotFoundException("question not found with id : " + id);
        }
    }


   /* @Override
    public QuestionDTO updateQuestion(Long id, QuestionDTO questionDTO) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = this.getQuestionById(id);
        if (theQuestion.isPresent()) {
            Question updatedQuestionDTO = theQuestion.get();
            updatedQuestionDTO.setQuestion(questionDTO.getQuestion());
            return questionRepository.save(updatedQuestionDTO);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }

    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    } */


}
