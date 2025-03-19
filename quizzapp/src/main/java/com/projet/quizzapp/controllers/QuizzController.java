package com.projet.quizzapp.controllers;

import com.projet.quizzapp.dto.QuizzDTO;
import com.projet.quizzapp.services.quizz.QuizzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/quizz")
public class QuizzController {

    @Autowired
    private QuizzService quizzService;

    @PostMapping()
    public ResponseEntity<?> createTest(@RequestBody QuizzDTO dto){
        try{
            return new ResponseEntity<>(quizzService.createTest(dto), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/question")
    public ResponseEntity<?> addQuestionInTest(@RequestBody QuizzDTO dto){
        try{
            return new ResponseEntity<>(quizzService.createTest(dto), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

}

}
