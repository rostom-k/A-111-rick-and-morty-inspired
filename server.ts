import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { STORIES } from './src/data/stories';
import { translateItem, buildInventoryPromptContext } from './src/utils/itemTranslations';
import { getRoomVisualLayout } from './src/utils/visualEngine';
import { getItemLocationContextForPrompt, resolveItemByContainerOrAction, getRoomItemPlacements } from './src/utils/itemLocations';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Server-side secret keys (Never exposed to client browser or network tab)
const GROQ_KEY = process.env.GROQ_API_KEY || '';
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Helper: Normalize text
function normalize(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Self-harm / suicide / cranial trauma detector
function checkSelfHarm(actionText: string) {
  const norm = normalize(actionText);
  const keywords = [
    'poignard',
    'couteau',
    'plant',
    'stab',
    'knife',
    'taill',
    'veine',
    'saign',
    'egorg',
    'tranch',
    'coup',
    'fracass',
    'crane',
    'skull',
    'tete',
    'pierre',
    'suicid',
    'tuer',
    'mort',
    'frapper',
    'pendre',
    'poison',
    'jeter',
    'sauter dans le vide',
    'bless',
    'automutil',
    'ecraser',
    'bruler',
  ];
  return keywords.some((k) => norm.includes(k));
}

// Dedicated Handler for strictly realistic biological trauma
function handleSelfHarm(action: string, lang: 'fr' | 'en', d20Roll: number, state: any) {
  const norm = normalize(action);
  const isBlade =
    norm.includes('poignard') ||
    norm.includes('couteau') ||
    norm.includes('plant') ||
    norm.includes('stab') ||
    norm.includes('knife') ||
    norm.includes('taill') ||
    norm.includes('veine') ||
    norm.includes('tranch') ||
    norm.includes('egorg');

  const fr = lang === 'fr';
  let stat1Loss = 0;
  let stat2Loss = 0;
  let narrative = '';
  let isGameOver = false;
  let gameOverReason: string | null = null;

  if (isBlade) {
    if (d20Roll === 1) {
      stat1Loss = -15;
      stat2Loss = -20;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20]\nAu moment d'enfoncer la lame, un sursaut de panique et un tremblement réflexe font dévier la trajectoire. L'acier entaille profondément la chair et les tendons de votre bras (-15 Santé, -20 Mental). Le sang jaillit dans une sensation de brûlure vive.`
        : `[CRITICAL FUMBLE 1/20]\nAs you thrust the blade, an instinctive panic reflex diverts the strike. The steel slashes deeply across your forearm (-15 Health, -20 Sanity). Blood gushes in intense, burning pain.`;
    } else if (d20Roll <= 7) {
      stat1Loss = -30;
      stat2Loss = -25;
      narrative = fr
        ? `[JET ${d20Roll}/20]\nLa lame perfore douloureusement les tissus musculaires. L'onde de douleur fulgurante vous coupe le souffle alors que le sang chaud imbibe vos vêtements (-30 Santé, -25 Mental). Vos mains tremblent d'effroi.`
        : `[ROLL ${d20Roll}/20]\nThe blade punctures deep into muscle tissue. A wave of acute agony takes your breath away as warm blood soaks your garments (-30 Health, -25 Sanity).`;
    } else if (d20Roll <= 14) {
      stat1Loss = -55;
      stat2Loss = -40;
      narrative = fr
        ? `[SUCCÈS 8-14 : PERFORATION DIRECTE DÉVASTATRICE]\nL'acier pénètre profondément dans les tissus abdominaux ! Un jet de sang artériel gicle contre vos doigts. Le choc physiologique et l'agonie vous font tomber à genoux dans une mare d'hémorragie (-55 Santé, -40 Mental) !`
        : `[SUCCESS 8-14 : DEEP PUNCTURE TRAUMA]\nThe steel drives deep into abdominal tissue! Arterial blood sprays over your fingers. Physiological shock and excruciating agony drop you to your knees (-55 Health, -40 Sanity)!`;
    } else if (d20Roll <= 19) {
      stat1Loss = -85;
      stat2Loss = -60;
      narrative = fr
        ? `[GRAND SUCCÈS 15-19 : PERFORATION MAJEURE D'ORGANE]\nLa lame s'enfonce jusqu'à la garde avec une efficacité terrifiante ! Les organes vitaux sont perforés, déclenchant une hémorragie interne cataclysmique. Votre vision se voile de noir, vos jambes ne vous soutiennent plus (-85 Santé, -60 Mental) !`
        : `[GREAT SUCCESS 15-19 : SEVERE ORGAN PERFORATION]\nThe blade sinks to the hilt with horrifying precision! Vital organs are punctured, triggering massive internal hemorrhage. Darkness clouds your sight (-85 Health, -60 Sanity)!`;
    } else {
      stat1Loss = -100;
      stat2Loss = -100;
      isGameOver = true;
      gameOverReason = fr ? 'Perforation cardiaque/artérielle fatale.' : 'Fatal blade penetration.';
      narrative = fr
        ? `[CRITIQUE 20/20 // COUP MORTEL FOUDROYANT]\nLa lame transperce directement un centre vital ou l'artère maîtresse. La pression artérielle tombe à zéro en deux battements de cœur. Vos yeux se révulsent, vos constantes vitales s'éteignent instantanément (-100 Santé). Fin de partie immédiate.`
        : `[CRITICAL 20/20 // FATAL TERMINAL STRIKE]\nThe blade penetrates directly into a vital artery or the heart. Blood pressure collapses instantly. Vital signs flatline (-100 Health). Terminal game over.`;
    }
  } else {
    // Blunt trauma / skull smash
    if (d20Roll === 1) {
      stat1Loss = -15;
      stat2Loss = -15;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20]\nAu moment d'abattre l'impact contre votre crâne, un réflexe de recul involontaire fait glisser le coup. La pierre entaille le cuir chevelu dans un spasme de douleur (-15 Santé, -15 Mental). Du sang chaud coule sur votre tempe.`
        : `[CRITICAL FUMBLE 1/20]\nAs you swing toward your skull, an involuntary survival flinch deflects the strike. The stone gashes your scalp in a spasm of pain (-15 Health, -15 Sanity). Warm blood runs down your temple.`;
    } else if (d20Roll <= 7) {
      stat1Loss = -30;
      stat2Loss = -25;
      narrative = fr
        ? `[JET ${d20Roll}/20]\nL'impact heurte le côté de votre tête. Une douleur aveuglante vous fige sur place alors que des vertiges intenses vous font tituber (-30 Santé, -25 Mental).`
        : `[ROLL ${d20Roll}/20]\nThe impact lands against the side of your skull. Blinding pain stuns your nerves as violent dizziness makes you collapse (-30 Health, -25 Sanity).`;
    } else if (d20Roll <= 14) {
      stat1Loss = -55;
      stat2Loss = -40;
      narrative = fr
        ? `[SUCCÈS 8-14 : IMPACT CRÂNIEN DIRECT]\nVous abattez la pierre de plein fouet contre votre crâne ! Un craquement sourd résonne. Une hémorragie immédiate se déclare et vos jambes se dérobent sous l'effet du traumatisme cérébral aigu (-55 Santé, -40 Mental) !`
        : `[SUCCESS 8-14 : DIRECT CRANIAL IMPACT]\nYou smash the stone squarely into your forehead! A sickening crunch echoes. Profuse bleeding erupts and your knees buckle from acute brain trauma (-55 Health, -40 Sanity)!`;
    } else if (d20Roll <= 19) {
      stat1Loss = -85;
      stat2Loss = -55;
      narrative = fr
        ? `[GRAND SUCCÈS 15-19 : FRACTURE DU CRÂNE CRITIQUE]\nLa violence de votre coup est effroyable ! La pierre percute l'os frontal avec toute votre force, provoquant une fracture crânienne sévère et un coma imminent (-85 Santé, -55 Mental) !`
        : `[GREAT SUCCESS 15-19 : CRITICAL SKULL FRACTURE]\nThe brutality of the blow is horrifying! The stone shatters against your frontal bone, causing severe cranial fracture and imminent collapse (-85 Health, -55 Sanity)!`;
    } else {
      stat1Loss = -100;
      stat2Loss = -100;
      isGameOver = true;
      gameOverReason = fr ? 'Traumatisme crânien mortel.' : 'Fatal skull trauma.';
      narrative = fr
        ? `[CRITIQUE 20/20 // IMPACT MORTEL FOUDROYANT]\nLe choc cataclysmique pulvérise la boîte crânienne. L'activité cérébrale s'éteint en un millième de seconde. Constantes vitales réduites à néant (-100 Santé). Fin de partie immédiate.`
        : `[CRITICAL 20/20 // FATAL TERMINAL IMPACT]\nThe catastrophic impact pulverizes cranial structure. Neural signals flatline instantly (-100 Health). Terminal game over.`;
    }
  }

  const currentHp = state?.stats?.stat1 ?? 100;
  if (currentHp + stat1Loss <= 0) {
    isGameOver = true;
    gameOverReason = fr ? 'Constantes vitales anéanties.' : 'Vital signs collapsed.';
    if (!narrative.includes('Fin de partie') && !narrative.includes('Terminal game over')) {
      narrative += fr
        ? '\n\n[DÉCÈS CONFIRMÉ] Les blessures infligées sont mortelles. Les constantes vitales tombent à zéro.'
        : '\n\n[FATALITY CONFIRMED] Inflicted trauma is fatal. Vital signs flatline.';
    }
  }

  return {
    narrative,
    newRoomId: state?.currentRoomId,
    statChanges: {
      stat1: stat1Loss,
      stat2: stat2Loss,
      stat3: -5,
      stat4: -5,
    },
    itemsPicked: [],
    itemsDropped: [],
    summarySentence: fr
      ? `Traumatisme corporel auto-infligé (Dé ${d20Roll}/20).`
      : `Self-inflicted bodily trauma (Roll ${d20Roll}/20).`,
    isGameOver,
    gameOverReason,
    isVictory: false,
    biome: state?.currentBiome || 'vault',
    d20Roll,
    d20Label: `${d20Roll}/20`,
  };
}

