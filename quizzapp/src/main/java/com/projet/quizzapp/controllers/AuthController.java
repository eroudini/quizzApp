package com.projet.quizzapp.controllers;

import com.projet.quizzapp.entities.User;
import com.projet.quizzapp.repositories.UserRepository;
import com.projet.quizzapp.security.JwtUtils;
import com.projet.quizzapp.security.UserSecurity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email already taken!"));
        }

        String baseUsername = user.getEmail().split("@")[0];
        String username = baseUsername;
        int count = 1;

        while (userRepository.existsByUsername(username)) {
            username = baseUsername + count;
            count++;
        }

        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("JOUEUR");

        userRepository.save(user);

        // Renvoyer un objet JSON avec success: true
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "User registered successfully");
        response.put("username", username);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        UserDetails userDetails = userRepository.findByEmail(user.getEmail())
                .map(UserSecurity::new)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(userDetails);

        // Retourner un JSON plutôt qu'une simple chaîne
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }


}
