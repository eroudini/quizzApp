package com.projet.quizzapp.services.category;

import com.projet.quizzapp.dto.CategoryDTO;
import com.projet.quizzapp.entities.Category;
import com.projet.quizzapp.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Convertir une entité en DTO
    private CategoryDTO convertToDTO(Category category) {
        List<Long> quizzIds = category.getQuizzList().stream()
                .map(quizz -> quizz.getId())
                .collect(Collectors.toList());

        return new CategoryDTO(category.getId(), category.getName(), category.getDescription(), quizzIds);
    }

    private Category convertToEntity(CategoryDTO categoryDTO) {
        return new Category(categoryDTO.getId(), categoryDTO.getName(), categoryDTO.getDescription());
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.map(this::convertToDTO).orElse(null);
    }

    public CategoryDTO addCategory(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        Category savedCategory = categoryRepository.save(category);
        return convertToDTO(savedCategory);
    }

    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            category.setName(categoryDTO.getName());
            category.setDescription(categoryDTO.getDescription());
            return convertToDTO(categoryRepository.save(category));
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
