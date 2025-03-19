package com.projet.quizzapp.controllers;

import com.projet.quizzapp.entities.User;
import com.projet.quizzapp.repositories.UserRepository;
import com.projet.quizzapp.secutity.JwtUtils;
import com.projet.quizzapp.secutity.UserSecurity;
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
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("JOUEUR");
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        UserDetails userDetails = userRepository.findByUsername(user.getUsername())
                .map(u -> new UserSecurity(u)).orElseThrow();

        String token = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(token);
    }

}
