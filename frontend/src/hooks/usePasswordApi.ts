import { useCallback, useState } from 'react';
import { checkPassword, generatePassword } from '../services/api';
import type {
  GenerateOptions,
  PasswordCheckResponse,
} from '../types';
import {
  MAX_GENERATE_LENGTH,
  MIN_GENERATE_LENGTH,
} from '../types';

export function usePasswordApi() {
  const [checkResult, setCheckResult] = useState<PasswordCheckResponse | null>(
    null,
  );
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await checkPassword({ password });
      setCheckResult(result);
    } catch (err) {
      setCheckResult(null);
      setError(err instanceof Error ? err.message : 'Nepoznata greška.');
    } finally {
      setLoading(false);
    }
  }, []);

  const generate = useCallback(async (options: GenerateOptions) => {
    if (options.length < MIN_GENERATE_LENGTH || options.length > MAX_GENERATE_LENGTH) {
      setError(`Dužina mora biti između ${MIN_GENERATE_LENGTH} i ${MAX_GENERATE_LENGTH}.`);
      return;
    }
    if (!options.uppercase && !options.lowercase && !options.digits && !options.specialChars) {
      setError('Odaberite barem jedan tip znakova.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generatePassword(options);
      setGeneratedPassword(result.password);
    } catch (err) {
      setGeneratedPassword('');
      setError(err instanceof Error ? err.message : 'Nepoznata greška.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    checkResult,
    generatedPassword,
    loading,
    error,
    check,
    generate,
    clearError,
  };
}
