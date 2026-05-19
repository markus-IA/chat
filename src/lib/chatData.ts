export type Reaction = { emoji: string; count: number };

export type ChatMessage =
  | {
      id: string;
      kind: "text";
      author: string;
      initials: string;
      colorIndex: number;
      isAdmin?: boolean;
      text: string;
      time: string;
      reactions?: Reaction[];
    }
  | {
      id: string;
      kind: "video";
      author: string;
      initials: string;
      colorIndex: number;
      isAdmin?: boolean;
      caption?: string;
      sizeMb: string;
      time: string;
      reactions?: Reaction[];
    }
  | {
      id: string;
      kind: "system";
      text: string;
    };

// 8 cores estilo Telegram para avatares
export const AVATAR_COLORS = [
  "hsl(0 70% 55%)",
  "hsl(25 90% 55%)",
  "hsl(280 65% 55%)",
  "hsl(145 55% 45%)",
  "hsl(200 75% 50%)",
  "hsl(330 70% 55%)",
  "hsl(195 70% 45%)",
  "hsl(45 80% 50%)",
];

export const ADMIN = {
  name: "Juliana Labot",
  initials: "JL",
  color: 5,
};

const NAMES: { name: string; initials: string; color: number }[] = [
  { name: "Maria S.", initials: "MS", color: 1 },
  { name: "Camila F.", initials: "CF", color: 2 },
  { name: "Rafael M.", initials: "RM", color: 0 },
  { name: "D. M.", initials: "DM", color: 4 },
  { name: "V. B.", initials: "VB", color: 2 },
  { name: "Thiago A.", initials: "TA", color: 6 },
  { name: "Bruno L.", initials: "BL", color: 1 },
  { name: "L. K.", initials: "LK", color: 4 },
  { name: "A. S.", initials: "AS", color: 3 },
  { name: "R. T.", initials: "RT", color: 5 },
  { name: "M. C.", initials: "MC", color: 7 },
  { name: "Diego P.", initials: "DP", color: 6 },
  { name: "Bianca", initials: "BI", color: 5 },
  { name: "Gabriel O.", initials: "GO", color: 0 },
  { name: "Felipe R.", initials: "FR", color: 4 },
  { name: "Lucas M.", initials: "LM", color: 6 },
  { name: "Matheus C.", initials: "MC", color: 3 },
  { name: "Pedro H.", initials: "PH", color: 7 },
  { name: "Vinicius S.", initials: "VS", color: 2 },
  { name: "Caio B.", initials: "CB", color: 1 },
  { name: "André N.", initials: "AN", color: 5 },
  { name: "Eduardo F.", initials: "EF", color: 0 },
  { name: "Renato D.", initials: "RD", color: 4 },
  { name: "Igor T.", initials: "IT", color: 6 },
];

const FAN_TEXTS = [
  "Ela liberou o download dos videos 🔥",
  "aquele video dela amarrada é maluquice",
  "cade o video dela e a amiga??",
  "mds que mulher",
  "alguém salva antes de apagar",
  "Juliana é absurda demais",
  "manda mais admin 🙏",
  "esse último vídeo eu não tô acreditando",
  "o vídeo da piscina cadê?",
  "kkkk não acredito que ela postou isso",
  "🔥🔥🔥",
  "👏👏👏",
  "tô passando mal aqui",
  "essa mulher é perigosa",
  "perdi o vídeo, alguém reenvia?",
  "socorro 😱",
  "admin tu é foda demais",
  "tá liberando td hoje hein",
  "alguém entrou no vip já?",
  "como faz pra entrar no vip??",
  "pago qualquer valor pelo pack completo",
  "essa daí então...",
  "esse foi o melhor de todos",
  "salvando antes de apagar 💾",
  "que ruiva linda meu deus",
  "o sorriso dela me mata",
  "primeira vez que vejo algo assim",
  "to sem palavras",
  "manda o da cozinha de novo plmds",
  "ela respondeu meu pv gente 😱",
  "o pack tá completo no vip msm?",
  "comprei agora, valeu cada centavo",
  "alguém tem o do banho?",
  "gente eu não aguento mais kkk",
  "ja é o terceiro vídeo hoje 🔥",
  "ela superou no último",
  "essa daí é tipo profissional",
  "to babando aqui no trabalho 😂",
  "manda mais e mais e mais",
  "sumi por 5 min e perdi tudo",
  "ô loucura essa mulher",
  "to chocado com a qualidade",
  "ela é nível outro mesmo",
];

