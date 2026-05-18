// ─────────────────────────────────────────────────────────────
// Shared utilities — store, countdown hook, i18n, mock data
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ht-soon-store-v1';

// Single source of truth for the landing pages AND the backoffice
const DEFAULT_STORE = {
  countdownTarget: '2027-08-01T08:00:00+01:00',
  hero: {
    pt: {
      eyebrow: 'Brevemente · Lisboa',
      title: 'Casas para se viver devagar.',
      lede:
        'Em Agosto de 2027 abrimos as portas dos primeiros quartos Habitarian em Lisboa. Estadias curadas, em edifícios antigos restaurados pela nossa consultoria.',
    },
    en: {
      eyebrow: 'Coming soon · Lisbon',
      title: 'Rooms to live slowly in.',
      lede:
        'In August 2027 we open the doors of the first Habitarian rooms in Lisbon. Curated stays inside listed buildings, restored by our consultancy.',
    },
  },
  // UI strings editáveis pelo backoffice
  ui: {
    pt: {
      sectionTab: 'EM CONSTRUÇÃO',
      countdownLabel: 'Abrimos em',
      ctaJoin: 'Reservar lugar na lista',
      ctaJoined: 'Está na lista. Falamos antes de toda a gente.',
      ctaPriority: 'Lista de espera · Prioridade nas primeiras 72 horas',
      launchLabel: 'Abertura',
      launchDate: '01 de Agosto de 2027',
      footerLegal: '© 2026 Habitarian Tunes · Consultoria Imobiliária',
    },
    en: {
      sectionTab: 'UNDER CONSTRUCTION',
      countdownLabel: 'We open in',
      ctaJoin: 'Join the waitlist',
      ctaJoined: 'You are on the list. We will write before anyone else.',
      ctaPriority: 'Waitlist · Priority during the first 72 hours',
      launchLabel: 'Opening',
      launchDate: 'August 1, 2027',
      footerLegal: '© 2026 Habitarian Tunes · Real-estate consultancy',
    },
  },
  vision: {
    pt:
      'Habitarian Tunes nasceu da consultoria imobiliária em Luanda. Em Lisboa, dedicamo-nos a um único formato — quartos privados em edifícios com história, escolhidos um a um, abertos a hóspedes que valorizam o silêncio e a permanência.',
    en:
      'Habitarian Tunes was born as a real-estate consultancy in Luanda. In Lisbon we now focus on a single format — private rooms inside historic buildings, picked one at a time, open to guests who value silence and stay.',
  },
  cities: ['Lisboa'],
  emailCaptureEnabled: true,
  subscribers: [
    { email: 'matilde.rocha@protonmail.com', date: '2026-04-22', locale: 'pt' },
    { email: 'jp.cardoso@gmail.com', date: '2026-04-21', locale: 'pt' },
    { email: 'sofia.l@hey.com', date: '2026-04-19', locale: 'pt' },
    { email: 'reservations@hotelnomad.co', date: '2026-04-14', locale: 'en' },
    { email: 'a.figueiredo@sapo.pt', date: '2026-04-10', locale: 'pt' },
    { email: 'lukas.berg@me.com', date: '2026-04-08', locale: 'en' },
    { email: 'rita.almeida@outlook.pt', date: '2026-04-03', locale: 'pt' },
  ],
  contacts: {
    email: 'lisboa@habitariantunes.com',
    phone: '+351 21 000 00 00',
    address: 'Rua do Alecrim, 38 · 1200-014 Lisboa',
  },
  social: {
    instagram: '@habitarian.tunes',
    linkedin: 'habitarian-tunes',
  },
  faqs: [
    {
      pt: {
        q: 'Quando posso reservar?',
        a: 'A pré-reserva abre a 1 de Agosto de 2027. Os subscritores da lista de espera têm prioridade durante as primeiras 72 horas.',
      },
      en: {
        q: 'When can I book?',
        a: 'Pre-bookings open on August 1, 2027. Waitlist subscribers get priority during the first 72 hours.',
      },
    },
    {
      pt: {
        q: 'Em que zona de Lisboa?',
        a: 'Os primeiros quartos abrem em Santa Catarina, Madragoa e Graça. Outras zonas serão anunciadas a partir do Outono de 2027.',
      },
      en: {
        q: 'Where in Lisbon?',
        a: 'The first rooms open in Santa Catarina, Madragoa and Graça. Other neighbourhoods will be announced from autumn 2027.',
      },
    },
    {
      pt: {
        q: 'Qual o preço médio por noite?',
        a: 'Será comunicado no lançamento. Os subscritores recebem a tabela com 48 horas de antecedência.',
      },
      en: {
        q: 'Average nightly rate?',
        a: 'Announced at launch. Subscribers receive the rate card 48 hours in advance.',
      },
    },
  ],
  heroImage:
    'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=70',
};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STORE;
    return { ...DEFAULT_STORE, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_STORE;
  }
}

