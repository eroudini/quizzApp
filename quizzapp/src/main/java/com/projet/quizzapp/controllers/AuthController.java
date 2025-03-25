package com.projet.quizzapp.controllers;

import com.projet.quizzapp.dto.ForgotPasswordRequest;
import com.projet.quizzapp.dto.LoginRequest;
import com.projet.quizzapp.dto.RegisterRequest;
import com.projet.quizzapp.dto.ResetPasswordRequest;
import com.projet.quizzapp.entities.User;
import com.projet.quizzapp.repositories.UserRepository;
import com.projet.quizzapp.responses.AuthResponse;
import com.projet.quizzapp.security.JwtUtils;
import com.projet.quizzapp.security.UserSecurity;
import com.projet.quizzapp.services.user.AuthService;
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

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getAuthenticatedUser() {
        return ResponseEntity.ok(authService.getAuthenticatedUser());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        String response = authService.forgotPassword(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        String response = authService.resetPassword(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/reset-password")
    public ResponseEntity<?> redirectToResetPasswordPage(@RequestParam("token") String token) {
        String frontendUrl = "http://localhost:3000/reset-password?token=" + token;
        return ResponseEntity.status(302).header("Location", frontendUrl).build();
    }

}