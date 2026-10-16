export type Language = 'en' | 'fr';

export interface VisualItem {
  id?: string;
  name: string;
  type: 'key' | 'knife' | 'bottle' | 'can' | 'food' | 'bandage' | 'medkit' | 'flashlight' | 'battery' | 'crowbar' | 'note' | 'chalk' | 'money' | 'ammo' | string;
  container?: 'table' | 'drawer' | 'bag' | 'backpack' | 'shelf' | 'floor' | 'crate' | 'altar' | string;
  position?: 'on_table' | 'in_drawer' | 'near_bag' | 'on_shelf' | 'on_floor' | 'center' | 'left' | 'right' | 'center_left' | 'center_right' | string;
  inReach?: boolean;
}

export interface VisualObject {
  type:
    | 'bookshelf'
    | 'safe'
    | 'door'
    | 'ladder_shelf'
    | 'ladder'
    | 'unstable_floor_grid'
    | 'floor_grid'
    | 'chest'
    | 'terminal'
    | 'cables'
    | 'altar'
    | 'generator'
    | 'window'
    | 'pipes'
    | 'statue'
    | 'table'
    | 'drawer'
    | 'bag'
    | 'backpack'
    | 'locker'
    | 'key'
    | 'knife'
    | 'bottle'
    | 'can'
    | 'food'
    | 'bandage'
    | 'medkit'
    | 'flashlight'
    | 'battery'
    | 'crowbar'
    | 'note'
    | string;
  position:
    | 'left'
    | 'center_left'
    | 'center'
    | 'center_right'
    | 'right'
    | 'bottom_center'
    | 'top_center'
    | 'top_left'
    | 'top_right'
    | 'on_table'
    | 'in_drawer'
    | 'near_bag'
    | 'floor_left'
    | 'floor_right'
    | string;
  label?: string;
  container?: string;
  inReach?: boolean;
}

export interface VisualLayout {
  room_type?: string;
  background_glitch?: boolean;
  objects: VisualObject[];
  items?: VisualItem[];
  detected_containers?: string[];
  ascii_glitch_chars?: string[];
  obstacle?: string | null;
}

export interface RoomItem {
  id: string;
  nameEn: string;
  nameFr: string;
}

export interface RoomDefinition {
  id: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string;
  descriptionFr: string;
  items: string[];
  biome: string;
  connectedRooms: string[];
  isFinal?: boolean;
  visualLayout?: VisualLayout;
  obstacleEn?: string;
  obstacleFr?: string;
}

export interface StoryDefinition {
  id: string;
  titleEn: string;
  titleFr: string;
  genreEn: string;
  genreFr: string;
  hookEn: string;
  hookFr: string;
  initialColor: string;
  initialBg: string;
  defaultBiome: string;
  boundaryExcuseEn: string;
  boundaryExcuseFr: string;
  statLabels: {
    stat1: { en: string; fr: string }; // Health / System / Suit
    stat2: { en: string; fr: string }; // Sanity / Memory / Stress
    stat3: { en: string; fr: string }; // Hunger / Energy / Battery
    stat4: { en: string; fr: string }; // Thirst / Oxygen / Infection / Lucidity
  };
  startingInventoryEn: string[];
  startingInventoryFr: string[];
  biomes: {
    [key: string]: {
      nameEn: string;
      nameFr: string;
      color: string;
      bg: string;
      audioAmbience: string;
    };
  };
  rooms: RoomDefinition[];
  startingRoomId: string;
  sampleSummaryEn: string;
  sampleSummaryFr: string;
}

export interface GameStats {
  stat1: number; // 0-100
  stat2: number;
  stat3: number;
  stat4: number;
  trends: {
    stat1: 'up' | 'down' | 'neutral';
    stat2: 'up' | 'down' | 'neutral';
    stat3: 'up' | 'down' | 'neutral';
    stat4: 'up' | 'down' | 'neutral';
  };
}

export interface GameSettings {
  soundEnabled: boolean;
  language: Language;
  customApiKey: string;
  preferredProvider: 'auto' | 'gemini' | 'groq' | 'huggingface' | 'custom';
}

export interface NarrativeEntry {
  id: string;
  role: 'narrator' | 'player' | 'system' | 'ai_meta';
  text: string;
  timestamp: number;
  roomName?: string;
}

export interface ActiveTimer {
  secondsLeft: number;
  totalSeconds: number;
  label: string;
  penaltyType: 'death' | 'damage';
  penaltyAmount: number;
}

export interface GameState {
  currentStoryId: string;
  currentRoomId: string;
  stats: GameStats;
  inventory: string[]; // Max 8 items
  history: NarrativeEntry[];
  summaryLog: string[];
  turnCount: number;
  isGameOver: boolean;
  gameOverReason: string | null;
  isVictory: boolean;
  currentBiome: string;
  visitedRooms: string[];
  isPoisoned?: boolean;
  poisonSource?: string | null;
  activeTimer?: ActiveTimer | null;
  gameFlags?: Record<string, boolean | number | string>;
  currentVisualLayout?: VisualLayout | null;
  currentObstacle?: string | null;
}
