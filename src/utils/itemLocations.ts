import { Language, RoomDefinition } from '../types/game';
import { translateItem } from './itemTranslations';

export type ContainerType = 'table' | 'drawer' | 'bag' | 'floor' | 'shelf';

export interface RoomItemLocation {
  index: number;
  rawName: string;
  localizedName: string;
  itemType: string;
  container: ContainerType;
  containerNameFr: string;
  containerNameEn: string;
  containerPrepFr: string;
  containerPrepEn: string;
  inPlainSight: boolean;
  searchKeywords: string[];
}

export function classifyItemType(itemName: string): string {
  const lower = itemName.toLowerCase();
  if (lower.includes('key') || lower.includes('clé') || lower.includes('clef')) return 'key';
  if (lower.includes('knife') || lower.includes('couteau') || lower.includes('blade') || lower.includes('lame') || lower.includes('dagger') || lower.includes('dague')) return 'knife';
  if (lower.includes('bottle') || lower.includes('bouteille') || lower.includes('eau') || lower.includes('water') || lower.includes('flask') || lower.includes('gourde')) return 'bottle';
  if (lower.includes('can') || lower.includes('conserve') || lower.includes('chips') || lower.includes('ration') || lower.includes('food') || lower.includes('nourriture') || lower.includes('pain') || lower.includes('meat')) return 'can';
  if (lower.includes('bandage') || lower.includes('pansement') || lower.includes('medkit') || lower.includes('soin') || lower.includes('aid')) return 'bandage';
  if (lower.includes('flashlight') || lower.includes('torche') || lower.includes('lampe') || lower.includes('briquet') || lower.includes('lighter') || lower.includes('match')) return 'flashlight';
  if (lower.includes('battery') || lower.includes('pile') || lower.includes('phone') || lower.includes('téléphone')) return 'battery';
  if (lower.includes('crowbar') || lower.includes('pied-de-biche') || lower.includes('tuyau') || lower.includes('pipe') || lower.includes('branche') || lower.includes('chain')) return 'crowbar';
  if (lower.includes('note') || lower.includes('page') || lower.includes('diary') || lower.includes('journal') || lower.includes('livre') || lower.includes('document') || lower.includes('parchment') || lower.includes('ledger')) return 'note';
  if (lower.includes('coin') || lower.includes('pièce') || lower.includes('bill') || lower.includes('billet') || lower.includes('or') || lower.includes('gold') || lower.includes('$') || lower.includes('money')) return 'money';
  if (lower.includes('chalk') || lower.includes('craie') || lower.includes('pierre') || lower.includes('rock') || lower.includes('sandstone') || lower.includes('skull')) return 'chalk';
  return 'note';
}

/**
 * Returns deterministic placement for all items in a room.
 * - Item 0: On the Table (in plain sight)
 * - Item 1: Inside the Drawer (hidden from sight until drawer is searched)
 * - Item 2: Inside the Backpack/Bag (hidden from sight until bag is searched)
 * - Item 3: On the Floor (in plain sight among rubble)
 * - Item 4+: On the Shelves / Floor
 */
