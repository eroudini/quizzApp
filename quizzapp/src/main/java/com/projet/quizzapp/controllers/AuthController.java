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
            return ResponseEntity.badRequest().body("Email already taken!");
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
        return ResponseEntity.ok("User registered successfully with username: " + username);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        UserDetails userDetails = userRepository.findByEmail(user.getEmail())
                .map(u -> new UserSecurity(u)).orElseThrow();

        String token = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(token);
    }

}
