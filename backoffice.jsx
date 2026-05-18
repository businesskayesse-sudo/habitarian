// ─────────────────────────────────────────────────────────────
// BACKOFFICE · Painel de administração
//
// Sober, paper-on-ink, in the spirit of the Manual de Identidade:
//   left rail of numbered sections (the manual's section tab),
//   right side a working editor that writes straight into the
//   shared store — landings update in real time.
// ─────────────────────────────────────────────────────────────

const boStyles = {
  root: {
    width: '100%',
    height: '100%',
    background: 'var(--ink-04)',
    display: 'grid',
    gridTemplateColumns: '288px 1fr',
    fontFamily: 'var(--font-sans)',
    color: 'var(--ink-100)',
    overflow: 'hidden',
  },
  // SIDEBAR
  side: {
    background: 'var(--paper)',
    borderRight: '1px solid var(--ink-15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  sideHead: {
    padding: '28px 28px 22px',
    borderBottom: '1px solid var(--ink-15)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  brandRow: { display: 'flex', alignItems: 'center', gap: 12 },
  logo: { height: 36, width: 'auto', display: 'block' },
  brandMeta: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
  },
  panelLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.32em',
    textTransform: 'uppercase',
    color: 'var(--ink-100)',
    fontWeight: 600,
  },
  navList: {
    listStyle: 'none',
    padding: '14px 0',
    margin: 0,
    flex: 1,
    overflow: 'auto',
  },
  navItem: {
    display: 'grid',
    gridTemplateColumns: '40px 1fr auto',
    alignItems: 'center',
    padding: '14px 28px',
    cursor: 'pointer',
    borderLeft: '3px solid transparent',
    transition: 'background 160ms',
    gap: 6,
  },
  navItemActive: {
    borderLeft: '3px solid var(--ink-100)',
    background: 'var(--ink-04)',
  },
  navNum: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 13,
    color: 'var(--ink-50)',
    fontVariantNumeric: 'tabular-nums',
  },
  navNumActive: { color: 'var(--ink-100)' },
  navLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    fontWeight: 500,
  },
  navLabelActive: { color: 'var(--ink-100)' },
  navBadge: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    color: 'var(--ink-50)',
    fontVariantNumeric: 'tabular-nums',
  },
  sideFoot: {
    borderTop: '1px solid var(--ink-15)',
    padding: '18px 28px',
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },

  // MAIN
  main: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--ink-04)',
  },
  mainHead: {
    padding: '24px 48px',
    background: 'var(--paper)',
    borderBottom: '1px solid var(--ink-15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
    position: 'sticky',
    top: 0,
    zIndex: 5,
  },
  crumb: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.24em',
    textTransform: 'uppercase',
    color: 'var(--ink-50)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  crumbActive: { color: 'var(--ink-100)' },
  headTitle: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 30,
    color: 'var(--ink-100)',
    margin: '4px 0 0',
    letterSpacing: '-0.005em',
  },
  headActions: { display: 'flex', alignItems: 'center', gap: 12 },
  savedDot: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#2F7A4E',
    display: 'inline-block',
  },
  savedTxt: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },
  btn: {
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    fontWeight: 500,
    padding: '10px 16px',
    border: '1px solid var(--ink-100)',
    background: 'transparent',
    color: 'var(--ink-100)',
    cursor: 'pointer',
  },
  btnSolid: { background: 'var(--ink-100)', color: '#fff' },
  btnGhost: { border: 'none', padding: '10px 4px' },

  mainBody: {
    flex: 1,
    padding: '32px 48px 64px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 320px',
    gap: 32,
    alignItems: 'start',
  },

  // FORM panel (left)
  formPanel: {
    background: 'var(--paper)',
    border: '1px solid var(--ink-15)',
    padding: '32px 36px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  ruleHead: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 4,
  },
  ruleTitle: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: 18,
    color: 'var(--ink-100)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  ruleLine: { height: 1.5, background: 'var(--ink-100)' },
  ruleHelp: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    color: 'var(--ink-70)',
    lineHeight: 1.6,
    marginTop: 10,
    maxWidth: 580,
  },

  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
  },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  fieldFull: { gridColumn: '1 / -1' },
  fieldLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    fontWeight: 500,
  },
  input: {
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    color: 'var(--ink-100)',
    padding: '10px 0',
    border: 0,
    borderBottom: '1px solid var(--ink-30)',
    background: 'transparent',
    outline: 'none',
    transition: 'border-color 180ms',
  },
  textarea: {
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    lineHeight: 1.65,
    color: 'var(--ink-100)',
    padding: '12px 0',
    border: 0,
    borderBottom: '1px solid var(--ink-30)',
    background: 'transparent',
    outline: 'none',
    resize: 'vertical',
    minHeight: 90,
  },

  // Sidebar preview (right card)
  preview: {
    background: 'var(--paper)',
    border: '1px solid var(--ink-15)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    position: 'sticky',
    top: 100,
  },
  previewLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },
  previewFrame: {
    aspectRatio: '4 / 3',
    background: 'var(--ink-04)',
    border: '1px solid var(--ink-15)',
    position: 'relative',
    overflow: 'hidden',
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },
  previewTitle: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 1.1,
    color: 'var(--ink-100)',
    margin: 0,
    textWrap: 'balance',
  },
  previewMeta: {
    fontFamily: 'var(--font-sans)',
    fontSize: 9,
    letterSpacing: '0.26em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },
  previewBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 4,
    width: '100%',
    paddingTop: 8,
    borderTop: '1px solid var(--ink-15)',
  },
  previewCell: { display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' },
  previewNum: {
    fontFamily: 'var(--font-serif)',
    fontSize: 18,
    fontWeight: 600,
    color: 'var(--ink-100)',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  previewLbl: {
    fontFamily: 'var(--font-sans)',
    fontSize: 7,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
  },
  previewLinks: {
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--ink-70)',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingTop: 8,
    borderTop: '1px solid var(--ink-15)',
  },
};

