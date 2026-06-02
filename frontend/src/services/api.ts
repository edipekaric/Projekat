import type {
  GenerateOptions,
  PasswordCheckRequest,
  PasswordCheckResponse,
  PasswordGenerateResponse,
} from '../types';

const API_BASE = 'http://localhost:8088/api/password';

export async function checkPassword(
  request: PasswordCheckRequest,
): Promise<PasswordCheckResponse> {
  const response = await fetch(`${API_BASE}/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? 'Provjera lozinke nije uspjela.',
    );
  }

  return response.json() as Promise<PasswordCheckResponse>;
}

export async function generatePassword(
  options: GenerateOptions,
): Promise<PasswordGenerateResponse> {
  const params = new URLSearchParams({
    length: String(options.length),
    uppercase: String(options.uppercase),
    lowercase: String(options.lowercase),
    digits: String(options.digits),
    specialChars: String(options.specialChars),
  });

  const response = await fetch(`${API_BASE}/generate?${params}`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? 'Generiranje lozinke nije uspjelo.',
    );
  }

  return response.json() as Promise<PasswordGenerateResponse>;
}
