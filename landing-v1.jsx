// ─────────────────────────────────────────────────────────────
// LANDING V1 · Institutional sober (paper, centered, watermark)
//
// Reads from the shared store (so backoffice edits show live).
// Tweaks: bg color, countdown style, dome watermark visibility.
// ─────────────────────────────────────────────────────────────

const v1Styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    fontFamily: 'var(--font-sans)',
    color: 'var(--ink-100)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  // Top bar with section tab + lang toggle + meta
  topbar: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '28px 56px 0',
    position: 'relative',
    zIndex: 2,
  },
  topLeft: { display: 'flex', alignItems: 'center', gap: 24 },
  topRight: { display: 'flex', alignItems: 'center', gap: 18 },
  langBtn: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    background: 'transparent',
    border: '1px solid var(--ink-100)',
    color: 'var(--ink-100)',
    padding: '7px 12px',
    cursor: 'pointer',
  },
  // Center column
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 56px',
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    marginBottom: 56,
  },
  logo: { height: 64, width: 'auto', display: 'block' },
  hairline: {
    width: 1,
    height: 40,
    background: 'var(--ink-30)',
    margin: '0 auto 24px',
  },
  eyebrow: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.34em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    marginBottom: 22,
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 64,
    lineHeight: 1.04,
    letterSpacing: '-0.012em',
    color: 'var(--ink-100)',
    margin: '0 auto 28px',
    maxWidth: 880,
    textWrap: 'balance',
  },
  lede: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 1.75,
    color: 'var(--ink-90)',
    maxWidth: 520,
    margin: '0 auto 56px',
  },
  // Countdown wrappers — three styles
  countdownLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.34em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    marginBottom: 18,
  },
  // Style A — editorial (big serif numbers)
  cdEditorial: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 0,
    maxWidth: 720,
    width: '100%',
    margin: '0 auto 48px',
    borderTop: '1px solid var(--ink-100)',
    borderBottom: '1px solid var(--ink-100)',
  },
  cdEditorialCell: {
    padding: '22px 12px 18px',
    borderRight: '1px solid var(--ink-15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  cdEditorialNum: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 56,
    lineHeight: 1,
    color: 'var(--ink-100)',
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.02em',
  },
  cdEditorialLbl: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },
  // Style B — discreet (single line tracked)
  cdDiscreet: {
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: 'var(--ink-100)',
    margin: '0 auto 48px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 14,
    paddingBottom: 14,
    borderBottom: '1px solid var(--ink-100)',
  },
  cdDiscreetNum: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 22,
    letterSpacing: '-0.01em',
    color: 'var(--ink-100)',
    fontVariantNumeric: 'tabular-nums',
  },
  // Style C — ruler (a horizontal scale)
  cdRuler: {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  cdRulerLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '1.5px solid var(--ink-100)',
    paddingTop: 14,
  },
  cdRulerCell: { textAlign: 'left' },
  cdRulerNum: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 34,
    color: 'var(--ink-100)',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  cdRulerLbl: {
    fontFamily: 'var(--font-sans)',
    fontSize: 9,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    marginTop: 6,
    display: 'block',
  },
  // Email capture
  capture: {
    width: '100%',
    maxWidth: 480,
    margin: '0 auto',
    textAlign: 'left',
  },
  captureLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    display: 'block',
    marginBottom: 10,
  },
  captureRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'stretch',
    borderBottom: '1.5px solid var(--ink-100)',
  },
  captureInput: {
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    color: 'var(--ink-100)',
    padding: '14px 0',
    border: 0,
    background: 'transparent',
    outline: 'none',
    width: '100%',
  },
  captureBtn: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    fontWeight: 500,
    background: 'var(--ink-100)',
    color: '#fff',
    border: 0,
    padding: '0 22px',
    cursor: 'pointer',
    transition: 'background 180ms cubic-bezier(0.2,0.6,0.2,1)',
  },
  captureHelp: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    marginTop: 14,
  },
  // Watermark
  watermark: {
    position: 'absolute',
    right: -120,
    bottom: -80,
    width: 520,
    opacity: 0.06,
    pointerEvents: 'none',
    zIndex: 0,
    userSelect: 'none',
  },
  // Footer
  footer: {
    padding: '24px 56px 28px',
    borderTop: '1px solid var(--ink-15)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    position: 'relative',
    zIndex: 2,
  },
  footerLinks: { display: 'flex', gap: 24 },
  pipe: { color: 'var(--ink-30)', margin: '0 8px' },
};

function SectionTab({ children }) {
  return (
    <div
      style={{
        display: 'inline-block',
        background: 'var(--ink-100)',
        color: '#fff',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        padding: '10px 26px 10px 18px',
        clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)',
      }}
    >
      {children}
    </div>
  );
}

