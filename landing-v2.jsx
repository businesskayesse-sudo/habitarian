// ─────────────────────────────────────────────────────────────
// LANDING V2 · Atmospheric editorial (split, image, dark side)
//
// A two-column split: full-bleed architectural photograph on the
// left with a section tab + huge serif overlay; right column is
// paper with the countdown, vision text, and email capture.
// ─────────────────────────────────────────────────────────────

const v2Styles = {
  root: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1.05fr 1fr',
    fontFamily: 'var(--font-sans)',
    color: 'var(--ink-100)',
    overflow: 'hidden',
    position: 'relative',
  },
  // LEFT — image side
  imageSide: {
    position: 'relative',
    overflow: 'hidden',
    color: '#fff',
    background: '#1a1918',
  },
  image: {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'grayscale(0.18) brightness(0.78)',
  },
  imageScrim: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(20,18,16,0.55) 0%, rgba(20,18,16,0.18) 40%, rgba(20,18,16,0.78) 100%)',
  },
  imageInner: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '32px 48px 36px',
  },
  imageTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imageLogo: { height: 56, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)' },
  imageMeta: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'right',
    lineHeight: 1.9,
  },
  imageBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  imageEyebrow: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.34em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.78)',
  },
  imageTitle: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: 60,
    lineHeight: 1.02,
    letterSpacing: '-0.015em',
    color: '#fff',
    margin: 0,
    maxWidth: 540,
    textWrap: 'balance',
  },
  imageCaption: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
    paddingTop: 18,
    borderTop: '1px solid rgba(255,255,255,0.22)',
    display: 'flex',
    justifyContent: 'space-between',
  },

  // RIGHT — paper side
  paperSide: {
    background: 'var(--paper)',
    padding: '32px 56px 36px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  paperTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  paperEyebrow: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.34em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },
  langBtn: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    background: 'transparent',
    border: '1px solid var(--ink-100)',
    color: 'var(--ink-100)',
    padding: '6px 11px',
    cursor: 'pointer',
  },

  paperBody: { flex: 1, display: 'flex', flexDirection: 'column', gap: 28, minHeight: 0 },

  // Countdown variants (right column)
  cdLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 9,
    letterSpacing: '0.34em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    marginBottom: 10,
  },
  cdEditorial: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderTop: '1.5px solid var(--ink-100)',
    borderBottom: '1px solid var(--ink-30)',
  },
  cdCell: {
    padding: '14px 6px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    borderRight: '1px solid var(--ink-15)',
  },
  cdNum: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 44,
    lineHeight: 1,
    color: 'var(--ink-100)',
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.02em',
  },
  cdLbl: {
    fontFamily: 'var(--font-sans)',
    fontSize: 9,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },

  // Vision text (italic lede)
  vision: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 19,
    lineHeight: 1.45,
    color: 'var(--ink-100)',
    margin: 0,
    paddingTop: 24,
    borderTop: '1px solid var(--ink-15)',
  },
  visionLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 9,
    letterSpacing: '0.34em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    marginBottom: 12,
  },

  // Capture (block)
  capture: { marginTop: 'auto', paddingTop: 18 },
  captureRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    borderBottom: '1.5px solid var(--ink-100)',
    alignItems: 'stretch',
  },
  captureInput: {
    fontFamily: 'var(--font-sans)',
    fontSize: 15,
    color: 'var(--ink-100)',
    padding: '14px 0',
    border: 0,
    background: 'transparent',
    outline: 'none',
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
  captureHelp: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    marginTop: 12,
  },

  // Watermark on paper side
  watermark: {
    position: 'absolute',
    right: -120,
    top: '40%',
    width: 380,
    opacity: 0.05,
    pointerEvents: 'none',
    userSelect: 'none',
  },
};

