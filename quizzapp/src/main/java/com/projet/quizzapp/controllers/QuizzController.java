package com.projet.quizzapp.controllers;

import com.projet.quizzapp.dto.QuizzDTO;
import com.projet.quizzapp.entities.Quizz;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import com.projet.quizzapp.services.quizz.QuizzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizzController {

    @Autowired
    private QuizzService quizzService;

    @PostMapping
    public ResponseEntity<?> createQuizz(@RequestBody QuizzDTO dto){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(quizzService.createQuizz(dto));
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid quizz data" + e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }

    }

    @GetMapping
    public ResponseEntity<?> getAllQuizzes(){

        try {
            List<QuizzDTO> quizzes = quizzService.getAllQuizzs();
            return ResponseEntity.ok(quizzes);

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving quizzes.");
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getQuizzById(@PathVariable Long id){
        try {

            QuizzDTO quizzDTO = quizzService.getQuizzById(id);
            return ResponseEntity.ok(quizzDTO);
        } catch (QuizzNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body( e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving quizz" + e.getMessage());
        }
    }






    /*@PostMapping("/question")
    public ResponseEntity<?> addQuestionInTest(@RequestBody QuizzDTO dto){
        try{
            return new ResponseEntity<>(quizzService.createTest(dto), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        }
        */






}
