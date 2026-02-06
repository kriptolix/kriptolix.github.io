const BASE_PATH = "/gerador_personagem/datasets/generic/npcs/";

const DATASETS = [
  "age.yaml",
  "arms.yaml",
  "beard.yaml",
  "body_locations.yaml",
  "constitution.yaml",
  "ears.yaml",
  "eyes.yaml",
  "face.yaml",
  "feet.yaml",
  "fingers.yaml",
  "gender.yaml",
  "habits.yaml",
  "hair.yaml",
  "hands.yaml",
  "height.yaml",
  "legs.yaml",
  "lips.yaml",
  "marks.yaml",
  "neck.yaml",
  "nose.yaml",
  "shoulders.yaml",
  "skin.yaml",
  "smile.yaml",
  "state.yaml",
  "teeth.yaml",
  "torso.yaml",
  "voice.yaml",
];

function bindUI() {
  const btn = document.getElementById("generate");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    generateCharacter();
  });
}

async function loadTranslation(lang) {
  const BASE = `/gerador_personagem/datasets/generic/npcs/${lang}/`;
  const translations = {};

  for (const file of DATASETS) {
    const name = file.replace(".yaml", "");
    const raw = await loadYAML(BASE + file);
    translations[name] = raw[name]; // pega o objeto {id: "texto traduzido"}
  }

  return translations;
}

function translateTrait(tableId, trait, translations) {
  if (!trait) return null;
  if (!translations || !translations[tableId]) return trait.text;

  // retorna o texto traduzido se existir, senão mantém o original
  return translations[tableId][trait.id] ?? trait.text;
}

function pickRandomItems(array, n) {
  const copy = [...array];
  const picked = [];

  n = Math.min(n, copy.length);

  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy[idx]);
    copy.splice(idx, 1); // remove pra não repetir
  }

  return picked;
}

function resolveRandomTrait(table) {
  if (!table || !table.traits) return null;
  return weightedRandom(table.traits);
}

function normalizeTable(tableWrapper) {
  const [key] = Object.keys(tableWrapper);
  return {
    id: key,
    ...tableWrapper[key]
  };
}

async function loadYAML(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Erro ao carregar ${path}`);
  }
  const text = await response.text();
  return jsyaml.load(text);
}

async function loadNPCDatasets() {
  const datasets = {};

  for (const file of DATASETS) {
    const key = file.replace(".yaml", "");
    datasets[key] = await loadYAML(DATASET_BASE + file);
  }

  return datasets;
}

function weightedRandom(items) {
  const total = items.reduce((sum, i) => sum + (i.weight ?? 1), 0);
  let roll = Math.random() * total;

  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
}

function isGeneratorPage() {
  return document.getElementById("npc-generator-root") !== null;
}

function renderOutput(paragraphs) {
  const output = document.getElementById("output");
  output.innerHTML = "";

  paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    output.appendChild(p);
  });
}

function resolveTrait(tableId, selectionId) {
  const table = NPC_TABLES[tableId];

  if (!table) return null;

  // se o usuário escolheu um valor fixo
  if (selectionId && selectionId !== "random") {
    return table.traits.find(t => t.id === selectionId);
  }

  // caso aleatório
  return weightedRandom(table.traits);
}

async function generateCharacter() {
  const output = [];

  // Supondo que você tenha um idioma hardcoded por enquanto
  const translations = await loadTranslation("pt_BR");

  const ageSelection = document.getElementById("age").value;
  const genderSelection = document.getElementById("gender").value;

  const age = resolveTrait("age", ageSelection);
  const gender = resolveTrait("gender", genderSelection);

  if (age) output.push(`Age: ${translateTrait("age", age, translations)}`);
  if (gender) output.push(`Gender: ${translateTrait("gender", gender, translations)}`);

  // Escolher 3 tabelas aleatórias restantes
  const otherTableIds = Object.keys(NPC_TABLES).filter(
    id => id !== "age" && id !== "gender"
  );

  const pickedTables = pickRandomItems(otherTableIds, 3);

  for (const tableId of pickedTables) {
    const table = NPC_TABLES[tableId];
    const trait = resolveRandomTrait(table);
    if (trait) {
      const text = translateTrait(tableId, trait, translations);
      output.push(`${tableId.charAt(0).toUpperCase() + tableId.slice(1)}: ${text}`);

      /*
      const categoryName = translations[tableId]._name ?? tableId;
      output.push(`${categoryName}: ${translateTrait(tableId, trait, translations)}`);
      */
    }
  }

  renderOutput(output);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!isGeneratorPage()) return;

  initGenerator();
});

async function initGenerator() {
  const rawTables = {};

  // carregar todos os datasets
  for (const file of DATASETS) {
    const raw = await loadYAML(BASE_PATH + file);
    const table = normalizeTable(raw);
    rawTables[table.id] = table;
  }

  // salvar globalmente
  window.NPC_TABLES = rawTables;

  bindUI();
}

function generateCharacterold() {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const setting = document.getElementById("setting").value;

  // Aqui depois você liga com seus YAMLs
  const resolvedGender = resolveRandom(gender, ["male", "female", "others"]);
  const resolvedAge = resolveRandom(age, [
    "child",
    "teenager",
    "young",
    "adult",
    "middle_aged",
    "old",
    "ancient"
  ]);

  const paragraphs = [
    `Este personagem pertence ao gênero ${resolvedGender} e vive em um cenário ${setting}.`,
    `Atualmente está na fase ${resolvedAge} da vida, o que influencia sua visão de mundo.`,
    `Sua história reflete experiências moldadas pelo ambiente e pelas escolhas feitas ao longo do tempo.`,
    `Há algo nele que sugere potencial para aventuras — ou para tragédias.`
  ];

  renderOutput(paragraphs);
}