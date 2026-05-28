'use client';

import { useState, useEffect, useCallback } from 'react';
import { getStrings, pad } from '@/lib/i18n';

function useCountdown(targetIso) {
  const compute = useCallback(() => {
    const target = new Date(targetIso).getTime();
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    return { days, hours, minutes, seconds };
  }, [targetIso]);

  const [t, setT] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    setT(compute());
    return () => clearInterval(id);
  }, [compute]);
  return t;
}

function EmailCapture({ s, lang }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('submitting');
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale: lang }),
      });
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="v2-capture" onSubmit={submit}>
      <span className="v2-capture-label">{s.emailLabel}</span>
      <div className="v2-capture-row">
        <input className="v2-capture-input" type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder={s.emailPlaceholder}
          disabled={status === 'submitting'} />
        <button type="submit" className="v2-capture-btn" disabled={status === 'submitting'}>
          {status === 'submitting' ? '...' : s.join}
        </button>
      </div>
      <div className="v2-capture-help">
        {status === 'done' ? s.joined : status === 'error' ? 'Erro. Tente novamente.' : s.priority}
      </div>
    </form>
  );
}

export default function LandingV2({ content }) {
  const [lang, setLang] = useState('pt');
  const [mounted, setMounted] = useState(false);
  const t = useCountdown(content.countdownTarget);
  const s = getStrings(lang, content.ui);
  const heroL = content.hero[lang];

  useEffect(() => setMounted(true), []);

  return (
    <>
      <style>{`
        .v2-root { width:100%;min-height:100vh;display:grid;grid-template-columns:1.05fr 1fr;font-family:var(--font-sans);color:var(--ink-100);overflow:hidden;position:relative; }
        .v2-image-side { position:relative;overflow:hidden;color:#fff;background:#1a1918;min-height:100vh; }
        .v2-image-bg { position:absolute;inset:0;background-size:cover;background-position:center;filter:grayscale(0.18) brightness(0.78);transition:opacity 0.8s ease; }
        .v2-image-scrim { position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,18,16,0.55) 0%,rgba(20,18,16,0.18) 40%,rgba(20,18,16,0.78) 100%); }
        .v2-image-inner { position:relative;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:32px 48px 36px; }
        .v2-image-top { display:flex;justify-content:space-between;align-items:flex-start; }
        .v2-image-logo { height:56px;width:auto;display:block;filter:brightness(0) invert(1); }
        .v2-image-meta { font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(255,255,255,0.72);text-align:right;line-height:1.9; }
        .v2-image-bottom { display:flex;flex-direction:column;gap:18px; }
        .v2-image-eyebrow { font-size:11px;letter-spacing:0.34em;text-transform:uppercase;color:rgba(255,255,255,0.78); }
        .v2-image-title { font-family:var(--font-serif);font-weight:500;font-style:italic;font-size:clamp(36px,4.5vw,60px);line-height:1.02;letter-spacing:-0.015em;color:#fff;margin:0;max-width:540px;text-wrap:balance; }
        .v2-image-caption { font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.55);padding-top:18px;border-top:1px solid rgba(255,255,255,0.22);display:flex;justify-content:space-between; }
        .v2-paper-side { background:var(--paper);padding:32px 56px 36px;display:flex;flex-direction:column;overflow-y:auto;position:relative;min-height:100vh; }
        .v2-paper-top { display:flex;justify-content:space-between;align-items:center;margin-bottom:24px; }
        .v2-paper-eyebrow { font-size:10px;letter-spacing:0.34em;text-transform:uppercase;color:var(--ink-70); }
        .v2-lang-btn { font-size:10px;letter-spacing:0.24em;text-transform:uppercase;background:transparent;border:1px solid var(--ink-100);color:var(--ink-100);padding:6px 11px;cursor:pointer;transition:all 0.2s; }
        .v2-lang-btn:hover { background:var(--ink-100);color:#fff; }
        .v2-paper-body { flex:1;display:flex;flex-direction:column;gap:28px;min-height:0; }
        .v2-cd-label { font-size:9px;letter-spacing:0.34em;text-transform:uppercase;color:var(--ink-50);margin-bottom:10px; }
        .v2-cd-grid { display:grid;grid-template-columns:repeat(4,1fr);border-top:1.5px solid var(--ink-100);border-bottom:1px solid var(--ink-30); }
        .v2-cd-cell { padding:14px 6px 12px;display:flex;flex-direction:column;gap:4px;border-right:1px solid var(--ink-15); }
        .v2-cd-cell:last-child { border-right:none; }
        .v2-cd-num { font-family:var(--font-serif);font-weight:600;font-size:clamp(28px,3.5vw,44px);line-height:1;color:var(--ink-100);font-variant-numeric:tabular-nums;letter-spacing:-0.02em; }
        .v2-cd-lbl { font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:var(--ink-70); }
        .v2-vision { font-family:var(--font-serif);font-style:italic;font-size:clamp(16px,1.4vw,19px);line-height:1.45;color:var(--ink-100);margin:0;padding-top:24px;border-top:1px solid var(--ink-15); }
        .v2-vision-label { font-size:9px;letter-spacing:0.34em;text-transform:uppercase;color:var(--ink-50);margin-bottom:12px; }
        .v2-capture { margin-top:auto;padding-top:18px; }
        .v2-capture-label { font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:var(--ink-70);display:block;margin-bottom:10px; }
        .v2-capture-row { display:grid;grid-template-columns:1fr auto;border-bottom:1.5px solid var(--ink-100);align-items:stretch; }
        .v2-capture-input { font-size:15px;color:var(--ink-100);padding:14px 0;border:0;background:transparent;outline:none;width:100%; }
        .v2-capture-btn { font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-weight:500;background:var(--ink-100);color:#fff;border:0;padding:0 22px;cursor:pointer;transition:background 0.2s;white-space:nowrap; }
        .v2-capture-btn:hover { background:#1a1918; }
        .v2-capture-btn:disabled { opacity:0.6; }
        .v2-capture-help { font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--ink-50);margin-top:12px; }
        .v2-watermark { position:absolute;right:-120px;top:40%;width:380px;opacity:0.05;pointer-events:none;user-select:none; }
        @media (max-width:1024px) { .v2-root{grid-template-columns:1fr;}.v2-image-side{min-height:50vh;}.v2-image-inner{padding:24px 32px 28px;}.v2-image-title{font-size:clamp(28px,6vw,48px);}.v2-paper-side{padding:28px 32px 32px;} }
        @media (max-width:768px) { .v2-image-side{min-height:45vh;}.v2-image-inner{padding:20px 24px 24px;}.v2-image-logo{height:40px;}.v2-image-meta{font-size:8px;}.v2-image-eyebrow{font-size:9px;}.v2-image-title{font-size:clamp(24px,7vw,36px);max-width:100%;}.v2-image-caption{font-size:9px;flex-direction:column;gap:4px;}.v2-paper-side{padding:24px 20px 28px;}.v2-paper-top{margin-bottom:18px;}.v2-cd-num{font-size:clamp(24px,8vw,36px);}.v2-cd-cell{padding:10px 4px 8px;}.v2-vision{font-size:15px;}.v2-capture-btn{padding:0 14px;font-size:10px;}.v2-watermark{display:none;} }
        @media (max-width:480px) { .v2-image-side{min-height:40vh;}.v2-image-inner{padding:16px 16px 20px;}.v2-image-logo{height:32px;}.v2-image-bottom{gap:12px;}.v2-image-title{font-size:clamp(22px,6.5vw,30px);}.v2-paper-side{padding:20px 16px 24px;}.v2-paper-body{gap:20px;}.v2-cd-num{font-size:clamp(20px,7vw,28px);}.v2-capture-row{grid-template-columns:1fr;}.v2-capture-btn{padding:12px 22px;margin-top:8px;border-bottom:none;text-align:center;} }
      `}</style>

      <div className="v2-root">
        <div className="v2-image-side">
          <div className="v2-image-bg" style={{ backgroundImage: `url(${content.heroImage})`, opacity: mounted ? 1 : 0 }} />
          <div className="v2-image-scrim" />
          <div className="v2-image-inner">
            <div className="v2-image-top">
              <img src="/assets/logo-white.png" alt="Habitarian Tunes" className="v2-image-logo" />
              <div className="v2-image-meta">
                {s.launchLabel}<br />
                {s.launchDate}<br />
                <span style={{ opacity: 0.55 }}>{content.cities.join(' \u00b7 ')}</span>
              </div>
            </div>
            <div className="v2-image-bottom">
              <div className="v2-image-eyebrow">{heroL.eyebrow}</div>
              <h1 className="v2-image-title">&ldquo;{heroL.title}&rdquo;</h1>
              <div className="v2-image-caption">
                <span>Edif\u00edcio no Bairro Alto \u00b7 Lisboa</span>
                <span>Fotografia \u00b7 Arquivo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="v2-paper-side">
          <div className="v2-paper-top">
            <span className="v2-paper-eyebrow">{s.soon}</span>
            <button className="v2-lang-btn" onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}>
              {s.langSwitch}
            </button>
          </div>

          <div className="v2-paper-body">
            <div>
              <div className="v2-cd-label">{s.countdownLabel} \u00b7 {s.launchDate}</div>
              <div className="v2-cd-grid">
                {[
                  [t.days, s.days], [t.hours, s.hours],
                  [t.minutes, s.minutes], [t.seconds, s.seconds],
                ].map(([n, lbl]) => (
                  <div key={lbl} className="v2-cd-cell">
                    <div className="v2-cd-num">{pad(n)}</div>
                    <div className="v2-cd-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="v2-vision-label">{s.visionLabel}</div>
              <p className="v2-vision">{content.vision[lang]}</p>
            </div>

            {content.emailCaptureEnabled && <EmailCapture s={s} lang={lang} />}
          </div>
        </div>
      </div>
    </>
  );
}
