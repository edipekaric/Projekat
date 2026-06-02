package com.example.passwordchecker.dto;

public class PasswordGenerateResponse {

	private String password;

	public PasswordGenerateResponse() {
	}

	public PasswordGenerateResponse(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
