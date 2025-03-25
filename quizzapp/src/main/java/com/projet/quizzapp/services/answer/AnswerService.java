package com.projet.quizzapp.services.answer;

import com.projet.quizzapp.dto.AnswerDTO;
import com.projet.quizzapp.entities.Answer;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.repositories.AnswerRepository;
import com.projet.quizzapp.repositories.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerService implements IAnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    @Override
    public AnswerDTO createAnswer(AnswerDTO answerDTO) {
        Question question = questionRepository.findById(answerDTO.getQuestionId())
                .orElseThrow(() -> new QuestionNotFoundException("Question not found"));

        Answer answer = new Answer();
        answer.setText(answerDTO.getText());
        answer.setCorrect(answerDTO.getIsCorrect());
        answer.setQuestion(question);

        Answer savedAnswer = answerRepository.save(answer);

        return mapToDTO(savedAnswer);
    }

    @Override
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    @Override
    public List<Answer> getAnswersByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    @Override
    public Optional<Answer> getAnswerById(Long id) {
        return answerRepository.findById(id);
    }

    @Override
    public Answer updateAnswer(Long id, Answer updatedAnswer) {
        Answer existingAnswer = answerRepository.findById(id)
                .orElseThrow(() -> new AnswerNotFoundException("Answer not found"));

        existingAnswer.setText(updatedAnswer.getText());
        existingAnswer.setCorrect(updatedAnswer.getIsCorrect());

        return answerRepository.save(existingAnswer);
    }

    @Override
    public void deleteAnswer(Long id) {
        if (!answerRepository.existsById(id)) {
            throw new AnswerNotFoundException("Answer not found");
        }
        answerRepository.deleteById(id);
    }

    private AnswerDTO mapToDTO(Answer answer) {
        AnswerDTO dto = new AnswerDTO();
        dto.setId(answer.getId());
        dto.setText(answer.getText());
        dto.setIsCorrect(answer.getIsCorrect());
        dto.setQuestionId(answer.getQuestion().getId());
        return dto;
    }
}
