import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [numA, setNumA] = useState('');
  const [numB, setNumB] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    if (numA === '' || numB === '') {
      setError('Please enter both numbers.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/multiply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: numA, b: numB }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>✖️ Multiplier</h1>
        <p className={styles.subtitle}>Enter two numbers and press Calculate</p>

        <div className={styles.inputGroup}>
          <label className={styles.label}>First Number</label>
          <input
            className={styles.input}
            type="number"
            placeholder="e.g. 12"
            value={numA}
            onChange={(e) => setNumA(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Second Number</label>
          <input
            className={styles.input}
            type="number"
            placeholder="e.g. 7"
            value={numB}
            onChange={(e) => setNumB(e.target.value)}
          />
        </div>

        <button
          className={styles.button}
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>

        {error && <div className={styles.error}>{error}</div>}

        {result !== null && (
          <div className={styles.result}>
            <span className={styles.resultLabel}>Result</span>
            <span className={styles.resultValue}>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}
