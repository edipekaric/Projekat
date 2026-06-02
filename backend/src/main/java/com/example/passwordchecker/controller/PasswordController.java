package com.example.passwordchecker.controller;

import com.example.passwordchecker.dto.PasswordCheckRequest;
import com.example.passwordchecker.dto.PasswordCheckResponse;
import com.example.passwordchecker.dto.PasswordGenerateResponse;
import com.example.passwordchecker.service.PasswordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

	private final PasswordService passwordService;

	public PasswordController(PasswordService passwordService) {
		this.passwordService = passwordService;
	}

	@PostMapping("/check")
	public PasswordCheckResponse check(@RequestBody PasswordCheckRequest request) {
		return passwordService.checkPassword(request.getPassword());
	}

	@GetMapping("/generate")
	public PasswordGenerateResponse generate(
			@RequestParam(defaultValue = "16") int length,
			@RequestParam(defaultValue = "true") boolean uppercase,
			@RequestParam(defaultValue = "true") boolean lowercase,
			@RequestParam(defaultValue = "true") boolean digits,
			@RequestParam(defaultValue = "true") boolean specialChars) {
		return passwordService.generatePassword(length, uppercase, lowercase, digits, specialChars);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(Map.of("error", ex.getMessage()));
	}

}
