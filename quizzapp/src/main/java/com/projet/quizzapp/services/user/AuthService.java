package com.projet.quizzapp.services.user;

import com.projet.quizzapp.dto.ForgotPasswordRequest;
import com.projet.quizzapp.dto.ResetPasswordRequest;
import com.projet.quizzapp.security.UserSecurity;
import com.projet.quizzapp.dto.LoginRequest;
import com.projet.quizzapp.dto.RegisterRequest;
import com.projet.quizzapp.entities.User;
import com.projet.quizzapp.mappers.UserMapper;
import com.projet.quizzapp.repositories.UserRepository;
import com.projet.quizzapp.responses.AuthResponse;
import com.projet.quizzapp.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final UserMapper userMapper;
    private final EmailService emailService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already taken!", null);
        }

        String baseUsername = request.getEmail().split("@")[0];
        String username = baseUsername;
        int count = 1;

        while (userRepository.existsByUsername(username)) {
            username = baseUsername + count;
            count++;
        }

        User user = userMapper.toUser(request, passwordEncoder.encode(request.getPassword()), username);
        userRepository.save(user);

        return new AuthResponse(true, "User registered successfully", null);
    }

    public AuthResponse login(LoginRequest request) {
        UserDetails userDetails = userRepository.findByEmail(request.getEmail())
                .map(UserSecurity::new)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtils.generateToken(userDetails);

        return new AuthResponse(true, "Login successful", token);
    }

    public String forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return "Email not found!";
        }

        User user = userOptional.get();
        String token = UUID.randomUUID().toString();

        user.setResetToken(token);
        userRepository.save(user);

        emailService.sendResetPasswordEmail(user.getEmail(), token);

        return "Reset password link sent to your email.";
    }

    public String resetPassword(ResetPasswordRequest request) {
        Optional<User> userOptional = userRepository.findByResetToken(request.getToken());

        if (userOptional.isEmpty()) {
            return "Invalid token!";
        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        userRepository.save(user);

        return "Password reset successfully!";
    }
}