// ─────────────────────────────────────────────────────────────
// Field primitives
// ─────────────────────────────────────────────────────────────
function Field({ label, children, full }) {
  return (
    <div style={{ ...boStyles.field, ...(full ? boStyles.fieldFull : {}) }}>
      <label style={boStyles.fieldLabel}>{label}</label>
      {children}
    </div>
  );
}
function TextInput(props) {
  return (
    <input
      {...props}
      style={boStyles.input}
      onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--ink-100)')}
      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--ink-30)')}
    />
  );
}
function TextArea(props) {
  return (
    <textarea
      {...props}
      style={boStyles.textarea}
      onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'var(--ink-100)')}
      onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'var(--ink-30)')}
    />
  );
}
function RuleHead({ title, help }) {
  return (
    <div style={boStyles.ruleHead}>
      <div style={boStyles.ruleTitle}>{title}</div>
      <div style={boStyles.ruleLine}></div>
      {help && <div style={boStyles.ruleHelp}>{help}</div>}
    </div>
  );
}
function Toggle({ on, onClick, label }) {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        padding: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--ink-100)',
      }}
    >
      <span
        style={{
          width: 40,
          height: 22,
          border: '1.5px solid var(--ink-100)',
          background: on ? 'var(--ink-100)' : 'transparent',
          position: 'relative',
          transition: 'background 160ms',
          display: 'inline-block',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 20 : 2,
            width: 14,
            height: 14,
            background: on ? '#fff' : 'var(--ink-100)',
            transition: 'left 160ms cubic-bezier(0.2,0.6,0.2,1)',
          }}
        ></span>
      </span>
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION RENDERERS
// ─────────────────────────────────────────────────────────────
function SectionHero({ store, set }) {
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="01 · Hero"
        help="Texto principal que aparece nas landing pages. Pode editar nas duas línguas — a página alterna conforme a escolha do visitante."
      />
      <div style={boStyles.fieldGrid}>
        <Field label="Sobrelinha · Português">
          <TextInput
            value={store.hero.pt.eyebrow}
            onChange={(e) =>
              set({ hero: { ...store.hero, pt: { ...store.hero.pt, eyebrow: e.target.value } } })
            }
          />
        </Field>
        <Field label="Eyebrow · English">
          <TextInput
            value={store.hero.en.eyebrow}
            onChange={(e) =>
              set({ hero: { ...store.hero, en: { ...store.hero.en, eyebrow: e.target.value } } })
            }
          />
        </Field>
        <Field label="Título · Português" full>
          <TextInput
            value={store.hero.pt.title}
            onChange={(e) =>
              set({ hero: { ...store.hero, pt: { ...store.hero.pt, title: e.target.value } } })
            }
          />
        </Field>
        <Field label="Title · English" full>
          <TextInput
            value={store.hero.en.title}
            onChange={(e) =>
              set({ hero: { ...store.hero, en: { ...store.hero.en, title: e.target.value } } })
            }
          />
        </Field>
        <Field label="Resumo · Português" full>
          <TextArea
            value={store.hero.pt.lede}
            onChange={(e) =>
              set({ hero: { ...store.hero, pt: { ...store.hero.pt, lede: e.target.value } } })
            }
          />
        </Field>
        <Field label="Lede · English" full>
          <TextArea
            value={store.hero.en.lede}
            onChange={(e) =>
              set({ hero: { ...store.hero, en: { ...store.hero.en, lede: e.target.value } } })
            }
          />
        </Field>
      </div>
    </div>
  );
}

