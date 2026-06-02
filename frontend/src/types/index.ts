export interface PasswordCheckRequest {
  password: string;
}

export interface PasswordCheckResponse {
  score: number;
  label: string;
  suggestions: string[];
}

export interface PasswordGenerateResponse {
  password: string;
}

export interface GenerateOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  digits: boolean;
  specialChars: boolean;
}

export const STRENGTH_LABELS = [
  'Slaba',
  'Zadovoljavajuća',
  'Dobra',
  'Jaka',
] as const;

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MIN_GENERATE_LENGTH = 8;
export const MAX_GENERATE_LENGTH = 128;
