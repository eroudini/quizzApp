package com.projet.quizzapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class QuizzappApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuizzappApplication.class, args);
	}

}
