package com.projet.quizzapp.services.question;

import com.projet.quizzapp.dto.AnswerDTO;
import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.entities.Answer;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.entities.Quizz;
import com.projet.quizzapp.repositories.QuestionRepository;
import com.projet.quizzapp.repositories.QuizzRepository;
import com.projet.quizzapp.tools.DtoTools;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements IQuestionService {

    private final QuestionRepository questionRepository;
    private final QuizzRepository quizzRepository;

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) throws Exception {
        Question question = DtoTools.convert(questionDTO, Question.class);

        Optional<Quizz> quizz = quizzRepository.findById(questionDTO.getQuizId());
        if (quizz.isPresent()) {
            question.setQuizz(quizz.get());
        } else {
            throw new QuizzNotFoundException("Quiz not found");
        }

        Question questionBDD = questionRepository.save(question);

        return convertToQuestionDTO(questionBDD);
    }

    @Override
    public List<QuestionDTO> getAllQuestions(Long quizId) throws Exception {
        Quizz quizz = quizzRepository.findById(quizId)
                .orElseThrow(() -> new QuizzNotFoundException("Quiz not found"));

        List<Question> questions = questionRepository.findByQuizz(quizz);

        return questions.stream().map(this::convertToQuestionDTO).collect(Collectors.toList());
    }

    @Override
    public QuestionDTO getQuestionById(Long id) throws Exception {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new QuestionNotFoundException("Question not found with id: " + id));

        return convertToQuestionDTO(question);
    }

    // Helper method to convert Question to QuestionDTO
    private QuestionDTO convertToQuestionDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setText(question.getText());
        dto.setQuizId(question.getQuizz().getId());

        List<AnswerDTO> answerDTOs = question.getAnswers().stream().map(answer -> {
            AnswerDTO answerDTO = new AnswerDTO();
            answerDTO.setId(answer.getId());
            answerDTO.setText(answer.getText());
            answerDTO.setCorrect(answer.getIsCorrect());
            return answerDTO;
        }).collect(Collectors.toList());

        dto.setAnswers(answerDTOs);
        return dto;
    }
}

