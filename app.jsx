// ─────────────────────────────────────────────────────────────
// APP · Design canvas wrapper + Tweaks panel
// ─────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bg": "paper",
  "countdownStyle": "editorial",
  "dome": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Each landing keeps its own language pick so the two cards can be
  // compared in either tongue independently.
  const [lang1, setLang1] = React.useState('pt');
  const [lang2, setLang2] = React.useState('pt');

  return (
    <>
      <DesignCanvas
        title="Habitarian Tunes — Lançamento Lisboa"
        subtitle="Landing page de pré-reserva + backoffice. Toque uma artboard para focar."
      >
        <DCSection
          id="landings"
          title="Landing page"
          subtitle="Duas variações da página de brevemente. Mesma fonte de conteúdo, registo visual diferente."
        >
          <DCArtboard
            id="landing-v1"
            label="A · Sóbria institucional"
            width={1280}
            height={800}
          >
            <LandingV1 tweaks={tweaks} lang={lang1} setLang={setLang1} />
          </DCArtboard>
          <DCArtboard
            id="landing-v2"
            label="B · Editorial atmosférica"
            width={1280}
            height={800}
          >
            <LandingV2 tweaks={tweaks} lang={lang2} setLang={setLang2} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="admin"
          title="Backoffice"
          subtitle="Painel onde o cliente edita o conteúdo da landing — as alterações reflectem-se em A e B em tempo real."
        >
          <DCArtboard
            id="backoffice"
            label="Painel · Lisboa"
            width={1440}
            height={900}
          >
            <Backoffice />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Fundo">
          <TweakSelect
            label="Cor de fundo"
            value={tweaks.bg}
            options={[
              { label: 'Papel · #FFFFFF', value: 'paper' },
              { label: 'Mist · azul claro', value: 'mist' },
              { label: 'Parchment · creme', value: 'parchment' },
              { label: 'Iris · roxo escuro', value: 'iris' },
              { label: 'Olive · ouro fosco', value: 'olive' },
            ]}
            onChange={(v) => setTweak('bg', v)}
          />
        </TweakSection>

        <TweakSection label="Countdown">
          <TweakRadio
            label="Estilo"
            value={tweaks.countdownStyle}
            options={[
              { label: 'Editorial', value: 'editorial' },
              { label: 'Discreto', value: 'discreet' },
              { label: 'Régua', value: 'ruler' },
            ]}
            onChange={(v) => setTweak('countdownStyle', v)}
          />
        </TweakSection>

        <TweakSection label="Marca">
          <TweakToggle
            label="Mostrar watermark do dome"
            value={tweaks.dome}
            onChange={(v) => setTweak('dome', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
