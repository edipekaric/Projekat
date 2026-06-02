import { useEffect, useState } from 'react';
import type { PasswordCheckResponse } from '../types';

interface PasswordCheckerProps {
  onCheck: (password: string) => void;
  result: PasswordCheckResponse | null;
  loading: boolean;
}

const STRENGTH_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#15803d'];

function strengthPercent(score: number): number {
  return ((score + 1) / 5) * 100;
}

export function PasswordChecker({ onCheck, result, loading }: PasswordCheckerProps) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onCheck(password);
    }, 300);
    return () => clearTimeout(timer);
  }, [password, onCheck]);

  const score = result?.score ?? 0;
  const color = STRENGTH_COLORS[Math.min(score, 4)];

  return (
    <section className="panel">
      <h2>Provjera lozinke</h2>
      <label className="field-label" htmlFor="password-input">
        Lozinka
      </label>
      <input
        id="password-input"
        type="password"
        className="text-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Unesite lozinku..."
        autoComplete="off"
      />

      {loading && <p className="hint">Provjeravam...</p>}

      {result && password.length > 0 && (
        <div className="strength-block">
          <div className="strength-bar-track">
            <div
              className="strength-bar-fill"
              style={{
                width: `${strengthPercent(score)}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <p className="strength-label" style={{ color }}>
            {result.label} (ocjena {result.score}/4)
          </p>
          {result.suggestions.length > 0 && (
            <ul className="suggestions">
              {result.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
