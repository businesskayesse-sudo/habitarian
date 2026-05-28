'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { pad } from '@/lib/i18n';

// âââ Backoffice Styles (embedded for zero-config) âââ
const boCSS = `
  .bo-root {
    width: 100%; min-height: 100vh; background: var(--ink-04);
    display: grid; grid-template-columns: 280px 1fr;
    font-family: var(--font-sans); color: var(--ink-100);
  }
  .bo-side {
    background: var(--paper); border-right: 1px solid var(--ink-15);
    display: flex; flex-direction: column; height: 100vh;
    position: sticky; top: 0;
  }
  .bo-side-head {
    padding: 28px 28px 22px; border-bottom: 1px solid var(--ink-15);
    display: flex; flex-direction: column; gap: 10px;
  }
  .bo-logo { height: 36px; width: auto; }
  .bo-side-meta {
    font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink-50);
  }
  .bo-nav { list-style: none; padding: 14px 0; margin: 0; flex: 1; overflow-y: auto; }
  .bo-nav-item {
    display: grid; grid-template-columns: 40px 1fr auto; align-items: center;
    padding: 14px 28px; cursor: pointer; border-left: 3px solid transparent;
    transition: background 0.16s; gap: 6px;
  }
  .bo-nav-item:hover { background: var(--ink-04); }
  .bo-nav-item.active { border-left-color: var(--ink-100); background: var(--ink-04); }
  .bo-nav-num {
    font-family: var(--font-serif); font-weight: 600; font-size: 13px;
    color: var(--ink-50); font-variant-numeric: tabular-nums;
  }
  .bo-nav-item.active .bo-nav-num { color: var(--ink-100); }
  .bo-nav-label {
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ink-70); font-weight: 500;
  }
  .bo-nav-item.active .bo-nav-label { color: var(--ink-100); }
  .bo-nav-badge { font-size: 10px; color: var(--ink-50); font-variant-numeric: tabular-nums; }
  .bo-side-foot {
    border-top: 1px solid var(--ink-15); padding: 18px 28px;
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ink-50); display: flex; flex-direction: column; gap: 4px;
  }
  .bo-side-logout {
    background: none; border: none; color: var(--ink-70); font-size: 10px;
    letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; padding: 0;
    text-align: left; transition: color 0.2s;
  }
  .bo-side-logout:hover { color: var(--ink-100); }

  .bo-main { overflow-y: auto; display: flex; flex-direction: column; min-height: 100vh; }
  .bo-main-head {
    padding: 24px 48px; background: var(--paper);
    border-bottom: 1px solid var(--ink-15);
    display: flex; align-items: center; justify-content: space-between;
    gap: 24px; position: sticky; top: 0; z-index: 5;
  }
  .bo-crumb {
    font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--ink-50); display: flex; align-items: center; gap: 8px;
  }
  .bo-crumb-active { color: var(--ink-100); }
  .bo-head-title {
    font-family: var(--font-serif); font-weight: 600; font-size: 30px;
    color: var(--ink-100); margin: 4px 0 0; letter-spacing: -0.005em;
  }
  .bo-head-actions { display: flex; align-items: center; gap: 12px; }
  .bo-saved-dot { width: 7px; height: 7px; border-radius: 50%; background: #2F7A4E; }
  .bo-saved-txt {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-70);
  }
  .bo-main-body {
    flex: 1; padding: 32px 48px 64px;
    display: grid; grid-template-columns: minmax(0, 1fr) 320px;
    gap: 32px; align-items: start;
  }

  .bo-panel {
    background: var(--paper); border: 1px solid var(--ink-15);
    padding: 32px 36px; display: flex; flex-direction: column; gap: 24px;
  }
  .bo-rule-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 4px; }
  .bo-rule-title {
    font-weight: 600; font-size: 18px; color: var(--ink-100);
    letter-spacing: 0.04em; text-transform: uppercase;
  }
  .bo-rule-line { height: 1.5px; background: var(--ink-100); }
  .bo-rule-help {
    font-size: 12px; color: var(--ink-70); line-height: 1.6;
    margin-top: 10px; max-width: 580px;
  }
  .bo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .bo-field { display: flex; flex-direction: column; gap: 8px; }
  .bo-field-full { grid-column: 1 / -1; }
  .bo-field-label {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ink-70); font-weight: 500;
  }
  .bo-input {
    font-size: 14px; color: var(--ink-100); padding: 10px 0;
    border: 0; border-bottom: 1px solid var(--ink-30);
    background: transparent; outline: none; transition: border-color 0.2s; width: 100%;
  }
  .bo-input:focus { border-bottom-color: var(--ink-100); }
  .bo-textarea {
    font-size: 14px; line-height: 1.65; color: var(--ink-100);
    padding: 12px 0; border: 0; border-bottom: 1px solid var(--ink-30);
    background: transparent; outline: none; resize: vertical; min-height: 90px; width: 100%;
  }
  .bo-textarea:focus { border-bottom-color: var(--ink-100); }
  .bo-btn {
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 500; padding: 10px 16px; border: 1px solid var(--ink-100);
    background: transparent; color: var(--ink-100); cursor: pointer;
    transition: all 0.2s;
  }
  .bo-btn:hover { background: var(--ink-100); color: #fff; }
  .bo-btn-solid { background: var(--ink-100); color: #fff; }
  .bo-btn-solid:hover { background: #1a1918; }
  .bo-btn-ghost { border: none; padding: 10px 4px; color: var(--ink-50); font-size: 10px; }

  /* Toggle */
  .bo-toggle {
    display: inline-flex; align-items: center; gap: 12px;
    background: transparent; border: 0; cursor: pointer; padding: 0;
    font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-100);
  }
  .bo-toggle-track {
    width: 40px; height: 22px; border: 1.5px solid var(--ink-100);
    position: relative; transition: background 0.16s; display: inline-block;
  }
  .bo-toggle-track.on { background: var(--ink-100); }
  .bo-toggle-thumb {
    position: absolute; top: 2px; width: 14px; height: 14px;
    transition: left 0.16s cubic-bezier(0.2,0.6,0.2,1);
  }
  .bo-toggle-track.on .bo-toggle-thumb { left: 20px; background: #fff; }
  .bo-toggle-track:not(.on) .bo-toggle-thumb { left: 2px; background: var(--ink-100); }

  /* Preview card */
  .bo-preview {
    background: var(--paper); border: 1px solid var(--ink-15); padding: 20px;
    display: flex; flex-direction: column; gap: 14px; position: sticky; top: 100px;
  }

  /* Image upload */
  .bo-upload-zone {
    border: 2px dashed var(--ink-30); padding: 24px; text-align: center;
    cursor: pointer; transition: all 0.2s; position: relative;
  }
  .bo-upload-zone:hover { border-color: var(--ink-100); background: var(--ink-04); }
  .bo-upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .bo-image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .bo-image-thumb {
    aspect-ratio: 4/3; background-size: cover; background-position: center;
    border: 1px solid var(--ink-15); position: relative; cursor: pointer;
    transition: all 0.2s;
  }
  .bo-image-thumb:hover { border-color: var(--ink-100); }
  .bo-image-thumb.active { border: 2px solid var(--ink-100); }
  .bo-image-thumb-del {
    position: absolute; top: 4px; right: 4px; width: 20px; height: 20px;
    background: rgba(0,0,0,0.6); color: #fff; border: none; border-radius: 50%;
    font-size: 12px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; opacity: 0; transition: opacity 0.2s;
  }
  .bo-image-thumb:hover .bo-image-thumb-del { opacity: 1; }

  /* Subscribers table */
  .bo-subs-header, .bo-subs-row {
    display: grid; grid-template-columns: 40px 1fr 100px 60px 40px;
    padding: 10px 0; border-bottom: 1px solid var(--ink-15);
    align-items: center;
  }
  .bo-subs-header {
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-50);
  }
  .bo-subs-row { font-size: 13px; padding: 14px 0; }

  /* Mobile hamburger */
  .bo-hamburger {
    display: none; position: fixed; top: 16px; left: 16px; z-index: 100;
    width: 40px; height: 40px; background: var(--paper); border: 1px solid var(--ink-15);
    cursor: pointer; align-items: center; justify-content: center;
  }
  .bo-mobile-overlay {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4);
    z-index: 90;
  }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .bo-main-body { grid-template-columns: 1fr; }
    .bo-preview { position: static; }
    .bo-main-head { padding: 24px 32px; }
    .bo-main-body { padding: 24px 32px 48px; }
  }
  @media (max-width: 768px) {
    .bo-root { grid-template-columns: 1fr; }
    .bo-side {
      position: fixed; left: -300px; top: 0; bottom: 0; width: 280px;
      z-index: 95; transition: left 0.3s ease;
    }
    .bo-side.open { left: 0; }
    .bo-hamburger { display: flex; }
    .bo-mobile-overlay.open { display: block; }
    .bo-main-head { padding: 24px 20px; padding-left: 64px; }
    .bo-main-body { padding: 20px 16px 48px; }
    .bo-head-title { font-size: 22px; }
    .bo-grid { grid-template-columns: 1fr; }
    .bo-panel { padding: 24px 20px; }
    .bo-subs-header, .bo-subs-row { grid-template-columns: 30px 1fr 80px 40px; }
    .bo-subs-header > :nth-child(4), .bo-subs-row > :nth-child(4) { display: none; }
  }
  @media (max-width: 480px) {
    .bo-image-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

// âââ Field Components âââ
function Field({ label, children, full }) {
  return (
    <div className={`bo-field ${full ? 'bo-field-full' : ''}`}>
      <label className="bo-field-label">{label}</label>
      {children}
    </div>
  );
}

function RuleHead({ title, help }) {
  return (
    <div className="bo-rule-head">
      <div className="bo-rule-title">{title}</div>
      <div className="bo-rule-line" />
      {help && <div className="bo-rule-help">{help}</div>}
    </div>
  );
}

function Toggle({ on, onClick, label }) {
  return (
    <button type="button" className="bo-toggle" onClick={onClick}>
      <span className={`bo-toggle-track ${on ? 'on' : ''}`}>
        <span className="bo-toggle-thumb" />
      </span>
      {label}
    </button>
  );
}

// âââ Section Renderers âââ
function SectionHero({ store, update }) {
  return (
    <div className="bo-panel">
      <RuleHead title="01 Â· Hero" help="Texto principal que aparece na landing page. Pode editar nas duas lÃ­nguas." />
      <div className="bo-grid">
        <Field label="Sobrelinha Â· PT">
          <input className="bo-input" value={store.hero.pt.eyebrow} onChange={(e) => update({ hero: { ...store.hero, pt: { ...store.hero.pt, eyebrow: e.target.value } } })} />
        </Field>
        <Field label="Eyebrow Â· EN">
          <input className="bo-input" value={store.hero.en.eyebrow} onChange={(e) => update({ hero: { ...store.hero, en: { ...store.hero.en, eyebrow: e.target.value } } })} />
        </Field>
        <Field label="TÃ­tulo Â· PT" full>
          <input className="bo-input" value={store.hero.pt.title} onChange={(e) => update({ hero: { ...store.hero, pt: { ...store.hero.pt, title: e.target.value } } })} />
        </Field>
        <Field label="Title Â· EN" full>
          <input className="bo-input" value={store.hero.en.title} onChange={(e) => update({ hero: { ...store.hero, en: { ...store.hero.en, title: e.target.value } } })} />
        </Field>
        <Field label="Resumo Â· PT" full>
          <textarea className="bo-textarea" value={store.hero.pt.lede} onChange={(e) => update({ hero: { ...store.hero, pt: { ...store.hero.pt, lede: e.target.value } } })} />
        </Field>
        <Field label="Lede Â· EN" full>
          <textarea className="bo-textarea" value={store.hero.en.lede} onChange={(e) => update({ hero: { ...store.hero, en: { ...store.hero.en, lede: e.target.value } } })} />
        </Field>
      </div>
    </div>
  );
}

function SectionCountdown({ store, update }) {
  const local = store.countdownTarget?.slice(0, 16) || '';
  return (
    <div className="bo-panel">
      <RuleHead title="02 Â· Data de Abertura" help="O countdown na landing page tende para esta data." />
      <div className="bo-grid">
        <Field label="Data e hora">
          <input type="datetime-local" className="bo-input" value={local} onChange={(e) => update({ countdownTarget: e.target.value + ':00+01:00' })} />
        </Field>
        <Field label="Fuso horÃ¡rio">
          <input className="bo-input" value="Europe/Lisbon Â· UTC+01:00" readOnly />
        </Field>
      </div>
    </div>
  );
}

function SectionVision({ store, update }) {
  return (
    <div className="bo-panel">
      <RuleHead title="03 Â· VisÃ£o do projecto" help="Texto curto que descreve o projecto." />
      <Field label="PortuguÃªs" full>
        <textarea className="bo-textarea" rows={5} value={store.vision?.pt || ''} onChange={(e) => update({ vision: { ...store.vision, pt: e.target.value } })} />
      </Field>
      <Field label="English" full>
        <textarea className="bo-textarea" rows={5} value={store.vision?.en || ''} onChange={(e) => update({ vision: { ...store.vision, en: e.target.value } })} />
      </Field>
    </div>
  );
}

function SectionImages({ store, update }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const presets = [
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=70',
  ];

  const gallery = store.galleryImages || [];

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.url) {
        const newGallery = [...gallery, data.url];
        update({ galleryImages: newGallery, heroImage: data.url });
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeImage = (idx) => {
    const newGallery = gallery.filter((_, i) => i !== idx);
    update({ galleryImages: newGallery });
  };

  return (
    <div className="bo-panel">
      <RuleHead title="04 Â· Imagens" help="A fotografia que ocupa o lado esquerdo da landing page. Carregue as suas prÃ³prias imagens ou escolha uma sugestÃ£o." />

      <div className="bo-upload-zone" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} />
        <div style={{ fontSize: 13, color: 'var(--ink-70)' }}>
          {uploading ? 'A carregar...' : 'Clique para carregar uma imagem (JPG, PNG, WebP Â· mÃ¡x 10MB)'}
        </div>
      </div>

      {gallery.length > 0 && (
        <div>
          <div className="bo-field-label" style={{ marginBottom: 10 }}>As suas imagens</div>
          <div className="bo-image-grid">
            {gallery.map((url, i) => (
              <div key={i} className={`bo-image-thumb ${store.heroImage === url ? 'active' : ''}`}
                style={{ backgroundImage: `url(${url})` }}
                onClick={() => update({ heroImage: url })}>
                <button className="bo-image-thumb-del" onClick={(e) => { e.stopPropagation(); removeImage(i); }}>Ã</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="bo-field-label" style={{ marginBottom: 10 }}>SugestÃµes do arquivo</div>
        <div className="bo-image-grid">
          {presets.map((url, i) => (
            <div key={i} className={`bo-image-thumb ${store.heroImage === url ? 'active' : ''}`}
              style={{ backgroundImage: `url(${url})` }}
              onClick={() => update({ heroImage: url })} />
          ))}
        </div>
      </div>

      <Field label="Ou cole um URL de imagem" full>
        <input className="bo-input" value={store.heroImage || ''} onChange={(e) => update({ heroImage: e.target.value })} />
      </Field>
    </div>
  );
}

function SectionFaqs({ store, update }) {
  const faqs = store.faqs || [];
  const upd = (i, lang, field, v) => {
    const next = faqs.map((f, j) => i === j ? { ...f, [lang]: { ...f[lang], [field]: v } } : f);
    update({ faqs: next });
  };
  const add = () => update({ faqs: [...faqs, { pt: { q: '', a: '' }, en: { q: '', a: '' } }] });
  const remove = (i) => update({ faqs: faqs.filter((_, j) => j !== i) });

  return (
    <div className="bo-panel">
      <RuleHead title="05 Â· FAQ" help="Perguntas frequentes. Mantenha respostas curtas." />
      {faqs.map((f, i) => (
        <div key={i} style={{ paddingBottom: 20, borderBottom: '1px solid var(--ink-15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600 }}>{pad(i + 1)}</span>
            <button className="bo-btn bo-btn-ghost" onClick={() => remove(i)}>Remover</button>
          </div>
          <div className="bo-grid">
            <Field label="Pergunta Â· PT"><input className="bo-input" value={f.pt.q} onChange={(e) => upd(i, 'pt', 'q', e.target.value)} /></Field>
            <Field label="Question Â· EN"><input className="bo-input" value={f.en.q} onChange={(e) => upd(i, 'en', 'q', e.target.value)} /></Field>
            <Field label="Resposta Â· PT" full><textarea className="bo-textarea" value={f.pt.a} onChange={(e) => upd(i, 'pt', 'a', e.target.value)} /></Field>
            <Field label="Answer Â· EN" full><textarea className="bo-textarea" value={f.en.a} onChange={(e) => upd(i, 'en', 'a', e.target.value)} /></Field>
          </div>
        </div>
      ))}
      <button className="bo-btn" onClick={add} style={{ alignSelf: 'flex-start' }}>+ Adicionar pergunta</button>
    </div>
  );
}

function SectionContacts({ store, update }) {
  return (
    <div className="bo-panel">
      <RuleHead title="06 Â· Contactos" help="RodapÃ© e painel de prÃ©-reserva." />
      <div className="bo-grid">
        <Field label="Email"><input className="bo-input" value={store.contacts?.email || ''} onChange={(e) => update({ contacts: { ...store.contacts, email: e.target.value } })} /></Field>
        <Field label="Telefone"><input className="bo-input" value={store.contacts?.phone || ''} onChange={(e) => update({ contacts: { ...store.contacts, phone: e.target.value } })} /></Field>
        <Field label="Morada" full><input className="bo-input" value={store.contacts?.address || ''} onChange={(e) => update({ contacts: { ...store.contacts, address: e.target.value } })} /></Field>
        <Field label="Instagram"><input className="bo-input" value={store.social?.instagram || ''} onChange={(e) => update({ social: { ...store.social, instagram: e.target.value } })} /></Field>
        <Field label="LinkedIn"><input className="bo-input" value={store.social?.linkedin || ''} onChange={(e) => update({ social: { ...store.social, linkedin: e.target.value } })} /></Field>
      </div>
    </div>
  );
}

function SectionSubscribers() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/subscribe').then(r => r.json()).then(d => { setSubs(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const removeSub = async (email) => {
    await fetch('/api/subscribe', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    setSubs(s => s.filter(x => x.email !== email));
  };

  const exportCSV = () => {
    const text = 'email,data,idioma\n' + subs.map(s => `${s.email},${s.date},${s.locale}`).join('\n');
    const blob = new Blob([text], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'habitarian-waitlist.csv'; a.click();
  };

  if (loading) return <div className="bo-panel"><div style={{ color: 'var(--ink-50)' }}>A carregar...</div></div>;

  return (
    <div className="bo-panel">
      <RuleHead title="07 Â· Lista de espera" help="Subscritores reais da landing page." />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{pad(subs.length)}</span>
          <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-70)' }}>
            Subscritores Â· {subs.filter(s => s.locale === 'pt').length} pt Â· {subs.filter(s => s.locale === 'en').length} en
          </span>
        </div>
        <button className="bo-btn" onClick={exportCSV}>Exportar CSV</button>
      </div>
      <div style={{ borderTop: '1.5px solid var(--ink-100)' }}>
        <div className="bo-subs-header">
          <span>#</span><span>Email</span><span>Data</span><span>Idioma</span><span />
        </div>
        {subs.map((s, i) => (
          <div key={s.email + i} className="bo-subs-row">
            <span style={{ color: 'var(--ink-50)', fontVariantNumeric: 'tabular-nums' }}>{pad(i + 1)}</span>
            <span>{s.email}</span>
            <span style={{ color: 'var(--ink-70)', fontSize: 12 }}>{s.date}</span>
            <span style={{ color: 'var(--ink-70)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{s.locale}</span>
            <button onClick={() => removeSub(s.email)} style={{ background: 'transparent', border: 0, color: 'var(--ink-50)', cursor: 'pointer', fontSize: 14 }}>Ã</button>
          </div>
        ))}
        {subs.length === 0 && <div style={{ padding: '20px 0', color: 'var(--ink-50)', fontSize: 13 }}>Ainda sem subscritores</div>}
      </div>
    </div>
  );
}

function SectionSettings({ store, update }) {
  return (
    <div className="bo-panel">
      <RuleHead title="08 Â· ConfiguraÃ§Ãµes" help="Activar ou desactivar funcionalidades." />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--ink-15)' }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>Captura de email</div>
          <div style={{ fontSize: 12, color: 'var(--ink-70)', marginTop: 4, maxWidth: 480, lineHeight: 1.5 }}>
            Quando desligada, o formulÃ¡rio desaparece da landing page.
          </div>
        </div>
        <Toggle on={store.emailCaptureEnabled} onClick={() => update({ emailCaptureEnabled: !store.emailCaptureEnabled })} label={store.emailCaptureEnabled ? 'Activa' : 'Inactiva'} />
      </div>
    </div>
  );
}

// âââ Preview Card âââ
function PreviewCard({ store }) {
  return (
    <div className="bo-preview">
      <div className="bo-field-label">PrÃ©-visualizaÃ§Ã£o Â· PT</div>
      <div style={{ aspectRatio: '4/3', background: 'var(--ink-04)', border: '1px solid var(--ink-15)', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 8, overflow: 'hidden' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--ink-70)' }}>{store.hero?.pt?.eyebrow}</div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: 18, lineHeight: 1.1, margin: 0 }}>{store.hero?.pt?.title}</h3>
        {store.heroImage && <div style={{ width: '100%', height: 60, backgroundImage: `url(${store.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: 8, border: '1px solid var(--ink-15)' }} />}
      </div>
      <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-70)', paddingTop: 4 }}>
        {store.emailCaptureEnabled ? 'â³ Captura activa' : 'â³ Captura desactivada'}
        <br /><span style={{ color: 'var(--ink-50)' }}>{store.cities?.join(' Â· ')}</span>
      </div>
      <a href="/" target="_blank" className="bo-btn bo-btn-solid" style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>Ver landing</a>
    </div>
  );
}

