import { useState } from 'react';
import type { GenerateOptions } from '../types';
import { MAX_GENERATE_LENGTH, MIN_GENERATE_LENGTH } from '../types';

interface PasswordGeneratorProps {
  onGenerate: (options: GenerateOptions) => void;
  generatedPassword: string;
  loading: boolean;
}

export function PasswordGenerator({
  onGenerate,
  generatedPassword,
  loading,
}: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [digits, setDigits] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);
  const [copied, setCopied] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleGenerate = () => {
    setLocalError(null);
    if (length < MIN_GENERATE_LENGTH || length > MAX_GENERATE_LENGTH) {
      setLocalError(
        `Dužina mora biti između ${MIN_GENERATE_LENGTH} i ${MAX_GENERATE_LENGTH}.`,
      );
      return;
    }
    if (!uppercase && !lowercase && !digits && !specialChars) {
      setLocalError('Odaberite barem jedan tip znakova.');
      return;
    }
    onGenerate({ length, uppercase, lowercase, digits, specialChars });
  };

  const handleCopy = async () => {
    if (!generatedPassword) return;
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setLocalError('Kopiranje nije uspjelo.');
    }
  };

  return (
    <section className="panel">
      <h2>Generator lozinke</h2>

      <label className="field-label" htmlFor="length-slider">
        Dužina: {length}
      </label>
      <input
        id="length-slider"
        type="range"
        min={MIN_GENERATE_LENGTH}
        max={MAX_GENERATE_LENGTH}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="slider"
      />

      <div className="toggles">
        <label className="toggle">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          Velika slova (A–Z)
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />
          Mala slova (a–z)
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={digits}
            onChange={(e) => setDigits(e.target.checked)}
          />
          Brojevi (0–9)
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={specialChars}
            onChange={(e) => setSpecialChars(e.target.checked)}
          />
          Posebni znakovi
        </label>
      </div>

      {localError && <p className="error">{localError}</p>}

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generiram...' : 'Generiši'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCopy}
          disabled={!generatedPassword}
        >
          {copied ? 'Kopirano!' : 'Kopiraj'}
        </button>
      </div>

      {generatedPassword && (
        <output className="generated-output">{generatedPassword}</output>
      )}
    </section>
  );
}
