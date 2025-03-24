package com.projet.quizzapp.controllers;


import com.projet.quizzapp.dto.QuestionDTO;
import com.projet.quizzapp.entities.Question;
import com.projet.quizzapp.exceptions.QuestionNotFoundException;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import com.projet.quizzapp.services.question.IQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;


@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;



    @PostMapping("/create-new-question")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionDTO questionDTO){

        try {
            QuestionDTO createdQuestionDTO = questionService.createQuestion(questionDTO);
            return ResponseEntity.status(CREATED).body(createdQuestionDTO);
        } catch (QuestionNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body( e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
        }


    }

/*
    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){
        List<Question> questionDTOS = questionService.getAllQuestions();
        return ResponseEntity.ok(questionDTOS);
    }



    @GetMapping("/question/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = questionService.getQuestionById(id);
        if (theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

    @PutMapping("/questionDTO/{id}/update")
    public ResponseEntity<Question> updateQuestion(
            @PathVariable Long id, @RequestBody Question questionDTO) throws ChangeSetPersister.NotFoundException {
        Question updatedQuestionDTO = questionService.updateQuestion(id, questionDTO);
        return ResponseEntity.ok(updatedQuestionDTO);
    }

    @DeleteMapping("/question/{id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id){
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects = questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/quiz/fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(
            @RequestParam Integer numOfQuestions, @RequestParam String subject){
        List<Question> allQuestionDTOS = questionService.getQuestionsForUser(numOfQuestions, subject);

        List<Question> mutableQuestionDTOS = new ArrayList<>(allQuestionDTOS);
        Collections.shuffle(mutableQuestionDTOS);

        int availableQuestions = Math.min(numOfQuestions, mutableQuestionDTOS.size());
        List<Question> randomQuestionDTOS = mutableQuestionDTOS.subList(0, availableQuestions);
        return ResponseEntity.ok(randomQuestionDTOS);
    }


 */

}
