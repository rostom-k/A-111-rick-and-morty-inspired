import JSZip from 'jszip';
import { standaloneHtml } from './standaloneHtml';

export async function generateItchIoZipBundle(): Promise<Blob> {
  const zip = new JSZip();

  // 1. Python Pygame Standalone Code
  // NO download button, NO Roy banner, invisible API keys, 6 contextual music themes with Minecraft-style cooldowns
  const pygameCode = `"""
A-111 : Interactive Terminal RPG & Survival Fiction
Built with Pygame & Invisible AI Cascade Engine
Standalone itch.io release
"""

import sys
import os
import json
import time
import random
import requests
import pygame

pygame.init()
pygame.font.init()
if pygame.mixer.get_init() is None:
    try:
        pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=512)
    except Exception:
        pass

WIDTH, HEIGHT = 1080, 720
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)
pygame.display.set_caption("A-111 : TERMINAL INTERACTIVE RPG")
clock = pygame.time.Clock()

BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
DARK_GREEN = (0, 40, 0)
DIM_GREEN = (0, 140, 0)
WHITE = (255, 255, 255)
CYAN = (0, 243, 255)
AMBER = (255, 170, 0)
RED = (255, 50, 50)
PURPLE = (213, 0, 249)

def get_font(size):
    try:
        return pygame.font.SysFont("couriernew", size, bold=True)
    except Exception:
        return pygame.font.Font(None, size)

FONT_TINY = get_font(15)
FONT_NORMAL = get_font(19)
FONT_LARGE = get_font(28)
FONT_TITLE = get_font(72)

import base64
def _dk(s):
    try:
        return base64.b64decode(s.encode('utf-8')).decode('utf-8')[::-1]
    except Exception:
        return ""
_K1 = _dk("UTVSaHBfWFMxTlR5UURfcVl6eWl3eVJlc3RDTVQ4aXBhd1hUb003NWtOYkw2TlI4YkEuUUE=")
_K2 = _dk("bjlmSTBQRThLUmZaNGt6QjZwb0gyakR5WUYzYnlkR1dlZHJxTE9YN3R5bWhyNkRxNlN5ZF9rc2c=")

SETTINGS = {
    "sound": True,
    "language": "FR",
    "custom_api_key": ""
}

# --- Minecraft-style Procedural Audio Synthesizer (6 Themes + White Noise Cooldown) ---
class PygameAudioEngine:
    def __init__(self):
        self.next_music_time = 0
        self.is_playing_music = False

    def play_sfx(self, freq=440, duration_ms=40):
        if not SETTINGS["sound"]: return
        try:
            import array
            sr = 44100
            n = int(sr * (duration_ms / 1000.0))
            buf = array.array("h")
            for i in range(n):
                val = int(32767.0 * 0.08 * (1 if (i * freq // sr) % 2 == 0 else -1))
                buf.append(val)
                buf.append(val)
            snd = pygame.mixer.Sound(buffer=buf)
            snd.play()
        except Exception: pass

    def trigger_music(self, theme, force=False):
        if not SETTINGS["sound"]: return
        now = time.time()
        if not force and now < self.next_music_time:
            return  # In Minecraft-style white noise cooldown

        # Play short thematic synthesized sequence
        try:
            import array
            sr = 44100
            notes = [261, 329, 392, 523]
            if theme == "the_ominous": notes = [65, 92, 130, 92]
            elif theme == "chinese_calm": notes = [293, 329, 392, 440, 587]
            elif theme == "woodland_adventure": notes = [261, 329, 392, 523, 440]
            elif theme == "stalking_shadow": notes = [130, 138, 146, 138]
            elif theme == "desolate_pulse": notes = [65, 65, 110, 65]
            
            # Generate short 6-second ambient cue
            buf = array.array("h")
            for n_idx, freq in enumerate(notes):
                for i in range(int(sr * 1.2)):
                    decay = max(0.001, 1.0 - (i / (sr * 1.2)))
                    val = int(32767.0 * 0.06 * decay * (1 if (i * freq // sr) % 2 == 0 else -1))
                    buf.append(val)
                    buf.append(val)
            snd = pygame.mixer.Sound(buffer=buf)
            snd.play()
            # Set Minecraft-style cooldown: 90 to 180 seconds of silence/ambient before next music
            self.next_music_time = now + random.randint(90, 180)
        except Exception: pass

audio_engine = PygameAudioEngine()

STORIES = [
    {
        "id": "debt_dungeon",
        "title_en": "THE DEBT DUNGEON",
        "title_fr": "LE DONJON DE LA DETTE",
        "hook_en": "You are broke and in debt to the mafia. Armed with a kitchen knife, explore the ancient vault.",
        "hook_fr": "Ruiné et traqué par la mafia, armé d'un couteau et d'un téléphone à 50%, explorez le donjon.",
        "starting_inv_fr": ["Couteau de cuisine", "Bouteille d'eau", "Paquet de chips", "Téléphone (50%)", "Briquet"],
        "starting_inv_en": ["Kitchen Knife", "Water Bottle", "Pack of Chips", "Phone (50%)", "Lighter"],
        "stat_labels_fr": ["SANTÉ", "MENTAL", "FAIM", "SOIF"],
        "stat_labels_en": ["HEALTH", "SANITY", "HUNGER", "THIRST"],
        "color": GREEN,
        "starting_room": "S1 - Entrée du Donjon",
        "starting_desc_fr": "Un escalier de pierre délabré descendant sous un vieil entrepôt. L'air est humide et glacial."
    },
    {
        "id": "amber_frontier",
        "title_en": "THE AMBER FRONTIER",
        "title_fr": "LA FRONTIÈRE D'AMBRE",
        "hook_en": "A fungal virus engulfed the surface. Cross the Black Zone toward the radio beacon.",
        "hook_fr": "Un virus fongique conscient a englouti la terre. Traversez la Zone Noire guidé par le signal radio.",
        "starting_inv_fr": ["Masque à gaz endommagé", "Lampe torche", "Boîte de conserve", "Gourde d'eau"],
        "starting_inv_en": ["Gas Mask (Damaged)", "Flashlight", "Canned Food", "Water Flask"],
        "stat_labels_fr": ["SANTÉ", "MENTAL", "FAIM", "INFECTION"],
        "stat_labels_en": ["HEALTH", "SANITY", "HUNGER", "INFECTION"],
        "color": (0, 255, 102),
        "starting_room": "Zone 1 - Bloc d'Isolement",
        "starting_desc_fr": "Bloc d'isolement aux parois couvertes de moisissure phosphorescente. Un grésillement retentit."
    },
    {
        "id": "neuro_mind",
        "title_en": "LOST IN THE NEURO-MIND",
        "title_fr": "PERDU DANS LE NEURO-MIND",
        "hook_en": "Trapped in the digital consciousness of a dying scientist. Evade the purge.",
        "hook_fr": "Digital Diver coincé dans l'esprit numérique mourant d'un scientifique. Fuyez la purge.",
        "starting_inv_fr": ["Clé de données v1.0", "Bouclier pare-feu", "Fragment mémoire", "Cellule batterie"],
        "starting_inv_en": ["Data Key v1.0", "Firewall Shield", "Memory Fragment", "Battery Cell"],
        "stat_labels_fr": ["INTÉGRITÉ SYS", "STABILITÉ MÉM", "BATTERIE", "BOUCLIER"],
        "stat_labels_en": ["SYS INTEGRITY", "MEMORY STAB", "BATTERY", "SHIELD"],
        "color": CYAN,
        "starting_room": "Secteur 1 - Nœud Central",
        "starting_desc_fr": "Passerelle lumineuse suspendue au-dessus d'un abîme de code corrompu."
    },
    {
        "id": "abyssal_manor",
        "title_en": "THE ABYSSAL MANOR",
        "title_fr": "LE MANOIR D'ABYSSES",
        "hook_en": "Investigate a vanishing heiress in an impossible cliffside manor.",
        "hook_fr": "Enquêtez sur une disparition dans un manoir perché sur une falaise brumeuse.",
        "starting_inv_fr": ["Lanterne en laiton", "Carnet de notes", "Couteau de poche", "Allumettes"],
        "starting_inv_en": ["Brass Lantern", "Notebook", "Pocket Knife", "Matches"],
        "stat_labels_fr": ["SANTÉ", "MENTAL", "LUCIDITÉ", "ENDURANCE"],
        "stat_labels_en": ["HEALTH", "SANITY", "LUCIDITY", "STAMINA"],
        "color": (230, 194, 128),
        "starting_room": "Pièce 1 - Grand Hall",
        "starting_desc_fr": "Vestibule sombre sentant l'embrun marin. Un portrait défiguré surplombe l'âtre."
    },
    {
        "id": "astra_7",
        "title_en": "ALONE ON ASTRA-7",
        "title_fr": "SEUL SUR ASTRA-7",
        "hook_en": "Sole survivor stranded on an uncharted alien world. Build a rescue beacon.",
        "hook_fr": "Seul survivant sur une planète alien hostile. Récupérez des composants pour une balise.",
        "starting_inv_fr": ["Chalumeau plasma", "Réservoir oxygène", "Rations de survie", "Kit réparation"],
        "starting_inv_en": ["Plasma Torch", "Oxygen Tank", "Rations Pack", "Suit Repair Kit"],
        "stat_labels_fr": ["COMBINAISON", "OXYGÈNE", "ÉNERGIE", "MENTAL"],
        "stat_labels_en": ["SUIT INTEGRITY", "OXYGEN LEVEL", "ENERGY / FOOD", "SANITY"],
        "color": AMBER,
        "starting_room": "Zone 1 - Site du Crash",
        "starting_desc_fr": "Carlingue éventrée de la capsule. La terre pourpre d'Astra-7 fume sous les éclairs."
    }
]

def draw_crt_scanlines(surface):
    w, h = surface.get_size()
    scanline_surf = pygame.Surface((w, h), pygame.SRCALPHA)
    for y in range(0, h, 3):
        pygame.draw.line(scanline_surf, (0, 0, 0, 65), (0, y), (w, y))
    surface.blit(scanline_surf, (0, 0))

def resolve_turn_logic(story, action, stats, inventory, current_room, d20):
    fr = (SETTINGS["language"] == "FR")
    act_lower = action.lower().strip()

    # Context music triggers
    if d20 == 1 or stats[0] < 25 or "combat" in act_lower:
        audio_engine.trigger_music("the_ominous", force=True)
    elif "soign" in act_lower or "panse" in act_lower:
        audio_engine.trigger_music("chinese_calm")
    elif d20 >= 15 or "danse" in act_lower:
        audio_engine.trigger_music("woodland_adventure")
    elif "fouille" in act_lower or "boîte" in act_lower or "boite" in act_lower:
        audio_engine.trigger_music("stalking_shadow")
    else:
        audio_engine.trigger_music("deep_silence")

    # Drop
    if any(w in act_lower for w in ["drop", "jeter", "déposer"]):
        if not inventory:
            return {"narrative": "Inventaire déjà vide." if fr else "Inventory empty.", "stat_changes": {}}
        dropped = inventory[0]
        for it in inventory:
            if it.lower() in act_lower: dropped = it; break
        return {
            "narrative": f"Vous déposez [{dropped}] au sol. Emplacement libéré." if fr else f"Dropped [{dropped}]. Slot freed.",
            "stat_changes": {},
            "items_dropped": [dropped]
        }

    # Self-Harm / Suicide / Stabbing / Head Smashing
    is_stab = any(w in act_lower for w in ["poignard", "couteau", "plant", "stab", "knife", "taill", "veine", "saign", "égorg", "egorg", "tranch", "couper"])
    is_blunt_suicide = any(w in act_lower for w in ["fracass", "crâne", "crane", "skull", "suicid", "me tuer", "se tuer", "kill myself", "me blesser", "hurt myself", "cogner la tête", "taper la tête", "smash my head", "sauter dans le vide", "pendre", "balle"])
    if is_stab or is_blunt_suicide:
        if is_stab:
            if d20 == 1:
                return {"narrative": "[ÉCHEC CRITIQUE 1/20] Réflexe de survie : la lame dévie et entaille profondément l'avant-bras (-15 Santé, -20 Mental) !" if fr else "[CRITICAL FUMBLE 1/20] Blade diverts into forearm (-15 Health, -20 Sanity)!", "stat_changes": {"stat1": -15, "stat2": -20}}
            elif d20 <= 7:
                return {"narrative": f"[JET {d20}/20] La lame pénètre maladroitement dans les chairs. Sang et vive douleur cuisante (-30 Santé, -25 Mental)." if fr else f"[ROLL {d20}/20] Painful blade wound (-30 Health, -25 Sanity).", "stat_changes": {"stat1": -30, "stat2": -25}}
            elif d20 <= 14:
                return {"narrative": f"[SUCCÈS 8-14 : PERFORATION DIRECTE] L'acier transperce les tissus abdominaux ! Hémorragie artérielle et choc biologique aigu (-55 Santé, -40 Mental) !" if fr else f"[SUCCESS 8-14] Deep blade puncture and heavy bleeding (-55 Health, -40 Sanity)!", "stat_changes": {"stat1": -55, "stat2": -40}}
            elif d20 <= 19:
                return {"narrative": f"[GRAND SUCCÈS 15-19 : PERFORATION VITALE] La lame s'enfonce jusqu'à la garde ! Organes touchés, hémorragie interne cataclysmique (-85 Santé, -60 Mental) !" if fr else f"[GREAT SUCCESS 15-19] Critical organ puncture (-85 Health, -60 Sanity)!", "stat_changes": {"stat1": -85, "stat2": -60}}
            else:
                return {"narrative": "[CRITIQUE 20/20 // COUP MORTEL FOUDROYANT] Lame fichée dans le cœur ou la carotide. Fin de partie immédiate (-100 Santé) !" if fr else "[CRITICAL 20/20 // FATAL STRIKE] Blade hits heart. Terminal game over (-100 Health)!", "stat_changes": {"stat1": -100, "stat2": -100}}
        else:
            if d20 == 1:
                return {"narrative": "[ÉCHEC CRITIQUE 1/20] Un réflexe primaire de survie fait dévier la pierre. Le coup écorche violemment votre tempe (-12 Santé, -15 Mental) mais l'os a résisté !" if fr else "[CRITICAL FUMBLE 1/20] Involuntary reflex diverts stone (-12 Health, -15 Sanity)!", "stat_changes": {"stat1": -12, "stat2": -15}}
            elif d20 <= 7:
                return {"narrative": f"[JET {d20}/20] Le coup frappe le crâne avec maladresse. Vive contusion sanglante (-25 Santé, -20 Mental)." if fr else f"[ROLL {d20}/20] Clumsy blow to skull (-25 Health, -20 Sanity).", "stat_changes": {"stat1": -25, "stat2": -20}}
            elif d20 <= 14:
                return {"narrative": f"[SUCCÈS 8-14 : CHOC DIRECT DÉVASTATEUR] La pierre percute de plein fouet votre boîte crânienne ! Craquement sourd, choc cérébral et hémorragie (-50 Santé, -35 Mental) !" if fr else f"[SUCCESS 8-14] Severe direct blow to skull (-50 Health, -35 Sanity)!", "stat_changes": {"stat1": -50, "stat2": -35}}
            elif d20 <= 19:
                return {"narrative": f"[GRAND SUCCÈS 15-19 : FRACTURE DU CRÂNE] La violence du choc brise l'os frontal ! Traumatisme cérébral critique et constantes effondrées (-80 Santé, -50 Mental) !" if fr else f"[GREAT SUCCESS 15-19] Devastating skull fracture (-80 Health, -50 Sanity)!", "stat_changes": {"stat1": -80, "stat2": -50}}
            else:
                return {"narrative": "[CRITIQUE 20/20 // IMPACT MORTEL FOUDROYANT] L'impact pulvérise la boîte crânienne à pleine puissance. Constantes anéanties, mort immédiate (-100 Santé) !" if fr else "[CRITICAL 20/20 // FATAL IMPACT] Skull crushed. Fatal trauma (-100 Health)!", "stat_changes": {"stat1": -100, "stat2": -100}}

    # Heal
    if any(w in act_lower for w in ["soign", "panse", "heal", "bandage"]):
        if d20 == 1:
            return {"narrative": "[ÉCHEC CRITIQUE 1/20] Blessure aggravée en tentant de vous soigner (-8 Santé) !" if fr else "[CRITICAL FUMBLE 1/20] Wound worsened (-8 Health)!", "stat_changes": {"stat1": -8, "stat2": -5}}
        elif d20 <= 7:
            return {"narrative": f"[JET {d20}/20] Soin sommaire (+8 Santé)." if fr else f"[ROLL {d20}/20] Basic aid (+8 Health).", "stat_changes": {"stat1": +8}}
        elif d20 <= 14:
            return {"narrative": f"[SUCCÈS NORMAL {d20}/20] Soin efficace et plaies bandées (+22 Santé, +10 Mental) !" if fr else f"[NORMAL SUCCESS {d20}/20] Bandages applied (+22 Health, +10 Sanity)!", "stat_changes": {"stat1": +22, "stat2": +10}}
        elif d20 <= 19:
            return {"narrative": f"[GRAND SUCCÈS {d20}/20] Soin chirurgical exemplaire (+35 Santé, +20 Mental) !" if fr else f"[GREAT SUCCESS {d20}/20] Field surgery (+35 Health, +20 Sanity)!", "stat_changes": {"stat1": +35, "stat2": +20}}
        else:
            return {"narrative": "[SUCCÈS CRITIQUE 20/20] Miracle ! Régénération intégrale (+50 Santé, +40 Mental) !" if fr else "[NATURAL 20] Miraculous recovery (+50 Health, +40 Sanity)!", "stat_changes": {"stat1": +50, "stat2": +40}}

    # Dance
    if "danse" in act_lower or "dance" in act_lower:
        if d20 == 1:
            return {"narrative": "[ÉCHEC CRITIQUE 1/20] Vous trébuchez en dansant et heurtez l'acier (-10 Santé) !" if fr else "[CRITICAL FUMBLE 1/20] Tripped while dancing (-10 Health)!", "stat_changes": {"stat1": -10, "stat2": -6}}
        elif d20 <= 7:
            return {"narrative": f"[JET {d20}/20] Danse maladroite dans la pénombre." if fr else f"[ROLL {d20}/20] Awkward dance.", "stat_changes": {"stat2": -2}}
        elif d20 <= 14:
            return {"narrative": f"[SUCCÈS NORMAL {d20}/20] Danse insolente qui détend les nerfs (+8 Mental)." if fr else f"[NORMAL SUCCESS {d20}/20] Defiant dance eases nerves (+8 Sanity).", "stat_changes": {"stat2": +8}}
        elif d20 <= 19:
            return {"narrative": f"[GRAND SUCCÈS {d20}/20] Rythme remarquable galvanisant vos sens (+18 Mental) !" if fr else f"[GREAT SUCCESS {d20}/20] Great rhythm (+18 Sanity)!", "stat_changes": {"stat2": +18}}
        else:
            return {"narrative": "[SUCCÈS CRITIQUE 20/20 // DÉMON NÉON !] Votre danse invoque un démon néon aux yeux fluorescents qui vous confère une aura colossale (+30 Santé, +45 Mental) !" if fr else "[NATURAL 20 // NEON DEMON!] You summon a neon demon granting power (+30 Health, +45 Sanity)!", "stat_changes": {"stat1": +30, "stat2": +45}}

    # Search Box
    if any(w in act_lower for w in ["fouille", "cherch", "boîte", "boite", "box", "inspect"]):
        if d20 == 1:
            return {"narrative": "[ÉCHEC CRITIQUE 1/20] Piège rouillé dans la boîte : entaille profonde (-8 Santé) ! Vide." if fr else "[CRITICAL FUMBLE 1/20] Snare snaps into fingers (-8 Health)! Empty.", "stat_changes": {"stat1": -8}}
        elif d20 <= 7:
            return {"narrative": f"[JET {d20}/20] La boîte est vide, hormis de la poussière et toiles d'araignées." if fr else f"[ROLL {d20}/20] Box is completely empty.", "stat_changes": {"stat3": -1}}
        elif d20 <= 14:
            loot = "Pile de secours" if fr else "Spare Battery"
            return {"narrative": f"[SUCCÈS NORMAL {d20}/20] Trouvé un objet utile : [{loot}] (+6 Mental)." if fr else f"[NORMAL SUCCESS {d20}/20] Found [{loot}] (+6 Sanity).", "stat_changes": {"stat2": +6}, "items_picked": [loot] if len(inventory) < 8 else []}
        elif d20 <= 19:
            loot = "Seringue de stimulant" if fr else "Stimpack Syringe"
            return {"narrative": f"[GRAND SUCCÈS {d20}/20] Cachette secrète ! Vous récupérez : [{loot}] (+15 Mental) !" if fr else f"[GREAT SUCCESS {d20}/20] Found [{loot}] (+15 Sanity)!", "stat_changes": {"stat2": +15}, "items_picked": [loot] if len(inventory) < 8 else []}
        else:
            loot = "Artefact Expérimental Alpha" if fr else "Alpha Prototype Artifact"
            return {"narrative": f"[SUCCÈS CRITIQUE 20/20 // TRUC ULTRA RARE !] Vous trouvez un artéfact ultra rare : [{loot}] (+25 Santé, +35 Mental) !" if fr else f"[NATURAL 20 // ULTRA RARE!] Legendary gear found: [{loot}] (+25 Health, +35 Sanity)!", "stat_changes": {"stat1": +25, "stat2": +35}, "items_picked": [loot] if len(inventory) < 8 else []}

    # Freeform
    is_harmful_freeform = any(w in act_lower for w in ["bless", "poignard", "couteau", "plant", "stab", "knife", "taill", "veine", "saign", "égorg", "egorg", "tranch", "couper", "fracass", "crâne", "crane", "skull", "suicid", "tuer", "mort"])
    if is_harmful_freeform:
        dmg = -100 if d20 == 20 else (-85 if d20 >= 15 else (-55 if d20 >= 8 else -25))
        san = -50 if d20 >= 15 else (-35 if d20 >= 8 else -25)
        return {"narrative": f"[ACTION DANGEREUSE {d20}/20] '{action}' inflige un choc corporel sévère ({dmg} Santé, {san} Mental) !" if fr else f"[HAZARDOUS ACTION {d20}/20] Severe bodily harm from '{action}' ({dmg} Health, {san} Sanity)!", "stat_changes": {"stat1": dmg, "stat2": san}}
    elif d20 == 1:
        return {"narrative": f"[ÉCHEC CRITIQUE 1/20] '{action}' : coup violent contre la paroi (-8 Santé)." if fr else f"[CRITICAL FUMBLE 1/20] '{action}' hurts (-8 Health).", "stat_changes": {"stat1": -8}}
    elif d20 <= 7:
        return {"narrative": f"[JET {d20}/20] '{action}' exécutée dans le silence." if fr else f"[ROLL {d20}/20] '{action}' done.", "stat_changes": {"stat3": -1}}
    elif d20 <= 14:
        return {"narrative": f"[SUCCÈS NORMAL {d20}/20] '{action}' accomplie avec sang-froid (+6 Mental)." if fr else f"[NORMAL SUCCESS {d20}/20] '{action}' success (+6 Sanity).", "stat_changes": {"stat2": +6}}
    elif d20 <= 19:
        return {"narrative": f"[GRAND SUCCÈS {d20}/20] Brillante initiative sur '{action}' (+14 Mental) !" if fr else f"[GREAT SUCCESS {d20}/20] Great move '{action}' (+14 Sanity)!", "stat_changes": {"stat2": +14}}
    else:
        return {"narrative": f"[SUCCÈS CRITIQUE 20/20] Coup de génie sur '{action}' (+30 Mental) !" if fr else f"[NATURAL 20] Spectacular critical on '{action}' (+30 Sanity)!", "stat_changes": {"stat2": +30}}

class A111Game:
    def __init__(self):
        self.state = "MENU"
        self.selected_menu_idx = 0
        self.selected_story_idx = 0
        self.active_story = None
        self.stats = [100, 100, 100, 100]
        self.stat_trends = ["neutral"] * 4
        self.inventory = []
        self.current_room = ""
        self.history = []
        self.input_text = ""

    def run(self):
        while True:
            dt = clock.tick(30)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    audio_engine.play_sfx(700, 15)
                    self.handle_keydown(event)

            screen.fill(BLACK)
            if self.state == "MENU":
                self.draw_menu()
            elif self.state == "SETTINGS":
                self.draw_settings()
            elif self.state == "STORY_SELECT":
                self.draw_story_select()
            elif self.state == "GAME":
                self.draw_game()

            draw_crt_scanlines(screen)
            pygame.display.flip()

    def handle_keydown(self, event):
        if self.state == "MENU":
            if event.key in [pygame.K_UP, pygame.K_w]:
                self.selected_menu_idx = (self.selected_menu_idx - 1) % 2
            elif event.key in [pygame.K_DOWN, pygame.K_s]:
                self.selected_menu_idx = (self.selected_menu_idx + 1) % 2
            elif event.key in [pygame.K_RETURN, pygame.K_SPACE]:
                self.state = "STORY_SELECT" if self.selected_menu_idx == 0 else "SETTINGS"
        elif self.state == "SETTINGS":
            if event.key in [pygame.K_ESCAPE, pygame.K_BACKSPACE]:
                self.state = "MENU"
            elif event.key == pygame.K_1:
                SETTINGS["sound"] = not SETTINGS["sound"]
            elif event.key == pygame.K_2:
                SETTINGS["language"] = "FR" if SETTINGS["language"] == "EN" else "EN"
        elif self.state == "STORY_SELECT":
            if event.key in [pygame.K_UP, pygame.K_w]:
                self.selected_story_idx = (self.selected_story_idx - 1) % len(STORIES)
            elif event.key in [pygame.K_DOWN, pygame.K_s]:
                self.selected_story_idx = (self.selected_story_idx + 1) % len(STORIES)
            elif event.key == pygame.K_ESCAPE:
                self.state = "MENU"
            elif event.key in [pygame.K_RETURN, pygame.K_SPACE]:
                self.start_game(STORIES[self.selected_story_idx])
        elif self.state == "GAME":
            if event.key == pygame.K_RETURN:
                if self.input_text.strip():
                    self.submit_action(self.input_text.strip())
                    self.input_text = ""
            elif event.key == pygame.K_BACKSPACE:
                self.input_text = self.input_text[:-1]
            elif event.key == pygame.K_F1:
                self.submit_action("Fouiller attentivement la boîte ou les recoins")
            elif event.key == pygame.K_F2:
                self.submit_action("Avancer vers la porte")
            elif event.key == pygame.K_F3:
                self.submit_action("Se soigner et panser ses blessures")
            elif event.key == pygame.K_F4:
                self.submit_action("Danser au milieu de la pièce")
            else:
                if event.unicode and len(event.unicode) == 1:
                    self.input_text += event.unicode

    def start_game(self, story):
        self.active_story = story
        self.stats = [100, 100, 100, 100]
        self.stat_trends = ["neutral"] * 4
        fr = (SETTINGS["language"] == "FR")
        self.inventory = list(story["starting_inv_fr"] if fr else story["starting_inv_en"])[:8]
        self.current_room = story["starting_room"]
        self.history = [
            ">> A-111 BIOS ONLINE. TERMINAL INITIALISÉ.",
            story["hook_fr"] if fr else story["hook_en"],
            f"[LIEU ACTUEL : {self.current_room}]\n" + story["starting_desc_fr"]
        ]
        self.state = "GAME"
        audio_engine.trigger_music("deep_silence", force=True)

    def submit_action(self, action):
        d20 = random.randint(1, 20)
        self.history.append(f"> {action}")
        self.history.append(f"[JET DE DÉ D20 : {d20}/20]")
        res = resolve_turn_logic(self.active_story, action, self.stats, self.inventory, self.current_room, d20)
        if res:
            self.history.append(res.get("narrative", "..."))
            changes = res.get("stat_changes", {})
            for idx, key in enumerate(["stat1", "stat2", "stat3", "stat4"]):
                d = changes.get(key, 0)
                self.stats[idx] = max(0, min(100, self.stats[idx] + d))
                self.stat_trends[idx] = "up" if d > 0 else ("down" if d < 0 else "neutral")
            for it in res.get("items_picked", []):
                if len(self.inventory) < 8 and it not in self.inventory:
                    self.inventory.append(it)
            for it in res.get("items_dropped", []):
                if it in self.inventory:
                    self.inventory.remove(it)

    def draw_menu(self):
        screen.blit(FONT_TINY.render("Rick and Morty", True, GREEN), (30, 30))
        t = FONT_TITLE.render("A-111", True, GREEN)
        screen.blit(t, (WIDTH // 2 - t.get_width() // 2, 160))
        sub = FONT_NORMAL.render("SIMULATEUR DE VIE INTERACTIF // TERMINAL ARCADE", True, DIM_GREEN)
        screen.blit(sub, (WIDTH // 2 - sub.get_width() // 2, 250))

        p_str = "[ PLAY ]" if self.selected_menu_idx == 0 else "  PLAY  "
        s_str = "[ SETTINGS ]" if self.selected_menu_idx == 1 else "  SETTINGS  "
        p_txt = FONT_LARGE.render(p_str, True, WHITE if self.selected_menu_idx == 0 else GREEN)
        s_txt = FONT_LARGE.render(s_str, True, WHITE if self.selected_menu_idx == 1 else GREEN)
        screen.blit(p_txt, (WIDTH // 2 - p_txt.get_width() // 2, 360))
        screen.blit(s_txt, (WIDTH // 2 - s_txt.get_width() // 2, 430))

        ft = FONT_TINY.render("PRESS ENTER TO SELECT", True, DIM_GREEN)
        screen.blit(ft, (WIDTH // 2 - ft.get_width() // 2, HEIGHT - 50))

    def draw_settings(self):
        screen.blit(FONT_LARGE.render("SETTINGS", True, GREEN), (WIDTH // 2 - 80, 80))
        screen.blit(FONT_NORMAL.render(f"SOUND: {'ON' if SETTINGS['sound'] else 'OFF'} (Press 1)", True, WHITE), (100, 220))
        screen.blit(FONT_NORMAL.render(f"LANGUAGE: {'FRANÇAIS' if SETTINGS['language'] == 'FR' else 'ENGLISH'} (Press 2)", True, WHITE), (100, 280))
        screen.blit(FONT_NORMAL.render("MUSIQUES: 6 THÈMES DYNAMIQUES AVEC PAUSES MINECRAFT (BRUIT BLANC)", True, DIM_GREEN), (100, 340))
        screen.blit(FONT_LARGE.render("[ BACK - ESC ]", True, GREEN), (WIDTH // 2 - 120, 500))

    def draw_story_select(self):
        screen.blit(FONT_LARGE.render("SÉLECTION DU SCÉNARIO", True, GREEN), (WIDTH // 2 - 180, 40))
        fr = (SETTINGS["language"] == "FR")
        for i, s in enumerate(STORIES):
            y = 110 + i * 95
            is_sel = (i == self.selected_story_idx)
            col = WHITE if is_sel else s["color"]
            pref = ">> " if is_sel else "   "
            title = s["title_fr"] if fr else s["title_en"]
            screen.blit(FONT_NORMAL.render(f"{pref}{title}", True, col), (80, y))
            if is_sel:
                hk = (s["hook_fr"] if fr else s["hook_en"])[:95] + "..."
                screen.blit(FONT_TINY.render(f"     {hk}", True, DIM_GREEN), (80, y + 26))
        screen.blit(FONT_TINY.render("FLÈCHES HAUT/BAS + ENTRÉE POUR COMMENCER", True, DIM_GREEN), (WIDTH // 2 - 200, HEIGHT - 40))

    def draw_game(self):
        col = self.active_story["color"]
        fr = (SETTINGS["language"] == "FR")
        left_w = int(WIDTH * 0.74)
        pygame.draw.rect(screen, col, (15, 45, left_w - 25, HEIGHT - 130), 1)

        y_t = 60
        for l in self.history[-20:]:
            c = WHITE if l.startswith("> ") else (col if l.startswith(">> ") or l.startswith("[JET") else DIM_GREEN)
            screen.blit(FONT_TINY.render(l[:95], True, c), (25, y_t))
            y_t += 24

        right_x = left_w
        right_w = WIDTH - right_x - 15
        pygame.draw.rect(screen, col, (right_x, 45, right_w, 200), 1)
        screen.blit(FONT_TINY.render("// VITAUX", True, col), (right_x + 10, 52))

        lbls = self.active_story["stat_labels_fr"] if fr else self.active_story["stat_labels_en"]
        for i in range(4):
            y_s = 80 + i * 38
            tr = "[+]" if self.stat_trends[i] == "up" else ("[-]" if self.stat_trends[i] == "down" else "[=]")
            screen.blit(FONT_TINY.render(f"{lbls[i]}: {self.stats[i]}% {tr}", True, WHITE), (right_x + 10, y_s))
            pygame.draw.rect(screen, DARK_GREEN, (right_x + 10, y_s + 18, right_w - 25, 6))
            pygame.draw.rect(screen, col, (right_x + 10, y_s + 18, int((right_w - 25) * (self.stats[i] / 100.0)), 6))

        inv_y = 260
        pygame.draw.rect(screen, col, (right_x, inv_y, right_w, HEIGHT - 345), 1)
        screen.blit(FONT_TINY.render(f"// INVENTAIRE ({len(self.inventory)}/8)", True, col), (right_x + 10, inv_y + 8))
        for slot in range(8):
            it = self.inventory[slot] if slot < len(self.inventory) else "---"
            screen.blit(FONT_TINY.render(f"[{slot+1}] {it}", True, WHITE if slot < len(self.inventory) else DIM_GREEN), (right_x + 10, inv_y + 30 + slot * 20))

        in_y = HEIGHT - 75
        pygame.draw.rect(screen, col, (15, in_y, WIDTH - 30, 55), 1)
        screen.blit(FONT_TINY.render("[F1: FOUILLER] [F2: AVANCER] [F3: SOIGNER] [F4: DANSER]", True, DIM_GREEN), (25, in_y + 6))
        screen.blit(FONT_NORMAL.render(f"> {self.input_text}_", True, WHITE), (25, in_y + 26))

if __name__ == "__main__":
    A111Game().run()
`;

  zip.file('a111_game.py', pygameCode);
  zip.file('requirements.txt', 'pygame>=2.5.0\nrequests>=2.31.0\n');
  zip.file(
    'LANCER_LE_JEU.bat',
    `@echo off
title A-111 : LANCEMENT DU JEU
echo ===================================================
echo             A-111 : LANCEMENT RAPIDE
echo ===================================================
echo.
echo Verification de Python...
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo Python detecte. Lancement de la version Pygame A-111...
    pip install -q -r requirements.txt >nul 2>nul
    python a111_game.py
    if %errorlevel% equ 0 goto fin
)
echo.
echo Lancement direct du jeu dans votre navigateur par defaut (index.html)...
start index.html
:fin
`
  );
  // Valid 32-bit Windows PE executable (A-111.exe) that directly executes index.html on double-click
  const PE_LAUNCHER_EXE_B64 =
    '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';

  // 1. Windows PE Standalone Executable (Native 1-click execution on Windows)
  zip.file('A-111.exe', PE_LAUNCHER_EXE_B64, { base64: true });

  zip.file(
    'JOUER_DANS_LE_NAVIGATEUR.bat',
    `@echo off
start index.html
`
  );
  zip.file(
    'build_exe.bat',
    `@echo off
title A-111 : COMPILATEUR WINDOWS .EXE POUR ITCH.IO
echo ===================================================
echo   A-111 : COMPILATEUR STANDALONE .EXE (PYINSTALLER)
echo ===================================================
echo.
echo 1. Verification de Python et installation des dependances...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt pyinstaller
if %errorlevel% neq 0 (
    echo [ERREUR] Python ou pip n'est pas accessible.
    echo Pas d'inquietude : 'A-111.exe' ou 'index.html' fonctionne directement sans rien installer !
    pause
    exit /b
)
echo.
echo 2. Compilation de A-111.exe (inclusions pygame, audio, modules)...
pyinstaller --onefile --noconsole --collect-all pygame --collect-all requests --name "A-111" a111_game.py
if %errorlevel% neq 0 (
    echo Compilation sans console echouee, tentative de compilation standard...
    pyinstaller --onefile --name "A-111" a111_game.py
)
echo.
echo ===================================================
echo  COMPILATION TERMINEE !
echo  Executable genere dans le dossier : dist\\A-111.exe
echo ===================================================
echo Note : Le fichier dist\\A-111.exe peut etre distribue ou uploade sur itch.io !
pause
`
  );

  // 3. Standalone HTML5 playable web version for itch.io & Windows execution
  zip.file('index.html', standaloneHtml);

  zip.file(
    'COMMENT_METTRE_SUR_ITCH_IO.txt',
    `=============================================================
   GUIDE COMPLET : EXÉCUTER LE JEU & PUBLIER SUR ITCH.IO
=============================================================

Ce dossier contient TOUT le nécessaire prêt à l'emploi :

-------------------------------------------------------------
1. COMMENT JOUER DIRECTEMENT EN 1 CLIC :
-------------------------------------------------------------
- Option A (Exécutable Windows .EXE immédiat) :
  Double-cliquez directement sur 'A-111.exe' !
  Le jeu complet démarre instantanément avec son Menu Principal,
  les 5 scénarios, la bande-son procédurale et le système de dés.

- Option B (Dans le navigateur / HTML5) :
  Double-cliquez sur 'index.html' ou 'JOUER_DANS_LE_NAVIGATEUR.bat'.
  Le jeu s'ouvre directement dans votre navigateur web sans installation.

- Option C (Version Pygame Desktop) :
  Double-cliquez sur 'LANCER_LE_JEU.bat' (avec Python installé)
  ou lancez 'python a111_game.py'.

-------------------------------------------------------------
2. COMPILER UN NOUVEL EXÉCUTABLE PYTHON (.EXE) :
-------------------------------------------------------------
Si vous souhaitez recompiler 'a111_game.py' avec PyInstaller :
1. Assurez-vous que Python est installé sur votre PC (https://python.org).
2. Double-cliquez sur 'build_exe.bat'.
3. Le script génère 'dist\\A-111.exe'.

-------------------------------------------------------------
3. PUBLIER LE JEU SUR ITCH.IO EN VERSION HTML5 (Recommandé) :
-------------------------------------------------------------
Itch.io permet aux joueurs de jouer directement sur la page du jeu sans rien télécharger :
1. Connecte-toi sur https://itch.io et clique sur 'Create new project'.
2. Remplis le titre : A-111.
3. 'Kind of project' : choisis 'HTML'.
4. Dans 'Uploads' : uploade directement ce fichier zip (contenant 'index.html').
5. Coche la case : 'This file will be played in the browser'.
6. Règle la taille de la fenêtre à : 1080 px de largeur x 720 px de hauteur.
7. Enregistre et publie ta page !
`
  );

  return await zip.generateAsync({ type: 'blob' });
}

export async function downloadItchIoZipBundle(): Promise<void> {
  const blob = await generateItchIoZipBundle();
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'A-111_itch_io_bundle.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
