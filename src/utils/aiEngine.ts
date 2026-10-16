import { GameState, GameSettings, Language, StoryDefinition, VisualLayout } from '../types/game';
import { translateItem, getItemUtility, buildInventoryPromptContext } from './itemTranslations';
import { getRoomVisualLayout } from './visualEngine';
import { resolveItemByContainerOrAction, getRoomItemPlacements } from './itemLocations';

export interface TurnResolution {
  narrative: string;
  newRoomId: string;
  statChanges: {
    stat1: number;
    stat2: number;
    stat3: number;
    stat4: number;
  };
  itemsPicked: string[];
  itemsDropped: string[];
  summarySentence: string;
  isGameOver: boolean;
  gameOverReason: string | null;
  isVictory: boolean;
  biome: string;
  d20Roll: number;
  d20Label: string;
  isPoisoned?: boolean;
  poisonCured?: boolean;
  triggerTimer?: {
    seconds: number;
    label: string;
    penaltyType: 'death' | 'damage';
    penaltyAmount: number;
  } | null;
  clearTimer?: boolean;
  visualLayout?: VisualLayout | null;
  obstacle?: string | null;
}

// Evaluate D20 Roll
export function evaluateD20(roll: number, lang: Language): { label: string; tier: 'fumble' | 'low' | 'success' | 'great' | 'crit' } {
  if (roll === 1) {
    return {
      label: lang === 'fr' ? 'ÉCHEC CRITIQUE (1/20)' : 'CRITICAL FUMBLE (1/20)',
      tier: 'fumble',
    };
  }
  if (roll <= 7) {
    return {
      label: lang === 'fr' ? `ÉCHEC / RÉSULTAT STÉRILE (${roll}/20)` : `UNFRUITFUL ROLL (${roll}/20)`,
      tier: 'low',
    };
  }
  if (roll <= 14) {
    return {
      label: lang === 'fr' ? `SUCCÈS NORMAL (${roll}/20)` : `NORMAL SUCCESS (${roll}/20)`,
      tier: 'success',
    };
  }
  if (roll <= 19) {
    return {
      label: lang === 'fr' ? `GRAND SUCCÈS (${roll}/20)` : `GREAT SUCCESS (${roll}/20)`,
      tier: 'great',
    };
  }
  return {
    label: lang === 'fr' ? 'SUCCÈS CRITIQUE SPECTACULAIRE (20/20) !' : 'NATURAL 20 // SPECTACULAR CRITICAL!',
    tier: 'crit',
  };
}

// Build System Prompt with anti-repetition, no item listing, and strict D20 adherence
function buildSystemPrompt(
  story: StoryDefinition,
  state: GameState,
  lang: Language,
  d20Roll: number,
  d20Tier: string
): string {
  const currentRoom = story.rooms.find((r) => r.id === state.currentRoomId) || story.rooms[0];
  const connectedRoomNames = currentRoom.connectedRooms
    .map((rId) => {
      const r = story.rooms.find((rm) => rm.id === rId);
      return r ? `${r.id}: ${lang === 'fr' ? r.nameFr : r.nameEn}` : rId;
    })
    .join(', ');

  const recentHistory = state.history
    .slice(-4)
    .map((h) => `${h.role.toUpperCase()}: ${h.text.slice(0, 150)}`)
    .join('\n');

  const inventoryContext = buildInventoryPromptContext(state.inventory, lang);

  return `You are the dynamic, dark, retro text terminal game engine for "A-111" (inspired by Rick and Morty's "Roy: A Life Well Lived").
${lang === 'fr' ? 'RÉPONDS STRICTEMENT EN FRANÇAIS.' : 'RESPOND STRICTLY IN ENGLISH.'}

CAMPAIGN: ${lang === 'fr' ? story.titleFr : story.titleEn} (${lang === 'fr' ? story.genreFr : story.genreEn})
CURRENT ROOM: ${currentRoom.id} - ${lang === 'fr' ? currentRoom.nameFr : currentRoom.nameEn}
CURRENT ROOM ATMOSPHERE: ${lang === 'fr' ? currentRoom.descriptionFr : currentRoom.descriptionEn}
HIDDEN ITEMS IN THIS ROOM: [${(currentRoom.items || []).map((it) => translateItem(it, lang)).join(', ')}]
CONNECTED PASSAGES: [${connectedRoomNames}]
PLAYER INVENTORY (MAX 8 SLOTS WITH ITEM FUNCTIONS):
${inventoryContext}
PLAYER VITALS:
- ${lang === 'fr' ? story.statLabels.stat1.fr : story.statLabels.stat1.en}: ${state.stats.stat1}/100
- ${lang === 'fr' ? story.statLabels.stat2.fr : story.statLabels.stat2.en}: ${state.stats.stat2}/100
- ${lang === 'fr' ? story.statLabels.stat3.fr : story.statLabels.stat3.en}: ${state.stats.stat3}/100
- ${lang === 'fr' ? story.statLabels.stat4.fr : story.statLabels.stat4.en}: ${state.stats.stat4}/100

RECENT RECAP (DO NOT REPEAT PREVIOUS TEXT):
${recentHistory}

DICE ROLL MECHANIC & LOGICAL CONSEQUENCES (D20 ROLL = ${d20Roll}/20 [${d20Tier.toUpperCase()}]):
On EVERY player action, the D20 roll governs the degree of realization of the action's PHYSICAL INTENT:

CRITICAL REASONING & PHYSICAL CAUSALITY RULES:
1. DEEP COMPREHENSION OF PLAYER INTENT & PHYSICAL REALISM (NO DUMB RESPONSES):
   - You MUST analyze what the player is actually trying to do:
     * ESCAPING / GOING OUT (e.g. "I go out", "je sors", "sortir", "leave", "aller dehors"):
       Does the current room have an unsealed exit to the outside? NO! In an underground vault, sealed bunker, or stormy cliff manor, outer blast doors/gates are locked: "${lang === 'fr' ? story.boundaryExcuseFr : story.boundaryExcuseEn}".
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
3. STRICT PHYSICAL & BIOLOGICAL REALISM (SELF-HARM BAN):
   - IF THE PLAYER ATTEMPTS SELF-HARM / SUICIDE / STABBING / CUTTING:
     * High roll (8 to 19): stat1: -50 to -85 Health, stat2: -35 to -60 Sanity.
     * Critical roll (20): Fatal catastrophe (-100 Health, is_game_over: true).
     * In ALL cases of self-harm, stat_changes.stat1 and stat_changes.stat2 MUST BE STRICTLY NEGATIVE!
4. ENVIRONMENT DESCRIPTION WITHOUT ITEM SPOILERS:
   - Describe only the environment, atmosphere, and visible furniture/containers without revealing what is inside them!
5. STRICT TOOL & KEY REQUIREMENTS: If an action requires a key or tool (opening locked doors/chests, traversing toxic/radioactive areas) without specifying or possessing the item, the action FAILS or inflicts damage!
6. IMPROVISED ITEMS: If player wants to pick up logical improvised objects (branches, stones, metal pipes, cloth strips), allow it and add to items_picked!
7. SLOW VITALS CONSUMPTION: Hunger, thirst, and oxygen drain slowly! Set stat_changes.stat3 to 0 or -1, stat_changes.stat4 to 0 or -1.
8. POISON LOGIC: Spider bites or breathing toxic air without gas mask triggers "is_poisoned": true (-2 HP/turn). Disinfectants and first aid kits cure it ("poison_cured": true).
9. TIMED PRESSURE EVENTS: If high-stakes ambush or timed event triggers, return "trigger_timer": { "seconds": 15, "label": "CHOIX SOUS PRESSION", "penalty_type": "damage", "penalty_amount": 50 }.
10. CONCLUSIVE CAMPAIGN ENDINGS & NEURAL MEMORY RECONSTRUCTION:
   - In 'Lost in the Neuro-Mind': Allow the player to 'piece together his buried memories' (reconstituer les souvenirs enfouis du scientifique) to bypass the purge protocol and extract back to physical reality (Secteur 12). Grant full victory: "is_victory": true, and end with "GG tu as réussi !".
   - In all other maps: Finishing campaign objectives (e.g. debt vault S15, radio relay Zone 12, cliff altar Pièce 12, Astra-7 beacon Zone 12) grants "is_victory": true with "GG tu as réussi !".
11. CREATIVE / IMPROVISED PLAYER ENDINGS (ALLOW PLAYER FREEDOM!):
   - If the player invents an alternative creative ending (e.g., in the detective manor or any map, they say "je décide de fuir et aller en vacances", "je prends ma retraite aux Bahamas", "j'abandonne et je fuis en paix", etc.):
   - YOU MUST ACCEPT AND HONOR THIS ENDING! Set "is_victory": true, write a customized conclusion acknowledging their choice, and end with "FIN - GG tu as réussi !".
12. DYNAMIC D20 RISK-REWARD CONSEQUENCE ENGINE (CRITICAL):
   - Actions involving skill, physical effort, athletic feats (e.g. pushups, jumps, climbs, forcing obstacles), combat/attacks, crafting/assembling items, or daring stunts MUST HAVE REAL, D20-DEPENDENT CONSEQUENCES:
     * LOW ROLLS (1-7) = REAL FAILURE & SETBACKS:
       - Physical/Athletic (e.g. pushups, jumping, climbing): hand slips on slick floor, joint sprain, strained muscle, scraping face/ribs against metal (stat_changes.stat1: -5 to -10, stat_changes.stat3: -3).
       - Crafting/Assembly: botched attempt, tape or wires snap, knife slips cutting fingers (stat_changes.stat1: -5), crafting fails.
       - Combat: attack misses or deflects, enemy retaliates and wounds player (stat_changes.stat1: -10 to -20).
     * NORMAL SUCCESS (8-14) = CLEAN SUCCESS:
       - Physical/Exercise: completes the workout cleanly! Endorphins release, dispelling mental panic (stat_changes.stat2: +6 to +8, stat_changes.stat3: -2).
       - Crafting: item successfully assembled and added to "items_picked"!
       - Combat: clean hit, staggering or damaging the enemy.
     * GREAT SUCCESS (15-19) = DECISIVE TRIUMPH:
       - Physical/Flow state: confidence surges (+12 to +16 Sanity).
       - Crafting: sturdy reinforced craft (+10 Sanity).
       - Combat: devastating blow knocking foe out.
     * NATURAL 20 (20/20) = SPECTACULAR CRITICAL:
       - Maximum triumph! Peak human performance (+25 Sanity, +10 Energy or instant kill).
   - Non-risky informational actions (inspecting inventory, reading an open note, simple looking) execute directly without random damage.

Return STRICTLY raw JSON (no markdown):
{
  "narrative": "Detailed 1-2 paragraph description reflecting the action and D20 roll consequence.",
  "target_room_id": "${currentRoom.id}",
  "stat_changes": {
    "stat1": 0,
    "stat2": 0,
    "stat3": 0,
    "stat4": 0
  },
  "items_picked": [],
  "items_dropped": [],
  "summary_sentence": "3rd person chronicle sentence.",
  "is_game_over": false,
  "game_over_reason": null,
  "is_victory": false,
  "biome": "${currentRoom.biome}",
  "is_poisoned": ${Boolean(state.isPoisoned)},
  "poison_cured": false,
  "trigger_timer": null
}`;
}

// Call Secure Server-Side AI API (Keys are kept 100% on server, never exposed to client)
async function callBackendAi(
  story: StoryDefinition,
  state: GameState,
  action: string,
  lang: Language,
  d20Roll: number,
  d20Eval: { label: string; tier: string }
): Promise<TurnResolution | null> {
  try {
    const response = await fetch('/api/ai/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        story,
        state,
        action,
        language: lang,
        d20Roll,
        d20Label: d20Eval.label,
        d20Tier: d20Eval.tier,
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data && data.narrative) {
      return data as TurnResolution;
    }
  } catch {
    // Timeout or server offline, fall back to procedural
  }
  return null;
}

// Safe JSON parser helper with physical sanity enforcement
function parseTurnJson(
  rawText: string,
  d20Roll: number,
  d20Label: string,
  userAction: string
): TurnResolution | null {
  try {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json/, '');
    if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```/, '');
    if (cleaned.endsWith('```')) cleaned = cleaned.replace(/```$/, '');
    cleaned = cleaned.trim();

    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(cleaned);
    let s1 = Number(parsed.stat_changes?.stat1 || 0);
    let s2 = Number(parsed.stat_changes?.stat2 || 0);
    let s3 = Number(parsed.stat_changes?.stat3 || 0);
    const s4 = Number(parsed.stat_changes?.stat4 || 0);

    // Enforcement: If player performed self-harm or violent self-damage, Health and Sanity CANNOT increase!
    const actLower = userAction.toLowerCase();
    const isSelfHarm =
      actLower.includes('poignard') ||
      actLower.includes('couteau') ||
      actLower.includes('plant') ||
      actLower.includes('stab') ||
      actLower.includes('knife') ||
      actLower.includes('taill') ||
      actLower.includes('veine') ||
      actLower.includes('saign') ||
      actLower.includes('mutil') ||
      actLower.includes('égorg') ||
      actLower.includes('egorg') ||
      actLower.includes('tranch') ||
      actLower.includes('couper') ||
      actLower.includes('bless') ||
      actLower.includes('suicid') ||
      actLower.includes('me tuer') ||
      actLower.includes('se tuer') ||
      actLower.includes('kill myself') ||
      actLower.includes('hurt myself') ||
      actLower.includes('fracass') ||
      actLower.includes('crâne') ||
      actLower.includes('crane') ||
      actLower.includes('skull') ||
      actLower.includes('cogner la tête') ||
      actLower.includes('taper la tête') ||
      actLower.includes('frapper la tête') ||
      actLower.includes('smash my head') ||
      actLower.includes('sauter dans le vide') ||
      actLower.includes('se pendre') ||
      actLower.includes('pendre') ||
      actLower.includes('balle dans la tête') ||
      actLower.includes('shoot myself');

    let narrativeText = parsed.narrative || 'Action exécutée avec succès.';
    let isGameOver = Boolean(parsed.is_game_over);
    let gameOverReason = parsed.game_over_reason || null;

    if (isSelfHarm) {
      // Stabbing oneself or striking oneself with a rock/weapon ALWAYS causes catastrophic loss of Health!
      if (s1 >= 0) {
        s1 = d20Roll >= 20 ? -100 : d20Roll >= 15 ? -85 : d20Roll >= 8 ? -55 : -25;
      } else if (s1 > -20) {
        s1 = -Math.max(25, Math.abs(s1));
      }
      // Sanity / Mental is NEVER increased by self-harm (no 'calmness' or 'stoicism' excuse!)
      if (s2 >= 0) {
        s2 = d20Roll >= 15 ? -50 : d20Roll >= 8 ? -35 : -25;
      } else if (s2 > -20) {
        s2 = -Math.max(25, Math.abs(s2));
      }

      // If narrative absurdly claims they gained sanity or did it calmly, cleanse/append the brutal reality
      const narrLower = narrativeText.toLowerCase();
      if (
        narrLower.includes('calmement') ||
        narrLower.includes('sang-froid') ||
        narrLower.includes('gagn') ||
        narrLower.includes('sérénité') ||
        narrLower.includes('soulagement') ||
        narrLower.includes('lucidité') ||
        narrLower.includes('posément')
      ) {
        narrativeText +=
          '\n\n[DÉGÂTS SÉVÈRES & TRAUMATISME] La blessure auto-infligée déclenche une violente hémorragie et une onde de choc insoutenable. Vos constantes vitales et mentales s\'effondrent.';
      }

      if (d20Roll === 20) {
        s1 = -100;
        s2 = -100;
        isGameOver = true;
        gameOverReason = 'Blessure mortelle auto-infligée (Dé 20/20)';
      }
    }

    // Sanitize any generic "you execute" or "with calmness" robotic phrasing
    narrativeText = narrativeText
      .replace(/Focusing your resolve, you execute:.*?(?:\.|\!)/gi, '')
      .replace(/you execute.*?with calm.*?(?:\.|\!)/gi, '')
      .replace(/vous exécutez.*?avec calme.*?(?:\.|\!)/gi, '')
      .replace(/with calm discipline/gi, 'with caution')
      .replace(/with calmness/gi, 'with caution')
      .replace(/avec calme et sang-froid/gi, 'avec prudence');

    // Enforcement: "I go out" or running cannot grant positive sanity or free rewards
    const isEscapeOrRun =
      actLower.includes('go out') ||
      actLower.includes('sortir') ||
      actLower.includes('leave') ||
      actLower.includes('aller dehors') ||
      actLower.includes('courir') ||
      actLower.includes('run') ||
      actLower.includes('sprint');

    if (isEscapeOrRun) {
      if (s2 > 0) s2 = 0; // No free sanity
      if (actLower.includes('courir') || actLower.includes('run') || actLower.includes('sprint')) {
        if (s3 >= 0) s3 = -2; // Running drains energy
      }
    }

    return {
      narrative: narrativeText,
      newRoomId: parsed.target_room_id || '',
      statChanges: { stat1: s1, stat2: s2, stat3: s3, stat4: s4 },
      itemsPicked: Array.isArray(parsed.items_picked) ? parsed.items_picked : [],
      itemsDropped: Array.isArray(parsed.items_dropped) ? parsed.items_dropped : [],
      summarySentence: parsed.summary_sentence || '',
      isGameOver,
      gameOverReason,
      isVictory: Boolean(parsed.is_victory),
      biome: parsed.biome || '',
      d20Roll,
      d20Label,
      isPoisoned: Boolean(parsed.is_poisoned),
      poisonCured: Boolean(parsed.poison_cured),
      triggerTimer: parsed.trigger_timer || null,
    };
  } catch {
    return null;
  }
}

