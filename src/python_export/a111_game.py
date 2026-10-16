"""
A-111 : Interactive Terminal RPG & Survival Fiction
Inspired by Rick and Morty - 'Roy: A Life Well Lived' (E3S6)
Built with Pygame & AI Cascade Engine (Gemini / Groq / HuggingFace)
"""

import sys
import os
import json
import time
import requests
import pygame

# Initialize Pygame
pygame.init()
pygame.font.init()
if pygame.mixer.get_init() is None:
    try:
        pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=512)
    except Exception:
        pass

WIDTH, HEIGHT = 1080, 720
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)
pygame.display.set_caption("A-111 : RICK AND MORTY - BLIPS AND CHITZ TERMINAL")
clock = pygame.time.Clock()

# Colors
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
DARK_GREEN = (0, 40, 0)
DIM_GREEN = (0, 150, 0)
WHITE = (255, 255, 255)
CYAN = (0, 243, 255)
AMBER = (255, 170, 0)
RED = (255, 50, 50)
PURPLE = (213, 0, 249)

# Fonts
def get_font(size):
    try:
        return pygame.font.SysFont("couriernew", size, bold=True)
    except Exception:
        return pygame.font.Font(None, size)

FONT_TINY = get_font(16)
FONT_NORMAL = get_font(20)
FONT_LARGE = get_font(30)
FONT_TITLE = get_font(72)

import base64
def _dk(s):
    try:
        return base64.b64decode(s.encode('utf-8')).decode('utf-8')[::-1]
    except Exception:
        return ""
DEFAULT_KEY_GEMINI = _dk("UTVSaHBfWFMxTlR5UURfcVl6eWl3eVJlc3RDTVQ4aXBhd1hUb003NWtOYkw2TlI4YkEuUUE=")
FAILOVER_KEY_GROQ = _dk("bjlmSTBQRThrUkZaNFprQjZwb0gyakR5WUYzYnlkR1dkcmFMU1h0N3R5bWhyNkQ2U1N5ZF9rc2c=")
FAILOVER_KEY_HF = _dk("ckpnU2dRbVZYcmpTVEZWV3VFRnZMTExOTndiYnpaS0ZNTWNmX2Zo")

# Global Config
SETTINGS = {
    "sound": True,
    "language": "EN", # "EN" or "FR"
    "custom_api_key": ""
}

