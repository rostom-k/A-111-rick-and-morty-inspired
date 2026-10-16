import { Language, RoomDefinition, VisualItem, VisualLayout, VisualObject } from '../types/game';
import { translateItem } from './itemTranslations';
import { getRoomItemPlacements } from './itemLocations';

function classifyItemType(itemName: string): VisualItem['type'] {
  const lower = itemName.toLowerCase();
  if (lower.includes('key') || lower.includes('clé') || lower.includes('clef')) return 'key';
  if (lower.includes('knife') || lower.includes('couteau') || lower.includes('blade') || lower.includes('lame')) return 'knife';
  if (lower.includes('bottle') || lower.includes('bouteille') || lower.includes('eau') || lower.includes('water') || lower.includes('flask') || lower.includes('gourde')) return 'bottle';
  if (lower.includes('can') || lower.includes('conserve') || lower.includes('chips') || lower.includes('ration') || lower.includes('food') || lower.includes('nourriture')) return 'can';
  if (lower.includes('bandage') || lower.includes('pansement') || lower.includes('medkit') || lower.includes('soin') || lower.includes('aid')) return 'bandage';
  if (lower.includes('flashlight') || lower.includes('torche') || lower.includes('lampe') || lower.includes('briquet') || lower.includes('lighter')) return 'flashlight';
  if (lower.includes('battery') || lower.includes('pile') || lower.includes('phone') || lower.includes('téléphone')) return 'battery';
  if (lower.includes('crowbar') || lower.includes('pied-de-biche') || lower.includes('tuyau') || lower.includes('pipe') || lower.includes('branche')) return 'crowbar';
  if (lower.includes('note') || lower.includes('page') || lower.includes('diary') || lower.includes('journal') || lower.includes('livre') || lower.includes('document')) return 'note';
  if (lower.includes('coin') || lower.includes('pièce') || lower.includes('bill') || lower.includes('billet') || lower.includes('or') || lower.includes('gold') || lower.includes('$')) return 'money';
  if (lower.includes('chalk') || lower.includes('craie') || lower.includes('pierre') || lower.includes('rock')) return 'chalk';
  return 'note';
}

export function getRoomVisualLayout(
  room: RoomDefinition,
  lang: Language
): { visualLayout: VisualLayout; obstacle: string } {
  // If the room already defines its custom layout, use it as baseline
  if (room.visualLayout && room.visualLayout.objects.length > 0 && room.visualLayout.items && room.visualLayout.items.length > 0) {
    const obs = lang === 'fr' ? (room.obstacleFr || room.obstacleEn || '') : (room.obstacleEn || room.obstacleFr || '');
    return {
      visualLayout: room.visualLayout,
      obstacle: obs || room.visualLayout.obstacle || '',
    };
  }

  const id = (room.id || '').toUpperCase();
  const name = ((lang === 'fr' ? room.nameFr : room.nameEn) || '').toLowerCase();
  const desc = ((lang === 'fr' ? room.descriptionFr : room.descriptionEn) || '').toLowerCase();

  const objects: VisualObject[] = [];
  const items: VisualItem[] = [];
  const detectedContainers: string[] = [];
  let obstacle = '';

  // Always include key architectural furniture requested by user:
  // Table, Drawer (Tiroir), Bag (Sac), plus room specific backdrop (Door, Bookshelf, etc.)
  objects.push({ type: 'door', position: 'center' });

  // 1. Table in room (center-left or center-right)
  objects.push({
    type: 'table',
    position: 'center_left',
    label: lang === 'fr' ? 'Table en bois' : 'Wooden Table',
  });
  detectedContainers.push(lang === 'fr' ? 'Table d\'atelier' : 'Workshop Table');

  // 2. Drawer / Dresser (left wall or under shelf)
  objects.push({
    type: 'drawer',
    position: 'left',
    label: lang === 'fr' ? 'Tiroir entrouvert' : 'Open Drawer',
  });
  detectedContainers.push(lang === 'fr' ? 'Tiroir entrouvert' : 'Ajar Drawer');

  // 3. Survival Bag / Backpack (right side or bottom floor)
  objects.push({
    type: 'bag',
    position: 'right',
    label: lang === 'fr' ? 'Sac de survie' : 'Survival Backpack',
  });
  detectedContainers.push(lang === 'fr' ? 'Sac à dos abandonné' : 'Abandoned Backpack');

  // Floor grid / perspective ground
  const isFloorUnstable = id.includes('S3') || id.includes('S10') || desc.includes('instable') || desc.includes('piège');
  objects.push({
    type: isFloorUnstable ? 'unstable_floor_grid' : 'floor_grid',
    position: 'bottom_center',
  });

  // Additional backdrop based on room theme
  if (id.includes('S3') || name.includes('archive') || name.includes('biblioth')) {
    objects.push({ type: 'bookshelf', position: 'center_right' });
    obstacle = lang === 'fr' ? 'SOL INSTABLE // PLANCHER VÉGÉTAL' : 'UNSTABLE FLOOR // WOODEN WEAKNESS';
  } else if (id.includes('S5') || name.includes('golem')) {
    objects.push({ type: 'generator', position: 'center_right' });
    obstacle = lang === 'fr' ? 'GOLEM DE FER ÉVEILLÉ. DANGER.' : 'IRON GOLEM AWAKENED. COMBAT ACTIVE.';
  } else if (id.includes('S10') || desc.includes('araignée') || desc.includes('spider')) {
    objects.push({ type: 'cables', position: 'top_left' });
    obstacle = lang === 'fr' ? 'TOILES D\'ARAIGNÉE GÉANTE VENIMEUSE' : 'GIANT TOXIC SPIDER WEBS';
  } else if (id.includes('S13') || name.includes('autel')) {
    objects.push({ type: 'altar', position: 'center_right' });
    obstacle = lang === 'fr' ? 'ÉNIGME RUNIQUE ACTIF' : 'RUNIC PUZZLE ACTIVE';
  } else if (name.includes('terminal') || name.includes('lab') || name.includes('secteur')) {
    objects.push({ type: 'terminal', position: 'center_right' });
    obstacle = lang === 'fr' ? 'PURGE NEURALE ENGAGÉE' : 'NEURAL PURGE PROTOCOL';
  } else {
    obstacle = lang === 'fr' ? 'SCAN DU PÉRIMÈTRE ACTIF' : 'PERIMETER SCAN ACTIVE';
  }

  // 4. Map room items to containers at reachable range!
  const placements = getRoomItemPlacements(room, lang);
  placements.forEach((p) => {
    if (p.inPlainSight) {
      const pos = p.container === 'table' ? 'on_table' : 'floor_left';
      items.push({
        id: `item-${p.index}`,
        name: p.localizedName,
        type: p.itemType,
        container: p.container,
        position: pos,
        inReach: true,
      });
      objects.push({
        type: p.itemType,
        position: pos,
        label: p.localizedName,
        container: p.container,
        inReach: true,
      });
    }
  });

  const visualLayout: VisualLayout = {
    room_type: 'perspective_box',
    background_glitch: true,
    objects,
    items,
    detected_containers: detectedContainers,
    ascii_glitch_chars: ['#', '@', '$', '%', '0', '1', '&', '!'],
    obstacle,
  };

  return { visualLayout, obstacle };
}