function CountdownEditorial({ t, s }) {
  return (
    <>
      <div style={v1Styles.countdownLabel}>{s.countdownLabel}</div>
      <div style={v1Styles.cdEditorial}>
        {[
          [t.days, s.days],
          [t.hours, s.hours],
          [t.minutes, s.minutes],
          [t.seconds, s.seconds],
        ].map(([n, lbl], i) => (
          <div
            key={lbl}
            style={{
              ...v1Styles.cdEditorialCell,
              borderRight: i === 3 ? 'none' : v1Styles.cdEditorialCell.borderRight,
            }}
          >
            <div style={v1Styles.cdEditorialNum}>{pad(n)}</div>
            <div style={v1Styles.cdEditorialLbl}>{lbl}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function CountdownDiscreet({ t, s }) {
  return (
    <div style={v1Styles.cdDiscreet}>
      <span>{s.countdownLabel}</span>
      <span style={v1Styles.pipe}>·</span>
      <span style={v1Styles.cdDiscreetNum}>{t.days}</span>
      <span>{s.days}</span>
      <span style={v1Styles.cdDiscreetNum}>{pad(t.hours)}</span>
      <span>{s.hours}</span>
      <span style={v1Styles.cdDiscreetNum}>{pad(t.minutes)}</span>
      <span>{s.minutes}</span>
      <span style={v1Styles.cdDiscreetNum}>{pad(t.seconds)}</span>
      <span>{s.seconds}</span>
    </div>
  );
}

function CountdownRuler({ t, s }) {
  return (
    <div style={v1Styles.cdRuler}>
      <div style={v1Styles.countdownLabel}>{s.countdownLabel}</div>
      <div style={v1Styles.cdRulerLine}>
        {[
          [t.days, s.days],
          [t.hours, s.hours],
          [t.minutes, s.minutes],
          [t.seconds, s.seconds],
        ].map(([n, lbl]) => (
          <div key={lbl} style={v1Styles.cdRulerCell}>
            <div style={v1Styles.cdRulerNum}>{pad(n)}</div>
            <span style={v1Styles.cdRulerLbl}>{lbl}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailCapture({ s, lang }) {
  const [store, set] = useStore();
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  if (!store.emailCaptureEnabled) return null;
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    set((st) => ({
      ...st,
      subscribers: [
        { email, date: new Date().toISOString().slice(0, 10), locale: lang },
        ...st.subscribers,
      ],
    }));
    setDone(true);
    setEmail('');
  };
  return (
    <form style={v1Styles.capture} onSubmit={submit}>
      <span style={v1Styles.captureLabel}>{s.emailLabel}</span>
      <div style={v1Styles.captureRow}>
        <input
          style={v1Styles.captureInput}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={s.emailPlaceholder}
          aria-label={s.emailLabel}
        />
        <button
          type="submit"
          style={v1Styles.captureBtn}
          onMouseDown={(e) => (e.currentTarget.style.background = '#1a1918')}
          onMouseUp={(e) => (e.currentTarget.style.background = 'var(--ink-100)')}
        >
          {s.join}
        </button>
      </div>
      <div style={v1Styles.captureHelp}>{done ? s.joined : s.priority}</div>
    </form>
  );
}

function LandingV1({ tweaks, lang, setLang }) {
  const [store] = useStore();
  const t = useCountdown(store.countdownTarget);
  const s = getStrings(lang);
  const heroL = store.hero[lang];

  // Resolve bg color from tweak
  const bg = {
    paper: 'var(--paper)',
    mist: 'var(--bg-mist)',
    parchment: 'var(--bg-parchment)',
    iris: 'var(--bg-iris)',
    olive: 'var(--bg-olive)',
  }[tweaks.bg] || 'var(--paper)';

  const darkBg = tweaks.bg === 'iris' || tweaks.bg === 'olive';
  const inkOverride = darkBg
    ? {
        '--ink-100': '#FFFFFF',
        '--ink-90': 'rgba(255,255,255,0.92)',
        '--ink-70': 'rgba(255,255,255,0.72)',
        '--ink-50': 'rgba(255,255,255,0.55)',
        '--ink-30': 'rgba(255,255,255,0.32)',
        '--ink-15': 'rgba(255,255,255,0.16)',
      }
    : {};

  let Countdown = CountdownEditorial;
  if (tweaks.countdownStyle === 'discreet') Countdown = CountdownDiscreet;
  if (tweaks.countdownStyle === 'ruler') Countdown = CountdownRuler;

  const logoSrc = darkBg ? 'assets/logo-white.png' : 'assets/logo-primary.png';
  const domeSrc = darkBg ? 'assets/symbol-horizon.png' : 'assets/symbol-dome.png';

  return (
    <div style={{ ...v1Styles.root, background: bg, ...inkOverride }}>
      <div style={v1Styles.topbar}>
        <div style={v1Styles.topLeft}>
          <SectionTab>01 · {s.sectionTab}</SectionTab>
        </div>
        <div style={v1Styles.topRight}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--ink-70)',
            }}
          >
            {s.launchLabel} · {s.launchDate}
          </span>
          <button
            style={v1Styles.langBtn}
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label="Switch language"
          >
            {s.langSwitch}
          </button>
        </div>
      </div>

      <div style={v1Styles.main}>
        <div style={v1Styles.brand}>
          <img src={logoSrc} alt="Habitarian Tunes" style={v1Styles.logo} />
        </div>
        <div style={v1Styles.eyebrow}>{heroL.eyebrow}</div>
        <h1 style={v1Styles.title}>{heroL.title}</h1>
        <p style={v1Styles.lede}>{heroL.lede}</p>
        <Countdown t={t} s={s} />
        <EmailCapture s={s} lang={lang} />
      </div>

      <div style={v1Styles.footer}>
        <div>
          {store.contacts.email}
          <span style={v1Styles.pipe}>·</span>
          {store.contacts.address}
        </div>
        <div style={v1Styles.footerLinks}>
          <span>Instagram {store.social.instagram}</span>
          <span>LinkedIn /{store.social.linkedin}</span>
        </div>
      </div>

      {tweaks.dome && (
        <img src={domeSrc} alt="" style={v1Styles.watermark} aria-hidden="true" />
      )}
    </div>
  );
}

Object.assign(window, { LandingV1, SectionTab, EmailCapture });