# Stories Data
STORIES = [
    {
        "id": "debt_dungeon",
        "title_en": "THE DEBT DUNGEON",
        "title_fr": "LE DONJON DE LA DETTE",
        "genre_en": "Urban Thriller & Underground Survival",
        "genre_fr": "Thriller Urbain & Survie Souterraine",
        "hook_en": "You are completely broke and heavily in debt. Today is your last day before the mafia eliminates you. Armed with a kitchen knife and half-empty water, you enter the ancient underground vaults.",
        "hook_fr": "Ruiné et criblé de dettes, c'est ton dernier jour avant que la mafia ne t'élimine. Armé d'un couteau et d'un téléphone à 50%, tu t'enfonces dans un donjon souterrain légendaire.",
        "starting_inv_en": ["Kitchen Knife", "Water Bottle", "Pack of Chips", "Phone (50%)", "Lighter"],
        "starting_inv_fr": ["Couteau de cuisine", "Bouteille d'eau", "Paquet de chips", "Téléphone (50%)", "Briquet"],
        "stat_labels_en": ["HEALTH", "SANITY", "HUNGER", "THIRST"],
        "stat_labels_fr": ["SANTÉ", "MENTAL", "FAIM", "SOIF"],
        "color": GREEN,
        "boundary_en": "The reinforced steel door behind you was locked by the mafia. There is no turning back.",
        "boundary_fr": "La porte en acier blindée derrière toi a été verrouillée par la mafia. Impossible de faire demi-tour.",
        "starting_room": "S1 - Dungeon Entrance"
    },
    {
        "id": "amber_frontier",
        "title_en": "THE AMBER FRONTIER",
        "title_fr": "LA FRONTIÈRE D'AMBRE",
        "genre_en": "Post-Apocalyptic Survival & Bioluminescent Horror",
        "genre_fr": "Horreur & Survie Post-Apocalyptique",
        "hook_en": "A sentient fungal virus engulfed the surface. You awaken in a bunker whose airlocks failed. Cross the terrifying Black Zone toward humanity's last radio haven.",
        "hook_fr": "Un virus fongique conscient a englouti la terre. Tu t'éveilles dans un bunker éventré. Traverse la terrifiante Zone Noire guidé par un signal radio.",
        "starting_inv_en": ["Gas Mask (Damaged)", "Flashlight", "Canned Food", "Water Flask"],
        "starting_inv_fr": ["Masque à gaz endommagé", "Lampe torche", "Boîte de conserve", "Gourde d'eau"],
        "stat_labels_en": ["HEALTH", "SANITY", "HUNGER", "INFECTION"],
        "stat_labels_fr": ["SANTÉ", "MENTAL", "FAIM", "INFECTION"],
        "color": (0, 255, 102),
        "boundary_en": "The deadly spore mist is too thick beyond this zone. Walking into it means instant asphyxiation.",
        "boundary_fr": "La brume de spores mortelles est trop dense. S'y aventurer entraîne une asphyxie immédiate.",
        "starting_room": "Zone 1 - Isolation Ward"
    },
    {
        "id": "neuro_mind",
        "title_en": "LOST IN THE NEURO-MIND",
        "title_fr": "PERDU DANS LE NEURO-MIND",
        "genre_en": "Cyberpunk & Psychological Sci-Fi Horror",
        "genre_fr": "Science-Fiction / Cyberpunk / Horreur Psychologique",
        "hook_en": "In 2099, you are a Digital Diver trapped in the dying mind of a missing scientist. Memory sectors are collapsing into bugs as the purge protocol hunts you.",
        "hook_fr": "En 2099, Digital Diver coincé dans la conscience numérique mourante d'un scientifique. Les secteurs s'effondrent sous la purge automatique.",
        "starting_inv_en": ["Data Key v1.0", "Firewall Shield", "Memory Fragment", "Battery Cell"],
        "starting_inv_fr": ["Clé de données v1.0", "Bouclier pare-feu", "Fragment mémoire", "Cellule batterie"],
        "stat_labels_en": ["SYS INTEGRITY", "MEMORY STAB", "BATTERY", "SHIELD"],
        "stat_labels_fr": ["INTÉGRITÉ SYS", "STABILITÉ MÉM", "BATTERIE", "BOUCLIER"],
        "color": CYAN,
        "boundary_en": "Access denied. The surrounding memory sector has been purged by the system antivirus.",
        "boundary_fr": "Accès refusé. Le secteur mémoire adjacent a été purgé par l'antivirus système.",
        "starting_room": "Sector 1 - Core Entry Node"
    },
    {
        "id": "abyssal_manor",
        "title_en": "THE ABYSSAL MANOR",
        "title_fr": "LE MANOIR D'ABYSSES",
        "genre_en": "Lovecraftian Horror & Suspense Adventure",
        "genre_fr": "Horreur Lovecraftienne / Aventure Suspens",
        "hook_en": "A private eye investigating a missing heiress in a shifting manor perched on a storm-lashed cliff. The rising tide and whispers test your sanity.",
        "hook_fr": "Détective privé à la recherche d'une héritière dans un manoir dont la géométrie change. La mer monte et les ombres murmurent.",
        "starting_inv_en": ["Brass Lantern", "Notebook", "Pocket Knife", "Matches"],
        "starting_inv_fr": ["Lanterne en laiton", "Carnet de notes", "Couteau de poche", "Allumettes"],
        "stat_labels_en": ["HEALTH", "SANITY", "LUCIDITY", "STAMINA"],
        "stat_labels_fr": ["SANTÉ", "MENTAL", "LUCIDITÉ", "ENDURANCE"],
        "color": (230, 194, 128),
        "boundary_en": "A thick, unnatural fog wraps around the cliff edge. Step any further and you fall into the abyss.",
        "boundary_fr": "Un brouillard impénétrable enveloppe la falaise. Un pas de plus vous précipiterait dans l'abysse.",
        "starting_room": "Room 1 - Grand Entrance Hall"
    },
    {
        "id": "astra_7",
        "title_en": "ALONE ON ASTRA-7",
        "title_fr": "SEUL SUR ASTRA-7",
        "genre_en": "Hard Sci-Fi & Alien Survival Adventure",
        "genre_fr": "Aventure Survie Spatial / Hard SF",
        "hook_en": "Sole survivor of exploration shuttle Astra-7 on an uncharted alien world. Explore ancient ruins to scavenge parts for an emergency distress beacon.",
        "hook_fr": "Seul survivant du crash d'Astra-7 sur une planète inconnue. Explore les ruines aliens pour assembler une balise de secours.",
        "starting_inv_en": ["Plasma Torch", "Oxygen Tank", "Rations Pack", "Suit Repair Kit"],
        "starting_inv_fr": ["Chalumeau plasma", "Réservoir oxygène", "Rations de survie", "Kit réparation"],
        "stat_labels_en": ["SUIT INTEGRITY", "OXYGEN LEVEL", "ENERGY / FOOD", "SANITY"],
        "stat_labels_fr": ["COMBINAISON", "OXYGÈNE", "ÉNERGIE", "MENTAL"],
        "color": AMBER,
        "boundary_en": "Radiation alarms shriek. The atmospheric storm will dissolve your suit in seconds.",
        "boundary_fr": "Les alarmes de radiation hurlent. La tempête ionique détruira votre combinaison en quelques secondes.",
        "starting_room": "Zone 1 - Crash Site"
    }
]