// âââ Section Definitions âââ
const SECTIONS = [
  { id: 'hero', num: '01', label: 'Hero', Comp: SectionHero },
  { id: 'countdown', num: '02', label: 'Countdown', Comp: SectionCountdown },
  { id: 'vision', num: '03', label: 'VisÃ£o', Comp: SectionVision },
  { id: 'images', num: '04', label: 'Imagens', Comp: SectionImages },
  { id: 'faqs', num: '05', label: 'FAQ', Comp: SectionFaqs },
  { id: 'contacts', num: '06', label: 'Contactos', Comp: SectionContacts },
  { id: 'subs', num: '07', label: 'Lista de espera', Comp: SectionSubscribers },
  { id: 'settings', num: '08', label: 'ConfiguraÃ§Ãµes', Comp: SectionSettings },
];

// âââ Main Backoffice âââ
export default function AdminPage() {
  const router = useRouter();
  const [store, setStore] = useState(null);
  const [active, setActive] = useState('hero');
  const [user, setUser] = useState(null);
  const [sideOpen, setSideOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef(null);

  useEffect(() => {
    // Check auth
    fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'check' }) })
      .then(r => r.json())
      .then(d => { if (d.authenticated) setUser(d.user); else router.push('/login'); })
      .catch(() => router.push('/login'));
    // Load content
    fetch('/api/content').then(r => r.json()).then(setStore).catch(() => {});
  }, [router]);

  const update = useCallback((changes) => {
    setStore(prev => {
      const next = deepMergeClient(prev, changes);
      // Debounced save
      clearTimeout(saveTimer.current);
      setSaving(true);
      saveTimer.current = setTimeout(async () => {
        await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) });
        setSaving(false);
      }, 800);
      return next;
    });
  }, []);

  const logout = async () => {
    await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout' }) });
    router.push('/login');
  };

  if (!store || !user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink-04)' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-50)' }}>A carregar...</div>
    </div>
  );

  const section = SECTIONS.find(s => s.id === active) || SECTIONS[0];
  const Body = section.Comp;
  const badge = (id) => {
    if (id === 'subs') return 'Â·';
    if (id === 'faqs') return store.faqs?.length;
    return null;
  };

  return (
    <>
      <style>{boCSS}</style>
      <div className="bo-root">
        {/* Mobile hamburger */}
        <button className="bo-hamburger" onClick={() => setSideOpen(!sideOpen)}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="var(--ink-100)" strokeWidth="1.5">
            <line x1="0" y1="1" x2="18" y2="1" /><line x1="0" y1="7" x2="18" y2="7" /><line x1="0" y1="13" x2="18" y2="13" />
          </svg>
        </button>
        <div className={`bo-mobile-overlay ${sideOpen ? 'open' : ''}`} onClick={() => setSideOpen(false)} />

        {/* Sidebar */}
        <aside className={`bo-side ${sideOpen ? 'open' : ''}`}>
          <div className="bo-side-head">
            <img src="/assets/logo-primary.png" alt="" className="bo-logo" />
            <div className="bo-side-meta">Painel Â· {user?.name || 'Admin'}</div>
          </div>
          <ul className="bo-nav">
            {SECTIONS.map(s => (
              <li key={s.id} className={`bo-nav-item ${s.id === active ? 'active' : ''}`}
                onClick={() => { setActive(s.id); setSideOpen(false); }}>
                <span className="bo-nav-num">{s.num}</span>
                <span className="bo-nav-label">{s.label}</span>
                {badge(s.id) && <span className="bo-nav-badge">{badge(s.id)}</span>}
              </li>
            ))}
          </ul>
          <div className="bo-side-foot">
            <div>Habitarian Tunes</div>
            <button className="bo-side-logout" onClick={logout}>Terminar sessÃ£o</button>
          </div>
        </aside>

        {/* Main */}
        <main className="bo-main">
          <header className="bo-main-head">
            <div>
              <div className="bo-crumb">
                <span>Painel</span>
                <span style={{ color: 'var(--ink-30)' }}>/</span>
                <span className="bo-crumb-active">{section.label}</span>
              </div>
              <h1 className="bo-head-title">{section.num} Â· {section.label}</h1>
            </div>
            <div className="bo-head-actions">
              <span className="bo-saved-dot" style={{ background: saving ? '#D4A843' : '#2F7A4E' }} />
              <span className="bo-saved-txt">{saving ? 'A guardar...' : 'Guardado'}</span>
              <a href="/" target="_blank" className="bo-btn bo-btn-solid" style={{ textDecoration: 'none' }}>Ver landing</a>
            </div>
          </header>
          <div className="bo-main-body">
            <Body store={store} update={update} />
            <PreviewCard store={store} />
          </div>
        </main>
      </div>
    </>
  );
}

// Client-side deep merge
function deepMergeClient(target, source) {
  if (!target) return source;
  const out = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) &&
        target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
      out[key] = deepMergeClient(target[key], source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}
