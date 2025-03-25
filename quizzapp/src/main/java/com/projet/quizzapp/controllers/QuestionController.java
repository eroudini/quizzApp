package com.projet.quizzapp.controllers;

import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.exceptions.QuestionNotFoundException;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import com.projet.quizzapp.services.question.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;

    @PostMapping("/create-new-question")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionDTO questionDTO) {
        try {
            QuestionDTO createdQuestionDTO = questionService.createQuestion(questionDTO);
            return ResponseEntity.status(CREATED).body(createdQuestionDTO);
        } catch (QuizzNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    }

    @GetMapping
    public ResponseEntity<List<QuestionDTO>> getQuestionsByQuizId(@RequestParam Long quizId) {
        try {
            List<QuestionDTO> questions = questionService.getAllQuestions(quizId);
            return ResponseEntity.ok(questions);
        } catch (QuizzNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionById(@PathVariable Long id) {
        try {
            QuestionDTO question = questionService.getQuestionById(id);
            return ResponseEntity.ok(question);
        } catch (QuestionNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    }
}