function SectionCountdown({ store, set }) {
  const t = useCountdown(store.countdownTarget);
  const local = store.countdownTarget.slice(0, 16); // for datetime-local
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="02 · Data de Abertura"
        help="O countdown nas landing pages tende para esta data. Use o seletor abaixo para alterar — a contagem actualiza-se imediatamente em ambas as variações."
      />
      <div style={boStyles.fieldGrid}>
        <Field label="Data e hora de abertura">
          <input
            type="datetime-local"
            value={local}
            onChange={(e) => set({ countdownTarget: e.target.value + ':00+01:00' })}
            style={boStyles.input}
          />
        </Field>
        <Field label="Fuso horário">
          <TextInput value="Europe/Lisbon · UTC+01:00" readOnly />
        </Field>
      </div>

      {/* Live preview of countdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1.5px solid var(--ink-100)', borderBottom: '1px solid var(--ink-30)', marginTop: 8 }}>
        {[
          [t.days, 'Dias'],
          [t.hours, 'Horas'],
          [t.minutes, 'Minutos'],
          [t.seconds, 'Segundos'],
        ].map(([n, lbl], i) => (
          <div
            key={lbl}
            style={{
              padding: '20px 8px 16px',
              borderRight: i === 3 ? 'none' : '1px solid var(--ink-15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 44, fontWeight: 600, color: 'var(--ink-100)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {pad(n)}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-70)' }}>
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCities({ store, set }) {
  const add = () => set({ cities: [...store.cities, ''] });
  const update = (i, v) =>
    set({ cities: store.cities.map((c, j) => (i === j ? v : c)) });
  const remove = (i) => set({ cities: store.cities.filter((_, j) => j !== i) });
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="03 · Cidades"
        help="Lista de cidades que serão cobertas. Aparece como metadado na landing page."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {store.cities.map((c, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--ink-15)', paddingBottom: 12 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--ink-50)', fontVariantNumeric: 'tabular-nums' }}>
              {pad(i + 1)}
            </div>
            <TextInput value={c} onChange={(e) => update(i, e.target.value)} />
            <button
              type="button"
              onClick={() => remove(i)}
              style={{ ...boStyles.btn, ...boStyles.btnGhost, color: 'var(--ink-50)', fontSize: 10 }}
              aria-label="remover cidade"
            >
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={add} style={{ ...boStyles.btn, alignSelf: 'flex-start', marginTop: 8 }}>
          + Adicionar cidade
        </button>
      </div>
    </div>
  );
}

function SectionVision({ store, set }) {
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="04 · Visão do projecto"
        help="Texto curto que descreve o projecto. Aparece sob o countdown na variação atmosférica."
      />
      <Field label="Português" full>
        <TextArea
          value={store.vision.pt}
          rows={5}
          onChange={(e) => set({ vision: { ...store.vision, pt: e.target.value } })}
        />
      </Field>
      <Field label="English" full>
        <TextArea
          value={store.vision.en}
          rows={5}
          onChange={(e) => set({ vision: { ...store.vision, en: e.target.value } })}
        />
      </Field>
    </div>
  );
}

function SectionImages({ store, set }) {
  const presets = [
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=70',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=70',
  ];
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="05 · Imagens de fundo"
        help="A fotografia que ocupa o lado esquerdo da variação atmosférica. Sugerimos uma fachada ou interior em luz natural, em registo discreto."
      />
      <Field label="URL da imagem" full>
        <TextInput
          value={store.heroImage}
          onChange={(e) => set({ heroImage: e.target.value })}
        />
      </Field>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={boStyles.fieldLabel}>Sugestões do arquivo</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {presets.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => set({ heroImage: url })}
              style={{
                aspectRatio: '4 / 3',
                background: `url(${url}) center/cover`,
                border: store.heroImage === url ? '2px solid var(--ink-100)' : '1px solid var(--ink-30)',
                padding: 0,
                cursor: 'pointer',
                position: 'relative',
              }}
              aria-label={`escolher imagem ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionFaqs({ store, set }) {
  const upd = (i, lang, field, v) => {
    const faqs = store.faqs.map((f, j) =>
      i === j ? { ...f, [lang]: { ...f[lang], [field]: v } } : f
    );
    set({ faqs });
  };
  const add = () =>
    set({
      faqs: [...store.faqs, { pt: { q: '', a: '' }, en: { q: '', a: '' } }],
    });
  const remove = (i) => set({ faqs: store.faqs.filter((_, j) => j !== i) });
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="06 · Perguntas frequentes"
        help="Aparecem em fila no fundo da landing page. Mantenha cada resposta curta — 2 ou 3 linhas no máximo."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {store.faqs.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              paddingBottom: 20,
              borderBottom: '1px solid var(--ink-15)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--ink-100)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {pad(i + 1)}
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                style={{ ...boStyles.btn, ...boStyles.btnGhost, color: 'var(--ink-50)', fontSize: 10 }}
              >
                Remover
              </button>
            </div>
            <div style={boStyles.fieldGrid}>
              <Field label="Pergunta · PT">
                <TextInput value={f.pt.q} onChange={(e) => upd(i, 'pt', 'q', e.target.value)} />
              </Field>
              <Field label="Question · EN">
                <TextInput value={f.en.q} onChange={(e) => upd(i, 'en', 'q', e.target.value)} />
              </Field>
              <Field label="Resposta · PT" full>
                <TextArea value={f.pt.a} onChange={(e) => upd(i, 'pt', 'a', e.target.value)} />
              </Field>
              <Field label="Answer · EN" full>
                <TextArea value={f.en.a} onChange={(e) => upd(i, 'en', 'a', e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={add} style={{ ...boStyles.btn, alignSelf: 'flex-start' }}>
          + Adicionar pergunta
        </button>
      </div>
    </div>
  );
}

function SectionContacts({ store, set }) {
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="07 · Contactos e redes"
        help="Aparecem no rodapé das landing pages e no painel de pré-reserva."
      />
      <div style={boStyles.fieldGrid}>
        <Field label="Email">
          <TextInput
            value={store.contacts.email}
            onChange={(e) => set({ contacts: { ...store.contacts, email: e.target.value } })}
          />
        </Field>
        <Field label="Telefone">
          <TextInput
            value={store.contacts.phone}
            onChange={(e) => set({ contacts: { ...store.contacts, phone: e.target.value } })}
          />
        </Field>
        <Field label="Morada" full>
          <TextInput
            value={store.contacts.address}
            onChange={(e) => set({ contacts: { ...store.contacts, address: e.target.value } })}
          />
        </Field>
        <Field label="Instagram">
          <TextInput
            value={store.social.instagram}
            onChange={(e) => set({ social: { ...store.social, instagram: e.target.value } })}
          />
        </Field>
        <Field label="LinkedIn">
          <TextInput
            value={store.social.linkedin}
            onChange={(e) => set({ social: { ...store.social, linkedin: e.target.value } })}
          />
        </Field>
      </div>
    </div>
  );
}

function SectionSubscribers({ store, set }) {
  const removeSub = (i) => set({ subscribers: store.subscribers.filter((_, j) => j !== i) });
  const csv = () => {
    const text =
      'email,data,idioma\n' +
      store.subscribers.map((s) => `${s.email},${s.date},${s.locale}`).join('\n');
    const blob = new Blob([text], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'habitarian-waitlist.csv';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="08 · Lista de espera"
        help="Cada subscritor é guardado quando alguém submete o formulário na landing page. Esta listagem é mock — os emails reais virão de uma base de dados."
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 40, fontWeight: 600, color: 'var(--ink-100)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {pad(store.subscribers.length)}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-70)' }}>
            Subscritores · {store.subscribers.filter((s) => s.locale === 'pt').length} pt · {store.subscribers.filter((s) => s.locale === 'en').length} en
          </span>
        </div>
        <button type="button" onClick={csv} style={boStyles.btn}>
          Exportar CSV
        </button>
      </div>
      <div style={{ borderTop: '1.5px solid var(--ink-100)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 100px 60px 40px',
            padding: '10px 0',
            borderBottom: '1px solid var(--ink-15)',
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink-50)',
          }}
        >
          <span>#</span>
          <span>Email</span>
          <span>Data</span>
          <span>Idioma</span>
          <span></span>
        </div>
        {store.subscribers.map((s, i) => (
          <div
            key={s.email + i}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 100px 60px 40px',
              padding: '14px 0',
              borderBottom: '1px solid var(--ink-15)',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--ink-100)',
              alignItems: 'center',
            }}
          >
            <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-50)' }}>{pad(i + 1)}</span>
            <span>{s.email}</span>
            <span style={{ color: 'var(--ink-70)', fontSize: 12 }}>{s.date}</span>
            <span style={{ color: 'var(--ink-70)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{s.locale}</span>
            <button
              type="button"
              onClick={() => removeSub(i)}
              style={{ background: 'transparent', border: 0, color: 'var(--ink-50)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.1em', padding: 0 }}
              aria-label="remover"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionUIStrings({ store, set }) {
  const ui = store.ui || DEFAULT_STORE.ui;
  const updUI = (lang, field, v) =>
    set({ ui: { ...ui, [lang]: { ...ui[lang], [field]: v } } });
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="09 · Textos da interface"
        help="Palavras e frases que aparecem nos botões, labels e rodapé. Edite nas duas línguas."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Section Tab */}
        <div>
          <div style={{ ...boStyles.fieldLabel, marginBottom: 14 }}>Etiqueta de estado (tab preta no canto)</div>
          <div style={boStyles.fieldGrid}>
            <Field label="Português">
              <TextInput value={ui.pt.sectionTab} onChange={(e) => updUI('pt', 'sectionTab', e.target.value)} />
            </Field>
            <Field label="English">
              <TextInput value={ui.en.sectionTab} onChange={(e) => updUI('en', 'sectionTab', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Countdown label */}
        <div>
          <div style={{ ...boStyles.fieldLabel, marginBottom: 14 }}>Label do countdown ("Abrimos em")</div>
          <div style={boStyles.fieldGrid}>
            <Field label="Português">
              <TextInput value={ui.pt.countdownLabel} onChange={(e) => updUI('pt', 'countdownLabel', e.target.value)} />
            </Field>
            <Field label="English">
              <TextInput value={ui.en.countdownLabel} onChange={(e) => updUI('en', 'countdownLabel', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Launch label + date */}
        <div>
          <div style={{ ...boStyles.fieldLabel, marginBottom: 14 }}>Data de abertura — texto visível</div>
          <div style={boStyles.fieldGrid}>
            <Field label="Label · Português">
              <TextInput value={ui.pt.launchLabel} onChange={(e) => updUI('pt', 'launchLabel', e.target.value)} />
            </Field>
            <Field label="Label · English">
              <TextInput value={ui.en.launchLabel} onChange={(e) => updUI('en', 'launchLabel', e.target.value)} />
            </Field>
            <Field label="Data · Português">
              <TextInput value={ui.pt.launchDate} onChange={(e) => updUI('pt', 'launchDate', e.target.value)} />
            </Field>
            <Field label="Date · English">
              <TextInput value={ui.en.launchDate} onChange={(e) => updUI('en', 'launchDate', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* CTA botão */}
        <div>
          <div style={{ ...boStyles.fieldLabel, marginBottom: 14 }}>Botão da lista de espera</div>
          <div style={boStyles.fieldGrid}>
            <Field label="Texto do botão · PT">
              <TextInput value={ui.pt.ctaJoin} onChange={(e) => updUI('pt', 'ctaJoin', e.target.value)} />
            </Field>
            <Field label="Button text · EN">
              <TextInput value={ui.en.ctaJoin} onChange={(e) => updUI('en', 'ctaJoin', e.target.value)} />
            </Field>
            <Field label="Mensagem após submissão · PT" full>
              <TextInput value={ui.pt.ctaJoined} onChange={(e) => updUI('pt', 'ctaJoined', e.target.value)} />
            </Field>
            <Field label="Message after submit · EN" full>
              <TextInput value={ui.en.ctaJoined} onChange={(e) => updUI('en', 'ctaJoined', e.target.value)} />
            </Field>
            <Field label="Legenda de prioridade · PT" full>
              <TextInput value={ui.pt.ctaPriority} onChange={(e) => updUI('pt', 'ctaPriority', e.target.value)} />
            </Field>
            <Field label="Priority caption · EN" full>
              <TextInput value={ui.en.ctaPriority} onChange={(e) => updUI('en', 'ctaPriority', e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Rodapé legal */}
        <div>
          <div style={{ ...boStyles.fieldLabel, marginBottom: 14 }}>Texto legal do rodapé</div>
          <div style={boStyles.fieldGrid}>
            <Field label="Português" full>
              <TextInput value={ui.pt.footerLegal} onChange={(e) => updUI('pt', 'footerLegal', e.target.value)} />
            </Field>
            <Field label="English" full>
              <TextInput value={ui.en.footerLegal} onChange={(e) => updUI('en', 'footerLegal', e.target.value)} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionSettings({ store, set }) {
  return (
    <div style={boStyles.formPanel}>
      <RuleHead
        title="10 · Configurações"
        help="Activar ou desactivar comportamentos da landing page sem editar o ficheiro."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            borderBottom: '1px solid var(--ink-15)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, color: 'var(--ink-100)' }}>
              Captura de email
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-70)', marginTop: 4, maxWidth: 480, lineHeight: 1.5 }}>
              Quando desligada, o formulário de pré-reserva desaparece das duas landing pages e apenas o countdown permanece visível.
            </div>
          </div>
          <Toggle
            on={store.emailCaptureEnabled}
            onClick={() => set({ emailCaptureEnabled: !store.emailCaptureEnabled })}
            label={store.emailCaptureEnabled ? 'Activa' : 'Inactiva'}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 16,
            borderBottom: '1px solid var(--ink-15)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, color: 'var(--ink-100)' }}>
              Repor valores iniciais
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-70)', marginTop: 4, maxWidth: 480, lineHeight: 1.5 }}>
              Apaga todas as alterações guardadas localmente e volta ao conteúdo de referência. Útil para reiniciar a demo.
            </div>
          </div>
          <button type="button" onClick={resetState} style={boStyles.btn}>
            Repor
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Preview (right column) — always-on snapshot of the landing
// ─────────────────────────────────────────────────────────────
function PreviewCard({ store }) {
  const t = useCountdown(store.countdownTarget);
  return (
    <div style={boStyles.preview}>
      <div style={boStyles.previewLabel}>Pré-visualização · PT</div>
      <div style={boStyles.previewFrame}>
        <div style={boStyles.previewMeta}>{store.hero.pt.eyebrow}</div>
        <h3 style={boStyles.previewTitle}>{store.hero.pt.title}</h3>
        <div style={boStyles.previewBar}>
          {[
            [t.days, 'D'],
            [t.hours, 'H'],
            [t.minutes, 'M'],
            [t.seconds, 'S'],
          ].map(([n, lbl]) => (
            <div key={lbl} style={boStyles.previewCell}>
              <div style={boStyles.previewNum}>{pad(n)}</div>
              <div style={boStyles.previewLbl}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={boStyles.previewLinks}>
          {store.emailCaptureEnabled ? '↳ Captura de email activa' : '↳ Captura desactivada'}
          <span>{store.cities.join(' · ')}</span>
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--ink-70)',
          paddingTop: 4,
        }}
      >
        Estado · publicado<br />
        <span style={{ color: 'var(--ink-50)' }}>{store.subscribers.length} subscritores</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN BACKOFFICE COMPONENT
// ─────────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'hero', num: '01', label: 'Hero', Comp: SectionHero },
  { id: 'countdown', num: '02', label: 'Countdown', Comp: SectionCountdown },
  { id: 'cities', num: '03', label: 'Cidades', Comp: SectionCities },
  { id: 'vision', num: '04', label: 'Visão', Comp: SectionVision },
  { id: 'images', num: '05', label: 'Imagens', Comp: SectionImages },
  { id: 'faqs', num: '06', label: 'FAQ', Comp: SectionFaqs },
  { id: 'contacts', num: '07', label: 'Contactos', Comp: SectionContacts },
  { id: 'subs', num: '08', label: 'Lista de espera', Comp: SectionSubscribers },
  { id: 'uistrings', num: '09', label: 'Textos da interface', Comp: SectionUIStrings },
  { id: 'settings', num: '10', label: 'Configurações', Comp: SectionSettings },
];

function Backoffice() {
  const [store, set] = useStore();
  const [active, setActive] = React.useState('hero');
  const section = SECTIONS.find((s) => s.id === active) || SECTIONS[0];
  const Body = section.Comp;

  const badge = (id) => {
    if (id === 'subs') return store.subscribers.length;
    if (id === 'faqs') return store.faqs.length;
    if (id === 'cities') return store.cities.length;
    return null;
  };

  return (
    <div style={boStyles.root}>
      <aside style={boStyles.side}>
        <div style={boStyles.sideHead}>
          <div style={boStyles.brandRow}>
            <img src="assets/logo-primary.png" alt="" style={boStyles.logo} />
          </div>
          <div style={boStyles.brandMeta}>Painel · Lisboa</div>
        </div>

        <ul style={boStyles.navList}>
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            const b = badge(s.id);
            return (
              <li
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  ...boStyles.navItem,
                  ...(isActive ? boStyles.navItemActive : {}),
                }}
              >
                <span style={{ ...boStyles.navNum, ...(isActive ? boStyles.navNumActive : {}) }}>
                  {s.num}
                </span>
                <span style={{ ...boStyles.navLabel, ...(isActive ? boStyles.navLabelActive : {}) }}>
                  {s.label}
                </span>
                {b !== null && <span style={boStyles.navBadge}>{b}</span>}
              </li>
            );
          })}
        </ul>

        <div style={boStyles.sideFoot}>
          <div>Habitarian Tunes</div>
          <div style={{ color: 'var(--ink-30)' }}>v1.0 · Demo</div>
        </div>
      </aside>

      <main style={boStyles.main}>
        <header style={boStyles.mainHead}>
          <div>
            <div style={boStyles.crumb}>
              <span>Painel</span>
              <span style={{ color: 'var(--ink-30)' }}>/</span>
              <span style={boStyles.crumbActive}>{section.label}</span>
            </div>
            <h1 style={boStyles.headTitle}>
              {section.num} · {section.label}
            </h1>
          </div>
          <div style={boStyles.headActions}>
            <span style={boStyles.savedDot}></span>
            <span style={boStyles.savedTxt}>Guardado · agora</span>
            <button
              type="button"
              style={{ ...boStyles.btn, ...boStyles.btnSolid }}
              onClick={() => window.open('landing.html', '_blank')}
            >
              Ver landing
            </button>
          </div>
        </header>

        <div style={boStyles.mainBody}>
          <Body store={store} set={set} />
          <PreviewCard store={store} />
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { Backoffice });