const ADMIN_CAPTIONS = [
  "video novo amores 🔥",
  "esse aqui é só pra vcs 😘",
  "spoiler do pack de hoje",
  "ó o que tem no vip 👀",
  "amarradinha pra vcs 🥵",
  "eu e a amiga, como pediram 💋",
  "última prévia antes de apagar",
  "esse vai apagar rapidinho hein 👀",
  "tomando banho pra vcs 🚿",
  "olha o que eu fiz hj 🙈",
  "pediram, tá aqui 😈",
  "minha amiga pediu pra postar esse",
  "saiu da gravação agora 🎥",
  "esse aqui ngm tinha visto ainda",
  "presente pros meus fãs 🎁",
  "to sem roupa de novo kkk 😜",
  "olha esse ângulo 🥵",
  "amei gravar esse",
  "esse foi o mais ousado",
  "boa noite com isso aqui 🌙",
  "bom dia com surpresa ☀️",
  "na cozinha de novo 🍓",
  "na piscina como pediram 💦",
  "esse é só uma palhinha do vip 😏",
  "me digam o que acharam 👇",
];

const RANDOM_REACTIONS: Reaction[][] = [
  [{ emoji: "🔥", count: 7 }],
  [{ emoji: "❤️", count: 9 }],
  [{ emoji: "😍", count: 5 }],
  [{ emoji: "🥵", count: 12 }],
  [{ emoji: "😱", count: 6 }],
  [{ emoji: "🔥", count: 24 }, { emoji: "❤️", count: 9 }],
  [{ emoji: "🔥", count: 41 }, { emoji: "🥵", count: 18 }, { emoji: "😱", count: 7 }],
  [],
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    kind: "system",
    text: "Juliana Labot adicionou você ao grupo",
  },
  {
    id: "m2",
    kind: "text",
    author: ADMIN.name,
    initials: ADMIN.initials,
    colorIndex: ADMIN.color,
    isAdmin: true,
    text: "amores, liberei o download dos videos aqui no grupo 🔥 aproveitem antes que o telegram apague",
    time: "21:24",
    reactions: [{ emoji: "🔥", count: 87 }, { emoji: "🥵", count: 42 }],
  },
  {
    id: "m3",
    kind: "video",
    author: ADMIN.name,
    initials: ADMIN.initials,
    colorIndex: ADMIN.color,
    isAdmin: true,
    caption: "amarradinha pra vcs 🥵",
    sizeMb: "14.2",
    time: "21:25",
    reactions: [{ emoji: "🔥", count: 156 }, { emoji: "🥵", count: 88 }],
  },
  {
    id: "m4",
    kind: "text",
    author: "Camila F.",
    initials: "CF",
    colorIndex: 2,
    text: "aquele video dela amarrada é maluquice",
    time: "21:25",
    reactions: [{ emoji: "🔥", count: 12 }],
  },
  {
    id: "m5",
    kind: "text",
    author: "Felipe R.",
    initials: "FR",
    colorIndex: 4,
    text: "cade o video dela e a amiga??",
    time: "21:25",
  },
  {
    id: "m6",
    kind: "text",
    author: "Maria S.",
    initials: "MS",
    colorIndex: 1,
    text: "salvando antes de apagar 💾",
    time: "21:26",
    reactions: [{ emoji: "👏", count: 5 }],
  },
  {
    id: "m7",
    kind: "video",
    author: ADMIN.name,
    initials: ADMIN.initials,
    colorIndex: ADMIN.color,
    isAdmin: true,
    caption: "eu e a amiga, como pediram 💋",
    sizeMb: "21.8",
    time: "21:26",
    reactions: [{ emoji: "🔥", count: 203 }, { emoji: "❤️", count: 64 }, { emoji: "😱", count: 31 }],
  },
];