export function getRoomItemPlacements(room: RoomDefinition, lang: Language): RoomItemLocation[] {
  const roomItems = room.items || [];
  return roomItems.map((rawName, index) => {
    const localizedName = translateItem(rawName, lang);
    const itemType = classifyItemType(rawName);

    if (index === 0) {
      return {
        index,
        rawName,
        localizedName,
        itemType,
        container: 'table' as ContainerType,
        containerNameFr: 'la table en bois',
        containerNameEn: 'the wooden table',
        containerPrepFr: 'sur la table',
        containerPrepEn: 'on the table',
        inPlainSight: true,
        searchKeywords: ['table', 'établi', 'etabli', 'bureau', 'desk', 'workbench', 'plateau'],
      };
    } else if (index === 1) {
      return {
        index,
        rawName,
        localizedName,
        itemType,
        container: 'drawer' as ContainerType,
        containerNameFr: 'le tiroir de la commode',
        containerNameEn: 'the dresser drawer',
        containerPrepFr: 'dans le tiroir',
        containerPrepEn: 'inside the drawer',
        inPlainSight: false,
        searchKeywords: ['tiroir', 'drawer', 'commode', 'dresser', 'casier', 'locker'],
      };
    } else if (index === 2) {
      return {
        index,
        rawName,
        localizedName,
        itemType,
        container: 'bag' as ContainerType,
        containerNameFr: 'le sac à dos de survie',
        containerNameEn: 'the survival backpack',
        containerPrepFr: 'dans le sac',
        containerPrepEn: 'inside the backpack',
        inPlainSight: false,
        searchKeywords: ['sac', 'bag', 'backpack', 'sacoche', 'poche', 'havresac'],
      };
    } else if (index === 3) {
      return {
        index,
        rawName,
        localizedName,
        itemType,
        container: 'floor' as ContainerType,
        containerNameFr: 'le sol en pierre',
        containerNameEn: 'the stone floor',
        containerPrepFr: 'au sol parmi les décombres',
        containerPrepEn: 'on the floor among the debris',
        inPlainSight: true,
        searchKeywords: ['sol', 'floor', 'ground', 'décombres', 'debris', 'parterre', 'pierre', 'dalle'],
      };
    } else {
      return {
        index,
        rawName,
        localizedName,
        itemType,
        container: 'shelf' as ContainerType,
        containerNameFr: "l'étagère métallique",
        containerNameEn: 'the metal shelf',
        containerPrepFr: "sur l'étagère",
        containerPrepEn: 'on the shelf',
        inPlainSight: false,
        searchKeywords: ['étagère', 'etagere', 'shelf', 'shelves', 'meuble', 'bibliothèque', 'bookshelf'],
      };
    }
  });
}

/**
 * Builds the exact item location context for the AI prompt (server.ts),
 * ensuring the AI knows PRECISELY which item is in which container,
 * preventing any mix-up between drawer, table, and bag.
 */
export function getItemLocationContextForPrompt(
  room: RoomDefinition,
  lang: Language,
  currentInventory: string[]
): string {
  const placements = getRoomItemPlacements(room, lang);
  if (placements.length === 0) {
    return lang === 'fr' 
      ? 'AUCUN OBJET DANS CETTE PIÈCE (Cette salle est totalement vide d\'objets).'
      : 'NO ITEMS IN THIS ROOM (This room contains zero items).';
  }

  const lines = placements.map((p) => {
    const isCollected = currentInventory.includes(p.rawName);
    if (isCollected) {
      return lang === 'fr'
        ? `- [${p.localizedName}] : Déjà récupéré par le joueur (${p.containerPrepFr} est désormais VIDE).`
        : `- [${p.localizedName}] : Already picked up by player (${p.containerPrepEn} is now EMPTY).`;
    }

    if (p.inPlainSight) {
      return lang === 'fr'
        ? `- [${p.localizedName}] : SITUÉ ${p.containerPrepFr.toUpperCase()} [BIEN EN VUE]. Si le joueur fouille ${p.containerNameFr} ou ramasse l'objet en vue, il obtient [${p.localizedName}].`
        : `- [${p.localizedName}] : LOCATED ${p.containerPrepEn.toUpperCase()} [IN PLAIN SIGHT]. If player searches ${p.containerNameEn} or picks up the visible item, they get [${p.localizedName}].`;
    } else {
      return lang === 'fr'
        ? `- [${p.localizedName}] : DISSIMULÉ ${p.containerPrepFr.toUpperCase()} [CACHÉ - HORS DE VUE]. Le joueur NE PEUT PAS voir cet objet dans le décor. S'il fouille spécifiquement ${p.containerNameFr} ("fouiller le tiroir", "check drawer"), il découvre [${p.localizedName}]. ATTENTION: Fouiller la table ou un autre endroit NE PEUT JAMAIS donner cet objet !`
        : `- [${p.localizedName}] : CONCEALED ${p.containerPrepEn.toUpperCase()} [HIDDEN - OUT OF SIGHT]. The player CANNOT see this in the room overview. If player explicitly searches ${p.containerNameEn} ("check drawer", "fouille le tiroir"), they discover [${p.localizedName}]. CRITICAL: Searching the table or another container CAN NEVER yield this item!`;
    }
  });

  return lines.join('\n');
}

