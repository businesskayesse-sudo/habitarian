'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError('Erro de ligação');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: var(--ink-04); padding: 20px;
        }
        .login-card {
          width: 100%; max-width: 420px; background: var(--paper);
          border: 1px solid var(--ink-15); padding: 48px 40px;
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        .login-logo { height: 48px; margin: 0 auto 12px; display: block; }
        .login-subtitle {
          font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase;
          color: var(--ink-50); text-align: center; margin-bottom: 40px;
        }
        .login-rule { height: 1.5px; background: var(--ink-100); margin-bottom: 32px; }
        .login-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .login-label {
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--ink-70); font-weight: 500;
        }
        .login-input {
          font-size: 15px; color: var(--ink-100); padding: 12px 0; border: 0;
          border-bottom: 1px solid var(--ink-30); background: transparent; outline: none;
          transition: border-color 0.2s;
        }
        .login-input:focus { border-bottom-color: var(--ink-100); }
        .login-btn {
          width: 100%; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
          font-weight: 500; background: var(--ink-100); color: #fff; border: 0;
          padding: 14px; cursor: pointer; transition: background 0.2s; margin-top: 8px;
        }
        .login-btn:hover { background: #1a1918; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-error {
          font-size: 12px; color: #c96442; text-align: center; margin-top: 16px;
          letter-spacing: 0.08em;
        }
        .login-footer {
          font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink-50); text-align: center; margin-top: 32px;
          padding-top: 24px; border-top: 1px solid var(--ink-15);
        }
        .login-footer a { color: var(--ink-100); text-decoration: underline; }
      `}</style>

      <div className="login-page">
        <div className="login-card">
          <img src="/assets/logo-primary.png" alt="Habitarian Tunes" className="login-logo" />
          <div className="login-subtitle">Painel de Administração</div>
          <div className="login-rule" />

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label className="login-label">Email</label>
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@habitariantunes.com"
                required
                autoFocus
              />
            </div>
            <div className="login-field">
              <label className="login-label">Password</label>
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'A entrar...' : 'Entrar'}
            </button>
          </form>

          {error && <div className="login-error">{error}</div>}

          <div className="login-footer">
            <a href="/">← Voltar ao site</a>
          </div>
        </div>
      </div>
    </>
  );
}
