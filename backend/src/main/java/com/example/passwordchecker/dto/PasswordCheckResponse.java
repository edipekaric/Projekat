package com.example.passwordchecker.dto;

import java.util.List;

public class PasswordCheckResponse {

	private int score;
	private String label;
	private List<String> suggestions;

	public PasswordCheckResponse() {
	}

	public PasswordCheckResponse(int score, String label, List<String> suggestions) {
		this.score = score;
		this.label = label;
		this.suggestions = suggestions;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public List<String> getSuggestions() {
		return suggestions;
	}

	public void setSuggestions(List<String> suggestions) {
		this.suggestions = suggestions;
	}

}