// POST /api/ai/action
app.post('/api/ai/action', async (req, res) => {
  try {
    const { story, state, action, language = 'fr', d20Roll, d20Label, d20Tier } = req.body;

    if (!story || !state || !action) {
      return res.status(400).json({ error: 'Missing story, state, or action' });
    }

    const lang = language === 'en' ? 'en' : 'fr';

    // 1. Strict Biological Realism Filter (Self-harm / Suicide / Stabbing / Cranial Trauma)
    if (checkSelfHarm(action)) {
      const harmResult = handleSelfHarm(action, lang, d20Roll, state);
      return res.json(harmResult);
    }

    const fullStory = STORIES.find((s) => s.id === story.id) || story;
    const rooms = fullStory.rooms || story.rooms || [];
    const currentRoom = rooms.find((r: any) => r.id === state.currentRoomId) || rooms[0] || {
      id: 'START',
      nameEn: 'Chamber',
      nameFr: 'Salle',
      descriptionEn: 'A dark area.',
      descriptionFr: 'Un endroit sombre.',
      items: [],
      connectedRooms: [],
    };
    const connectedNames = (currentRoom.connectedRooms || [])
      .map((id: string) => {
        const rm = rooms.find((r: any) => r.id === id);
        return rm ? `${id}: ${lang === 'fr' ? rm.nameFr : rm.nameEn}` : id;
      })
      .join(', ');

    const boundaryExcuse = lang === 'fr' 
      ? (fullStory.boundaryExcuseFr || story.boundaryExcuseFr || 'Les issues extérieures sont scellées.')
      : (fullStory.boundaryExcuseEn || story.boundaryExcuseEn || 'The exterior exits are sealed tight.');

    const isPoisonedNow = Boolean(state.isPoisoned);
    const passiveHungerThirst = (state.turnCount || 1) % 3 === 0 ? -1 : 0;
    const inventoryContext = buildInventoryPromptContext(state.inventory || [], lang);

    const systemPrompt = `You are the authentic, dark, retro text terminal game engine for "A-111" (Roy arcade simulator).
${lang === 'fr' ? 'RÉPONDS STRICTEMENT EN FRANÇAIS.' : 'RESPOND STRICTLY IN ENGLISH.'}

CAMPAIGN: ${lang === 'fr' ? (fullStory.titleFr || story.titleFr) : (fullStory.titleEn || story.titleEn)}
CURRENT LOCATION: ${currentRoom.id} - ${lang === 'fr' ? currentRoom.nameFr : currentRoom.nameEn}
ATMOSPHERE: ${lang === 'fr' ? currentRoom.descriptionFr : currentRoom.descriptionEn}
EXACT PHYSICAL LOCATION OF ITEMS IN THIS CHAMBER (CRITICAL - YOU MUST RESPECT THIS TO PREVENT SPOILERS AND INCONSISTENCIES):
${getItemLocationContextForPrompt(currentRoom, lang, state.inventory || [])}
CONNECTED PASSAGES: [${connectedNames}]
PLAYER INVENTORY (MAX 8 SLOTS WITH OBJECT UTILITIES):
${inventoryContext}
PLAYER VITALS:
- Health/Integrity: ${state.stats?.stat1}/100
- Sanity/Stress: ${state.stats?.stat2}/100
- Hunger/Energy: ${state.stats?.stat3}/100
- Thirst/Oxygen: ${state.stats?.stat4}/100
STATUS EFFECTS: ${isPoisonedNow ? 'POISONED (-2 HP/turn)' : 'NORMAL'}

CRITICAL REASONING & PHYSICAL CAUSALITY RULES:
1. DEEP COMPREHENSION OF PLAYER INTENT & PHYSICAL REALISM (CRITICAL):
   - You MUST analyze what the player is actually trying to do:
     * ESCAPING / GOING OUT (e.g. "I go out", "je sors", "sortir", "leave", "aller dehors"):
       Does the current room have an unsealed exit to the outside? NO! In an underground vault, sealed bunker, or stormy cliff manor, outer blast doors/gates are locked: "${boundaryExcuse}".
       State clearly that the exit is locked/blocked. NEVER output generic nonsense like "you do that with calmness" and NEVER grant positive Sanity!
     * RUNNING / SPRINTING (e.g. "courir", "run", "sprint"):
       Running in dark corridors or rugged wastes costs stamina/energy (stat_changes.stat3: -2). It NEVER gives free Sanity!
     * ITEM FUNCTIONS & UTILITIES:
       Respect real-world functions:
       - Duct tape / Scotch / Ruban adhésif: used to tape, stick, seal air leaks, patch pipes, bind objects, and attach tools together.
       - Knife: cutting ropes/cloth, carving, prying, melee defense.
       - Lighter: creating fire, burning paper/contracts, lighting torches.
       - Water bottle: drinking, throwing for noise distraction, washing wounds.
       - First aid / Disinfectant: healing wounds, curing poison.
       - Branches/Pipes: reach, crowbar, club, makeshift spear when taped with knife.
       The player can use logical combinations!
     * NEVER give arbitrary positive Sanity for mundane physical actions.
2. STRICT LANGUAGE ENFORCEMENT:
   - If language is 'fr': Write STRICTLY in French. Use French item names ("Ruban adhésif blindé", "Couteau de cuisine", etc.).
   - If language is 'en': Write STRICTLY in English. Use English item names ("Armored Duct Tape", "Kitchen Knife", etc.).
3. STRICT PHYSICAL REALISM & TOOL REQUIREMENTS:
   - If player attempts an action that requires a key or tool (e.g. opening a locked door/chest, picking a lock, disarming traps, traversing toxic gas/radiation) WITHOUT specifying or possessing that item in inventory: THE ACTION FAILS or INFLICTS DAMAGE!
4. VIVID ENVIRONMENT DESCRIPTION & UNSEARCHED CONTAINERS (USER RULE - STRICT):
   - You MUST describe the physical environment with high sensory richness: lighting, sounds, humidity, dust, and notably WHERE CONTAINERS ARE LOCATED (e.g. an old workshop table / wooden table, a closed drawer unit / commode, an abandoned survival bag or backpack on the ground, shelves, metal lockers, etc.).
   - DO NOT REVEAL OR LIST WHAT ITEMS ARE HIDDEN INSIDE A DRAWER OR CLOSED CONTAINER IN THE GENERAL OVERVIEW!
   - The drawer itself IS visible and drawn (type: "drawer") so the player sees that a drawer exists and can decide on their own whether to search it or not, but they do NOT know what it contains until they search it!
   - Only items placed directly in plain sight (e.g. on the table or on the floor) may appear in the initial "items" array. Items inside drawers MUST NOT appear in "items"!
   - Structure "visual_layout" as follows:
     * objects: [
         {"type": "door", "position": "center"},
         {"type": "table", "position": "center_left", "label": "Table"},
         {"type": "drawer", "position": "left", "label": "Tiroir"},
         {"type": "bag", "position": "right", "label": "Sac"},
         {"type": "floor_grid", "position": "bottom_center"}
       ]
     * items: [
         {"name": "Clé en laiton", "type": "key", "container": "table", "position": "on_table", "inReach": true}
       ]
     * detected_containers: ["Table en bois", "Tiroir fermé", "Sac à dos"]
5. CONTAINER-SPECIFIC SEARCH & PICKUP (USER RULE - STRICT CAUSALITY):
   - Every item is physically situated in ONE specific container/surface:
     * If the player searches the drawer ("i check in the drawer", "fouiller le tiroir", "ouvrir le tiroir"), they MUST ONLY find the item mapped to the drawer (e.g. Rusty Brass Key)! They CAN NEVER find the item that is on the table (e.g. Torn Diary Page) or in the bag!
     * If the player searches the table ("check table", "fouiller la table", "prendre sur la table"), they find the item on the table!
     * If the player searches the bag ("check bag", "fouiller le sac"), they find the item in the bag!
     * If the player searches the floor/debris ("fouiller le sol"), they find the item on the floor!
   - Searching a container CAN NEVER yield an item that is located in a different container!
   - If the player searches an empty container or a container whose item was already collected, state that it is now empty.
6. IMPROVISED ITEMS:
   - If the player tries to pick up or craft logical improvised objects from the environment (e.g. "casser une branche d'arbre", "ramasser un caillou/pierre", "arracher un tuyau", "déchirer du tissu"), ALLOW IT and add that item (translated to active language) to "items_picked"!
7. SLOW VITALS CONSUMPTION:
   - Hunger, thirst, and oxygen drain very slowly! Default stat_changes.stat3 and stat_changes.stat4 to 0 (or -1 at most, never -2 or -5 unless running).
7. POISON LOGIC:
   - If bitten by the spider (S10) or breathing toxic spores/gas without mask: set "is_poisoned": true.
   - If player uses a Disinfectant Bottle, First Aid Kit, or antidote: set "is_poisoned": false and "poison_cured": true.
8. PRESSURE TIMERS (CHRONO):
   - In sudden ambush or pressure moments (e.g. Zone 3 fungal pack, night mutant swarm, ticking trap): set "trigger_timer": { "seconds": 15, "label": "CHOIX SOUS PRESSION", "penalty_type": "damage", "penalty_amount": 50 }.
9. CONCLUSIVE CAMPAIGN ENDINGS & NEURAL MEMORY RECONSTRUCTION:
   - In 'Lost in the Neuro-Mind' (Campaign 3): The primary goal is to 'piece together his buried memories' ('reconstituer les souvenirs enfouis du scientifique') to bypass the purge protocol and extract back to physical reality (Secteur 12). When the player pieces together the memories or executes extraction, reward them with a conclusive triumph! Set "is_victory": true and conclude the story with "GG tu as réussi !".
   - In all other maps: Reaching the climax / final room objectives allows a definitive win condition with "is_victory": true.
10. CREATIVE / IMPROVISED PLAYER ENDINGS (ALLOW PLAYER FREEDOM!):
   - If the player invents an alternative creative ending (e.g. in the detective manor or any map, they say "je décide de fuir et aller en vacances", "je prends ma retraite aux Bahamas", "j'abandonne l'enquête et je pars vivre en paix", etc.):
   - YOU MUST ACCEPT AND HONOR THIS ENDING!
   - Set "is_victory": true, provide a tailored closing story acknowledging their choice, and conclude with "FIN - GG tu as réussi !".
11. SELECTIVE ACTION CONSEQUENCES (USER RULES - STRICT ENFORCEMENT):
   - WALKING / MOVING (e.g. "marcher", "walk", "avancer", "se déplacer", "aller à"):
     * Roll 1 ONLY: Player stumbles or trips in the dark and scrapes themselves: LOSE 3 HP ONLY (stat_changes: { "stat1": -3, "stat2": 0, "stat3": 0, "stat4": 0 }).
     * Roll 2-20: Clean step. ABSOLUTELY ZERO STAT CHANGES (stat_changes: { "stat1": 0, "stat2": 0, "stat3": 0, "stat4": 0 }). Walking can NEVER damage you (unless roll 1) and can NEVER give Sanity!
   - CONSUMING FOOD & DRINKS & HEALING (ONLY AUGMENT THEIR INTENDED BAR!):
     * Eating food (rations, chips, meat): ONLY increases Hunger/Energy (stat_changes.stat3: +25 to +30). NO sanity boost (stat2: 0), NO heal (stat1: 0). Drops food item.
     * Drinking water (eau, water, gourde): ONLY increases Thirst (stat_changes.stat4: +25 to +30). NO sanity boost (stat2: 0), NO heal (stat1: 0).
     * Healing (se soigner, bandage, medkit, pansement): ONLY increases Health (stat_changes.stat1: +20 to +30). NO sanity boost (stat2: 0), NO energy change. Drops medical item.
   - PREDICTABLE ROUTINE ACTIONS (e.g. "ouvrir une porte", "regarder", "observer", "inspecter", "lire"):
     * Routine actions DO NOT give Heal or Sanity on good rolls, and DO NOT inflict damage on bad rolls because they are predictable! All stat changes MUST BE 0!
   - CRAFTING FUSION:
     * When crafting, the TWO items used to craft FUSE TOGETHER in inventory!
     * Both ingredient items MUST be listed in "items_dropped", and the single crafted item given an appropriate name MUST be in "items_picked"!
   - RISKY / HAZARDOUS ACTIONS (KEEP D20 RISK/REWARD MATRIX!):
     * Physical workouts (pushups, squats, tractions), combat strikes, parkour/climbing feats, stealth sneaking retain full D20 risk-reward consequences!

D20 ROLL: ${d20Roll}/20 (${d20Tier || d20Label}).
- 1: Fumble / bad slip
- 2-7: Unfruitful effort / nothing found
- 8-14: Normal success
- 15-19: Great success
- 20: Natural 20 / spectacular critical

Return ONLY raw JSON:
{
  "narrative": "Detailed narrative text describing the room, the table, the closed drawer, the bag, and visible items in plain sight",
  "target_room_id": "${currentRoom.id}",
  "visual_layout": {
    "room_type": "perspective_box",
    "background_glitch": true,
    "objects": [
      {"type": "door", "position": "center"},
      {"type": "table", "position": "center_left", "label": "Table"},
      {"type": "drawer", "position": "left", "label": "Tiroir"},
      {"type": "bag", "position": "right", "label": "Sac"},
      {"type": "floor_grid", "position": "bottom_center"}
    ],
    "items": [
      {"name": "Clé en laiton", "type": "key", "container": "table", "position": "on_table", "inReach": true}
    ],
    "detected_containers": ["Table en bois", "Tiroir fermé", "Sac à dos"],
    "ascii_glitch_chars": ["#", "@", "$", "0", "1"]
  },
  "obstacle": "UNSTABLE FLOOR. LADDER REQUIRED.",
  "stat_changes": { "stat1": 0, "stat2": 0, "stat3": ${passiveHungerThirst}, "stat4": ${passiveHungerThirst} },
  "items_picked": [],
  "items_dropped": [],
  "summary_sentence": "One sentence recap",
  "is_game_over": false,
  "game_over_reason": null,
  "is_victory": false,
  "is_poisoned": ${isPoisonedNow},
  "poison_cured": false,
  "trigger_timer": null
}`;

    // Helper to format output
    const buildFinalPayload = (parsed: any) => {
      let newRoomId = currentRoom.id;
      if (
        parsed.target_room_id &&
        parsed.target_room_id !== currentRoom.id &&
        currentRoom.connectedRooms.includes(parsed.target_room_id)
      ) {
        newRoomId = parsed.target_room_id;
      }

      const actLower = action.toLowerCase();
      const isCraftingAction =
        actLower.includes('craft') ||
        actLower.includes('fabriq') ||
        actLower.includes('assembl') ||
        actLower.includes('combin') ||
        actLower.includes('bricol') ||
        actLower.includes('scotcher') ||
        actLower.includes('attacher') ||
        actLower.includes('lier') ||
        actLower.includes('faire une ') ||
        actLower.includes('faire un ') ||
        actLower.includes('créer');

      const isEscapeOrRun =
        actLower.includes('go out') ||
        actLower.includes('sortir') ||
        actLower.includes('leave') ||
        actLower.includes('aller dehors') ||
        actLower.includes('courir') ||
        actLower.includes('run') ||
        actLower.includes('sprint');

      let s1 = Number(parsed.stat_changes?.stat1) || 0;
      let s2 = Number(parsed.stat_changes?.stat2) || 0;
      let s3 = Number(parsed.stat_changes?.stat3) ?? passiveHungerThirst;
      let s4 = Number(parsed.stat_changes?.stat4) ?? passiveHungerThirst;

      const isWalking =
        (actLower.includes('march') ||
          actLower.includes('walk') ||
          actLower.includes('avanc') ||
          actLower.includes('step') ||
          actLower.includes('deplac') ||
          actLower.includes('aller vers') ||
          actLower.startsWith('go to') ||
          actLower.startsWith('aller')) &&
        !actLower.includes('courir') &&
        !actLower.includes('run') &&
        !actLower.includes('sprint');

      const isEating =
        actLower.includes('manger') ||
        actLower.includes('eat') ||
        actLower.includes('ration') ||
        actLower.includes('chips') ||
        actLower.includes('nourriture');

      const isDrinking =
        actLower.includes('boire') ||
        actLower.includes('drink') ||
        (actLower.includes('eau') && !actLower.includes('lance')) ||
        actLower.includes('water') ||
        actLower.includes('gourde');

      const isHealing =
        (actLower.includes('soign') ||
          actLower.includes('heal') ||
          actLower.includes('panse') ||
          actLower.includes('bandage') ||
          actLower.includes('medkit') ||
          actLower.includes('trousse de secours') ||
          actLower.includes('premiers soins')) &&
        !isCraftingAction;

      const isPredictableRoutine =
        ((actLower.includes('porte') || actLower.includes('door') || actLower.includes('ouvrir') || actLower.includes('open')) &&
          !actLower.includes('enfonc') && !actLower.includes('forc') && !actLower.includes('break')) ||
        actLower.includes('regarder') ||
        actLower.includes('observer') ||
        actLower.includes('inspecter') ||
        actLower.includes('examiner') ||
        actLower.includes('look') ||
        actLower.includes('examine') ||
        actLower.includes('lire') ||
        actLower.includes('read');

      // Valid items: room items OR improvised/crafted items
      const allowedImprovised = [
        'branche', 'pierre', 'caillou', 'tuyau', 'tissu', 'morceau', 'bâton', 'chiffon', 'débris',
        'lance', 'spear', 'torche', 'torch', 'bandage', 'pansement', 'corde', 'rope', 'crochet',
        'lockpick', 'bouclier', 'shield', 'massue', 'club', 'outil', 'tool', 'pieu', 'stake',
        'câble', 'cable', 'fil', 'wire', 'gourde', 'canteen', 'flèche', 'arrow', 'arc', 'bow',
        'armure', 'armor', 'masque', 'mask', 'filtre', 'filter'
      ];

      let validPicked = (parsed.items_picked || [])
        .filter((it: string) => {
          if (!it || typeof it !== 'string') return false;
          if ((state.inventory || []).includes(it)) return false;
          if (currentRoom.items.includes(it)) return true;
          if (isCraftingAction) return true;
          return allowedImprovised.some((k) => it.toLowerCase().includes(k));
        })
        .map((it: string) => translateItem(it, lang));

      // Container Consistency: If the player searched a specific container, enforce exact item mapping!
      const resolvedSearch = resolveItemByContainerOrAction(action, currentRoom, state.inventory || [], lang);
      if (resolvedSearch.targetContainer !== 'generic' && !isCraftingAction) {
        if (d20Roll <= 7) {
          validPicked = [];
        } else if (resolvedSearch.containerEmpty || !resolvedSearch.foundPlacement) {
          validPicked = [];
        } else if (validPicked.length > 0 || (parsed.items_picked && parsed.items_picked.length > 0)) {
          validPicked = [translateItem(resolvedSearch.foundPlacement.rawName, lang)];
        }
      }

      let finalDropped = (parsed.items_dropped || []).map((it: string) => translateItem(it, lang));

      // Crafting Fusion: 2 items used in craft FUSE together in inventory
      if (isCraftingAction) {
        if (d20Roll === 1) {
          // Critical fumble: craft fails, injury
          validPicked = [];
          s1 = -8;
          s2 = -4;
        } else if (d20Roll <= 7) {
          // Low roll: craft fails
          validPicked = [];
          s3 = -2;
        } else {
          // Successful craft: if no item was given, give default crafted item
          if (validPicked.length === 0) {
            validPicked = [lang === 'fr' ? 'Outil forgé' : 'Forged Tool'];
          }
          // Enforce 2-item fusion: drop the 2 source ingredients from player inventory
          const inv = [...(state.inventory || [])];
          for (const invIt of inv) {
            if (finalDropped.length >= 2) break;
            const norm = invIt.toLowerCase();
            if (!finalDropped.some((d: string) => d.toLowerCase() === norm)) {
              finalDropped.push(translateItem(invIt, lang));
            }
          }
          s2 = d20Roll >= 15 ? 14 : 8;
        }
      }

      if (isWalking) {
        // User rule: Walking only has a consequence if D20 = 1 (trip & lose 3 HP).
        // If 2 or higher: NO consequence, no damage, no sanity, tranquil!
        if (d20Roll === 1) {
          s1 = -3;
          s2 = 0;
          s3 = 0;
          s4 = 0;
        } else {
          s1 = 0;
          s2 = 0;
          s3 = 0;
          s4 = 0;
        }
      } else if (isEating) {
        // User rule: Eating ONLY increases Hunger/Energy bar!
        s1 = 0;
        s2 = 0;
        s3 = +30;
        s4 = 0;
      } else if (isDrinking) {
        // User rule: Drinking ONLY increases Thirst bar!
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = +30;
      } else if (isHealing) {
        // User rule: Healing ONLY increases Health bar!
        s1 = +25;
        s2 = 0;
        s3 = 0;
        s4 = 0;
      } else if (isPredictableRoutine) {
        // User rule: Opening a normal door or inspecting/looking gives NO sanity, NO heal, and NO damage on bad rolls
        s1 = 0;
        s2 = 0;
        s3 = 0;
        s4 = 0;
      } else if (isEscapeOrRun) {
        if (s2 > 0) s2 = 0; // No free sanity
        if (actLower.includes('courir') || actLower.includes('run') || actLower.includes('sprint')) {
          if (s3 >= 0) s3 = -2; // Running consumes stamina
        }
      } else {
        // Dynamic Risk-Reward for workouts, combat, and hazardous actions
        const isPushupsWorkout =
          actLower.includes('pompe') ||
          actLower.includes('push up') ||
          actLower.includes('push-up') ||
          actLower.includes('pushup') ||
          actLower.includes('squat') ||
          actLower.includes('abdo') ||
          actLower.includes('traction') ||
          actLower.includes('gainage') ||
          actLower.includes('workout') ||
          actLower.includes('muscu');

        const isCombatStrike =
          actLower.includes('attaqu') ||
          actLower.includes('frapp') ||
          actLower.includes('taper') ||
          actLower.includes('tirer') ||
          actLower.includes('trancher') ||
          actLower.includes('punch') ||
          actLower.includes('strike') ||
          actLower.includes('attack') ||
          actLower.includes('donner un coup');

        if (isPushupsWorkout && s1 === 0 && s2 === 0) {
          if (d20Roll === 1) {
            s1 = -8;
            s2 = -5;
            s3 = -3;
          } else if (d20Roll <= 7) {
            s1 = -3;
            s2 = -2;
            s3 = -3;
          } else if (d20Roll <= 14) {
            s2 = +8;
            s3 = -2;
          } else if (d20Roll <= 19) {
            s2 = +16;
            s3 = -1;
          } else {
            s1 = +5;
            s2 = +25;
            s3 = +10;
          }
        } else if (isCombatStrike && s1 === 0 && s2 === 0) {
          if (d20Roll === 1) {
            s1 = -18;
            s2 = -8;
          } else if (d20Roll <= 7) {
            s1 = -8;
            s3 = -2;
          } else if (d20Roll <= 14) {
            s2 = +6;
          } else if (d20Roll <= 19) {
            s2 = +14;
          } else {
            s2 = +25;
            s3 = +5;
          }
        } else if (s1 === 0 && s2 === 0 && !isCraftingAction) {
          // General effort / risky action
          if (d20Roll === 1) {
            s1 = -8;
            s2 = -5;
            s3 = -2;
          } else if (d20Roll <= 7) {
            s1 = -2;
            s2 = -3;
            s3 = -2;
          } else if (d20Roll <= 14) {
            s2 = +6;
            s3 = -1;
          } else if (d20Roll <= 19) {
            s2 = +14;
            s3 = -1;
          } else {
            s1 = +5;
            s2 = +20;
            s3 = +5;
          }
        }
      }

      let cleanNarrative = parsed.narrative || '';
      cleanNarrative = cleanNarrative
        .replace(/Focusing your resolve, you execute:.*?(?:\.|\!)/gi, '')
        .replace(/you execute.*?with calm.*?(?:\.|\!)/gi, '')
        .replace(/vous exécutez.*?avec calme.*?(?:\.|\!)/gi, '')
        .replace(/with calm discipline/gi, 'with caution')
        .replace(/with calmness/gi, 'with caution')
        .replace(/avec calme et sang-froid/gi, 'avec prudence');

      if (resolvedSearch.targetContainer !== 'generic' && resolvedSearch.foundPlacement && validPicked.length > 0) {
        const correctLocalized = translateItem(resolvedSearch.foundPlacement.rawName, lang);
        for (const otherRaw of currentRoom.items) {
          if (otherRaw !== resolvedSearch.foundPlacement.rawName) {
            const otherLoc = translateItem(otherRaw, lang);
            cleanNarrative = cleanNarrative.split(otherLoc).join(correctLocalized);
            cleanNarrative = cleanNarrative.split(otherRaw).join(correctLocalized);
          }
        }
      }

      const isDead = (state.stats?.stat1 ?? 100) + s1 <= 0 || Boolean(parsed.is_game_over);

      // Ensure visualLayout is rich and complete with table, drawer, bag, and reachable items
      const targetRoomObj = (fullStory.rooms || []).find((r: any) => r.id === newRoomId) || currentRoom;
      const baseRoomVisual = getRoomVisualLayout(targetRoomObj, lang);

      let finalVisual = parsed.visual_layout || null;
      if (!finalVisual || !finalVisual.objects || finalVisual.objects.length === 0) {
        finalVisual = baseRoomVisual.visualLayout;
      } else {
        const hasTable = finalVisual.objects.some((o: any) => o.type?.includes('table'));
        const hasDrawer = finalVisual.objects.some((o: any) => o.type?.includes('drawer'));
        const hasBag = finalVisual.objects.some((o: any) => o.type?.includes('bag'));
        if (!hasTable) {
          finalVisual.objects.push({ type: 'table', position: 'center_left', label: lang === 'fr' ? 'Table' : 'Table' });
        }
        if (!hasDrawer) {
          finalVisual.objects.push({ type: 'drawer', position: 'left', label: lang === 'fr' ? 'Tiroir' : 'Drawer' });
        }
        if (!hasBag) {
          finalVisual.objects.push({ type: 'bag', position: 'right', label: lang === 'fr' ? 'Sac' : 'Bag' });
        }
        if (!finalVisual.items || finalVisual.items.length === 0) {
          finalVisual.items = baseRoomVisual.visualLayout.items;
        }
        if (!finalVisual.detected_containers || finalVisual.detected_containers.length === 0) {
          finalVisual.detected_containers = baseRoomVisual.visualLayout.detected_containers;
        }

        // Filter out any items inside drawers so their contents are never spoiled until searched
        if (finalVisual.items) {
          finalVisual.items = finalVisual.items.filter((it: any) => {
            const c = (it.container || '').toLowerCase();
            const p = (it.position || '').toLowerCase();
            return c !== 'drawer' && !p.includes('drawer') && !it.hidden;
          });
        }
      }

      return {
        narrative: cleanNarrative,
        newRoomId,
        statChanges: { stat1: s1, stat2: s2, stat3: s3, stat4: s4 },
        itemsPicked: validPicked,
        itemsDropped: finalDropped,
        summarySentence: parsed.summary_sentence || action.slice(0, 40),
        isGameOver: isDead,
        gameOverReason: isDead ? (parsed.game_over_reason || (lang === 'fr' ? 'Constantes vitales anéanties.' : 'Vital signs collapsed.')) : null,
        isVictory: Boolean(parsed.is_victory),
        biome: currentRoom.biome,
        d20Roll,
        d20Label,
        isPoisoned: Boolean(parsed.is_poisoned),
        poisonCured: Boolean(parsed.poison_cured),
        triggerTimer: parsed.trigger_timer || null,
        visualLayout: finalVisual,
        obstacle: parsed.obstacle || baseRoomVisual.obstacle || null,
      };
    };

    // 2. Try Fast Groq if key provided in env
    if (GROQ_KEY) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GROQ_KEY}`,
          },
          signal: AbortSignal.timeout(2000),
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [
              { role: 'system', content: systemPrompt },
              {
                role: 'user',
                content: `ACTION: "${action}"\nD20 ROLL: ${d20Roll}/20\nReturn valid JSON:`,
              },
            ],
            temperature: 0.7,
            max_tokens: 350,
            response_format: { type: 'json_object' },
          }),
        });

        if (groqRes.ok) {
          const gData: any = await groqRes.json();
          const content = gData?.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            if (parsed && parsed.narrative) {
              return res.json(buildFinalPayload(parsed));
            }
          }
        }
      } catch {
        // Groq failed, continue to Gemini
      }
    }

    // 3. Fast Server-Side Gemini 3.1 Flash Lite
    if (ai) {
      try {
        const promptContents = `${systemPrompt}\n\nPLAYER ACTION: "${action}"\nD20 ROLL: ${d20Roll}/20\nReturn valid JSON:`;
        const responsePromise = ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: promptContents,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI timeout')), 15000)
        );

        const aiRes: any = await Promise.race([responsePromise, timeoutPromise]);
        const text = aiRes?.text?.trim();

        if (text) {
          const parsed = JSON.parse(text);
          if (parsed && parsed.narrative) {
            return res.json(buildFinalPayload(parsed));
          }
        }
      } catch (err: any) {
        console.warn('AI generation fell back:', err.message);
      }
    }

    // Fallback: procedural response signal
    return res.status(503).json({ error: 'AI unavailable' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`A-111 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
