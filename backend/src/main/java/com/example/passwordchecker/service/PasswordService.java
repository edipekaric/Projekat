package com.example.passwordchecker.service;

import com.example.passwordchecker.dto.PasswordCheckResponse;
import com.example.passwordchecker.dto.PasswordGenerateResponse;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class PasswordService {

	private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
	private static final String DIGITS = "0123456789";
	private static final String SPECIAL = "!@#$%^&*()-_=+[]{}|;:,.<>?";

	private static final String[] LABELS = {
			"Slaba",
			"Zadovoljavajuća",
			"Dobra",
			"Jaka",
			"Jaka"
	};

	private final SecureRandom random = new SecureRandom();

	public PasswordCheckResponse checkPassword(String password) {
		if (password == null) {
			password = "";
		}

		List<String> suggestions = new ArrayList<>();
		int length = password.length();

		int lengthScore = lengthScore(length);
		int categoryScore = categoryScore(password, suggestions);
		int penalty = sequenceAndRepetitionPenalty(password, suggestions);

		int rawScore = lengthScore + categoryScore - penalty;
		int maxByLength = maxScoreForLength(length);
		int score = Math.max(0, Math.min(maxByLength, rawScore));
		String label = LABELS[score];

		if (length < 8) {
			suggestions.add("Koristite najmanje 8 znakova.");
		} else if (length < 12) {
			suggestions.add("Za jaču lozinku koristite najmanje 12 znakova.");
		} else if (length < 16) {
			suggestions.add("Za maksimalnu jačinu koristite 16 ili više znakova.");
		}

		return new PasswordCheckResponse(score, label, suggestions);
	}

	public PasswordGenerateResponse generatePassword(
			int length,
			boolean uppercase,
			boolean lowercase,
			boolean digits,
			boolean specialChars) {

		validateGenerateParams(length, uppercase, lowercase, digits, specialChars);

		StringBuilder charset = new StringBuilder();
		List<Character> required = new ArrayList<>();

		if (uppercase) {
			charset.append(UPPERCASE);
			required.add(pickRandom(UPPERCASE));
		}
		if (lowercase) {
			charset.append(LOWERCASE);
			required.add(pickRandom(LOWERCASE));
		}
		if (digits) {
			charset.append(DIGITS);
			required.add(pickRandom(DIGITS));
		}
		if (specialChars) {
			charset.append(SPECIAL);
			required.add(pickRandom(SPECIAL));
		}

		String chars = charset.toString();
		List<Character> passwordChars = new ArrayList<>(required);

		while (passwordChars.size() < length) {
			passwordChars.add(chars.charAt(random.nextInt(chars.length())));
		}

		Collections.shuffle(passwordChars, random);

		StringBuilder result = new StringBuilder(length);
		for (char c : passwordChars) {
			result.append(c);
		}

		return new PasswordGenerateResponse(result.toString());
	}

	private int lengthScore(int length) {
		if (length < 8) {
			return 0;
		}
		if (length < 12) {
			return 1;
		}
		if (length < 16) {
			return 2;
		}
		return 3;
	}

	private int maxScoreForLength(int length) {
		if (length < 8) {
			return 0;
		}
		if (length < 12) {
			return 1;
		}
		if (length < 16) {
			return 2;
		}
		return 4;
	}

	private int categoryScore(String password, List<String> suggestions) {
		int score = 0;
		boolean hasUpper = password.chars().anyMatch(Character::isUpperCase);
		boolean hasLower = password.chars().anyMatch(Character::isLowerCase);
		boolean hasDigit = password.chars().anyMatch(Character::isDigit);
		boolean hasSpecial = password.chars().anyMatch(ch -> !Character.isLetterOrDigit(ch));

		if (hasUpper) {
			score++;
		} else {
			suggestions.add("Dodajte velika slova (A–Z).");
		}
		if (hasLower) {
			score++;
		} else {
			suggestions.add("Dodajte mala slova (a–z).");
		}
		if (hasDigit) {
			score++;
		} else {
			suggestions.add("Dodajte brojeve (0–9).");
		}
		if (hasSpecial) {
			score++;
		} else {
			suggestions.add("Dodajte posebne znakove (!@#$…).");
		}

		return score;
	}

	private int sequenceAndRepetitionPenalty(String password, List<String> suggestions) {
		int penalty = 0;

		if (hasSequentialChars(password, 3)) {
			penalty++;
			suggestions.add("Izbjegavajte sekvence znakova (npr. abc, 123).");
		}
		if (hasRepetition(password, 3)) {
			penalty++;
			suggestions.add("Izbjegavajte ponavljanje istog znaka (npr. aaa).");
		}

		return penalty;
	}

	private boolean hasSequentialChars(String password, int minLength) {
		if (password.length() < minLength) {
			return false;
		}
		String lower = password.toLowerCase();
		for (int i = 0; i <= lower.length() - minLength; i++) {
			boolean ascending = true;
			boolean descending = true;
			for (int j = 0; j < minLength - 1; j++) {
				char current = lower.charAt(i + j);
				char next = lower.charAt(i + j + 1);
				if (next - current != 1) {
					ascending = false;
				}
				if (current - next != 1) {
					descending = false;
				}
			}
			if (ascending || descending) {
				return true;
			}
		}
		return false;
	}

	private boolean hasRepetition(String password, int minLength) {
		if (password.length() < minLength) {
			return false;
		}
		for (int i = 0; i <= password.length() - minLength; i++) {
			char c = password.charAt(i);
			boolean repeated = true;
			for (int j = 1; j < minLength; j++) {
				if (password.charAt(i + j) != c) {
					repeated = false;
					break;
				}
			}
			if (repeated) {
				return true;
			}
		}
		return false;
	}

	private char pickRandom(String charset) {
		return charset.charAt(random.nextInt(charset.length()));
	}

	private void validateGenerateParams(
			int length,
			boolean uppercase,
			boolean lowercase,
			boolean digits,
			boolean specialChars) {

		if (length < 8 || length > 128) {
			throw new IllegalArgumentException("Dužina mora biti između 8 i 128.");
		}
		if (!uppercase && !lowercase && !digits && !specialChars) {
			throw new IllegalArgumentException("Odaberite barem jedan tip znakova.");
		}
	}

}
