
package com.projet.quizzapp.services.quizz;


import com.projet.quizzapp.dto.QuizzDTO;
import com.projet.quizzapp.entities.Category;
import com.projet.quizzapp.entities.Quizz;
import com.projet.quizzapp.exceptions.QuizzNotFoundException;
import com.projet.quizzapp.repositories.CategoryRepository;
import com.projet.quizzapp.repositories.QuizzRepository;
import com.projet.quizzapp.tools.DtoTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizzServiceImpl implements QuizzService{



    @Autowired
    private QuizzRepository quizzRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    //@Autowired
    //private QuestionRepository questionRepository;

    @Override
    public List<QuizzDTO> getAllQuizzs() throws Exception {

        List<QuizzDTO> quizzDTOList = new ArrayList<>();
        List<Quizz> quizzes = quizzRepository.findAll();

        for(Quizz quizz : quizzes){
            quizzDTOList.add(DtoTools.convert(quizz, QuizzDTO.class));
        }
        return quizzDTOList;
    }



    @Override
    public QuizzDTO getQuizzById(Long id) throws Exception{

        Optional<Quizz> quizz = quizzRepository.findById(id);

        if (quizz.isPresent()){
            return DtoTools.convert(quizz.get(), QuizzDTO.class);
        } else {
            throw new QuizzNotFoundException("quizz not found with id : " + id);
        }
    }



    @Override
    public QuizzDTO createQuizz(QuizzDTO quizzDTO) throws Exception{

        Quizz quizz = DtoTools.convert(quizzDTO, Quizz.class);
        // associer categories et quizz
        Optional<Category> category = categoryRepository.findById(quizzDTO.getCategoryId());
        if (category.isPresent()) {
            quizz.setCategory(category.get());
        } else {
            throw new IllegalArgumentException("CategoryId not found");
        }
        Quizz quizzBDD = quizzRepository.save(quizz);

        return DtoTools.convert(quizzBDD, QuizzDTO.class);
    }



   /* public QuizzDTO createTest(QuizzDTO dto){
        Quizz quizz = new Quizz();

        quizz.setTitle(dto.getTitle());
        quizz.setDescription(dto.getDescription());
        quizz.setTime(dto.getTime());

        return quizzRepository.save(quizz).getDto();
    }






   /* public Question addQuestionInQuizz(Question dto){
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

    */
}