/**
 * Determine which item matches the player's search or pickup action.
 */
export function resolveItemByContainerOrAction(
  action: string,
  room: RoomDefinition,
  inventory: string[],
  lang: Language
): {
  foundPlacement: RoomItemLocation | null;
  targetContainer: ContainerType | 'generic';
  containerEmpty: boolean;
  isAlreadyClaimed: boolean;
} {
  const act = action.toLowerCase();
  const placements = getRoomItemPlacements(room, lang);

  // 1. Check if player explicitly specified an item by name
  for (const p of placements) {
    const rawLower = p.rawName.toLowerCase();
    const locLower = p.localizedName.toLowerCase();
    const rawWords = rawLower.split(' ').filter((w) => w.length > 2);
    const locWords = locLower.split(' ').filter((w) => w.length > 2);

    const matchesName =
      act.includes(rawLower) ||
      act.includes(locLower) ||
      rawWords.some((w) => act.includes(w)) ||
      locWords.some((w) => act.includes(w));

    if (matchesName) {
      const isClaimed = inventory.includes(p.rawName);
      return {
        foundPlacement: isClaimed ? null : p,
        targetContainer: p.container,
        containerEmpty: isClaimed,
        isAlreadyClaimed: isClaimed,
      };
    }
  }

  // 2. Detect container targeted by user
  let detectedContainer: ContainerType | null = null;

  if (['tiroir', 'drawer', 'commode', 'dresser'].some((k) => act.includes(k))) {
    detectedContainer = 'drawer';
  } else if (['table', 'établi', 'etabli', 'bureau', 'desk', 'workbench'].some((k) => act.includes(k))) {
    detectedContainer = 'table';
  } else if (['sac', 'bag', 'backpack', 'sacoche', 'poche'].some((k) => act.includes(k))) {
    detectedContainer = 'bag';
  } else if (['sol', 'floor', 'ground', 'décombres', 'debris', 'parterre'].some((k) => act.includes(k))) {
    detectedContainer = 'floor';
  } else if (['étagère', 'etagere', 'shelf', 'shelves', 'bibliothèque', 'bookshelf'].some((k) => act.includes(k))) {
    detectedContainer = 'shelf';
  }

  if (detectedContainer) {
    const targetPlacement = placements.find((p) => p.container === detectedContainer);
    if (!targetPlacement) {
      return {
        foundPlacement: null,
        targetContainer: detectedContainer,
        containerEmpty: true,
        isAlreadyClaimed: false,
      };
    }

    const isClaimed = inventory.includes(targetPlacement.rawName);
    return {
      foundPlacement: isClaimed ? null : targetPlacement,
      targetContainer: detectedContainer,
      containerEmpty: isClaimed,
      isAlreadyClaimed: isClaimed,
    };
  }

  // 3. Generic search (e.g. "fouiller la salle", "search room", "regarder autour")
  // Give priority to plain-sight table item first, then floor, then remaining uncollected items
  const availablePlacements = placements.filter((p) => !inventory.includes(p.rawName));
  if (availablePlacements.length === 0) {
    return {
      foundPlacement: null,
      targetContainer: 'generic',
      containerEmpty: true,
      isAlreadyClaimed: true,
    };
  }

  // Pick the first available placement
  const firstAvailable = availablePlacements[0];
  return {
    foundPlacement: firstAvailable,
    targetContainer: firstAvailable.container,
    containerEmpty: false,
    isAlreadyClaimed: false,
  };
}
