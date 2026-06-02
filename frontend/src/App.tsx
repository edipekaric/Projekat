import { PasswordChecker } from './components/PasswordChecker';
import { PasswordGenerator } from './components/PasswordGenerator';
import { usePasswordApi } from './hooks/usePasswordApi';
import './App.css';

function App() {
  const {
    checkResult,
    generatedPassword,
    loading,
    error,
    check,
    generate,
    clearError,
  } = usePasswordApi();

  return (
    <div className="app">
      <header className="header">
        <h1>Provjera i generator lozinki</h1>
        <p className="subtitle">
          Provjerite jačinu postojeće lozinke ili generirajte novu sigurnu lozinku.
        </p>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
          <button type="button" className="dismiss" onClick={clearError} aria-label="Zatvori">
            ×
          </button>
        </div>
      )}

      <main className="main">
        <PasswordChecker onCheck={check} result={checkResult} loading={loading} />
        <PasswordGenerator
          onGenerate={generate}
          generatedPassword={generatedPassword}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
