package com.projet.quizzapp.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendResetPasswordEmail(String to, String resetToken) {
        String subject = "Password Reset Request";
        String text = "To reset your password, please click the following link:\n"
                + "http://localhost:8080/auth/reset-password?token=" + resetToken;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("kilianrsx@gmail.com"); // Remplacer par ton adresse d'expéditeur

        mailSender.send(message);
    }
}
