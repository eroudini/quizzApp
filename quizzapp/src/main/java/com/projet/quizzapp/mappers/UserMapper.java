package com.projet.quizzapp.mappers;

import com.projet.quizzapp.dto.RegisterRequest;
import com.projet.quizzapp.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toUser(RegisterRequest request, String encodedPassword, String username) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(encodedPassword);
        user.setUsername(username);
        user.setRole("JOUEUR");
        return user;
    }
}