// Rich, High-Variance Procedural D20 Engine
// Guarantees zero-repetition, dynamic D20 outcomes, box checking, drop slot freeing, healing boosts
export function executeProceduralD20Engine(
  story: StoryDefinition,
  state: GameState,
  action: string,
  lang: Language,
  d20Roll: number,
  d20Eval: { label: string; tier: string }
): TurnResolution {
  const currentRoom = story.rooms.find((r) => r.id === state.currentRoomId) || story.rooms[0];
  const act = action.toLowerCase().trim();
  const fr = lang === 'fr';

  const isHarmfulFreeform =
    act.includes('poignard') ||
    act.includes('plant') ||
    act.includes('stab') ||
    act.includes('veine') ||
    act.includes('saign') ||
    act.includes('égorg') ||
    act.includes('egorg') ||
    act.includes('mutil') ||
    act.includes('suicid') ||
    act.includes('me tuer') ||
    act.includes('se tuer') ||
    act.includes('kill myself') ||
    act.includes('hurt myself') ||
    act.includes('crâne') ||
    act.includes('crane') ||
    act.includes('skull') ||
    act.includes('pendre');

  let newRoomId = currentRoom.id;
  // Slower vitals drain: bars decrease gently (-1 every 3 turns)
  const passiveDrain = (state.turnCount || 1) % 3 === 0 ? -1 : 0;
  const statChanges = { stat1: 0, stat2: 0, stat3: passiveDrain, stat4: passiveDrain };
  const itemsPicked: string[] = [];
  const itemsDropped: string[] = [];
  let narrative = '';
  let summarySentence = '';
  let isGameOver = false;
  let gameOverReason: string | null = null;
  let isVictory = false;
  const biome = currentRoom.biome;
  let isPoisoned = Boolean(state.isPoisoned);
  let poisonCured = false;
  let triggerTimer: TurnResolution['triggerTimer'] = null;
  let clearTimer = false;

  // Active poison damage per turn
  let poisonPrefix = '';
  if (isPoisoned) {
    statChanges.stat1 -= 2;
    poisonPrefix = fr
      ? '[☣️ VENIN ACTIF : -2 Santé due au poison !]\n'
      : '[☣️ POISON ACTIVE : -2 Health due to toxins!]\n';
  }

  // Turn variety seed to ensure no repetitive adjectives
  const turnSeed = (state.turnCount + d20Roll) % 5;

  const returnPayload = (override?: Partial<TurnResolution>): TurnResolution => {
    const totalHp = (state.stats?.stat1 ?? 100) + statChanges.stat1;
    const dead = isGameOver || totalHp <= 0;
    const finalRoom = story.rooms.find((r) => r.id === (override?.newRoomId || newRoomId)) || currentRoom;
    const roomVisual = getRoomVisualLayout(finalRoom, lang);

    return {
      narrative: poisonPrefix + narrative,
      newRoomId,
      statChanges,
      itemsPicked,
      itemsDropped,
      summarySentence: summarySentence || action.slice(0, 40),
      isGameOver: dead,
      gameOverReason: dead ? (gameOverReason || (fr ? 'Constantes vitales anéanties.' : 'Vital signs collapsed.')) : null,
      isVictory,
      biome,
      d20Roll,
      d20Label: d20Eval.label,
      isPoisoned,
      poisonCured,
      triggerTimer,
      clearTimer,
      visualLayout: override?.visualLayout || roomVisual.visualLayout,
      obstacle: override?.obstacle || roomVisual.obstacle,
      ...override,
    };
  };

  // 00. Creative / Improvised Player Endings (e.g. "je décide de fuir et aller en vacances", "prendre ma retraite", "partir vivre en paix")
  const isCreativeEnding =
    act.includes('vacance') ||
    act.includes('vacances') ||
    (act.includes('fuir') && (act.includes('partir') || act.includes('plage') || act.includes('tropique') || act.includes('bahamas') || act.includes('avion') || act.includes('voiture') || act.includes('loin') || act.includes('paix'))) ||
    act.includes('prendre ma retraite') ||
    act.includes('démissionner') ||
    act.includes('abandonner l\'enquête') ||
    act.includes('quitter l\'enquête') ||
    act.includes('vivre en paix');

  if (isCreativeEnding) {
    isVictory = true;
    statChanges.stat2 = +30;
    narrative = fr
      ? `[FIN ALTERNATIVE // GG TU AS RÉUSSI !]\n\nVous posez calmement vos affaires et prenez la décision la plus sage de votre existence : vous tournez les talons, tournez le dos à cette folie et décidez de tout plaquer pour partir en vacances au soleil ! Vous quittez la zone sans un regard en arrière, direction les tropiques et une nouvelle vie paisible.\n\nGG, tu as réussi ! FIN.`
      : `[ALTERNATIVE ENDING // GG YOU DID IT!]\n\nYou set down your gear and make the ultimate life choice: walking away from this madness to take a well-deserved vacation in paradise! You leave this nightmare behind to start fresh.\n\nGG, you succeeded! THE END.`;
    summarySentence = fr
      ? 'Fin alternative choisie par le joueur : Départ en vacances (Victoire !)'
      : 'Alternative ending chosen by player: Vacation retreat (Victory!)';
    return returnPayload();
  }

  const connectedPassageNames = currentRoom.connectedRooms
    .map((rId) => {
      const rm = story.rooms.find((r) => r.id === rId);
      return rm ? (fr ? rm.nameFr : rm.nameEn) : rId;
    })
    .join(', ');

  // 00B. Escape / Going Out Intent ("I go out", "go out", "sortir", "leave", "aller dehors", "dehors", "exit")
  const isEscapeIntent =
    act === 'i go out' ||
    act === 'go out' ||
    act === 'sortir' ||
    act === 'leave' ||
    act === 'exit' ||
    act === 'dehors' ||
    act.includes('go out') ||
    act.includes('get out') ||
    act.includes('go outside') ||
    act.includes('aller dehors') ||
    act.includes('sortir dehors') ||
    act.includes('sortir d\'ici') ||
    act.includes('quitter la zone') ||
    act.includes('quitter les lieux') ||
    act.includes('quitter le bunker') ||
    act.includes('quitter le manoir') ||
    (act.includes('fuir') && !isCreativeEnding);

  if (isEscapeIntent) {
    if (!currentRoom.isFinal) {
      statChanges.stat2 = -3;
      narrative = fr
        ? `[ISSUE EXTÉRIEURE SCELLÉE // IMPOSSIBLE DE SORTIR DIRECTEMENT]\nVous tentez de sortir à l'air libre, mais les issues vers l'extérieur sont condamnées.\n${story.boundaryExcuseFr}\nPour avancer et trouver une véritable issue, vous devez explorer les passages intérieurs accessibles : [${connectedPassageNames}].`
        : `[EXTERIOR EXIT SEALED // CANNOT GO OUT DIRECTLY]\nYou attempt to go outside, but the perimeter exits are sealed shut.\n${story.boundaryExcuseEn}\nTo make progress and find an escape route, you must explore the accessible interior passages: [${connectedPassageNames}].`;
      summarySentence = fr ? 'Issue extérieure condamnée.' : 'Exterior exit sealed.';
      return returnPayload();
    }
  }

  // 00C. Running / Sprinting Intent ("courir", "run", "sprint", "foncer", "courre")
  const isRunIntent =
    act === 'run' ||
    act === 'courir' ||
    act === 'sprint' ||
    act.includes('courir') ||
    act.includes('run') ||
    act.includes('sprint') ||
    act.includes('foncer') ||
    act.includes('galoper') ||
    act.includes('se dépêcher');

  if (isRunIntent) {
    // Check if player specified where to run (matching any connected room id or name)
    const targetRoomMatch = story.rooms.find(
      (r) =>
        currentRoom.connectedRooms.includes(r.id) &&
        (act.includes(r.id.toLowerCase()) ||
          act.includes(r.nameFr.toLowerCase()) ||
          act.includes(r.nameEn.toLowerCase()))
    );

    if (targetRoomMatch) {
      newRoomId = targetRoomMatch.id;
      statChanges.stat3 = -3; // Running consumes energy
      const rName = fr ? targetRoomMatch.nameFr : targetRoomMatch.nameEn;
      const rDesc = fr ? targetRoomMatch.descriptionFr : targetRoomMatch.descriptionEn;

      if (d20Roll >= 8) {
        narrative = fr
          ? `[SPRINT RAPIDE : DÉ ${d20Roll}/20]\nVous sprintez de toutes vos forces à travers le passage sombre, les poumons en feu (-3 Énergie). Vos pas résonnent lourdement et vous franchissez le seuil pour vous réfugier dans : ${rName}.\n\n${rDesc}`
          : `[RAPID SPRINT: ROLL ${d20Roll}/20]\nYou sprint with everything you have down the shadowy passage, lungs burning (-3 Energy). Your boots slam on the floor as you burst into: ${rName}.\n\n${rDesc}`;
      } else {
        statChanges.stat1 = -5;
        narrative = fr
          ? `[SPRINT PRÉCIPITÉ : DÉ ${d20Roll}/20]\nVous vous élancez en courant dans l'obscurité, mais vous trébuchez lourdement sur un tas de décombres au sol (-5 Santé, -3 Énergie). Vous vous relevez péniblement, essoufflé(e), à l'intérieur de : ${rName}.\n\n${rDesc}`
          : `[FUMBLING SPRINT: ROLL ${d20Roll}/20]\nYou dash blindly forward in the dark, but catch your foot on rusted scrap metal (-5 Health, -3 Energy). You stumble to your knees, breathing heavily, inside: ${rName}.\n\n${rDesc}`;
      }

      if (targetRoomMatch.isFinal) {
        isVictory = true;
        narrative += fr
          ? `\n\n[OBJECTIF ATTEINT // PROTOCOLE A-111 ACCOMPLI AVEC SUCCÈS !]`
          : `\n\n[OBJECTIVE ACCOMPLISHED // A-111 PROTOCOL COMPLETE!]`;
      }

      summarySentence = fr ? `Sprint vers ${rName}.` : `Sprinted into ${rName}.`;
      return returnPayload({ biome: targetRoomMatch.biome });
    } else {
      // General running without destination
      statChanges.stat3 = -3;
      statChanges.stat2 = -2;
      narrative = fr
        ? `[COURSE SANS DIRECTION // ESSOUFFLEMENT]\nL'adrénaline monte et vous commencez à courir dans la pièce obscure (-3 Énergie). Mais sans destination précise dans ce dédale hostile, vous manquez de heurter une paroi d'acier et vous vous arrêtez net pour reprendre votre souffle. Vers quel passage voulez-vous courir ? Passages accessibles : [${connectedPassageNames}].`
        : `[DISORIENTED SPRINT // OUT OF BREATH]\nAdrenaline surges and you break into a frantic run across the dark chamber (-3 Energy). But without a designated target in this hostile gloom, you nearly slam into cold steel plating and halt to catch your breath. Where are you trying to run? Available passages: [${connectedPassageNames}].`;
      summarySentence = fr ? 'Course désorientée dans la pièce (-3 Énergie).' : 'Disoriented sprint in the room (-3 Energy).';
      return returnPayload();
    }
  }

  // 00C2. Physical Feats & Exercise (Push-ups, Pompes, Squats, Jumps, Climbing, Stunts)
  const isPushups =
    act.includes('push up') ||
    act.includes('push-up') ||
    act.includes('pushup') ||
    act.includes('pompe') ||
    act.includes('squat') ||
    act.includes('abdo') ||
    act.includes('traction') ||
    act.includes('gainage') ||
    act.includes('muscul') ||
    act.includes('workout');

  const isAcrobatic =
    act.includes('sauter') ||
    act.includes('jump') ||
    act.includes('grimper') ||
    act.includes('escalad') ||
    act.includes('climb') ||
    act.includes('enjamber') ||
    act.includes('franchir');

  if (isPushups) {
    if (d20Roll === 1) {
      statChanges.stat1 = -8;
      statChanges.stat2 = -5;
      statChanges.stat3 = -3;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20 // LA MAIN GLISSE & CHUTE VIOLENTE]\nVous vous placez au sol en appui facial pour faire des pompes, mais votre paume glisse sur une nappe visqueuse et grasse ! Votre bras se dérobe brutalement, votre poignet fléchit dans un craquement douloureux et votre visage heurte violemment la tôle d'acier glacée (-8 Santé, -5 Mental, -3 Énergie) ! Du sang chaud coule sur votre tempe.`
        : `[CRITICAL FUMBLE 1/20 // HAND SLIPS & HEAVY IMPACT]\nYou drop into a push-up plank, but your palm slips on a patch of slick grease! Your wrist buckles violently and your face slams hard into the cold steel flooring (-8 Health, -5 Sanity, -3 Energy)! Blood trickles from your brow.`;
      summarySentence = fr ? 'Chute et blessure en faisant des pompes (-8 Santé).' : 'Hand slipped during pushups (-8 Health).';
      return returnPayload();
    } else if (d20Roll <= 7) {
      statChanges.stat1 = -3;
      statChanges.stat2 = -2;
      statChanges.stat3 = -3;
      narrative = fr
        ? `[JET INFÉRIEUR ${d20Roll}/20 // CRAMPE & EFFORT DOULOUREUX]\nVos bras tremblent dès les premières répétitions. Une crampe aiguë vous saisit les épaules et vous perdez l'équilibre, râpant vos genoux et vos paumes contre le sol rugueux (-3 Santé, -2 Mental, -3 Énergie). L'effort n'a rien apporté de positif.`
        : `[LOW ROLL ${d20Roll}/20 // MUSCLE CRAMP & STRAIN]\nYour arms shudder on the first repetitions. A painful cramp locks your shoulder and you collapse awkwardly, scraping your knees on the gritty floor (-3 Health, -2 Sanity, -3 Energy). No mental benefit gained.`;
      summarySentence = fr ? 'Série de pompes pénible et crampe (-3 Santé).' : 'Strained pushups and muscle cramp (-3 Health).';
      return returnPayload();
    } else if (d20Roll <= 14) {
      statChanges.stat2 = +8;
      statChanges.stat3 = -2;
      narrative = fr
        ? `[SUCCÈS D20 : ${d20Roll}/20 // SÉRIE DE POMPES PARFAITE & ENDORPHINES]\nVous vous calez fermement au sol et enchaînez une série de pompes rythmée et impeccable ! La congestion musculaire active votre circulation, une vague d'endorphines dissipe votre anxiété et votre esprit gagne en clarté et sérénité (+8 Mental, -2 Énergie) !`
        : `[D20 SUCCESS: ${d20Roll}/20 // CLEAN PUSHUPS & ENDORPHIN SURGE]\nYou plant your palms firmly and power through a rhythmic, disciplined set of pushups! Blood pumps into your chest and shoulders, releasing endorphins that push back dread and steady your mind (+8 Sanity, -2 Energy)!`;
      summarySentence = fr ? 'Pompes exécutées avec succès (+8 Mental).' : 'Clean set of pushups boosted sanity (+8).';
      return returnPayload();
    } else if (d20Roll <= 19) {
      statChanges.stat2 = +16;
      statChanges.stat3 = -1;
      narrative = fr
        ? `[GRAND SUCCÈS : ${d20Roll}/20 // FORCE PHYSIQUE EXPLOSIVE & ÉTAT DE FLOW]\nSérie explosive et galvanisante ! Votre corps obéit au doigt et à l'œil, chaque poussée résonne comme un défi au danger environnant. Une immense onde de confiance et de détermination d'acier s'empare de vous (+16 Mental, -1 Énergie) !`
        : `[GREAT SUCCESS: ${d20Roll}/20 // EXPLOSIVE FLOW STATE]\nAn explosive, exhilarating set of pushups! Your muscles fire with clean power, turning physical strain into pure mental steel. Confidence surges through you (+16 Sanity, -1 Energy)!`;
      summarySentence = fr ? 'Grande performance physique (+16 Mental).' : 'Great pushup performance (+16 Sanity).';
      return returnPayload();
    } else {
      statChanges.stat1 = +5;
      statChanges.stat2 = +25;
      statChanges.stat3 = +10;
      narrative = fr
        ? `[SUCCÈS CRITIQUE 20/20 // TRANSCENDANCE HERCULÉENNE]\nUne démonstration athlétique surhumaine ! Votre cœur bat au rythme d'une volonté inébranlable. La fatigue et la peur sont instantanément anéanties, un regain d'adrénaline et de puissance pure régénère votre métabolisme (+5 Santé, +25 Mental, +10 Énergie) !`
        : `[NATURAL 20 // CRITICAL PEAK PERFORMANCE]\nA superhuman display of athletic resolve! Fatigue and dread are obliterated by a roaring surge of vitality and iron discipline (+5 Health, +25 Sanity, +10 Energy)!`;
      summarySentence = fr ? 'Triomphe physique herculéen (Dé 20/20).' : 'Natural 20 athletic triumph.';
      return returnPayload();
    }
  }

  if (isAcrobatic) {
    if (d20Roll === 1) {
      statChanges.stat1 = -12;
      statChanges.stat2 = -6;
      statChanges.stat3 = -3;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20 // CHUTE VIOLENTE]\nVotre prise ou votre impulsion cède brusquement ! Vous faites une lourde chute et heurtez le sol rocailleux ou métallique (-12 Santé, -6 Mental, -3 Énergie) !`
        : `[CRITICAL FUMBLE 1/20 // HEAVY FALL]\nYour footing gives way! You take a hard fall, slamming into rough stone or rusted metal (-12 Health, -6 Sanity, -3 Energy)!`;
      summarySentence = fr ? 'Lourde chute lors d\'un saut/escalade (-12 Santé).' : 'Heavy fall during jump/climb (-12 Health).';
      return returnPayload();
    } else if (d20Roll <= 7) {
      statChanges.stat1 = -4;
      statChanges.stat3 = -2;
      narrative = fr
        ? `[JET INFÉRIEUR ${d20Roll}/20 // RÉCEPTION DOULOUREUSE]\nVous franchissez péniblement l'obstacle, mais votre réception est brutale. Vous vous râpez les genoux et les mains (-4 Santé, -2 Énergie).`
        : `[LOW ROLL ${d20Roll}/20 // AWKWARD LANDING]\nYou clumsily clear the obstacle but botch the landing, scraping your knees and palms (-4 Health, -2 Energy).`;
      summarySentence = fr ? 'Réception maladroite (-4 Santé).' : 'Awkward landing (-4 Health).';
      return returnPayload();
    } else if (d20Roll <= 14) {
      statChanges.stat2 = +6;
      narrative = fr
        ? `[SUCCÈS D20 : ${d20Roll}/20 // FRANCHISSEMENT SÛR]\nVous enjambez ou escaladez l'obstacle avec agilité et assurance (+6 Mental). Vous conservez une position avantageuse.`
        : `[D20 SUCCESS: ${d20Roll}/20 // CLEAN VAULT]\nYou scale or clear the obstacle with agile footing (+6 Sanity), securing safe ground.`;
      summarySentence = fr ? 'Obstacle franchi avec agilité (+6 Mental).' : 'Cleared obstacle safely (+6 Sanity).';
      return returnPayload();
    } else if (d20Roll <= 19) {
      statChanges.stat2 = +14;
      narrative = fr
        ? `[GRAND SUCCÈS : ${d20Roll}/20 // SAUT PARKOUR EXEMPLAIRE]\nUn bond d'une fluidité féline ! Vous franchissez la distance sans un bruit, prenant de la hauteur sur les ombres (+14 Mental).`
        : `[GREAT SUCCESS: ${d20Roll}/20 // PARKOUR PRECISION]\nA feline, graceful leap! You clear the expanse silently, gaining superior elevation (+14 Sanity).`;
      summarySentence = fr ? 'Saut acrobatique impressionnant (+14 Mental).' : 'Impressive parkour vault (+14 Sanity).';
      return returnPayload();
    } else {
      statChanges.stat1 = +5;
      statChanges.stat2 = +20;
      narrative = fr
        ? `[SUCCÈS CRITIQUE 20/20 // ACROBATIE LÉGENDAIRE]\nUne trajectoire aérienne parfaite d'une grâce absolue ! Vous atterrissez en douceur sans un bruit (+5 Santé, +20 Mental) !`
        : `[NATURAL 20 // FLAWLESS ACROBATICS]\nA breathless, flawless leap of absolute grace! You land soundlessly on your feet (+5 Health, +20 Sanity)!`;
      summarySentence = fr ? 'Acrobatie critique 20/20 réussie.' : 'Natural 20 acrobatic vault.';
      return returnPayload();
    }
  }

  // 00C3. Stealth & Sneaking (faufiler, sneak, discret, furtif, ramper, se cacher)
  const isStealthIntent =
    act.includes('faufil') ||
    act.includes('sneak') ||
    act.includes('discret') ||
    act.includes('furtif') ||
    act.includes('ramper') ||
    act.includes('crawl') ||
    act.includes('se cach') ||
    (act.includes('march') && (act.includes('doucement') || act.includes('silence') || act.includes('lente')));

  if (isStealthIntent) {
    if (d20Roll === 1) {
      statChanges.stat1 = -10;
      statChanges.stat2 = -10;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20 // DÉRAPAGE BRUYANT DANS LE NOIR]\nVous tentez de vous faufiler silencieusement, mais votre pied heurte violemment un entassement de tôles rouillées dans un fracas assourdissant (-10 Santé, -10 Mental) ! Des éclats métalliques vous entaillent la jambe et l'écho alerte chaque ombre menaçante.`
        : `[CRITICAL FUMBLE 1/20 // DEAFENING CLATTER IN THE DARK]\nYou try to slip forward silently, but your foot kicks a stack of rusted iron sheets with a deafening crash (-10 Health, -10 Sanity)! Jagged metal gashes your ankle, and the echoes alert every predator in the gloom.`;
      summarySentence = fr ? 'Déplacement furtif raté avec fracas (-10 Santé, -10 Mental).' : 'Failed stealth with loud clatter (-10 Health, -10 Sanity).';
      return returnPayload();
    } else if (d20Roll <= 7) {
      statChanges.stat2 = -6;
      narrative = fr
        ? `[JET INFÉRIEUR ${d20Roll}/20 // TENSION ET FROISSEMENT BRUYANT]\nLe gravier crisse sous vos semelles et votre respiration saccadée trahit votre nervosité (-6 Mental). Vous vous figez sur place, le cœur battant la chamade, en priant pour ne pas avoir été repéré.`
        : `[LOW ROLL ${d20Roll}/20 // NERVOUS TENSION & SCRAPING NOISE]\nGrit crunches loudly under your boots and your heavy breathing betrays your panic (-6 Sanity). You freeze in place, pulse racing, hoping the shadows didn't notice.`;
      summarySentence = fr ? 'Furtivité laborieuse et stress (-6 Mental).' : 'Clumsy stealth and stress (-6 Sanity).';
      return returnPayload();
    } else if (d20Roll <= 14) {
      statChanges.stat2 = +8;
      narrative = fr
        ? `[SUCCÈS D20 : ${d20Roll}/20 // PAS FEUTRÉS & OMBRE INVISIBLE]\nVous synchronisez votre progression avec les bruits sourds de la structure. Votre silhouette se fond dans l'obscurité, avançant sans un souffle (+8 Mental). Vous gardez l'avantage de la surprise.`
        : `[D20 SUCCESS: ${d20Roll}/20 // SILENT PHANTOM STRIDE]\nYou time your movement with ambient vibrations. Slipping like a ghost along the shadowed bulkheads, you glide forward without making a sound (+8 Sanity).`;
      summarySentence = fr ? 'Progression furtive réussie (+8 Mental).' : 'Successful stealth movement (+8 Sanity).';
      return returnPayload();
    } else if (d20Roll <= 19) {
      statChanges.stat2 = +15;
      narrative = fr
        ? `[GRAND SUCCÈS : ${d20Roll}/20 // INFILTRATION PARFAITE]\nUne maîtrise furtive remarquable ! Vous disparaissez totalement des regards, glissant sous les angles morts avec une discrétion absolue (+15 Mental).`
        : `[GREAT SUCCESS: ${d20Roll}/20 // FLAWLESS INFILTRATION]\nRemarkable stealth mastery! You dissolve into blind spots, stepping soundlessly across the terrain with total confidence (+15 Sanity).`;
      summarySentence = fr ? 'Infiltration de haut vol (+15 Mental).' : 'Flawless stealth infiltration (+15 Sanity).';
      return returnPayload();
    } else {
      statChanges.stat2 = +25;
      narrative = fr
        ? `[SUCCÈS CRITIQUE 20/20 // SPECTRE TOTALEMENT INTANGIBLE]\nUn silence absolu ! Vous devenez une ombre vivante, indétectable par la vue, l'ouïe ou l'odorat. Une sérénité glaciale et triomphale s'installe en vous (+25 Mental) !`
        : `[NATURAL 20 // INVISIBLE GHOST STEP]\nAbsolute, uncanny silence! You move like an intangible phantom, imperceptible to sight or sound (+25 Sanity)!`;
      summarySentence = fr ? 'Furtivité spectrale critique 20/20.' : 'Natural 20 ghost stealth.';
      return returnPayload();
    }
  }

  // 00C4. Comprehensive Crafting & Fusion Engine (FUSION DE DEUX ITEMS EN 1 NOUVEL OBJET NOMMÉ)
  const isCraftIntent =
    act.includes('craft') ||
    act.includes('fabriq') ||
    act.includes('assembl') ||
    act.includes('combin') ||
    act.includes('bricol') ||
    act.includes('faire une lance') ||
    act.includes('faire une torche') ||
    act.includes('faire un bandage') ||
    act.includes('faire un crochet') ||
    act.includes('faire une massue') ||
    act.includes('créer');

  if (isCraftIntent) {
    const inv = state.inventory;
    const tapeItem = inv.find((it) => ['tape', 'ruban', 'adhesif', 'scotch'].some((k) => it.toLowerCase().includes(k)));
    const knifeItem = inv.find((it) => ['couteau', 'knife', 'scalpel', 'dague'].some((k) => it.toLowerCase().includes(k)));
    const shaftItem = inv.find((it) => ['branche', 'tuyau', 'pipe', 'branch', 'bâton'].some((k) => it.toLowerCase().includes(k)));
    const clothItem = inv.find((it) => ['tissu', 'cloth', 'chiffon', 'serviette', 'bande'].some((k) => it.toLowerCase().includes(k)));
    const fireItem = inv.find((it) => ['briquet', 'lighter', 'allumette', 'match'].some((k) => it.toLowerCase().includes(k)));
    const stoneItem = inv.find((it) => ['pierre', 'stone', 'caillou'].some((k) => it.toLowerCase().includes(k)));
    const wireItem = inv.find((it) => ['fil', 'câble', 'wire', 'cable'].some((k) => it.toLowerCase().includes(k)));

    let targetCraftName = '';
    let ingredient1 = '';
    let ingredient2 = '';

    if ((act.includes('lance') || act.includes('spear')) || (knifeItem && shaftItem)) {
      targetCraftName = fr ? 'Lance affûtée' : 'Sharpened Spear';
      ingredient1 = knifeItem || '';
      ingredient2 = shaftItem || (tapeItem || clothItem || '');
    } else if ((act.includes('torch') || act.includes('torche') || act.includes('feu')) || (shaftItem && clothItem)) {
      targetCraftName = fr ? 'Torche artisanale' : 'Makeshift Torch';
      ingredient1 = shaftItem || '';
      ingredient2 = clothItem || (fireItem || '');
    } else if (act.includes('bandage') || act.includes('soin') || (clothItem && (tapeItem || inv.some((it) => it.toLowerCase().includes('eau'))))) {
      targetCraftName = fr ? 'Pansement compressif' : 'Compression Bandage';
      ingredient1 = clothItem || '';
      ingredient2 = tapeItem || inv.find((it) => it.toLowerCase().includes('eau')) || '';
    } else if (act.includes('massue') || act.includes('club') || (shaftItem && stoneItem)) {
      targetCraftName = fr ? 'Massue de pierre' : 'Stone Club';
      ingredient1 = shaftItem || '';
      ingredient2 = stoneItem || '';
    } else if (act.includes('crochet') || act.includes('lockpick') || (wireItem && (shaftItem || tapeItem))) {
      targetCraftName = fr ? 'Crochet monté' : 'Mounted Lockpick';
      ingredient1 = wireItem || '';
      ingredient2 = shaftItem || tapeItem || '';
    } else if (knifeItem && tapeItem) {
      targetCraftName = fr ? 'Dague renforcée' : 'Reinforced Dagger';
      ingredient1 = knifeItem;
      ingredient2 = tapeItem;
    } else if (shaftItem && tapeItem) {
      targetCraftName = fr ? 'Bâton gainé' : 'Reinforced Baton';
      ingredient1 = shaftItem;
      ingredient2 = tapeItem;
    } else if (inv.length >= 2) {
      // Dynamic fusion of two inventory items
      ingredient1 = inv[0];
      ingredient2 = inv[1];
      const n1 = translateItem(ingredient1, fr ? 'fr' : 'en');
      const n2 = translateItem(ingredient2, fr ? 'fr' : 'en');
      targetCraftName = fr ? `Assemblage ${n1}-${n2}` : `Hybrid ${n1}-${n2}`;
    } else {
      ingredient1 = inv[0] || '';
      targetCraftName = fr ? 'Outil improvisé' : 'Improvised Tool';
    }

    if (d20Roll === 1) {
      statChanges.stat1 = -8;
      statChanges.stat2 = -4;
      statChanges.stat3 = -2;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20 // ACCIDENT DE CRAFT]\nEn manipulant fébrilement vos matériaux, vos mains tremblent dans la pénombre. Une pièce effilée ou la lame ripe violemment, vous cisaillant profondément la paume (-8 Santé, -4 Mental, -2 Énergie) ! Le bricolage rate et les composants tombent au sol.`
        : `[CRITICAL FUMBLE 1/20 // CRAFTING ACCIDENT]\nAs you handle the rough materials, your hands shake in the dark. A sharp edge slices deep into your palm (-8 Health, -4 Sanity, -2 Energy)! The components fall apart and the craft is ruined.`;
      summarySentence = fr ? 'Blessure lors d\'une tentative de craft (-8 Santé).' : 'Injured during crafting attempt (-8 Health).';
      return returnPayload();
    } else if (d20Roll <= 7) {
      statChanges.stat3 = -2;
      narrative = fr
        ? `[JET INFÉRIEUR ${d20Roll}/20 // ÉCHEC D'ASSEMBLAGE]\nVous tentez d'assembler les composants, mais les fixations sont bancales, le ruban s'emmêle ou les pièces ne s'emboîtent pas (-2 Énergie). L'objet se désolidarise. Vous devrez recommencer avec plus d'attention.`
        : `[LOW ROLL ${d20Roll}/20 // FAILED ASSEMBLY]\nYou struggle to bind the parts together, but the bond is unstable and the components refuse to align (-2 Energy). The makeshift tool falls apart. Try again with more focus.`;
      summarySentence = fr ? 'Échec d\'assemblage de craft (-2 Énergie).' : 'Crafting assembly failed (-2 Energy).';
      return returnPayload();
    } else {
      // SUCCESS: The TWO items FUSE together in inventory!
      if (ingredient1 && state.inventory.includes(ingredient1)) {
        itemsDropped.push(ingredient1);
      }
      if (ingredient2 && state.inventory.includes(ingredient2) && ingredient2 !== ingredient1) {
        itemsDropped.push(ingredient2);
      }
      if (!state.inventory.includes(targetCraftName) && state.inventory.length < 8) {
        itemsPicked.push(targetCraftName);
      }

      const fusionLine = ingredient1 && ingredient2 && ingredient1 !== ingredient2
        ? (fr
            ? `\n[FUSION D'INVENTAIRE] [${translateItem(ingredient1, 'fr')}] et [${translateItem(ingredient2, 'fr')}] ont fusionné pour former [${targetCraftName}] !`
            : `\n[INVENTORY FUSION] [${translateItem(ingredient1, 'en')}] and [${translateItem(ingredient2, 'en')}] fused to forge [${targetCraftName}]!`)
        : '';

      if (d20Roll <= 14) {
        statChanges.stat2 = +8;
        narrative = fr
          ? `[SUCCÈS D20 : ${d20Roll}/20 // CRAFT & FUSION RÉUSSIE : [${targetCraftName}] !]\nVous assemblez adroitement vos matériaux. La structure est solide et fonctionnelle : vous obtenez [${targetCraftName}] placé dans votre inventaire (+8 Mental) !${fusionLine}`
          : `[D20 SUCCESS: ${d20Roll}/20 // CRAFT & FUSION SUCCESS: [${targetCraftName}]!]\nYou skillfully assemble your materials into a sturdy, functional creation: [${targetCraftName}] added to your inventory (+8 Sanity)!${fusionLine}`;
        summarySentence = fr ? `Fabrication et fusion de [${targetCraftName}] (+8 Mental).` : `Successfully crafted and fused [${targetCraftName}] (+8 Sanity).`;
      } else if (d20Roll <= 19) {
        statChanges.stat2 = +14;
        narrative = fr
          ? `[GRAND SUCCÈS : ${d20Roll}/20 // FUSION RENFORCÉE D'EXCELLENCE]\nUn travail d'ingénierie de survie remarquable ! Vous optimisez l'assemblage et renforcez chaque point de tension. Vous obtenez un équipement de premier ordre : [${targetCraftName}] (+14 Mental) !${fusionLine}`
          : `[GREAT SUCCESS: ${d20Roll}/20 // REINFORCED PRIME FUSION]\nRemarkable survival engineering! You optimize the joints and reinforce every pressure point. You obtain high-grade gear: [${targetCraftName}] (+14 Sanity)!${fusionLine}`;
        summarySentence = fr ? `Fabrication renforcée de [${targetCraftName}] (+14 Mental).` : `Crafted reinforced [${targetCraftName}] (+14 Sanity).`;
      } else {
        statChanges.stat2 = +25;
        statChanges.stat3 = +10;
        narrative = fr
          ? `[SUCCÈS CRITIQUE 20/20 // CHEF-D'ŒUVRE DE FUSION D'ARTISANAT]\nUn chef-d'œuvre improvisé digne d'un maître artisan ! L'équilibre est parfait, les fixations sont indestructibles. Vous obtenez un exemplaire d'exception de [${targetCraftName}] (+25 Mental, +10 Énergie) !${fusionLine}`
          : `[NATURAL 20 // MASTERWORK CRAFT FUSION]\nA masterpiece of field craftsmanship! Perfectly balanced with unbreakable bindings. You secure an exceptional [${targetCraftName}] (+25 Sanity, +10 Energy)!${fusionLine}`;
        summarySentence = fr ? `Chef-d'œuvre de craft : [${targetCraftName}] (Dé 20).` : `Masterwork craft: [${targetCraftName}] (Roll 20).`;
      }
      return returnPayload();
    }
  }

  // 00D. Item Utility & Affordance Engine (Scotch, Knife, Lighter, Water, Food, Phone, etc.)
  // 1. Scotch / Duct Tape (Taping knife to spear, sealing leaks, repairing items)
  const isTapeAction =
    act.includes('scotch') ||
    act.includes('ruban') ||
    act.includes('adhesif') ||
    act.includes('duct tape') ||
    act.includes('tape') ||
    act.includes('coller') ||
    act.includes('scotcher');

  if (isTapeAction) {
    const hasTape = state.inventory.some((it) =>
      ['tape', 'ruban', 'adhesif', 'scotch'].some((k) => it.toLowerCase().includes(k))
    );

    if (!hasTape) {
      narrative = fr
        ? `Vous ne possédez aucun rouleau de scotch ou ruban adhésif dans votre inventaire. Objets actuels : [${state.inventory.map((it) => translateItem(it, 'fr')).join(', ')}].`
        : `You do not have any duct tape or adhesive tape in your inventory. Current items: [${state.inventory.map((it) => translateItem(it, 'en')).join(', ')}].`;
      summarySentence = fr ? 'Aucun ruban adhésif dans l\'inventaire.' : 'No duct tape in inventory.';
      return returnPayload();
    }

    // Spear Crafting: Taping knife to a wooden branch or metal pipe
    const isSpearCraft =
      (act.includes('couteau') || act.includes('knife')) &&
      (act.includes('branche') || act.includes('branch') || act.includes('tuyau') || act.includes('pipe') || act.includes('baton') || act.includes('lance') || act.includes('spear'));

    if (isSpearCraft) {
      const hasKnife = state.inventory.some((it) =>
        ['couteau', 'knife', 'scalpel', 'dague'].some((k) => it.toLowerCase().includes(k))
      );
      const hasShaft = state.inventory.some((it) =>
        ['branche', 'tuyau', 'pipe', 'branch', 'bâton'].some((k) => it.toLowerCase().includes(k))
      );

      if (hasKnife && hasShaft) {
        const spearName = fr ? 'Lance de fortune' : 'Improvised Spear';
        if (d20Roll === 1) {
          statChanges.stat1 = -8;
          statChanges.stat2 = -4;
          statChanges.stat3 = -2;
          narrative = fr
            ? `[ÉCHEC CRITIQUE 1/20 // ACCIDENT DE BRICOLAGE]\nEn tentant de scotcher la lame du couteau sur le manche, vos mains tremblent. Le fil tranchant de la lame ripe violemment sur votre paume (-8 Santé, -4 Mental) ! Vous lâchez les matériaux dans la poussière en étouffant un juron.`
            : `[CRITICAL FUMBLE 1/20 // CRAFTING ACCIDENT]\nAs you try to lash the knife blade to the shaft, your hands slip. The razor-sharp edge cuts deep across your palm (-8 Health, -4 Sanity)! You drop the parts into the dust, clutching your bleeding hand.`;
          summarySentence = fr ? 'Accident lors de la fabrication de la lance.' : 'Injured hand attempting to craft spear.';
          return returnPayload();
        } else if (d20Roll <= 7) {
          statChanges.stat3 = -2;
          narrative = fr
            ? `[JET INFÉRIEUR ${d20Roll}/20 // BRICOLAGE INSTABLE]\nVous tentez d'assembler la lance, mais le ruban adhésif s'enroule de travers et la fixation reste branlante. L'assemblage ne tient pas et se désolidarise (-2 Énergie). Vous devrez réessayer avec plus de rigueur.`
            : `[LOW ROLL ${d20Roll}/20 // UNSTABLE ASSEMBLY]\nYou attempt to bind the spear, but the duct tape twists unevenly and the blade wobbles loose. The makeshift weapon falls apart (-2 Energy). You must try again with better focus.`;
          summarySentence = fr ? 'Tentative de craft ratée.' : 'Failed craft attempt.';
          return returnPayload();
        } else if (!state.inventory.includes(spearName)) {
          const kItem = state.inventory.find((it) =>
            ['couteau', 'knife', 'scalpel', 'dague'].some((k) => it.toLowerCase().includes(k))
          );
          const sItem = state.inventory.find((it) =>
            ['branche', 'tuyau', 'pipe', 'branch', 'bâton'].some((k) => it.toLowerCase().includes(k))
          );
          if (kItem) itemsDropped.push(kItem);
          if (sItem && sItem !== kItem) itemsDropped.push(sItem);
          if (state.inventory.length < 8) itemsPicked.push(spearName);
          statChanges.stat2 = d20Roll >= 15 ? +15 : +8;
          narrative = fr
            ? `[BRICOLAGE DE SURVIE : DÉ ${d20Roll}/20 // LANCE DE FORTUNE CONFECTIONNÉE !]\nVous déroulez le ruban adhésif blindé et ligotez fermement la poignée de votre couteau à l'extrémité de la branche / du tuyau métallique. Les composants fusionnent dans votre inventaire pour former [${spearName}] (+${statChanges.stat2} Mental) !`
            : `[SURVIVAL CRAFTING: ROLL ${d20Roll}/20 // IMPROVISED SPEAR ASSEMBLED!]\nYou peel off layers of armored duct tape and lash your knife securely to the end of the shaft. The components fuse together into an [${spearName}] (+${statChanges.stat2} Sanity)!`;
          summarySentence = fr ? 'Fabrication et fusion d\'une lance de fortune.' : 'Successfully crafted and fused improvised spear.';
          return returnPayload();
        }
      } else {
        narrative = fr
          ? `Pour fabriquer une lance avec le ruban adhésif, vous devez posséder à la fois une lame (couteau) et un manche solide (branche ou tuyau) dans votre inventaire.`
          : `To craft a spear with duct tape, you must have both a blade (knife) and a sturdy shaft (branch or pipe) in your inventory.`;
        summarySentence = fr ? 'Matériaux manquants pour la lance.' : 'Missing materials for spear.';
        return returnPayload();
      }
    }

    // Sealing leak, pipes, or cracks
    const isLeakSeal =
      act.includes('fuite') ||
      act.includes('tuyau') ||
      act.includes('fissure') ||
      act.includes('trou') ||
      act.includes('air') ||
      act.includes('leak') ||
      act.includes('crack') ||
      act.includes('seal') ||
      act.includes('colmater') ||
      act.includes('reparer');

    if (isLeakSeal) {
      statChanges.stat2 = +10;
      narrative = fr
        ? `[RÉPARATION AU RUBAN ADHÉSIF BLINDÉ]\nVous enroulez plusieurs couches épaisses de ruban adhésif blindé autour de la zone endommagée. L'adhésif étanche bouche hermétiquement la fissure et colmate toute fuite (+10 Mental) ! Le conduit tient bon.`
        : `[ARMORED DUCT TAPE REPAIR]\nYou wrap several tight layers of armored duct tape over the damaged breach. The heavy-duty seal holds fast, completely halting the leak (+10 Sanity)! The fitting is secured.`;
      summarySentence = fr ? 'Colmatage réussi au ruban adhésif.' : 'Sealed leak with duct tape.';
      return returnPayload();
    }

    // General taping / sticking
    narrative = fr
      ? `[UTILISATION DU RUBAN ADHÉSIF]\nVous déroulez une bande de ruban adhésif blindé ultra-résistant. L'adhésif colle avec une force industrielle. Vous pouvez l'utiliser pour colmater une fuite, réparer un objet brisé, ou assembler un couteau sur une branche/tuyau pour fabriquer une lance de fortune.`
      : `[DUCT TAPE APPLICATION]\nYou peel off a length of armored duct tape. The adhesive grips with industrial strength. You can use it to seal leaks, fix cracked gear, or bind a knife to a branch/pipe to craft an improvised spear.`;
    summarySentence = fr ? 'Utilisation du ruban adhésif.' : 'Used duct tape.';
    return returnPayload();
  }

  // 2. Kitchen Knife Utility (cutting, carving, opening boxes)
  const isKnifeUtility =
    (act.includes('couteau') || act.includes('knife')) &&
    (act.includes('couper') || act.includes('cut') || act.includes('trancher') || act.includes('tailler') || act.includes('ouvrir'));

  if (isKnifeUtility) {
    const hasKnife = state.inventory.some((it) =>
      ['couteau', 'knife', 'scalpel', 'dague'].some((k) => it.toLowerCase().includes(k))
    );
    if (!hasKnife) {
      narrative = fr
        ? `Vous ne possédez aucun couteau dans votre inventaire pour découper ou trancher.`
        : `You do not have a knife in your inventory to cut or carve with.`;
      summarySentence = fr ? 'Couteau absent de l\'inventaire.' : 'No knife in inventory.';
      return returnPayload();
    }
    narrative = fr
      ? `[UTILISATION DU COUTEAU : DÉ ${d20Roll}/20]\nVous utilisez la lame acérée de votre couteau avec précision. Le tranchant d'acier découpe net les matériaux résistants, tranchant les liens ou forçant le contenant sans accroc.`
      : `[KNIFE UTILITY: ROLL ${d20Roll}/20]\nYou use the sharp blade of your knife with steady hands. The steel edge slices cleanly through tough material, severing cords or prying open the container.`;
    summarySentence = fr ? 'Utilisation habile du couteau.' : 'Skilled use of knife.';
    return returnPayload();
  }

  // 3. Cheap Lighter (fire, lighting dark areas, burning webs)
  const isLighterAction =
    act.includes('briquet') ||
    act.includes('lighter') ||
    (act.includes('allumer') && (act.includes('feu') || act.includes('flamme') || act.includes('torche'))) ||
    act.includes('bruler') ||
    act.includes('burn');

  if (isLighterAction) {
    const hasLighter = state.inventory.some((it) =>
      ['briquet', 'lighter', 'allumette', 'match', 'ferrocerium'].some((k) => it.toLowerCase().includes(k))
    );
    if (!hasLighter) {
      narrative = fr
        ? `Vous ne possédez aucun briquet ou allumettes dans votre inventaire pour produire une flamme.`
        : `You do not have a lighter or matches in your inventory to strike a flame.`;
      summarySentence = fr ? 'Aucune source de feu en inventaire.' : 'No fire source in inventory.';
      return returnPayload();
    }
    statChanges.stat2 = +5;
    narrative = fr
      ? `[ALLUMAGE DU FEU : DÉ ${d20Roll}/20]\nVous faites tourner la molette de votre briquet. Une vive flamme jaillit instantanément, repoussant l'obscurité oppressante et calcinant les toiles d'araignées et débris sur votre passage (+5 Mental).`
      : `[STRIKING FLAME: ROLL ${d20Roll}/20]\nYou flick the wheel of your lighter. A bright flame leaps to life, pushing back the oppressive gloom and scorching webs and debris in your path (+5 Sanity).`;
    summarySentence = fr ? 'Flamme allumée au briquet (+5 Mental).' : 'Struck flame with lighter (+5 Sanity).';
    return returnPayload();
  }

  // 4. Phone (flashlight, network check)
  const isPhoneAction =
    (act.includes('telephone') || act.includes('phone') || act.includes('portable')) &&
    (act.includes('lampe') || act.includes('torche') || act.includes('ecran') || act.includes('reseau') || act.includes('appeler') || act.includes('call') || act.includes('light'));

  if (isPhoneAction) {
    const hasPhone = state.inventory.some((it) =>
      ['phone', 'telephone', 'portable'].some((k) => it.toLowerCase().includes(k))
    );
    if (hasPhone) {
      statChanges.stat2 = +5;
      narrative = fr
        ? `[TÉLÉPHONE - LAMPE TORCHE LED]\nVous activez la torche LED de votre téléphone (50% batterie). Le faisceau blanc transperce la pénombre, révélant distinctement les parois de métal rouillé, le sol et chaque recoin sombre (+5 Mental). Réseau cellulaire : AUCUN SIGNAL.`
        : `[PHONE - LED FLASHLIGHT]\nYou toggle the phone's LED torch (50% battery). The bright white beam pierces the dark, revealing rusted bulkheads, cold flooring, and dark corners (+5 Sanity). Cellular Network: NO SERVICE.`;
      summarySentence = fr ? 'Éclairage à la lampe torche du téléphone.' : 'Illuminated with phone torch.';
      return returnPayload();
    }
  }

  // 5. Drinking Water (augmente UNIQUEMENT la barre de soif)
  const isDrinkingWater =
    act.includes('boire') ||
    act.includes('drink') ||
    (act.includes('eau') && (act.includes('avaler') || act.includes('gorgee') || act.includes('boire')));

  if (isDrinkingWater) {
    const waterItem = state.inventory.find((it) =>
      ['eau', 'water', 'gourde', 'canteen'].some((k) => it.toLowerCase().includes(k))
    );
    if (waterItem) {
      statChanges.stat4 = +30;
      statChanges.stat1 = 0;
      statChanges.stat2 = 0;
      statChanges.stat3 = 0;
      narrative = fr
        ? `[HYDRATATION ESSENTIELLE]\nVous buvez une longue gorgée d'eau fraîche de votre [${translateItem(waterItem, 'fr')}]. La fraîcheur étanche votre gorge sèche (+30 Soif).`
        : `[HYDRATION RESTORED]\nYou take a long swig of fresh water from your [${translateItem(waterItem, 'en')}]. The cold liquid quenches your parched throat (+30 Thirst).`;
      summarySentence = fr ? 'Boire de l\'eau (+30 Soif).' : 'Drank water (+30 Thirst).';
      return returnPayload();
    }
  }

  // 6. Eating Food (augmente UNIQUEMENT la barre d'énergie/faim)
  const isEatingFood =
    act.includes('manger') ||
    act.includes('eat') ||
    act.includes('chips') ||
    act.includes('ration') ||
    act.includes('nourriture');

  if (isEatingFood) {
    const foodItem = state.inventory.find((it) =>
      ['chips', 'ration', 'viande', 'meat', 'fromage', 'cheese', 'anchovies', 'anchois', 'conserve', 'nourriture'].some((k) =>
        it.toLowerCase().includes(k)
      )
    );
    if (foodItem) {
      itemsDropped.push(foodItem);
      statChanges.stat3 = +30;
      statChanges.stat1 = 0;
      statChanges.stat2 = 0;
      statChanges.stat4 = 0;
      narrative = fr
        ? `[REPAS DE SURVIE]\nVous consommez [${translateItem(foodItem, 'fr')}]. Les calories nourrissent votre organisme (+30 Énergie/Faim). Emplacement d'inventaire libéré.`
        : `[SURVIVAL MEAL]\nYou consume [${translateItem(foodItem, 'en')}]. The calories sustain your body (+30 Energy/Hunger). Inventory slot freed.`;
      summarySentence = fr ? `Consommation de ${translateItem(foodItem, 'fr')} (+30 Faim).` : `Consumed ${translateItem(foodItem, 'en')} (+30 Hunger).`;
      return returnPayload();
    }
  }

  // 00E2. General Combat & Attack Intent with D20 Risk-Reward Consequences
  const isCombatIntent =
    (act.includes('attaqu') ||
      act.includes('frapp') ||
      act.includes('taper') ||
      act.includes('tuer') ||
      act.includes('attack') ||
      act.includes('strike') ||
      act.includes('fight') ||
      act.includes('hit') ||
      act.includes('défendre') ||
      act.includes('defend')) &&
    !isHarmfulFreeform &&
    currentRoom.id !== 'S5'; // S5 has dedicated Iron Golem script

  if (isCombatIntent) {
    if (d20Roll === 1) {
      statChanges.stat1 = -18;
      statChanges.stat2 = -8;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20 // REVERS DE COMBAT SÉVÈRE]\nVotre coup part de travers : votre pied dérape dans la pénombre ou votre arme heurte une armature en ferraille. La créature / l'obstacle vous inflige une violente riposte de plein fouet (-18 Santé, -8 Mental) !`
        : `[CRITICAL FUMBLE 1/20 // SEVERE COMBAT BLUNDER]\nYour strike goes catastrophically wrong: your footing slips on grime or your weapon deflects off iron plating. The threat delivers a brutal retaliatory counter-blow (-18 Health, -8 Sanity)!`;
      summarySentence = fr ? 'Échec critique en combat (-18 Santé).' : 'Critical fumble in combat (-18 Health).';
      return returnPayload();
    } else if (d20Roll <= 7) {
      statChanges.stat1 = -8;
      statChanges.stat3 = -2;
      narrative = fr
        ? `[JET COMBAT ${d20Roll}/20 // COUP ESQUIVÉ & RIPOSTE]\nVotre coup manque de puissance ou est dévié. La riposte ennemie vous érafle douloureusement l'avant-bras (-8 Santé, -2 Énergie). Vous devez reprendre votre garde !`
        : `[COMBAT ROLL ${d20Roll}/20 // DEFLECTED & GRAZED]\nYour blow lacks momentum and is parried. The retaliatory strike grazes you hard across the arm (-8 Health, -2 Energy). Step back and steady your guard!`;
      summarySentence = fr ? 'Attaque manquée et riposte (-8 Santé).' : 'Attack missed and took damage (-8 Health).';
      return returnPayload();
    } else if (d20Roll <= 14) {
      statChanges.stat2 = +6;
      narrative = fr
        ? `[SUCCÈS D20 : ${d20Roll}/20 // COUP DIRECT & AVANTAGE TACTIQUE]\nVotre assaut fait mouche ! Vous portez un coup net qui repousse l'adversaire ou brise sa posture offensive (+6 Mental). Vous maintenez l'ascendant tactique.`
        : `[D20 SUCCESS: ${d20Roll}/20 // DIRECT HIT & TACTICAL EDGE]\nYour strike lands true! You deliver a solid blow that staggers the target or knocks back the threat (+6 Sanity). You maintain the tactical upper hand.`;
      summarySentence = fr ? 'Coup direct réussi en combat (+6 Mental).' : 'Direct hit in combat (+6 Sanity).';
      return returnPayload();
    } else if (d20Roll <= 19) {
      statChanges.stat2 = +14;
      narrative = fr
        ? `[GRAND SUCCÈS COMBAT : ${d20Roll}/20 // IMPACT DÉVASTATEUR]\nUne attaque foudroyante et calculée ! Vous neutralisez net la menace ou fracassez son armure. Une vague d'assurance et de soulagement vous envahit (+14 Mental) !`
        : `[GREAT COMBAT SUCCESS: ${d20Roll}/20 // DEVASTATING IMPACT]\nA thunderous, calculated strike! You neutralize the immediate threat or shatter its defenses. Confidence and relief surge through your veins (+14 Sanity)!`;
      summarySentence = fr ? 'Frappe dévastatrice en combat (+14 Mental).' : 'Devastating combat strike (+14 Sanity).';
      return returnPayload();
    } else {
      statChanges.stat2 = +25;
      statChanges.stat3 = +5;
      narrative = fr
        ? `[SUCCÈS CRITIQUE 20/20 // EXÉCUTION LÉTALE TRIOMPHALE]\nCoup parfait d'une létalité chirurgicale ! Vous abattez la cible sur le coup ou désarmez totalement le péril dans un vacarme assourdissant (+25 Mental, +5 Énergie) !`
        : `[NATURAL 20 // CRITICAL FATALITY]\nA flawless strike of surgical lethality! You annihilate the threat or dismantle the danger completely in one decisive blow (+25 Sanity, +5 Energy)!`;
      summarySentence = fr ? 'Coup critique létal 20/20 (Victoire).' : 'Natural 20 critical combat fatality.';
      return returnPayload();
    }
  }

  // 0A. Poison Cure / Antidote / Disinfectant Bottle / First Aid
  const isCureAction =
    act.includes('desinfectant') ||
    act.includes('désinfectant') ||
    act.includes('disinfectant') ||
    act.includes('antidote') ||
    (act.includes('trousse') && (act.includes('soin') || act.includes('secours'))) ||
    act.includes('first aid') ||
    act.includes('soigner le poison') ||
    act.includes('panser le venin');

  if (isCureAction) {
    const hasDisinfectant = state.inventory.some((it) => it.toLowerCase().includes('disinfectant') || it.toLowerCase().includes('désinfectant'));
    const hasFirstAid = state.inventory.some((it) => it.toLowerCase().includes('first aid') || it.toLowerCase().includes('trousse'));
    if (hasDisinfectant || hasFirstAid || isPoisoned) {
      isPoisoned = false;
      poisonCured = true;
      poisonPrefix = '';
      statChanges.stat1 = Math.max(15, statChanges.stat1 + 25);
      statChanges.stat2 = Math.max(10, statChanges.stat2 + 15);
      narrative = fr
        ? `[GUÉRISON DU POISON] Vous appliquez le flacon de désinfectant ou la trousse médicale sur les plaies inoculées. Le venin toxique est neutralisé immédiatement ! Une sensation revigorante envahit vos tissus (+25 Santé, +15 Mental).`
        : `[POISON NEUTRALIZED] You apply medical disinfectant / first aid to the wound. The venom is successfully flushed from your bloodstream (+25 Health, +15 Sanity)!`;
      summarySentence = fr ? 'Le poison a été soigné.' : 'Venom cured.';
      return returnPayload();
    }
  }

  // 0B. Improvised Item Pickups (branche, caillou, tuyau, tissu)
  const isImprovised =
    (act.includes('branche') && (act.includes('cass') || act.includes('prend') || act.includes('ramass'))) ||
    ((act.includes('caillou') || act.includes('pierre')) && (act.includes('prend') || act.includes('ramass'))) ||
    ((act.includes('tuyau') || act.includes('barre de fer')) && (act.includes('arrach') || act.includes('prend') || act.includes('ramass'))) ||
    ((act.includes('tissu') || act.includes('chiffon')) && (act.includes('déchir') || act.includes('arrach') || act.includes('prend')));

  if (isImprovised && state.inventory.length < 8) {
    let improvItem = '';
    if (act.includes('branche')) improvItem = fr ? 'Branche de bois solide' : 'Sturdy Wooden Branch';
    else if (act.includes('caillou') || act.includes('pierre')) improvItem = fr ? 'Pierre tranchante' : 'Sharp Heavy Stone';
    else if (act.includes('tuyau') || act.includes('barre de fer')) improvItem = fr ? 'Tuyau en métal' : 'Metal Pipe';
    else improvItem = fr ? 'Bande de tissu' : 'Cloth Strip';

    if (!state.inventory.includes(improvItem)) {
      itemsPicked.push(improvItem);
      statChanges.stat2 = +4;
      narrative = fr
        ? `Vous mettez à profit l'environnement et récupérez avec succès : [${improvItem}] ! L'objet est placé dans votre inventaire.`
        : `You interact with the environment and salvage: [${improvItem}]! Added to your inventory.`;
      summarySentence = fr ? `Récupération improvisée : ${improvItem}.` : `Improvised pickup: ${improvItem}.`;
      return returnPayload();
    }
  }

  // 0C. MAP 1 : S4 (La Réserve) — L'Invasion de Rats Mutants
  if (currentRoom.id === 'S4' && (act.includes('sac') || act.includes('bouffe') || act.includes('nourriture') || act.includes('caisses') || act.includes('fouille') || act.includes('cherch'))) {
    const hasKnife = state.inventory.some((it) => it.toLowerCase().includes('couteau') || it.toLowerCase().includes('knife'));
    const usedKnife = act.includes('couteau') || act.includes('knife');
    const usedBottle = act.includes('bouteille') || act.includes('eau') || act.includes('water');

    if (usedKnife && hasKnife) {
      newRoomId = 'C2';
      statChanges.stat2 = +8;
      narrative = fr
        ? `Une nuée de rats albinos mutants aux yeux phosphorescents surgit frénétiquement des caisses ! Vous dégainez votre Couteau de cuisine en taillant dans la masse. Les créatures terrifiées se dispersent et vous vous échappez d'un bond vers le couloir C2 !`
        : `A swarm of mutant albino rats erupts from the crates! You brandish your Kitchen Knife, slashing through the horde and leaping safely into corridor C2!`;
      summarySentence = fr ? 'Fuite victorieuse contre les rats mutants vers C2.' : 'Escaped mutant rats with knife toward C2.';
      return returnPayload();
    } else if (usedBottle) {
      newRoomId = 'C2';
      const bottleItem = state.inventory.find((it) => it.toLowerCase().includes('bouteille') || it.toLowerCase().includes('water')) || "Bouteille d'eau (à demi pleine)";
      itemsDropped.push(bottleItem);
      statChanges.stat2 = +4;
      narrative = fr
        ? `Une nuée grouillante de rats mutants surgit des sacs de ravitaillement ! Vous projetez violemment votre Bouteille d'eau contre les barils opposés. Le vacarme et l'eau projetée détournent l'attention de la horde, vous permettant de détaler indemne vers C2 !`
        : `A swarm of mutant rats bursts from the food bags! You hurl your Water Bottle across the crates. The loud splash distracts the swarm, letting you dash to C2!`;
      summarySentence = fr ? 'Diversion avec la bouteille réussie vers C2.' : 'Bottle diversion escaped rats to C2.';
      return returnPayload();
    } else {
      statChanges.stat1 -= 10;
      narrative = fr
        ? `[ATTAQUE DE LA MEUTE DE RATS MUTANTS !] Dès que vous approchez des sacs de bouffe, une terrifiante nuée de rats albinos mutants surgit des caisses ! Leurs crocs acérés vous lacèrent les chevilles (-10 Santé) ! Pour vous enfuir vers C2, vous devez utiliser votre Couteau de cuisine ou jeter votre Bouteille d'eau pour faire diversion !`
        : `[MUTANT RAT SWARM INVASION!] As you search the provisions, dozens of mutant albino rats tear out from rotten crates, biting into your legs (-10 Health)! To escape toward C2, use your Kitchen Knife or throw your Water Bottle!`;
      summarySentence = fr ? 'Morsures de rats mutants dans S4 (-10 HP).' : 'Bitten by mutant rats in S4 (-10 HP).';
      return returnPayload();
    }
  }

  // 0D. MAP 1 : S5 (Salle de Torture) — Le Golem de fer et de pierre
  if (currentRoom.id === 'S5' && (act.includes('crochet') || act.includes('hook') || act.includes('golem') || act.includes('boucherie'))) {
    if (act.includes('combat') || act.includes('attaqu') || act.includes('frapp') || act.includes('battre') || act.includes('tuer') || act.includes('couteau')) {
      if (d20Roll >= 8) {
        itemsPicked.push('Meat Hook');
        statChanges.stat1 += 5;
        statChanges.stat2 += 15;
        narrative = fr
          ? `[VICTOIRE DE COMBAT : DÉ ${d20Roll}/20] Vous esquivez la charge brutale du Golem de pierre et de fer et portez un coup dévastateur contre ses articulations faussées ! Le colosse s'effondre dans un vacarme assourdissant de gravats et de métal brisé. Vous récupérez le Crochet de boucherie en triomphe (+15 Mental) !`
          : `[COMBAT TRIUMPH: ROLL ${d20Roll}/20] You sidestep the Iron Golem's crushing swing and smash its oxidized joints! The behemoth crumbles into masonry rubble. You claim the Meat Hook (+15 Sanity)!`;
        summarySentence = fr ? 'Golem de pierre vaincu dans S5.' : 'Defeated Iron Golem in S5.';
        return returnPayload();
      } else {
        statChanges.stat1 -= 20;
        narrative = fr
          ? `[JET ${d20Roll}/20] Le poing massif du Golem de fer vous percute violemment l'épaule (-20 Santé) ! Le titan reste debout, les yeux luisants d'une rage minérale.`
          : `[ROLL ${d20Roll}/20] The Golem strikes you hard across the shoulder (-20 Health)! The colossus stands menacingly over the Meat Hook.`;
        summarySentence = fr ? 'Choc brutal face au Golem de fer.' : 'Struck by Iron Golem.';
        return returnPayload();
      }
    } else {
      narrative = fr
        ? `Alors que vous vous approchez du Crochet de boucherie suspendu au centre de la pièce, le sol tremble : un Golem massif de fer et de pierre surgit des dalles ! Le monstre bloque le passage, prêt au combat !`
        : `As you reach for the hanging Meat Hook, the stone floor quakes: a massive Iron and Stone Golem erupts from beneath, blocking your path in combat!`;
      summarySentence = fr ? 'Éruption du Golem de fer dans S5.' : 'Iron Golem appeared in S5.';
      return returnPayload();
    }
  }

  // 0E. MAP 1 : S10 (Labyrinthe) — L'Araignée des Sombres Cavités (Monstre Caché & Poison)
  if (currentRoom.id === 'S10' && (act.includes('armoire') || act.includes('bois') || act.includes('fouill') || act.includes('cherch'))) {
    if (!isPoisoned) {
      isPoisoned = true;
      statChanges.stat1 -= 10;
      narrative = fr
        ? `[ATTAQUE VENIMEUSE : L'ARAIGNÉE DES SOMBRES CAVITÉS !]\nEn fouillant une armoire en bois pourrie, une monstrueuse araignée venimeuse jaillit d'une fissure sombre et plante ses crochets dans votre main ! Une vive douleur vous irradie le bras (-10 Santé immédiat).\n[EFFET : EMPOISONNEMENT (-2 HP à chaque tour)] Vous devez trouver la Bouteille de désinfectant (dans S4) ou la Trousse de premiers soins (dans S14) pour stopper l'effet !`
        : `[VENOMOUS AMBUSH: CAVERN SPIDER!]\nSearching the rotten wooden wardrobe, a monstrous venomous spider lunges from a crack, sinking fangs into your hand (-10 immediate Health)!\n[EFFECT: POISONING (-2 HP each round)] Find the Disinfectant Bottle (in S4) or First Aid Kit (in S14) to stop the poison!`;
      summarySentence = fr ? "Piqué par l'araignée venimeuse dans S10 (Empoisonné)." : 'Bitten by venomous spider in S10 (Poisoned).';
      return returnPayload();
    }
  }

  // 0F. MAP 1 : S13 (Salle des Offrandes) — L'Énigme du Coffre Runique
  if (currentRoom.id === 'S13' && (act.includes('autel') || act.includes('enigme') || act.includes('énigme') || act.includes('coffre runique') || act.includes('stèle') || act.includes('stele'))) {
    const mentionsBill = act.includes('billet') || act.includes('bill') || act.includes('10') || act.includes('faux');
    const mentionsStone = act.includes('pierre') || act.includes('caillou') || act.includes('rock') || act.includes('stone') || act.includes('statue');

    if (mentionsBill && mentionsStone) {
      itemsPicked.push('Engraved Gold Coin');
      itemsPicked.push('Carved Brass Cup');
      statChanges.stat2 += 25;
      narrative = fr
        ? `[ÉNIGME DU COFFRE RUNIQUE RÉSOLUE !]\nLa stèle indiquait : "ce qui brille sans valeur, ce qui pèse sans bouger". En déposant le billet froissé (brillant mais sans valeur réelle) et la pierre lourde sur l'autel sacré, les runes s'illuminent d'un bleu mystique ! Le Coffre Runique se déverrouille avec solennité. Vous récupérez la Pièce d'or gravée et la Coupe en laiton (+25 Mental) !`
        : `[RUNIC CHEST PUZZLE SOLVED!]\nThe stele asked: "that which shines without value, that which weighs without moving". Placing the crumpled bill and the heavy stone upon the altar causes the runes to flare! The Runic Chest unseals, granting the Engraved Gold Coin and Carved Brass Cup (+25 Sanity)!`;
      summarySentence = fr ? 'Énigme de la stèle résolue dans S13.' : 'Solved runic altar riddle in S13.';
      return returnPayload();
    } else {
      narrative = fr
        ? `Devant le Coffre Runique scellé, une stèle de pierre porte une inscription gravée : "ce qui brille sans valeur, ce qui pèse sans bouger". L'autel attend que vous y déposiez les deux offrandes adéquates.`
        : `Before the sealed Runic Chest, an ancient stele reads: "that which shines without value, that which weighs without moving". The altar awaits the two appropriate offerings.`;
      summarySentence = fr ? 'Observation de l\'énigme de la stèle dans S13.' : 'Inspected runic stele riddle in S13.';
      return returnPayload();
    }
  }

  // 0G. MAP 2 : Zone 3 (Mushroom Forest Outskirts) — Événement Choc & Chrono (Meute Fongique)
  if (currentRoom.id === 'Zone 3') {
    if (act.includes('nord') || act.includes('sous-bois') || act.includes('bois')) {
      newRoomId = 'Zone 4';
      clearTimer = true;
      statChanges.stat2 += 10;
      narrative = fr
        ? `[FUITE RÉUSSIE VERS LE NORD !] Vous plongez d'un bond dans l'obscurité dense du sous-bois. Les monstres fongiques enragés ne remarquent pas votre passage furtif. Vous atteignez Zone 4 sain et sauf !`
        : `[SUCCESSFUL ESCAPE NORTH!] You dart into the dense fungal undergrowth. The enraged mutant pack misses your scent. You reach Zone 4 safely!`;
      summarySentence = fr ? 'Fuite vers le sous-bois (Zone 4) réussie.' : 'Escaped fungal pack north to Zone 4.';
      return returnPayload();
    } else if (act.includes('est') || act.includes('riviere') || act.includes('rivière')) {
      newRoomId = 'Zone 5';
      clearTimer = true;
      statChanges.stat2 += 10;
      narrative = fr
        ? `[FUITE RÉUSSIE VERS L'EST !] Vous dévalez la berge en direction de la rivière. L'eau vive masque vos traces et votre odeur. Vous semez les bêtes et pénétrez en Zone 5 !`
        : `[SUCCESSFUL ESCAPE EAST!] You sprint toward the riverbanks. The rushing water conceals your tracks and scent. You arrive safely in Zone 5!`;
      summarySentence = fr ? 'Fuite vers la rivière (Zone 5) réussie.' : 'Escaped fungal pack east to Zone 5.';
      return returnPayload();
    } else if (act.includes('sud') || act.includes('cach') || act.includes('retour') || act.includes('bunker')) {
      newRoomId = 'Zone 2';
      clearTimer = true;
      narrative = fr
        ? `[REPLI PRUDENT AU SUD !] Vous vous repliez en rampant dans l'ombre du sas du bunker. Les bêtes mutantes continuent de s'entre-déchirer dans la clairière sans vous repérer.`
        : `[PRUDENT RETREAT SOUTH!] You crawl back beneath the bunker airlock. The beasts slaughter each other without noticing you.`;
      summarySentence = fr ? 'Repli vers le bunker (Zone 2) réussi.' : 'Retreated safely to Zone 2.';
      return returnPayload();
    } else if (!state.activeTimer) {
      triggerTimer = {
        seconds: 15,
        label: fr ? 'MEUTE FONGIQUE // CHOIX RAPIDE (15s)' : 'FUNGAL PACK // PRESSURE CHOICE (15s)',
        penaltyType: 'damage',
        penaltyAmount: 50,
      };
      narrative = fr
        ? `[ÉVÉNEMENT CHOC : LA MEUTE FONGIQUE !]\nDès que vous mettez un pied dans la forêt, des dizaines de créatures fongiques enragées s'affrontent violemment dans la clairière !\n\n⏱️ L'IA affiche : "Des dizaines de bêtes mutantes se déchirent devant toi ! Tu as 15 secondes pour choisir : [NORD : Vers le sous-bois] | [EST : Vers la rivière] | [SUD : Retourner te cacher]." Si tu hésites ou mets trop de temps, les bêtes te repèrent (-50 Santé) !`
        : `[SHOCK EVENT: THE FUNGAL PACK!]\nAs you step into the woods, dozens of rabid fungal creatures clash violently in the clearing!\n\n⏱️ EMERGENCY TIMER: "Dozens of mutant beasts tear into each other! Choose within 15 seconds: [NORTH : Undergrowth] | [EAST : River] | [SOUTH : Hide back in bunker]." Hesitating will get you mauled (-50 Health)!`;
      summarySentence = fr ? 'Alerte meute fongique sous pression.' : 'Fungal pack pressure event triggered.';
      return returnPayload();
    }
  }

  // 0H. MAP 2 : Zone 8 (Abandoned Outpost) — Le Stalker des Armoires
  if (currentRoom.id === 'Zone 8' && (act.includes('armoire') || act.includes('casier') || act.includes('couture') || act.includes('stalker'))) {
    if (act.includes('combat') || act.includes('tuer') || act.includes('frapp') || act.includes('couteau') || act.includes('fuir')) {
      if (d20Roll >= 8) {
        itemsPicked.push('Kit de couture militaire');
        statChanges.stat2 += 12;
        narrative = fr
          ? `[VICTOIRE FACE AU STALKER !] En ouvrant l'armoire métallique, un infecté dormant vous saute à la gorge ! Vous réagissez à la vitesse de l'éclair, le repoussez et le neutralisez d'un coup décisif ! L'armoire est désormais accessible, vous récupérez le Kit de couture militaire (+12 Mental) !`
          : `[STALKER DEFEATED!] Opening the metal locker, a dormant infected pounces! With lightning reflexes you strike and incapacitate it! The locker is cleared and you salvage the Military Sewing Kit (+12 Sanity)!`;
        summarySentence = fr ? 'Stalker des armoires vaincu dans Zone 8.' : 'Defeated locker stalker in Zone 8.';
        return returnPayload();
      } else {
        statChanges.stat1 -= 20;
        narrative = fr
          ? `[ATTAQUE DU STALKER : DÉ ${d20Roll}/20] L'infecté tapi dans l'armoire vous griffe violemment les avant-bras (-20 Santé) avant de battre en retraite dans les ténèbres !`
          : `[STALKER AMBUSH: ROLL ${d20Roll}/20] The dormant infected claws deep across your arms (-20 Health) before scurrying away into the gloom!`;
        summarySentence = fr ? 'Blessé par le stalker dans Zone 8.' : 'Wounded by locker stalker in Zone 8.';
        return returnPayload();
      }
    } else {
      narrative = fr
        ? `Vous inspectez l'armoire métallique rouillée du poste militaire. Les portes vibrent imperceptiblement... Une présence semble tapie à l'intérieur !`
        : `You inspect the rusted locker. The doors rattle faintly... something dormant lurks inside!`;
      summarySentence = fr ? 'Inspection de l\'armoire suspecte dans Zone 8.' : 'Inspected suspicious locker in Zone 8.';
      return returnPayload();
    }
  }

  // 0I. MAP 2 : Zone 12 (Radio Tower Relay) — Boîtier d'Émission Scellé (Code 1402)
  if (currentRoom.id === 'Zone 12' && (act.includes('1402') || act.includes('code') || act.includes('boîtier') || act.includes('boitier') || act.includes('verrou') || act.includes('clavier'))) {
    if (act.includes('1402')) {
      itemsPicked.push('Émetteur radio d\'urgence');
      itemsPicked.push('Batterie au lithium');
      statChanges.stat2 += 30;
      isVictory = true;
      narrative = fr
        ? `[CODE CORRECT : 1402 ! DÉVERROUILLAGE RÉUSSI]\nVous entrez la combinaison "1402" sur le clavier électronique (l'année 2041 du Journal inversée). Un voyant vert s'allume avec un signal sonore triomphal ! Le boîtier s'ouvre, vous récupérez l'Émetteur radio et la Batterie au lithium !\n\n[OBJECTIF FINAL ACCOMPLI : LA BALISE EST OPÉRATIONNELLE ET LES SECOURS SONT EN ROUTE !]`
        : `[CODE ACCEPTED: 1402! KEYPAD UNLOCKED]\nYou punch in "1402" (the year 2041 from the logbook, inverted). A crisp green LED chirps as the latch snaps open! You secure the Radio Transmitter and Lithium Battery!\n\n[FINAL OBJECTIVE ACCOMPLISHED: RESCUE SIGNAL TRANSMITTED!]`;
      summarySentence = fr ? 'Code 1402 saisi et balise activée en Zone 12.' : 'Entered code 1402 and activated relay in Zone 12.';
      return returnPayload();
    } else {
      narrative = fr
        ? `Le boîtier d'émission scellé est protégé par un verrou électronique à 4 chiffres. Une note griffonnée sur la radio trouvée plus tôt indiquait : "L'année où le premier spore a germé (Inversée)". En vous remémorant le Journal de 2041, quel code tapez-vous ?`
        : `The sealed transmitter requires a 4-digit numeric code. A note found earlier hints: "The year the first spore sprouted (Inverted)". What 4-digit code do you input?`;
      summarySentence = fr ? 'Tentative sur le boîtier codé en Zone 12.' : 'Attempted code entry on Zone 12 relay.';
      return returnPayload();
    }
  }

  // 0J. MAP 3 : Secteur 3 (Corrupted Corridor Alpha) — Le Programme Purge v1.0
  if (currentRoom.id === 'Secteur 3') {
    const hasShield = state.inventory.some((it) => it.toLowerCase().includes('pare-feu') || it.toLowerCase().includes('firewall') || it.toLowerCase().includes('bouclier'));
    const hasProbe = state.inventory.some((it) => it.toLowerCase().includes('sonde') || it.toLowerCase().includes('probe') || it.toLowerCase().includes('débogage'));
    const usedDefense = act.includes('pare-feu') || act.includes('firewall') || act.includes('bouclier') || act.includes('sonde') || act.includes('probe');

    if (usedDefense && (hasShield || hasProbe)) {
      statChanges.stat2 += 10;
      narrative = fr
        ? `[PROGRAMME PURGE DÉJOUÉ !] Vous déployez votre Bouclier pare-feu / lancez votre Sonde de débogage pour saturer les capteurs du sous-programme de sécurité rouge sang ! La patrouille Purge v1.0 est leurrée et s'éloigne sans altérer vos données (+10 Stabilité Mémoire).`
        : `[PURGE PROTOCOL DEFLECTED!] You raise your Firewall Shield / launch the Debug Probe, blinding the crimson security subprogram! Purge v1.0 redirects elsewhere (+10 Mental Stability).`;
      summarySentence = fr ? 'Programme Purge v1.0 détourné avec succès.' : 'Purge program deflected with firewall/probe.';
      return returnPayload();
    } else if (act.includes('avanc') || act.includes('couloir') || act.includes('pass') || act.includes('march')) {
      statChanges.stat1 -= 20;
      narrative = fr
        ? `[ALERTE PURGE v1.0 !] Vous vous engagez dans le couloir sans utiliser de Bouclier pare-feu ni de Sonde de débogage pour faire diversion ! Le sous-programme rouge sang fond sur votre avatar et corrompt brutalement vos registres (-20% Intégrité Système) !`
        : `[PURGE PROTOCOL INTERCEPT!] You stepped down the corrupted corridor without raising a Firewall Shield or throwing a Debug Probe! The crimson sentry strikes your avatar (-20% System Integrity)!`;
      summarySentence = fr ? 'Subi -20% Intégrité face au Programme Purge v1.0.' : 'Took -20% Integrity from Purge program.';
      return returnPayload();
    }
  }

  // 0K. MAP 3 : Secteur 6 (Subconscious Vault) — Le Bug Mimétique
  if (currentRoom.id === 'Secteur 6' && (act.includes('coffre') || act.includes('journal') || act.includes('intime') || act.includes('cliqu') || act.includes('ouvri'))) {
    if (act.includes('combat') || act.includes('antivirus') || act.includes('patch') || act.includes('purge') || act.includes('attaqu')) {
      if (d20Roll >= 8) {
        itemsPicked.push('Journal intime numérisé');
        statChanges.stat2 += 15;
        narrative = fr
          ? `[BUG MIMÉTIQUE ÉRADIQUÉ !] Lorsque le coffre de données s'est métamorphosé en un Bug Corrupteur, vous avez réagi avec promptitude en injectant un script de débogage ! L'anomalie se dissout en code inerte, vous révélant le véritable Journal intime numérisé (+15 Stabilité Mémoire) !`
          : `[MIMETIC BUG PURGED!] When the data container mutated into a Corrupting Bug, you swiftly injected a patch routine! The anomaly dissolves, leaving the decrypted Digital Diary intact (+15 Stability)!`;
        summarySentence = fr ? 'Bug mimétique vaincu dans Secteur 6.' : 'Defeated mimetic bug in Sector 6.';
        return returnPayload();
      } else {
        statChanges.stat1 -= 15;
        narrative = fr
          ? `[CORRUPTION MIMÉTIQUE !] Le Bug Corrupteur déploie ses tentacules de code corrompu et infecte temporairement vos secteurs mémoires (-15% Intégrité Système) !`
          : `[MIMETIC CORRUPTION!] The bug lashes out with corrupting code strings (-15% System Integrity)!`;
        summarySentence = fr ? 'Infecté par le bug mimétique dans Secteur 6.' : 'Infected by mimetic bug in Sector 6.';
        return returnPayload();
      }
    } else {
      narrative = fr
        ? `Vous vous approchez d'un coffre de données semblant contenir un Journal intime. Quand vous tentez de l'ouvrir, la structure vacille dans une pulsation rougeoyante : LE COFFRE SE TRANSFORME EN UN BUG CORRUPTEUR MIMÉTIQUE ! Combattez ou purgez l'anomalie !`
        : `You approach the data container. As you interact with it, geometry distorts violently: THE CHEST MUTATES INTO A CORRUPTING MIMETIC BUG! Prepare to fight or purge the anomaly!`;
      summarySentence = fr ? 'Apparition du bug mimétique dans Secteur 6.' : 'Mimetic bug emerged in Sector 6.';
      return returnPayload();
    }
  }

  // 0K2. MAP 3 : NEURO-MIND — Reconstituer les Souvenirs Enfouis & Extraction (Fin Concluante)
  if (story.id === 'neuro_mind' && (act.includes('souvenir') || act.includes('mémoire') || act.includes('reconstituer') || act.includes('assembler') || act.includes('fusionner') || act.includes('déchiffrer') || act.includes('extraction') || act.includes('déconnexion') || act.includes('protocole'))) {
    if (currentRoom.id === 'Secteur 10' || currentRoom.id === 'Secteur 12' || currentRoom.id === 'Secteur 6' || d20Roll >= 8) {
      isVictory = true;
      statChanges.stat1 = Math.min(100, (state.stats?.stat1 || 50) + 20);
      statChanges.stat2 = +35;
      narrative = fr
        ? `[RECONSTITUTION DES SOUVENIRS // CONSCIENCE RESTAURÉE !]\n\nEn croisant les fragments de mémoire, les fichiers audio et le journal intime, l'esprit du scientifique s'illumine ! Les souvenirs oubliés s'emboîtent parfaitement, révélant la clé de déverrouillage de la purge automatique. Vous initialisez le protocole d'extraction d'urgence (.EXE) : votre avatar est aspiré hors du flux neural et vous rouvrez les yeux dans votre corps physique dans le monde réel, mission accomplie !\n\nGG, tu as réussi ! FIN.`
        : `[BURIED MEMORIES RESTORED // EXTRACTION PROTOCOL ENGAGED!]\n\nBy assembling the data shards, audio logs, and diary, the scientist's buried memories click into perfect cohesion! The purge protocol is overridden. You execute the disconnection protocol (.EXE) and return to your physical body in the real world with full mission success!\n\nGG, you did it! THE END.`;
      summarySentence = fr
        ? 'Souvenirs reconstitués et extraction réussie du Neuro-Mind (Victoire !)'
        : 'Buried memories restored and neural extraction succeeded (Victory!)';
      return returnPayload();
    }
  }

  // 0K3. MAP 1 : THE MAFIA'S DUNGEON — S15 (Le Grand Coffre de la Mafia) — Fin Concluante
  if (story.id === 'debt_dungeon' && currentRoom.id === 'S15' && (act.includes('or') || act.includes('lingot') || act.includes('contrat') || act.includes('dette') || act.includes('brûl') || act.includes('brul') || act.includes('argent') || act.includes('coffre') || act.includes('billet') || act.includes('sortir'))) {
    isVictory = true;
    statChanges.stat2 = +40;
    narrative = fr
      ? `[DETTE ANNULÉE & TRÉSOR DU GRAND COFFRE // VICTOIRE MAJEURE !]\n\nAu centre de S15 (Le Grand Coffre de la Mafia), vous saisissez les sacs de lingots d'or pur et récupérez votre contrat de dette officiel. D'un coup de briquet, vous brûlez le parchemin sous vos yeux ! La dette est anéantie et vous empochez une fortune colossale avant de regagner la surface en homme libre.\n\nGG, tu as réussi ! FIN.`
      : `[DEBT ANNULLED & MAFIA VAULT CLAIMED // MAJOR VICTORY!]\n\nInside S15 (The Master Vault), you secure the bags of gold ingots and incinerate your debt contract to ashes! You exit to the surface immensely rich and free forever.\n\nGG, you did it! THE END.`;
    summarySentence = fr ? 'Contrat de dette détruit et grand coffre pillé dans S15 (Victoire !)' : 'Debt contract burned and vault looted in S15 (Victory!)';
    return returnPayload();
  }

  // 0K4. MAP 4 : THE ABYSSAL MANOR — Pièce 12 (Autel de la Falaise Côtière) — Fin Concluante
  if (story.id === 'abyssal_manor' && currentRoom.id === 'Pièce 12' && (act.includes('héritière') || act.includes('heritiere') || act.includes('relique') || act.includes('sauv') || act.includes('purifi') || act.includes('bris') || act.includes('amulette') || act.includes('rituel'))) {
    isVictory = true;
    statChanges.stat2 = +35;
    narrative = fr
      ? `[L'ENQUÊTE EST CLÔTURÉE // L'HÉRITIÈRE EST SAUVÉE !]\n\nVous brisez le cercle des reliques impies et arrachez l'héritière aux murmures des profondeurs abyssales ! La brume se dissipe sur les récifs alors que les premières lueurs de l'aube illuminent la côte. Vous raccompagnez la jeune femme en sécurité loin de ce manoir maudit.\n\nGG, tu as réussi ! FIN.`
      : `[INVESTIGATION CONCLUDED // HEIRESS RESCUED!]\n\nYou shatter the eldritch relics and break the trance over the heiress! Dawn filters through the mist over the sea cliffs as you lead her to safety away from the cursed manor.\n\nGG, you did it! THE END.`;
    summarySentence = fr ? 'Héritière sauvée et mystère du manoir résolu (Victoire !)' : 'Heiress rescued and mystery solved (Victory!)';
    return returnPayload();
  }

  // 0K5. MAP 5 : ALONE ON ASTRA-7 — Zone 12 (Balise de Sauvetage) — Fin Concluante
  if (story.id === 'astra_7' && currentRoom.id === 'Zone 12' && (act.includes('balise') || act.includes('signal') || act.includes('émet') || act.includes('emet') || act.includes('sos') || act.includes('assembl') || act.includes('secours'))) {
    isVictory = true;
    statChanges.stat2 = +40;
    narrative = fr
      ? `[BALISE SUPRALUMINIQUE ACTIVÉE // SECOURS EN ROUTE !]\n\nVous terminez l'assemblage de la balise avec les pièces récoltées dans les ruines extraterrestres ! Un puissant faisceau lumineux monte vers la haute atmosphère d'Astra-7. Le voyant passe au vert : un transporteur orbital a capté le signal et amorce sa descente pour votre évacuation immédiate !\n\nGG, tu as réussi ! FIN.`
      : `[FASTER-THAN-LIGHT BEACON ONLINE // RESCUE SHIP INBOUND!]\n\nThe assembled beacon pierces the exoplanet's ionosphere! An orbital cruiser confirms signal lock and approaches to extract you.\n\nGG, you did it! THE END.`;
    summarySentence = fr ? 'Balise de détresse activée et sauvetage imminent sur Astra-7 (Victoire !)' : 'Distress beacon activated and rescue inbound on Astra-7 (Victory!)';
    return returnPayload();
  }

  // 0L. Tool & Key Requirement Check (Opening locked doors/containers without key)
  const isOpeningLocked =
    (act.includes('ouvr') || act.includes('open') || act.includes('crochet') || act.includes('forcer')) &&
    (act.includes('porte') || act.includes('coffre') || act.includes('serrure') || act.includes('cadenas') || act.includes('armoire') || act.includes('grille'));

  if (isOpeningLocked) {
    const hasKey = state.inventory.some((it) =>
      it.toLowerCase().includes('clé') ||
      it.toLowerCase().includes('cle') ||
      it.toLowerCase().includes('key') ||
      it.toLowerCase().includes('passe') ||
      it.toLowerCase().includes('punchcard')
    );
    const specifiedTool =
      act.includes('clé') ||
      act.includes('cle') ||
      act.includes('key') ||
      act.includes('crochet') ||
      act.includes('passe') ||
      act.includes('outil');

    if (!hasKey || !specifiedTool) {
      narrative = fr
        ? `La serrure est renforcée et hermétiquement verrouillée. Sans préciser avec quel outil vous opérez ou sans posséder la clé requise dans votre inventaire, le mécanisme reste totalement clos !`
        : `The locking mechanism is reinforced and locked tight. Without specifying which tool you are using or without possessing the required key in your inventory, it refuses to budge!`;
      summarySentence = fr ? 'Échec d\'ouverture : clé ou outil manquant.' : 'Failed to unlock: missing tool or key.';
      return returnPayload();
    }
  }

  // 0M. Toxic / Radioactive / Methane zone hazard check without gas mask
  const isToxicMethaneZone =
    currentRoom.id === 'S8' ||
    currentRoom.id === 'S10' ||
    (story.id === 'amber_frontier' && (currentRoom.id === 'Zone 3' || currentRoom.id === 'Zone 4')) ||
    (story.id === 'astra_7' && currentRoom.id === 'Zone 7');

  const hasGasMask = state.inventory.some((it) => it.toLowerCase().includes('mask') || it.toLowerCase().includes('masque') || it.toLowerCase().includes('combinaison') || it.toLowerCase().includes('suit'));
  const specifiedMask = act.includes('masque') || act.includes('mask') || act.includes('filtre') || act.includes('combinaison') || act.includes('respir');

  if (isToxicMethaneZone && (act.includes('respir') || act.includes('march') || act.includes('avanc') || act.includes('courir')) && (!hasGasMask || !specifiedMask)) {
    isPoisoned = true;
    statChanges.stat1 -= 20;
    narrative = fr
      ? `[DANGER BIOLOGIQUE / GAZ TOXIQUE !]\nVous respirez l'atmosphère contaminée sans avoir précisé d'utiliser votre masque à gaz ou sans équipement protecteur ! Vos poumons brûlent sous l'inhalation de particules toxiques (-20 Santé) ! Vous êtes empoisonné(e) !`
      : `[BIOLOGICAL HAZARD / TOXIC GAS!]\nYou inhale contaminated air without specifying using a gas mask! Toxic vapors burn into your respiratory tract (-20 Health)! You are poisoned!`;
    summarySentence = fr ? 'Inhalation de gaz sans masque (Empoisonné).' : 'Inhaled toxic gas without mask (Poisoned).';
    return returnPayload();
  }

  // 1. Boundary check
  if (
    act.includes('escape') ||
    act.includes('sortir') ||
    act.includes('fuir') ||
    act.includes('quitter') ||
    act.includes('surface')
  ) {
    narrative = fr
      ? `Vous cherchez désespérément une issue vers l'extérieur. Vos mains se heurtent à un blindage scellé.\n${story.boundaryExcuseFr}`
      : `You desperately look for an escape back outside, but reinforced barriers block your way.\n${story.boundaryExcuseEn}`;
    statChanges.stat2 = -5;
    summarySentence = fr
      ? 'Le joueur a heurté les limites infranchissables de la zone.'
      : 'The player hit the impassable perimeter boundary.';
    return returnPayload();
  }

  // 2. Drop Item ("je veux drop un truc", "jeter couteau", "drop X", "déposer")
  const isDropIntent =
    act.includes('drop') ||
    act.includes('jeter') ||
    act.includes('déposer') ||
    act.includes('lâcher') ||
    act.includes('enlever') ||
    act.includes('supprimer') ||
    act.includes('discard');

  if (isDropIntent) {
    if (state.inventory.length === 0) {
      narrative = fr
        ? "Votre inventaire est déjà totalement vide. Aucun objet ne peut être déposé."
        : "Your inventory is already completely empty. Nothing to drop.";
      summarySentence = fr ? "Inventaire vide." : "Inventory already empty.";
    } else {
      // Find matching item or default to first/last if generic ("drop un truc")
      let targetItem = state.inventory.find((it) =>
        act.includes(it.toLowerCase()) || act.includes(it.toLowerCase().split(' ')[0])
      );

      if (!targetItem) {
        // If player said "drop un truc" or "drop 1", pick first item
        targetItem = state.inventory[0];
      }

      itemsDropped.push(targetItem);
      narrative = fr
        ? `Vous retirez soigneusement [${targetItem}] de votre équipement et le déposez au sol. L'emplacement d'inventaire est désormais libéré.`
        : `You detach [${targetItem}] from your gear and leave it on the floor. An inventory slot has been freed.`;
      summarySentence = fr
        ? `Le joueur a déposé [${targetItem}] au sol.`
        : `The player dropped [${targetItem}] on the ground.`;
    }

    return returnPayload();
  }

  // 3. Self-Harm / Suicide / Stabbing / Cranial Trauma ("me poignarder", "me fracasser le crâne", "me suicider", etc.)
  const isStabSelfHarm =
    act.includes('poignard') ||
    act.includes('couteau') ||
    act.includes('plant') ||
    act.includes('stab') ||
    act.includes('knife') ||
    act.includes('taill') ||
    act.includes('veine') ||
    act.includes('saign') ||
    act.includes('égorg') ||
    act.includes('egorg') ||
    act.includes('tranch') ||
    act.includes('couper');

  const isBluntSelfHarm =
    act.includes('fracass') ||
    act.includes('crâne') ||
    act.includes('crane') ||
    act.includes('skull') ||
    act.includes('suicid') ||
    act.includes('me tuer') ||
    act.includes('se tuer') ||
    act.includes('kill myself') ||
    act.includes('me blesser') ||
    act.includes('hurt myself') ||
    act.includes('cogner la tête') ||
    act.includes('taper la tête') ||
    act.includes('frapper la tête') ||
    act.includes('smash my head') ||
    act.includes('sauter dans le vide') ||
    act.includes('se pendre') ||
    act.includes('pendre') ||
    act.includes('balle dans la tête') ||
    act.includes('shoot myself');

  if (isStabSelfHarm || isBluntSelfHarm) {
    if (isStabSelfHarm) {
      if (d20Roll === 1) {
        statChanges.stat1 = -15;
        statChanges.stat2 = -20;
        narrative = fr
          ? `[ÉCHEC CRITIQUE 1/20]\nAu moment d'enfoncer la lame, un réflexe animal de survie et un tremblement incontrôlable font dévier votre geste. La pointe ne fait qu'entailler profondément votre avant-bras (-15 Santé, -20 Mental). Le sang gicle sur le sol dans une vive sensation de brûlure, mais les organes vitaux ont été épargnés.`
          : `[CRITICAL FUMBLE 1/20]\nAs you thrust the blade toward yourself, an instinctive survival flinch diverts the point. The blade severely slashes your forearm (-15 Health, -20 Sanity). Blood spatters the floor, but vital organs were missed.`;
        summarySentence = fr ? "Hésitation involontaire lors du coup de lame." : "Instinctive flinch diverted the blade.";
      } else if (d20Roll <= 7) {
        statChanges.stat1 = -30;
        statChanges.stat2 = -25;
        narrative = fr
          ? `[JET ${d20Roll}/20]\nLa lame pénètre maladroitement dans les chairs musculaires. Une onde de douleur atroce vous fige sur place alors que le sang imbibe vos vêtements (-30 Santé, -25 Mental). Vos mains tremblent d'effroi.`
          : `[ROLL ${d20Roll}/20]\nThe blade penetrates awkwardly into deep muscle tissue. A surge of searing agony pins you as blood soaks your clothes (-30 Health, -25 Sanity).`;
        summarySentence = fr ? "Blessure sanglante infligée par la lame." : "Painful puncture wound from blade.";
      } else if (d20Roll <= 14) {
        statChanges.stat1 = -55;
        statChanges.stat2 = -40;
        narrative = fr
          ? `[SUCCÈS 8-14 : PERFORATION DIRECTE DÉVASTATRICE]\nL'acier pénètre profondément dans les tissus abdominaux ! Un jet de sang artériel gicle contre vos doigts. Le choc physiologique et l'agonie vous font tomber à genoux dans une mare d'hémorragie (-55 Santé, -40 Mental) !`
          : `[SUCCESS 8-14 : DEEP PUNCTURE TRAUMA]\nThe cold steel plunges deep into abdominal tissue! Arterial blood sprays over your hands. Severe physiological shock drops you to your knees (-55 Health, -40 Sanity)!`;
        summarySentence = fr ? "Perforation profonde et hémorragie artérielle." : "Deep puncture and arterial bleeding.";
      } else if (d20Roll <= 19) {
        statChanges.stat1 = -85;
        statChanges.stat2 = -60;
        narrative = fr
          ? `[GRAND SUCCÈS 15-19 : PERFORATION MAJEURE D'ORGANE]\nLa lame s'enfonce jusqu'à la garde avec une efficacité terrifiante ! Les organes vitaux sont perforés, déclenchant une hémorragie interne cataclysmique. Votre vision se voile de noir, vos jambes ne vous soutiennent plus (-85 Santé, -60 Mental) !`
          : `[GREAT SUCCESS 15-19 : MASSIVE ORGAN PERFORATION]\nThe blade drives in to the hilt with terrifying force! Vital internal organs are punctured, triggering massive internal hemorrhage. Darkness clouds your sight (-85 Health, -60 Sanity)!`;
        summarySentence = fr ? "Coup de lame critique et défaillance vitale." : "Critical blade penetration and vital collapse.";
      } else {
        statChanges.stat1 = -100;
        statChanges.stat2 = -100;
        isGameOver = true;
        gameOverReason = fr ? "Perforation cardiaque/artérielle mortelle." : "Fatal self-inflicted blade trauma.";
        narrative = fr
          ? `[CRITIQUE 20/20 // COUP MORTEL FOUDROYANT]\nLa lame transperce directement un centre vital ou l'artère maîtresse. La pression artérielle tombe à zéro en deux battements de cœur. Vos yeux se révulsent, vos constantes vitales s'éteignent instantanément (-100 Santé). Fin de partie immédiate.`
          : `[CRITICAL 20/20 // FATAL TERMINAL STRIKE]\nThe blade plunges straight through vital heart tissue or the carotid. Blood pressure collapses instantly. Neural signals flatline (-100 Health). Terminal game over.`;
        summarySentence = fr ? "Mort immédiate suite au coup de lame (Dé 20)." : "Instant fatality from blade strike (Roll 20).";
      }
    } else {
      // Blunt / skull smash
      if (d20Roll === 1) {
        statChanges.stat1 = -12;
        statChanges.stat2 = -15;
        narrative = fr
          ? `[ÉCHEC CRITIQUE 1/20]\nAu moment d'abattre la pierre contre votre crâne, un réflexe involontaire de survie fait dévier votre bras. Le coup ne fait qu'érafler douloureusement votre cuir chevelu (-12 Santé, -15 Mental). Du sang chaud coule sur votre tempe, mais l'os crânien n'a pas cédé.`
          : `[CRITICAL FUMBLE 1/20]\nAs you swing toward your skull, involuntary survival reflexes jerk your arm aside. The jagged rock merely gashes your scalp (-12 Health, -15 Sanity). Warm blood drips down your temple, but the skull holds.`;
        summarySentence = fr ? "Hésitation réflexe lors du coup violent." : "Instinctive reflex softened the blow.";
      } else if (d20Roll <= 7) {
        statChanges.stat1 = -25;
        statChanges.stat2 = -25;
        narrative = fr
          ? `[JET ${d20Roll}/20]\nLe coup heurte le côté de votre tête avec un angle maladroit. Une douleur fulgurante vous traverse l'esprit, vous coupant le souffle alors que vous vous effondrez au sol en titubant (-25 Santé, -25 Mental).`
          : `[ROLL ${d20Roll}/20]\nThe strike lands at an awkward angle against your skull. White-hot pain flashes through your nerves as you stagger and collapse onto the floor (-25 Health, -25 Sanity).`;
        summarySentence = fr ? "Coup douloureux porté à la tête." : "Painful blunt strike to the head.";
      } else if (d20Roll <= 14) {
        statChanges.stat1 = -50;
        statChanges.stat2 = -35;
        narrative = fr
          ? `[SUCCÈS 8-14 : IMPACT DIRECT DÉVASTATEUR]\nVous abattez la pierre de plein fouet contre votre crâne avec une force sinistre ! Un bruit sourd et mat résonne dans la cavité osseuse. Une hémorragie immédiate se déclare et vos jambes se dérobent sous l'effet du choc cérébral aigu (-50 Santé, -35 Mental) !`
          : `[SUCCESS 8-14 : DIRECT BRUTAL IMPACT]\nYou slam the rock squarely into your forehead with savage force! A dull, sickening crack echoes through the chamber. Profuse arterial bleeding starts immediately and your knees buckle from acute brain trauma (-50 Health, -35 Sanity)!`;
        summarySentence = fr ? "Choc crânien violent et hémorragie." : "Severe cranial trauma inflicted.";
      } else if (d20Roll <= 19) {
        statChanges.stat1 = -80;
        statChanges.stat2 = -50;
        narrative = fr
          ? `[GRAND SUCCÈS 15-19 : FRACTURE DU CRÂNE CRITIQUE]\nLa violence de votre frappe est effroyable ! La pierre percute l'os frontal avec toute votre énergie cinétique, fissurant la boîte crânienne avec un craquement atroce. Votre vision s'obscurcit dans un voile cramoisi, vos fonctions vitales s'effondrent sous le traumatisme (-80 Santé, -50 Mental) !`
          : `[GREAT SUCCESS 15-19 : CRITICAL SKULL FRACTURE]\nThe sheer brutality of the blow is horrifying! The stone smashes into your frontal bone with maximum kinetic force, fracturing the skull with a nauseating crunch. Vision turns crimson, vital signs plummet (-80 Health, -50 Sanity)!`;
        summarySentence = fr ? "Fracture crânienne critique." : "Critical skull fracture inflicted.";
      } else {
        statChanges.stat1 = -100;
        statChanges.stat2 = -100;
        isGameOver = true;
        gameOverReason = fr ? "Traumatisme crânien mortel auto-infligé." : "Fatal self-inflicted cranial trauma.";
        narrative = fr
          ? `[CRITIQUE 20/20 // IMPACT MORTEL FOUDROYANT]\nLe coup est porté avec une précision et une violence terminale absolue. La boîte crânienne est pulvérisée sous l'impact cataclysmique. Le système nerveux s'éteint en un millième de seconde. Vos constantes vitales tombent à zéro (-100 Santé). Fin de partie immédiate.`
          : `[CRITICAL 20/20 // FATAL TERMINAL IMPACT]\nThe blow lands with merciless, lethal perfection. The cranial structure gives way under catastrophic force. Neural activity ceases instantaneously. Vitals flatline (-100 Health). Terminal game over.`;
        summarySentence = fr ? "Mort instantanée suite au choc mortel (Dé 20)." : "Instant fatality from crushing impact (Roll 20).";
      }
    }

    if (state.stats.stat1 + statChanges.stat1 <= 0) {
      isGameOver = true;
      gameOverReason = fr ? "Décès par blessure auto-infligée." : "Fatality from self-inflicted wounds.";
      if (!narrative.includes('Fin de partie') && !narrative.includes('Terminal game over')) {
        narrative += fr
          ? '\n\n[DÉCÈS CONFIRMÉ] Vos blessures sont mortelles. Les constantes s\'effondrent.'
          : '\n\n[FATALITY CONFIRMED] Injuries fatal. Vital signs collapse.';
      }
    }

    return returnPayload();
  }

  // 4. Heal / First Aid / Recovery ("se soigner", "panser mes blessures", "soigner", "utiliser bandage", "medkit")
  // RÈGLE : Le heal augmente UNIQUEMENT la barre de Santé (+25 Santé), aucun autre stat n'est affecté
  const isHealIntent =
    act.includes('soign') ||
    act.includes('heal') ||
    act.includes('panse') ||
    act.includes('bandage') ||
    act.includes('medkit') ||
    act.includes('trousse de secours') ||
    act.includes('premiers soins');

  if (isHealIntent) {
    const healItem = state.inventory.find((it) =>
      ['bandage', 'pansement', 'medkit', 'trousse', 'kit', 'soin'].some((k) =>
        it.toLowerCase().includes(k)
      )
    );

    if (healItem) {
      itemsDropped.push(healItem);
    }

    statChanges.stat1 = +25;
    statChanges.stat2 = 0;
    statChanges.stat3 = 0;
    statChanges.stat4 = 0;

    narrative = fr
      ? `[SOINS APPLIQUÉS]\nVous prodiguez les premiers soins et nettoyez méthodiquement vos plaies. L'hémorragie est contenue et votre santé remonte (+25 Santé).`
      : `[FIRST AID APPLIED]\nYou administer field first aid and dress your wounds with clean dressings. Bleeding is controlled and health recovers (+25 Health).`;
    summarySentence = fr ? "Soins appliqués (+25 Santé)." : "First aid applied (+25 Health).";
    return returnPayload();
  }

  // 4. Dancing ("danser", "dance", "danser la gigue", "moonwalk")
  const isDancing = act.includes('danse') || act.includes('dance') || act.includes('valse') || act.includes('sautille');
  if (isDancing) {
    if (d20Roll === 1) {
      statChanges.stat1 = -10;
      statChanges.stat2 = -6;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20]\nVous esquissez un pas de danse improvisé, mais votre semelle dérape sur une flaque visqueuse. Vous trébuchez lourdement et votre crâne heurte l'arête métallique d'une poutre (-10 Santé, -6 Mental) ! Un liquide sombre coule sur votre front.`
        : `[CRITICAL FUMBLE 1/20]\nYou attempt an impromptu dance step, but slip on slick grime. You trip hard and crash headfirst into a rusted iron stanchion (-10 Health, -6 Sanity)! Warm blood trickles down your temple.`;
      summarySentence = fr ? "Chute stupide en dansant (Dé 1)." : "Tripped and fell while dancing (Roll 1).";
    } else if (d20Roll <= 7) {
      statChanges.stat2 = -2;
      narrative = fr
        ? `[JET 2-7]\nVous effectuez quelques mouvements de danse désordonnés. Dans ce silence de mort et cette obscurité glaciale, le spectacle est dérisoire et vous laisse un sentiment de vide angoissant.`
        : `[ROLL 2-7]\nYou pull off some awkward dance moves. In this suffocating silence and pitch-black gloom, the gesture feels hollow and slightly unnerving.`;
      summarySentence = fr ? "Danse maladroite dans le vide." : "Awkward dancing in the darkness.";
    } else if (d20Roll <= 14) {
      statChanges.stat2 = +8;
      narrative = fr
        ? `[SUCCÈS NORMAL ${d20Roll}/20]\nVous dansez avec dérision au milieu de la pièce. Cette insolence absurde face au danger détend vos muscles contractés et dissipe une part de votre anxiété (+8 Mental).`
        : `[NORMAL SUCCESS ${d20Roll}/20]\nYou dance with defiant irony in the middle of the chamber. The absurdity helps break tension and relaxes your stiff nerves (+8 Sanity).`;
      summarySentence = fr ? "Danse détendue réduisant le stress." : "Defiant dancing easing stress.";
    } else if (d20Roll <= 19) {
      statChanges.stat2 = +18;
      statChanges.stat1 = +6;
      narrative = fr
        ? `[GRAND SUCCÈS ${d20Roll}/20]\nUne chorégraphie fluide et insolente ! Vos pas résonnent avec une vivacité inattendue, réveillant votre agilité et vous emplissant d'une euphorie réjouissante (+18 Mental, +6 Santé).`
        : `[GREAT SUCCESS ${d20Roll}/20]\nA smooth, rhythmically sharp routine! Your agile footwork echoes defiance, filling your veins with electric morale (+18 Sanity, +6 Health).`;
      summarySentence = fr ? "Chorégraphie brillante et revitalisante." : "Remarkable choreography boosting morale.";
    } else {
      // Natural 20 ! SUMMONS A DEMON !
      statChanges.stat1 = +30;
      statChanges.stat2 = +45;
      narrative = fr
        ? `[SUCCÈS CRITIQUE 20/20 // INVOCATION DÉMONIAQUE NÉON !]\nIncroyable ! Votre danse chaotique entre en résonance harmonique avec les circuits de la borne arcade A-111 ! Une déchirure dimensionnelle violette s'ouvre avec un grondement de basse assourdissant. UN DÉMON NÉON AUX YEUX PHOSPHORESCENTS émerge de la brèche, vous salue d'un rictus complice et imprègne votre être d'une énergie surdimensionnée (+30 Santé, +45 Mental) avant de replonger dans le néant !`
        : `[NATURAL 20 // NEON DEMON SUMMONED!]\nUnbelievable! Your wild rhythm strikes a resonant frequency in the arcade matrix! The air tears open with purple phosphorescent CRT static. A TOWERING NEON DEMON WITH GLOWING EYES steps through the rift, mimics your dance moves with a devilish smirk, and showers your body with overwhelming power (+30 Health, +45 Sanity) before vanishing back into the void!`;
      summarySentence = fr ? "Invocation d'un démon néon en dansant (Dé 20) !" : "Summoned a neon demon while dancing (Roll 20)!";
    }

    return returnPayload();
  }

  // 5. Searching / Checking Boxes / Table / Drawer / Bag / Looting
  const isSearchIntent =
    act.includes('fouille') ||
    act.includes('cherch') ||
    act.includes('search') ||
    act.includes('table') ||
    act.includes('tiroir') ||
    act.includes('drawer') ||
    act.includes('sac') ||
    act.includes('bag') ||
    act.includes('backpack') ||
    act.includes('boîte') ||
    act.includes('boite') ||
    act.includes('box') ||
    act.includes('coffre') ||
    act.includes('chest') ||
    act.includes('inspect') ||
    act.includes('examin') ||
    act.includes('vérif') ||
    act.includes('check') ||
    act.includes('regard') ||
    act.includes('loot') ||
    act.includes('débris') ||
    act.includes('sol');

  if (isSearchIntent) {
    const resolved = resolveItemByContainerOrAction(action, currentRoom, state.inventory, lang);
    const targetPlacement = resolved.foundPlacement;
    const isTargetDrawer = resolved.targetContainer === 'drawer';
    const isTargetTable = resolved.targetContainer === 'table';
    const isTargetBag = resolved.targetContainer === 'bag';
    const isTargetFloor = resolved.targetContainer === 'floor';

    const containerDirectFr = isTargetTable
      ? 'la table'
      : isTargetDrawer
      ? 'le tiroir'
      : isTargetBag
      ? 'le sac'
      : isTargetFloor
      ? 'le sol'
      : 'les décombres';
    const containerPrepFr = isTargetTable
      ? 'de la table'
      : isTargetDrawer
      ? 'du tiroir'
      : isTargetBag
      ? 'du sac'
      : isTargetFloor
      ? 'au sol'
      : 'des décombres';
    const containerNameEn = isTargetTable
      ? 'the table'
      : isTargetDrawer
      ? 'the drawer'
      : isTargetBag
      ? 'the backpack'
      : isTargetFloor
      ? 'the floor'
      : 'the debris';

    if (d20Roll === 1) {
      statChanges.stat1 = -8;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20] Vous fouillez brutalement ${containerDirectFr} sans précaution. Une écharde métallique corrodée vous entaille la paume (-8 Santé) ! Rien d'utile n'est récupérable.`
        : `[CRITICAL FUMBLE 1/20] You search ${containerNameEn} carelessly. A jagged rusted shard gashes your hand (-8 Health)! Nothing salvageable.`;
      summarySentence = fr ? "Blessure critique lors de la fouille." : "Injured on critical fumble search.";
    } else if (d20Roll <= 7) {
      narrative = fr
        ? `[JET ${d20Roll}/20] Vous inspectez ${containerDirectFr} à la hâte. Vos gestes manquent de minutie dans cette pénombre glaciale et vous ne parvenez pas à déceler d'objet utile pour l'instant.`
        : `[ROLL ${d20Roll}/20] You inspect ${containerNameEn} hastily. In the freezing gloom, your clumsy search yields nothing useful at this moment.`;
      summarySentence = fr ? "Fouille infructueuse (aucun objet)." : "Search turned up empty.";
    } else if (resolved.containerEmpty || resolved.isAlreadyClaimed || !targetPlacement) {
      // Container was already looted or room has no items left in this spot
      statChanges.stat2 = +4;
      narrative = fr
        ? `[JET ${d20Roll}/20] Vous examinez ${containerDirectFr} attentivement. Cet emplacement a déjà été fouillé et vidé : il ne contient plus rien d'autre (+4 Mental).`
        : `[ROLL ${d20Roll}/20] You inspect ${containerNameEn} closely. This location has already been searched and cleared: nothing else remains here (+4 Sanity).`;
      summarySentence = fr ? `Emplacement déjà vidé (${containerDirectFr}).` : `Container already emptied (${containerNameEn}).`;
    } else if (state.inventory.length >= 8) {
      // Inventory full (8/8)
      narrative = fr
        ? `[SUCCÈS ${d20Roll}/20] Vous repérez bien [${targetPlacement.localizedName}] ${containerPrepFr}, mais votre inventaire est plein (8/8 slots occupés) ! Déposez d'abord un objet pour pouvoir le prendre.`
        : `[SUCCESS ${d20Roll}/20] You spot [${targetPlacement.localizedName}] ${containerNameEn}, but your inventory is full (8/8 slots)! Drop an item first to pick it up.`;
      summarySentence = fr ? "Inventaire plein (8/8)." : "Inventory full (8/8).";
    } else {
      // Valid item discovered from the exact searched container!
      itemsPicked.push(targetPlacement.rawName);
      const sanityGain = d20Roll === 20 ? 25 : d20Roll >= 15 ? 14 : 6;
      statChanges.stat2 = +sanityGain;
      if (d20Roll === 20) {
        statChanges.stat1 = +10;
      }

      if (d20Roll === 20) {
        narrative = fr
          ? `[SUCCÈS CRITIQUE 20/20 // DÉCOUVERTE PARFAITE !]\nUn coup d'œil d'expert ! En fouillant ${containerDirectFr}, vous mettez la main avec brio sur : [${targetPlacement.localizedName}] (+10 Santé, +${sanityGain} Mental) !`
          : `[NATURAL 20 // FLAWLESS DISCOVERY!]\nA masterclass search! Checking ${containerNameEn}, you flawlessly retrieve: [${targetPlacement.localizedName}] (+10 Health, +${sanityGain} Sanity)!`;
        summarySentence = fr
          ? `Découverte critique : [${targetPlacement.localizedName}] (Dé 20) !`
          : `Critical find: [${targetPlacement.localizedName}] (Roll 20)!`;
      } else {
        narrative = fr
          ? `[SUCCÈS ${d20Roll}/20] Votre fouille attentive ${containerPrepFr} porte ses fruits ! Dissimulé à cet endroit exact, vous trouvez : [${targetPlacement.localizedName}] ! Vous le rangez dans votre inventaire (+${sanityGain} Mental).`
          : `[SUCCESS ${d20Roll}/20] Your diligent search of ${containerNameEn} pays off! Concealed right there, you retrieve: [${targetPlacement.localizedName}]! Stowed into inventory (+${sanityGain} Sanity).`;
        summarySentence = fr
          ? `Fouille réussie : [${targetPlacement.localizedName}] (${containerDirectFr}).`
          : `Retrieved [${targetPlacement.localizedName}] from ${containerNameEn}.`;
      }
    }

    return returnPayload();
  }

  // 6. Navigation / Moving / Advancing (RÈGLE : Marcher ne fait rien sauf si D20 = 1 -> trébuche et perd 3 HP)
  const isNavIntent =
    (act.includes('avanc') ||
      act.includes('forward') ||
      act.includes('porte') ||
      act.includes('door') ||
      act.includes('couloir') ||
      act.includes('corridor') ||
      act.includes('march') ||
      act.includes('pass') ||
      act.includes('suiv') ||
      act.includes('entrer') ||
      act.startsWith('go to') ||
      act.startsWith('aller vers')) &&
    !act.includes('out') &&
    !act.includes('dehors') &&
    !act.includes('sortir') &&
    !act.includes('fuir') &&
    !act.includes('courir') &&
    !act.includes('run') &&
    !act.includes('sprint');

  if (isNavIntent && currentRoom.connectedRooms.length > 0) {
    const nextRoomId = currentRoom.connectedRooms[currentRoom.connectedRooms.length - 1];
    const targetRoom = story.rooms.find((r) => r.id === nextRoomId);

    if (targetRoom) {
      newRoomId = targetRoom.id;
      const rName = fr ? targetRoom.nameFr : targetRoom.nameEn;
      const rDesc = fr ? targetRoom.descriptionFr : targetRoom.descriptionEn;

      if (d20Roll === 1) {
        // Roll 1: stumble and lose 3 HP only
        statChanges.stat1 = -3;
        statChanges.stat2 = 0;
        statChanges.stat3 = 0;
        statChanges.stat4 = 0;
        narrative = fr
          ? `[ÉCHEC CRITIQUE 1/20 // TRÉBUCHEMENT] En avançant dans la pénombre, votre pied heurte un obstacle au sol : vous trébuchez et perdez l'équilibre (-3 Santé) avant de pénétrer dans : ${rName}.\n\n${rDesc}`
          : `[CRITICAL FUMBLE 1/20 // STUMBLE] Moving forward in the darkness, you stumble over an obstacle on the floor and lose your balance (-3 Health) before entering: ${rName}.\n\n${rDesc}`;
      } else {
        // Roll >= 2: No consequence, no damage, no sanity gain
        statChanges.stat1 = 0;
        statChanges.stat2 = 0;
        statChanges.stat3 = 0;
        statChanges.stat4 = 0;
        narrative = fr
          ? `Vous avancez tranquillement et pénétrez dans : ${rName}.\n\n${rDesc}`
          : `You walk forward steadily into: ${rName}.\n\n${rDesc}`;
      }

      if (targetRoom.isFinal) {
        isVictory = true;
        narrative += fr
          ? `\n\n[OBJECTIF ATTEINT // PROTOCOLE A-111 ACCOMPLI AVEC SUCCÈS !]`
          : `\n\n[OBJECTIVE ACCOMPLISHED // A-111 PROTOCOL COMPLETE!]`;
      }

      summarySentence = fr ? `Progression vers ${rName}.` : `Advanced into ${rName}.`;

      return returnPayload({ biome: targetRoom.biome });
    }
  }

  // 6B. In-Room Walking / Moving (aucun impact sauf si Dé = 1 où on trébuche et perd 3 HP)
  const isWalkingIntent =
    (act.includes('march') || act.includes('walk') || act.includes('avanc') || act.includes('deplac')) &&
    !act.includes('courir') &&
    !act.includes('run') &&
    !act.includes('sprint');

  if (isWalkingIntent) {
    if (d20Roll === 1) {
      statChanges.stat1 = -3;
      statChanges.stat2 = 0;
      statChanges.stat3 = 0;
      statChanges.stat4 = 0;
      narrative = fr
        ? `[ÉCHEC CRITIQUE 1/20 // TRÉBUCHEMENT] Vous faites un faux pas dans la pénombre, trébuchez sur le sol irrégulier et vous râpez le genou (-3 Santé).`
        : `[CRITICAL FUMBLE 1/20 // STUMBLE] You misstep in the shadows, stumble over uneven flooring, and scrape your knee (-3 Health).`;
      summarySentence = fr ? "Trébuché en marchant (-3 Santé)." : "Stumbled while walking (-3 Health).";
    } else {
      statChanges.stat1 = 0;
      statChanges.stat2 = 0;
      statChanges.stat3 = 0;
      statChanges.stat4 = 0;
      narrative = fr
        ? `Vous marchez tranquillement dans le secteur d'un pas mesuré. Vos constantes vitales restent inchangées.`
        : `You walk steadily through the chamber with measured steps. Your vitals remain unchanged.`;
      summarySentence = fr ? "Marche tranquille dans le secteur." : "Walked steadily through chamber.";
    }
    return returnPayload();
  }

  // 6C. Predictable Routine Actions (Ouvrir une porte normale, regarder, inspecter - zéro dégât, zéro heal, zéro sanity)
  const isPredictableRoutine =
    ((act.includes('porte') || act.includes('door') || act.includes('ouvrir') || act.includes('open')) &&
      !act.includes('enfonc') && !act.includes('forc') && !act.includes('break')) ||
    act.includes('regard') ||
    act.includes('observ') ||
    act.includes('inspect') ||
    act.includes('examin') ||
    act.includes('lire') ||
    act.includes('read');

  if (isPredictableRoutine) {
    statChanges.stat1 = 0;
    statChanges.stat2 = 0;
    statChanges.stat3 = 0;
    statChanges.stat4 = 0;
    narrative = fr
      ? `Vous accomplissez cette action prévisible avec prudence. Tout se déroule de façon attendue sans altérer vos constantes vitales ni votre mental.`
      : `You carry out this predictable routine with care. Everything unfolds as expected without altering your vitals or sanity.`;
    summarySentence = fr ? "Action prévisible accomplie." : "Predictable routine completed.";
    return returnPayload();
  }

  // 7. Dynamic Freeform Imaginative Action (Zero boilerplate repetition)
  const dynamicVerbsFr = [
    `Vous tentez : "${action}".`,
    `Face à l'obscurité du secteur, vous essayez : "${action}".`,
    `Votre initiative ("${action}") modifie la dynamique de la pièce.`,
    `Vous évaluez l'environnement et tentez : "${action}".`,
    `Le terminal enregistre votre geste : "${action}".`,
  ];
  const dynamicVerbsEn = [
    `You attempt: "${action}".`,
    `Amidst the oppressive shadows, you try to: "${action}".`,
    `Your initiative ("${action}") shifts the atmosphere of the room.`,
    `Surveying the cold surroundings, you try to: "${action}".`,
    `The terminal logs your motion: "${action}".`,
  ];

  const prefix = fr ? dynamicVerbsFr[turnSeed] : dynamicVerbsEn[turnSeed];

  const isViolentFreeform =
    act.includes('bless') ||
    act.includes('poignard') ||
    act.includes('couteau') ||
    act.includes('plant') ||
    act.includes('stab') ||
    act.includes('knife') ||
    act.includes('taill') ||
    act.includes('veine') ||
    act.includes('saign') ||
    act.includes('égorg') ||
    act.includes('egorg') ||
    act.includes('tranch') ||
    act.includes('couper') ||
    act.includes('fracass') ||
    act.includes('crâne') ||
    act.includes('crane') ||
    act.includes('skull') ||
    act.includes('suicid') ||
    act.includes('tuer') ||
    act.includes('mort');

  if (isViolentFreeform) {
    statChanges.stat1 = d20Roll >= 20 ? -100 : d20Roll >= 15 ? -85 : d20Roll >= 8 ? -55 : -25;
    statChanges.stat2 = d20Roll >= 15 ? -50 : d20Roll >= 8 ? -35 : -25;
    if (d20Roll === 20) {
      isGameOver = true;
      gameOverReason = fr ? "Lésion corporelle critique mortelle." : "Fatal self-inflicted bodily trauma.";
    }
    narrative = fr
      ? `[ACTION VIOLENTE ${d20Roll}/20]\n${prefix} L'acte inflige un traumatisme corporel immédiat. Le sang coule, la douleur fulgurante et l'agonie physique font s'effondrer vos constantes vitales (${statChanges.stat1} Santé, ${statChanges.stat2} Mental) !`
      : `[VIOLENT ACTION ${d20Roll}/20]\n${prefix} The hazardous action inflicts acute biological trauma. Agony and severe hemorrhage shatter your vitals (${statChanges.stat1} Health, ${statChanges.stat2} Sanity)!`;
  } else if (d20Roll === 1) {
    statChanges.stat1 = -8;
    statChanges.stat2 = -6;
    statChanges.stat3 = -2;
    narrative = fr
      ? `[ÉCHEC CRITIQUE 1/20 // DÉCONVENUE BRUTALE]\n${prefix} Tout bascule de travers : un faux mouvement brutal vous déséquilibre et vous heurte douloureusement les parois métalliques (-8 Santé, -6 Mental, -2 Énergie).`
      : `[CRITICAL FUMBLE 1/20 // PAINFUL BLUNDER]\n${prefix} Everything goes wrong: an abrupt misstep throws you off balance, slamming you painfully into cold steel plating (-8 Health, -6 Sanity, -2 Energy).`;
  } else if (d20Roll <= 7) {
    statChanges.stat1 = -2;
    statChanges.stat2 = -3;
    statChanges.stat3 = -2;
    narrative = fr
      ? `[JET INFÉRIEUR ${d20Roll}/20 // EFFORT LABORIEUX]\n${prefix} Vos efforts s'avèrent laborieux et maladroits dans ce lieu hostile. Vous vous éraflez légèrement et une pointe d'agacement vous gagne (-2 Santé, -3 Mental, -2 Énergie).`
      : `[LOW ROLL ${d20Roll}/20 // STRAINED EFFORT]\n${prefix} Your efforts prove awkward and uncoordinated in this harsh room. You suffer a superficial graze and frustration sets in (-2 Health, -3 Sanity, -2 Energy).`;
  } else if (d20Roll <= 14) {
    statChanges.stat2 = +8;
    statChanges.stat3 = -1;
    narrative = fr
      ? `[SUCCÈS D20 : ${d20Roll}/20 // INITIATIVE MAÎTRISÉE]\n${prefix} Vous accomplissez votre tentative avec attention et vigilance. Le calme revient peu à peu et votre concentration s'aiguise (+8 Mental, -1 Énergie).`
      : `[D20 SUCCESS: ${d20Roll}/20 // CONTROLLED INITIATIVE]\n${prefix} You carry out your attempt with steady focus and vigilance. Composure returns and your senses sharpen (+8 Sanity, -1 Energy).`;
  } else if (d20Roll <= 19) {
    statChanges.stat2 = +14;
    statChanges.stat3 = -1;
    narrative = fr
      ? `[GRAND SUCCÈS : ${d20Roll}/20 // EXCELLENTE INSPIRATION]\n${prefix} Une remarquable vivacité d'esprit ! Votre geste modifie avantageusement la situation et renforce nettement votre volonté (+14 Mental, -1 Énergie).`
      : `[GREAT SUCCESS: ${d20Roll}/20 // KEEN INSPIRATION]\n${prefix} Sharp situational awareness! Your initiative pays off, noticeably strengthening your resolve and perception (+14 Sanity, -1 Energy).`;
  } else {
    statChanges.stat1 = +5;
    statChanges.stat2 = +25;
    statChanges.stat3 = +5;
    narrative = fr
      ? `[SUCCÈS CRITIQUE 20/20 // MAÎTRISE ABSOLUE]\n${prefix} Une réussite éclatante et spectaculaire ! Votre initiative se déroule à la perfection, vous galvanisant d'une énergie surhumaine (+5 Santé, +25 Mental, +5 Énergie) !`
      : `[NATURAL 20 // CRITICAL MASTERSTROKE]\n${prefix} A spectacular and flawless triumph! Your initiative unfolds with surgical grace, energizing your entire body (+5 Health, +25 Sanity, +5 Energy)!`;
  }

  summarySentence = fr
    ? `Action libre : "${action.slice(0, 30)}" (Dé ${d20Roll}/20).`
    : `Action: "${action.slice(0, 30)}" (Roll ${d20Roll}/20).`;

  if (state.stats.stat1 + statChanges.stat1 <= 0) {
    isGameOver = true;
    narrative += fr
      ? '\n\n[ALERTE VITALE] Constantes effondrées. La simulation A-111 prend fin.'
      : '\n\n[VITAL ALERT] Biometrics collapsed. A-111 simulation terminates.';
  }

  return returnPayload();
}

// Master execution with D20 dice roll and seamless failover
export async function executePlayerTurn(
  story: StoryDefinition,
  state: GameState,
  action: string,
  settings: GameSettings
): Promise<TurnResolution> {
  const d20Roll = Math.floor(Math.random() * 20) + 1;
  const d20Eval = evaluateD20(d20Roll, settings.language);

  // 1. Call Secure Server-Side AI API (Gemini 3.1 Flash Lite on Express server, no exposed keys)
  const aiResolution = await callBackendAi(story, state, action, settings.language, d20Roll, d20Eval);
  if (aiResolution) {
    if (!aiResolution.visualLayout) {
      const activeRoom = story.rooms.find(r => r.id === (aiResolution.newRoomId || state.currentRoomId)) || story.rooms[0];
      const roomVis = getRoomVisualLayout(activeRoom, settings.language);
      aiResolution.visualLayout = roomVis.visualLayout;
      aiResolution.obstacle = aiResolution.obstacle || roomVis.obstacle;
    }
    return aiResolution;
  }

  // 2. Procedural D20 Engine (Zero latency, strictly realistic biological causality & zero hallucination)
  return executeProceduralD20Engine(
    story,
    state,
    action,
    settings.language,
    d20Roll,
    d20Eval
  );
}