# Beep sound synthesis
def play_beep(freq=440, duration_ms=50):
    if not SETTINGS["sound"]:
        return
    try:
        sample_rate = 44100
        n_samples = int(sample_rate * (duration_ms / 1000.0))
        import array
        buf = array.array("h")
        for i in range(n_samples):
            val = int(32767.0 * 0.1 * (1 if (i * freq // sample_rate) % 2 == 0 else -1))
            buf.append(val)
            buf.append(val)
        snd = pygame.mixer.Sound(buffer=buf)
        snd.play()
    except Exception:
        pass

# Draw CRT Scanlines
def draw_crt_scanlines(surface):
    w, h = surface.get_size()
    scanline_surf = pygame.Surface((w, h), pygame.SRCALPHA)
    for y in range(0, h, 3):
        pygame.draw.line(scanline_surf, (0, 0, 0, 70), (0, y), (w, y))
    surface.blit(scanline_surf, (0, 0))

# AI Request Handler with Silent Cascade
import random

# AI Request Handler with Silent Cascade & D20 System
def call_ai_narrator(story, history, action, stats, inventory, current_room):
    d20 = random.randint(1, 20)
    system_prompt = f"""
You are the cold, retro text terminal game engine for 'A-111' (Rick & Morty Blips and Chitz arcade game).
Campaign: {story['title_en']}.
Language: {'FRENCH' if SETTINGS['language'] == 'FR' else 'ENGLISH'}.
Current Room: {current_room}
Player Inventory (max 5): {inventory}
Player Stats: {stats}
D20 ROLL FOR THIS ACTION: {d20}/20 (1=Critical fumble/hazard, 10=Success, 20=Surreal miraculous event/rare find).
Boundary Excuse: {story['boundary_en']}

Rules:
1. NEVER print a raw list of items. Describe the atmosphere. The player only finds items if they search and roll >= 10.
2. If player says 'drop [item]' or 'jeter [item]', remove it from inventory (put in items_dropped).
3. If player heals, eats or drinks, restore health/sanity in stat_changes.
4. Total freedom of actions. Adapt dynamically to the player's action and D20 roll.

Respond strictly with valid JSON:
{{
  "narrative": "1-2 atmospheric paragraphs reflecting the consequence of action and D20 roll ({d20}/20).",
  "new_room": "{current_room}",
  "stat_changes": {{"stat1": 0, "stat2": 0, "stat3": -2, "stat4": -2}},
  "items_picked": [],
  "items_dropped": [],
  "summary": "3rd person past-tense description.",
  "is_game_over": false,
  "is_victory": false
}}
"""
    # 1. User custom key
    if SETTINGS["custom_api_key"].strip():
        k = SETTINGS["custom_api_key"].strip()
        res = call_groq(k, system_prompt, action) if k.startswith("gsk_") else call_gemini(k, system_prompt, action)
        if res:
            res["d20"] = d20
            return res

    # 2. Gemini Default Key
    res = call_gemini(DEFAULT_KEY_GEMINI, system_prompt, action)
    if res:
        res["d20"] = d20
        return res

    # 3. Groq Failover 1
    res = call_groq(FAILOVER_KEY_GROQ, system_prompt, action)
    if res:
        res["d20"] = d20
        return res

    # 4. HuggingFace Failover 2
    res = call_hf(FAILOVER_KEY_HF, system_prompt, action)
    if res:
        res["d20"] = d20
        return res

    # 5. Offline Dynamic Fallback with D20
    return offline_fallback(story, action, current_room, inventory, d20)

def offline_fallback(story, action, room, inventory, d20):
    fr = (SETTINGS["language"] == "FR")
    act = action.lower()
    stat_changes = {"stat1": 0, "stat2": 0, "stat3": -2, "stat4": -2}
    dropped = []
    picked = []

    # Check drop
    if any(k in act for k in ["drop", "jeter", "poser", "lâcher"]):
        for it in inventory:
            if it.lower() in act:
                dropped.append(it)
                return {
                    "narrative": f"Vous déposez [{it}] sur le sol. L'emplacement d'inventaire est libéré." if fr else f"You set down [{it}] onto the floor. Inventory slot freed.",
                    "new_room": room,
                    "stat_changes": {"stat1": 0, "stat2": 0, "stat3": 0, "stat4": 0},
                    "items_picked": [],
                    "items_dropped": dropped,
                    "summary": f"Déposé [{it}]." if fr else f"Discarded [{it}].",
                    "is_game_over": False,
                    "is_victory": False,
                    "d20": d20
                }

    # Check heal
    if any(k in act for k in ["heal", "soigner", "bandage", "médicament", "reposer"]):
        stat_changes["stat1"] = 25 if d20 >= 10 else 10
        narrative = f"[SOIN] Vous pansez vos plaies avec soin (+{stat_changes['stat1']} Santé)." if fr else f"[HEAL] You administer field treatment (+{stat_changes['stat1']} Health)."
        return {
            "narrative": narrative,
            "new_room": room,
            "stat_changes": stat_changes,
            "items_picked": [],
            "items_dropped": [],
            "summary": "Le joueur a soigné ses blessures." if fr else "Player treated wounds.",
            "is_game_over": False,
            "is_victory": False,
            "d20": d20
        }

    # Check dance / wild actions
    if any(k in act for k in ["dance", "danser", "danse", "sing", "chanter"]):
        if d20 == 20:
            stat_changes["stat2"] = 30
            narrative = "[D20: 20/20 CRITIQUE] Votre danse chaotique invoque un démon néon fluorescent qui ricane avant de disparaître (+30 Mental) !" if fr else "[D20: 20/20 CRITICAL] Your bizarre dance summons a laughing neon demon before it vanishes (+30 Sanity)!"
        elif d20 == 1:
            stat_changes["stat1"] = -10
            narrative = "[D20: 1/20 ÉCHEC] Vous trébuchez lourdement en dansant et percutez un tuyau métallique (-10 Santé) !" if fr else "[D20: 1/20 FUMBLE] You trip clumsily while dancing and crash into rusted pipe (-10 Health)!"
        else:
            narrative = f"[D20: {d20}/20] Vous esquissez quelques pas dans l'obscurité. L'écho résonne bizarrement." if fr else f"[D20: {d20}/20] You dance in the shadows. The cold silence watches."
        return {
            "narrative": narrative,
            "new_room": room,
            "stat_changes": stat_changes,
            "items_picked": [],
            "items_dropped": [],
            "summary": "Le joueur a exécuté une danse." if fr else "Player danced.",
            "is_game_over": False,
            "is_victory": False,
            "d20": d20
        }

    # Standard / Search actions
    if d20 == 20:
        stat_changes["stat1"] = 15
        narrative = f"[D20: 20/20 SUCCÈS LÉGENDAIRE] Action: '{action}'. Une intuition géniale vous fait découvrir un compartiment secret (+15 Santé) !" if fr else f"[D20: 20/20 CRITICAL SUCCESS] Action: '{action}'. Pure stroke of luck reveals hidden caches!"
    elif d20 == 1:
        stat_changes["stat1"] = -8
        narrative = f"[D20: 1/20 ÉCHEC CRITIQUE] Action: '{action}'. Un piège ou un débris coupant vous blesse dans la pénombre (-8 Santé) !" if fr else f"[D20: 1/20 FUMBLE] Action: '{action}'. Jagged debris cuts into you in the gloom (-8 Health)!"
    elif d20 >= 10:
        narrative = f"[D20: {d20}/20 SUCCÈS] Action: '{action}'. Vous manœuvrez avec prudence et découvrez de précieux repères." if fr else f"[D20: {d20}/20 SUCCESS] Action: '{action}'. You proceed carefully and uncover useful details."
    else:
        narrative = f"[D20: {d20}/20 FAIBLE] Action: '{action}'. Vous ne trouvez rien d'inhabituel et perdez un peu d'énergie." if fr else f"[D20: {d20}/20 LOW] Action: '{action}'. You find nothing noteworthy and expend stamina."

    return {
        "narrative": narrative,
        "new_room": room,
        "stat_changes": stat_changes,
        "items_picked": picked,
        "items_dropped": dropped,
        "summary": f"Action exécutée (Dé {d20}/20)." if fr else f"Action carried out (Roll {d20}/20).",
        "is_game_over": False,
        "is_victory": False,
        "d20": d20
    }

# Main Application Class
class A111Game:
    def __init__(self):
        self.state = "MENU" # MENU, SETTINGS, STORY_SELECT, GAME, SUMMARY
        self.selected_menu_idx = 0
        self.selected_story_idx = 0
        self.active_story = None
        self.stats = [100, 100, 100, 100]
        self.stat_trends = ["neutral", "neutral", "neutral", "neutral"]
        self.inventory = []
        self.current_room = ""
        self.history = []
        self.summary_log = []
        self.input_text = ""
        self.is_waiting_ai = False

    def run(self):
        while True:
            dt = clock.tick(30)
            events = pygame.event.get()
            for event in events:
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                elif event.type == pygame.KEYDOWN:
                    play_beep(800, 20)
                    self.handle_keydown(event)

            screen.fill(BLACK)
            if self.state == "MENU":
                self.draw_menu()
            elif self.state == "SETTINGS":
                self.draw_settings()
            elif self.state == "STORY_SELECT":
                self.draw_story_select()
            elif self.state in ["GAME", "SUMMARY"]:
                self.draw_game()
                if self.state == "SUMMARY":
                    self.draw_summary_modal()

            draw_crt_scanlines(screen)
            pygame.display.flip()

    def handle_keydown(self, event):
        if self.state == "MENU":
            if event.key in [pygame.K_UP, pygame.K_w]:
                self.selected_menu_idx = (self.selected_menu_idx - 1) % 2
            elif event.key in [pygame.K_DOWN, pygame.K_s]:
                self.selected_menu_idx = (self.selected_menu_idx + 1) % 2
            elif event.key in [pygame.K_RETURN, pygame.K_SPACE]:
                if self.selected_menu_idx == 0:
                    self.state = "STORY_SELECT"
                else:
                    self.state = "SETTINGS"
        elif self.state == "SETTINGS":
            if event.key == pygame.K_ESCAPE or event.key == pygame.K_BACKSPACE:
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
            elif event.key == pygame.K_TAB:
                self.state = "SUMMARY"
            else:
                if event.unicode and len(event.unicode) == 1:
                    self.input_text += event.unicode
        elif self.state == "SUMMARY":
            if event.key in [pygame.K_ESCAPE, pygame.K_RETURN, pygame.K_TAB, pygame.K_SPACE]:
                self.state = "GAME"

    def start_game(self, story):
        self.active_story = story
        self.stats = [100, 100, 100, 100]
        self.stat_trends = ["neutral", "neutral", "neutral", "neutral"]
        fr = (SETTINGS["language"] == "FR")
        self.inventory = list(story["starting_inv_fr"] if fr else story["starting_inv_en"])
        self.current_room = story["starting_room"]
        self.summary_log = [f"Game initialized: {story['title_fr'] if fr else story['title_en']}"]
        self.history = [
            f">> SYSTEM: A-111 BIOS ONLINE. BLIPS & CHITZ ARCADE.",
            story["hook_fr"] if fr else story["hook_en"],
            f">> CURRENT LOCATION: {self.current_room}"
        ]
        self.state = "GAME"

    def submit_action(self, action):
        fr = (SETTINGS["language"] == "FR")
        self.history.append(f"> {action}")
        res = call_ai_narrator(self.active_story, self.history, action, self.stats, self.inventory, self.current_room)
        if res:
            self.history.append(res.get("narrative", "..."))
            if res.get("new_room"):
                self.current_room = res["new_room"]
            changes = res.get("stat_changes", {})
            for idx, key in enumerate(["stat1", "stat2", "stat3", "stat4"]):
                delta = changes.get(key, 0)
                self.stats[idx] = max(0, min(100, self.stats[idx] + delta))
                self.stat_trends[idx] = "up" if delta > 0 else ("down" if delta < 0 else "neutral")
            for item in res.get("items_picked", []):
                if len(self.inventory) < 8 and item not in self.inventory:
                    self.inventory.append(item)
            for item in res.get("items_dropped", []):
                if item in self.inventory:
                    self.inventory.remove(item)
            if res.get("summary"):
                self.summary_log.append(res["summary"])

    def draw_menu(self):
        lbl_rm = FONT_TINY.render("RICK AND MORTY // BLIPS AND CHITZ", True, GREEN)
        screen.blit(lbl_rm, (30, 30))

        title = FONT_TITLE.render("A-111", True, GREEN)
        screen.blit(title, (WIDTH // 2 - title.get_width() // 2, 140))

        subtitle = FONT_NORMAL.render("INTERACTIVE LIFE SIMULATOR TERMINAL", True, DIM_GREEN)
        screen.blit(subtitle, (WIDTH // 2 - subtitle.get_width() // 2, 220))

        btn_play = "[ PLAY ]" if self.selected_menu_idx == 0 else "  PLAY  "
        btn_set = "[ SETTINGS ]" if self.selected_menu_idx == 1 else "  SETTINGS  "

        t_play = FONT_LARGE.render(btn_play, True, WHITE if self.selected_menu_idx == 0 else GREEN)
        t_set = FONT_LARGE.render(btn_set, True, WHITE if self.selected_menu_idx == 1 else GREEN)

        screen.blit(t_play, (WIDTH // 2 - t_play.get_width() // 2, 360))
        screen.blit(t_set, (WIDTH // 2 - t_set.get_width() // 2, 430))

        ft = FONT_TINY.render("PRESS UP/DOWN TO NAVIGATE | ENTER TO SELECT", True, DIM_GREEN)
        screen.blit(ft, (WIDTH // 2 - ft.get_width() // 2, HEIGHT - 50))

    def draw_settings(self):
        title = FONT_LARGE.render("SETTINGS // CONFIGURATION", True, GREEN)
        screen.blit(title, (WIDTH // 2 - title.get_width() // 2, 80))

        snd_txt = f"1. SOUND: {'ON' if SETTINGS['sound'] else 'OFF'}  (Press 1 to toggle)"
        lang_txt = f"2. LANGUAGE: {SETTINGS['language']}  (Press 2 to toggle EN/FR)"
        api_txt = f"3. CUSTOM API KEY: {'CONFIGURED' if SETTINGS['custom_api_key'] else 'DEFAULT (MULTI-CASCADE)'}"

        screen.blit(FONT_NORMAL.render(snd_txt, True, WHITE), (100, 220))
        screen.blit(FONT_NORMAL.render(lang_txt, True, WHITE), (100, 280))
        screen.blit(FONT_NORMAL.render(api_txt, True, WHITE), (100, 340))

        back = FONT_LARGE.render("[ BACK - PRESS ESC ]", True, GREEN)
        screen.blit(back, (WIDTH // 2 - back.get_width() // 2, 500))

    def draw_story_select(self):
        title = FONT_LARGE.render("SELECT CAMPAIGN PROTOCOL", True, GREEN)
        screen.blit(title, (WIDTH // 2 - title.get_width() // 2, 40))

        fr = (SETTINGS["language"] == "FR")
        for i, s in enumerate(STORIES):
            y = 120 + i * 90
            is_sel = (i == self.selected_story_idx)
            color = WHITE if is_sel else s["color"]
            prefix = ">> " if is_sel else "   "
            name = s["title_fr"] if fr else s["title_en"]
            genre = s["genre_fr"] if fr else s["genre_en"]
            screen.blit(FONT_NORMAL.render(f"{prefix}{name} - [{genre}]", True, color), (80, y))
            if is_sel:
                hook = (s["hook_fr"] if fr else s["hook_en"])[:95] + "..."
                screen.blit(FONT_TINY.render(f"     {hook}", True, DIM_GREEN), (80, y + 26))

        ft = FONT_TINY.render("PRESS UP/DOWN TO CHOOSE | ENTER TO LAUNCH PROTOCOL", True, DIM_GREEN)
        screen.blit(ft, (WIDTH // 2 - ft.get_width() // 2, HEIGHT - 40))

    def draw_game(self):
        col = self.active_story["color"]
        fr = (SETTINGS["language"] == "FR")

        # Top Bar
        top_txt = f"A-111 // {self.active_story['title_fr'] if fr else self.active_story['title_en']} // {self.current_room}"
        screen.blit(FONT_TINY.render(top_txt, True, col), (20, 15))

        # Left: Narration Box (70% width)
        left_w = int(WIDTH * 0.70)
        pygame.draw.rect(screen, col, (15, 45, left_w - 25, HEIGHT - 120), 1)

        # Draw history lines
        y_text = 60
        max_lines = 22
        visible_lines = self.history[-max_lines:]
        for line in visible_lines:
            color = WHITE if line.startswith("> ") else (col if line.startswith(">> ") else DIM_GREEN)
            surf = FONT_TINY.render(line[:90], True, color)
            screen.blit(surf, (25, y_text))
            y_text += 24

        # Right Top: Stats Box (30% width)
        right_x = left_w
        right_w = WIDTH - right_x - 15
        pygame.draw.rect(screen, col, (right_x, 45, right_w, 200), 1)
        screen.blit(FONT_TINY.render("SURVIVAL METRICS", True, col), (right_x + 10, 52))

        labels = self.active_story["stat_labels_fr"] if fr else self.active_story["stat_labels_en"]
        for i in range(4):
            y_stat = 80 + i * 38
            name = labels[i]
            val = self.stats[i]
            trend_icon = "^" if self.stat_trends[i] == "up" else ("v" if self.stat_trends[i] == "down" else "-")
            stat_str = f"{name}: {val}% [{trend_icon}]"
            screen.blit(FONT_TINY.render(stat_str, True, WHITE), (right_x + 10, y_stat))
            # Bar
            pygame.draw.rect(screen, DARK_GREEN, (right_x + 10, y_stat + 18, right_w - 25, 8))
            pygame.draw.rect(screen, col, (right_x + 10, y_stat + 18, int((right_w - 25) * (val / 100.0)), 8))

        # Right Mid: Inventory Box
        inv_y = 260
        inv_h = HEIGHT - 335
        pygame.draw.rect(screen, col, (right_x, inv_y, right_w, inv_h), 1)
        screen.blit(FONT_TINY.render("INVENTORY (MAX 8)", True, col), (right_x + 10, inv_y + 8))

        for slot in range(8):
            item_name = self.inventory[slot] if slot < len(self.inventory) else "[ EMPTY ]"
            color = WHITE if slot < len(self.inventory) else DIM_GREEN
            screen.blit(FONT_TINY.render(f"{slot+1}. {item_name}", True, color), (right_x + 10, inv_y + 30 + slot * 20))

        # Bottom Input Area
        input_y = HEIGHT - 65
        pygame.draw.rect(screen, col, (15, input_y, WIDTH - 160, 45), 1)
        prompt_txt = f"> {self.input_text}_"
        screen.blit(FONT_NORMAL.render(prompt_txt, True, WHITE), (25, input_y + 12))

        # Summary Button
        pygame.draw.rect(screen, col, (WIDTH - 135, input_y, 120, 45), 1)
        screen.blit(FONT_TINY.render("[SUMMARY]", True, col), (WIDTH - 120, input_y + 15))

    def draw_summary_modal(self):
        modal_w, modal_h = 700, 450
        mx, my = (WIDTH - modal_w) // 2, (HEIGHT - modal_h) // 2
        pygame.draw.rect(screen, BLACK, (mx, my, modal_w, modal_h))
        pygame.draw.rect(screen, GREEN, (mx, my, modal_w, modal_h), 2)

        title = FONT_NORMAL.render("CHRONICLES // 3RD-PERSON SUMMARY LOG", True, GREEN)
        screen.blit(title, (mx + 20, my + 20))

        y = my + 60
        for entry in self.summary_log[-12:]:
            screen.blit(FONT_TINY.render(f"- {entry[:85]}", True, WHITE), (mx + 20, y))
            y += 26

        close = FONT_TINY.render("PRESS ESC OR TAB TO CLOSE", True, DIM_GREEN)
        screen.blit(close, (mx + modal_w // 2 - close.get_width() // 2, my + modal_h - 35))

if __name__ == "__main__":
    game = A111Game()
    game.run()