let counter = 100;
const nextId = () => `m${counter++}`;
const rand = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

// Anti-repetição: guarda os últimos N usados de cada lista e nunca repete
const recent: Record<string, string[]> = {};
function pickUnique<T extends string>(key: string, arr: T[], memory = 6): T {
  const used = recent[key] ?? [];
  const available = arr.filter((x) => !used.includes(x));
  const pool = available.length > 0 ? available : arr;
  const choice = pool[Math.floor(Math.random() * pool.length)];
  recent[key] = [...used, choice].slice(-Math.min(memory, arr.length - 1));
  return choice;
}

const ADMIN_TEXTS = [
  "vou apagar em 5 min ⏰",
  "responde aqui quem tá amando 🥰",
  "calma que tem mais 🔥",
  "to gravando o próximo agora 🎥",
  "amanhã solto o pack inteiro",
  "quem tá online?? 👀",
  "obrigada pelo carinho de vcs 💕",
  "esse foi pesado né? kkk 😈",
  "alguém quer mais um?",
  "to tímida de soltar o próximo 🙈",
  "se passar de 100 reações eu mando outro",
  "pediram muito esse 💋",
  "🚨 só hoje liberei 10 vagas no vip por R$12 🚨",
  "quem entrar agora paga só 12 reais (preço promocional)",
  "restam poucas vagas a R$12 hein, depois volta pro valor normal",
  "o pack completo só sai pelo vip amores 🔒",
];

export function generateRandomMessage(): ChatMessage {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const r = Math.random();

  // 18% admin posta vídeo novo
  if (r < 0.18) {
    const sizes = ["8.4", "12.1", "14.2", "15.0", "16.8", "9.7", "21.3", "18.5"];
    return {
      id: nextId(),
      kind: "video",
      author: ADMIN.name,
      initials: ADMIN.initials,
      colorIndex: ADMIN.color,
      isAdmin: true,
      caption: pickUnique("admin_caption", ADMIN_CAPTIONS),
      sizeMb: rand(sizes),
      time,
      reactions: [
        { emoji: "🔥", count: 80 + Math.floor(Math.random() * 150) },
        { emoji: "🥵", count: 20 + Math.floor(Math.random() * 80) },
      ],
    };
  }

  // 6% mensagem do sistema (VIP)
  if (r < 0.24) {
    return {
      id: nextId(),
      kind: "system",
      text: "Conteúdo completo disponível apenas no grupo VIP 🔒",
    };
  }

  // 8% admin texto
  if (r < 0.32) {
    return {
      id: nextId(),
      kind: "text",
      author: ADMIN.name,
      initials: ADMIN.initials,
      colorIndex: ADMIN.color,
      isAdmin: true,
      text: pickUnique("admin_text", ADMIN_TEXTS),
      time,
      reactions: [{ emoji: "❤️", count: 30 + Math.floor(Math.random() * 60) }],
    };
  }

  // resto: fãs comentando
  const person = rand(NAMES);
  return {
    id: nextId(),
    kind: "text",
    author: person.name,
    initials: person.initials,
    colorIndex: person.color,
    text: pickUnique("fan_text", FAN_TEXTS, 12),
    time,
    reactions: Math.random() > 0.5 ? rand(RANDOM_REACTIONS) : undefined,
  };
}

export function randomTypingName(): string {
  // 30% chance é a admin digitando
  if (Math.random() < 0.3) return ADMIN.name;
  return rand(NAMES).name;
}
