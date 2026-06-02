import type {
  GenerateOptions,
  PasswordCheckRequest,
  PasswordCheckResponse,
  PasswordGenerateResponse,
} from '../types';

declare global {
  interface Window {
    __ENV__?: { VITE_API_BASE?: string };
  }
}

function resolveApiBase(): string {
  const raw =
    window.__ENV__?.VITE_API_BASE?.trim() ||
    import.meta.env.VITE_API_BASE?.trim() ||
    'http://localhost:8088';
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return `${withProtocol.replace(/\/$/, '')}/api/password`;
}

const API_BASE = resolveApiBase();

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