function CountdownV2Editorial({ t, s }) {
  return (
    <div>
      <div style={v2Styles.cdLabel}>{s.countdownLabel} · {s.launchDate}</div>
      <div style={v2Styles.cdEditorial}>
        {[
          [t.days, s.days],
          [t.hours, s.hours],
          [t.minutes, s.minutes],
          [t.seconds, s.seconds],
        ].map(([n, lbl], i) => (
          <div
            key={lbl}
            style={{
              ...v2Styles.cdCell,
              borderRight: i === 3 ? 'none' : v2Styles.cdCell.borderRight,
            }}
          >
            <div style={v2Styles.cdNum}>{pad(n)}</div>
            <div style={v2Styles.cdLbl}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CountdownV2Discreet({ t, s }) {
  return (
    <div>
      <div style={v2Styles.cdLabel}>{s.countdownLabel}</div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'baseline',
          paddingBottom: 16,
          borderBottom: '1.5px solid var(--ink-100)',
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--ink-70)',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--ink-100)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{t.days}</span>
        <span>{s.days}</span>
        <span style={{ color: 'var(--ink-30)' }}>·</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--ink-100)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{pad(t.hours)}</span>
        <span>{s.hours.slice(0, 1).toLowerCase() === 'h' ? s.hours : s.hours}</span>
        <span style={{ color: 'var(--ink-30)' }}>·</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--ink-100)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{pad(t.minutes)}</span>
        <span>{s.minutes}</span>
        <span style={{ color: 'var(--ink-30)' }}>·</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--ink-100)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{pad(t.seconds)}</span>
        <span>{s.seconds}</span>
      </div>
    </div>
  );
}

function CountdownV2Ruler({ t, s }) {
  return (
    <div>
      <div style={v2Styles.cdLabel}>{s.countdownLabel}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1.5px solid var(--ink-100)',
          paddingTop: 12,
        }}
      >
        {[
          [t.days, s.days],
          [t.hours, s.hours],
          [t.minutes, s.minutes],
          [t.seconds, s.seconds],
        ].map(([n, lbl]) => (
          <div key={lbl} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontSize: 32,
                color: 'var(--ink-100)',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {pad(n)}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 9,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'var(--ink-70)',
              }}
            >
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailCaptureV2({ s, lang }) {
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
    <form style={v2Styles.capture} onSubmit={submit}>
      <span style={v2Styles.captureLabel}>{s.emailLabel}</span>
      <div style={v2Styles.captureRow}>
        <input
          style={v2Styles.captureInput}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={s.emailPlaceholder}
        />
        <button type="submit" style={v2Styles.captureBtn}>
          {s.join}
        </button>
      </div>
      <div style={v2Styles.captureHelp}>{done ? s.joined : s.priority}</div>
    </form>
  );
}

function LandingV2({ tweaks, lang, setLang }) {
  const [store] = useStore();
  const t = useCountdown(store.countdownTarget);
  const s = getStrings(lang);
  const heroL = store.hero[lang];

  // For V2, the bg tweak influences the *paper* side; image side stays dark.
  const paperBg = {
    paper: 'var(--paper)',
    mist: 'var(--bg-mist)',
    parchment: 'var(--bg-parchment)',
    iris: 'var(--bg-iris)',
    olive: 'var(--bg-olive)',
  }[tweaks.bg] || 'var(--paper)';

  const darkPaper = tweaks.bg === 'iris' || tweaks.bg === 'olive';
  const inkOverride = darkPaper
    ? {
        '--ink-100': '#FFFFFF',
        '--ink-90': 'rgba(255,255,255,0.92)',
        '--ink-70': 'rgba(255,255,255,0.72)',
        '--ink-50': 'rgba(255,255,255,0.55)',
        '--ink-30': 'rgba(255,255,255,0.32)',
        '--ink-15': 'rgba(255,255,255,0.16)',
        '--paper': paperBg,
      }
    : {};

  let Countdown = CountdownV2Editorial;
  if (tweaks.countdownStyle === 'discreet') Countdown = CountdownV2Discreet;
  if (tweaks.countdownStyle === 'ruler') Countdown = CountdownV2Ruler;

  return (
    <div style={v2Styles.root}>
      {/* LEFT image side */}
      <div style={v2Styles.imageSide}>
        <div
          style={{
            ...v2Styles.image,
            backgroundImage: `url(${store.heroImage})`,
          }}
        />
        <div style={v2Styles.imageScrim} />
        <div style={v2Styles.imageInner}>
          <div style={v2Styles.imageTop}>
            <img src="assets/logo-white.png" alt="Habitarian Tunes" style={v2Styles.imageLogo} />
            <div style={v2Styles.imageMeta}>
              {s.launchLabel}
              <br />
              {s.launchDate}
              <br />
              <span style={{ opacity: 0.55 }}>{store.cities.join(' · ')}</span>
            </div>
          </div>
          <div style={v2Styles.imageBottom}>
            <div style={v2Styles.imageEyebrow}>{heroL.eyebrow}</div>
            <h1 style={v2Styles.imageTitle}>"{heroL.title}"</h1>
            <div style={v2Styles.imageCaption}>
              <span>Edifício no Bairro Alto · Lisboa</span>
              <span>Fotografia · Arquivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT paper side */}
      <div style={{ ...v2Styles.paperSide, background: paperBg, ...inkOverride, position: 'relative' }}>
        <div style={v2Styles.paperTop}>
          <span style={v2Styles.paperEyebrow}>{s.soon}</span>
          <button
            style={v2Styles.langBtn}
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          >
            {s.langSwitch}
          </button>
        </div>

        <div style={v2Styles.paperBody}>
          <Countdown t={t} s={s} />

          <div>
            <div style={v2Styles.visionLabel}>{s.visionLabel}</div>
            <p style={v2Styles.vision}>{store.vision[lang]}</p>
          </div>

          <EmailCaptureV2 s={s} lang={lang} />
        </div>

        {tweaks.dome && (
          <img
            src={darkPaper ? 'assets/symbol-horizon.png' : 'assets/symbol-dome.png'}
            alt=""
            style={v2Styles.watermark}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}

Object.assign(window, { LandingV2 });
