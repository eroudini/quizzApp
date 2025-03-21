package com.projet.quizzapp.services.quizz;


import com.projet.quizzapp.dto.QuizzDTO;
import jakarta.persistence.Id;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface QuizzService {
    //Object createTest(QuizzDTO dto);


    List<QuizzDTO> getAllQuizzs() throws Exception;
    QuizzDTO getQuizzById(Long id) throws Exception;
    QuizzDTO createQuizz(QuizzDTO quizzDTO) throws Exception;




}