function saveStore(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch (e) {}
}

// Simple subscribable store; useStore() in components re-renders on change.
const _listeners = new Set();
let _state = loadStore();
function getState() {
  return _state;
}
function setState(updater) {
  const next = typeof updater === 'function' ? updater(_state) : { ..._state, ...updater };
  _state = next;
  saveStore(_state);
  _listeners.forEach((l) => l());
}
function resetState() {
  _state = DEFAULT_STORE;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  _listeners.forEach((l) => l());
}
function useStore() {
  const [, force] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    _listeners.add(force);
    return () => _listeners.delete(force);
  }, []);
  return [_state, setState];
}

// ─────────────────────────────────────────────────────────────
// Countdown hook — ticks every second
// ─────────────────────────────────────────────────────────────
function useCountdown(targetIso) {
  const compute = React.useCallback(() => {
    const target = new Date(targetIso).getTime();
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    return { days, hours, minutes, seconds, done: target <= now };
  }, [targetIso]);
  const [t, setT] = React.useState(compute);
  React.useEffect(() => {
    const id = setInterval(() => setT(compute()), 1000);
    setT(compute());
    return () => clearInterval(id);
  }, [compute]);
  return t;
}

// ─────────────────────────────────────────────────────────────
// i18n — strings fixas (não editáveis pelo backoffice)
// ─────────────────────────────────────────────────────────────
const STRINGS = {
  pt: {
    soon: 'Brevemente',
    days: 'Dias',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    emailLabel: 'Email',
    emailPlaceholder: 'o seu email',
    visionLabel: 'O Projecto',
    locationLabel: 'Localização',
    footerContact: 'Contactos',
    footerFollow: 'Acompanhar',
    langSwitch: 'EN',
  },
  en: {
    soon: 'Coming soon',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    emailLabel: 'Email',
    emailPlaceholder: 'your email',
    visionLabel: 'The Project',
    locationLabel: 'Location',
    footerContact: 'Contact',
    footerFollow: 'Follow',
    langSwitch: 'PT',
  },
};

// Merge strings fixas com strings editáveis do store para um dado idioma
function getStrings(lang) {
  const store = getState();
  const ui = (store.ui && store.ui[lang]) ? store.ui[lang] : DEFAULT_STORE.ui[lang];
  return {
    ...STRINGS[lang],
    sectionTab:    ui.sectionTab,
    countdownLabel: ui.countdownLabel,
    join:          ui.ctaJoin,
    joined:        ui.ctaJoined,
    priority:      ui.ctaPriority,
    launchLabel:   ui.launchLabel,
    launchDate:    ui.launchDate,
    footerLegal:   ui.footerLegal,
  };
}

// Helpers: pad and format
function pad(n) {
  return String(n).padStart(2, '0');
}

Object.assign(window, {
  useStore,
  getState,
  setState,
  resetState,
  useCountdown,
  STRINGS,
  getStrings,
  pad,
  DEFAULT_STORE,
});
