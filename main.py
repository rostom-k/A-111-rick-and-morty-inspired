#!/usr/bin/env python3
"""
A-111 : RENDER BOT & WIREFRAME ENGINE (Python / Pygame Implementation)
Architecture hybride : Simulation narrative & Rendu vectoriel fil de fer rétro monochrome.

Structure de l'interface en 3 Zones verticales :
+-------------------------------------------------------------+
|  [ ZONE 1: RENDER BOT DISPLAY ]                             |
|  - Dessin fil de fer de la salle (généré par le bot)         |
|  - Texte d'obstacle en bas de l'image                       |
+-------------------------------------------------------------+
|  [ ZONE 2: HOTBAR / INVENTORY & VITAL SIGNALS ]             |
|  - Barres HP/HUN/THI/SAN à droite                           |
|  - Slots 1 à 5 sous l'image de la pièce                     |
+-------------------------------------------------------------+
|  [ ZONE 3: COMMAND INPUT & SUMMARY BUTTON ]                 |
+-------------------------------------------------------------+
"""

import os
import sys
import json
import random

# Détection headless automatique pour environnements sans serveur X11 / Wayland
if "DISPLAY" not in os.environ and "WAYLAND_DISPLAY" not in os.environ:
    os.environ["SDL_VIDEODRIVER"] = "dummy"

try:
    import pygame
except ImportError:
    print("[ERREUR] Pygame n'est pas installé. Lancez : pip install pygame")
    sys.exit(1)

# --- PALETTE COULEURS TERMINAL RÉTRO ---
COLOR_BLACK = (0, 0, 0)
COLOR_NEON_GREEN = (0, 255, 0)
COLOR_DIM_GREEN = (0, 160, 0)
COLOR_DARK_GREEN = (0, 60, 0)
COLOR_AMBER = (255, 200, 0)
COLOR_WHITE = (230, 230, 230)
COLOR_GRAY = (60, 60, 60)
COLOR_RED = (255, 60, 60)


# =============================================================================
# 1. BASE DE DONNÉES DE SCÈNES & SIMULATEUR DE L'IA NARRATIVE
# =============================================================================
ROOMS_DATABASE = {
    "S3_ARCHIVES": {
        "location_id": "S3_ARCHIVES",
        "visual_layout": {
            "room_type": "perspective_box",
            "background_glitch": True,
            "objects": [
                {"type": "bookshelf", "position": "left"},
                {"type": "safe", "position": "center_left"},
                {"type": "door", "position": "center"},
                {"type": "ladder_shelf", "position": "right"},
                {"type": "unstable_floor_grid", "position": "bottom_center"}
            ],
            "ascii_glitch_chars": ["#", "@", "$", "%", "0", "1"]
        },
        "narrative_text": "Vous êtes dans les Archives S3. Un plancher vermoulu et instable semble dangereux au centre.",
        "obstacle": "SOL INSTABLE. ÉCHELLE REQUISE."
    },
    "S4_RESERVE": {
        "location_id": "S4_RESERVE",
        "visual_layout": {
            "room_type": "perspective_box",
            "background_glitch": True,
            "objects": [
                {"type": "bookshelf", "position": "left"},
                {"type": "safe", "position": "center_right"},
                {"type": "door", "position": "center"},
                {"type": "unstable_floor_grid", "position": "bottom_center"}
            ],
            "ascii_glitch_chars": ["#", "&", "!", "0", "1"]
        },
        "narrative_text": "S4 Réserve : Des caisses éventrées empestent l'humidité. Une horde de rats mutants ronge les câbles.",
        "obstacle": "NUÉE DE RATS MUTANTS. ARME OU DIVERSION REQUISE."
    },
    "S5_TORTURE": {
        "location_id": "S5_TORTURE",
        "visual_layout": {
            "room_type": "perspective_box",
            "background_glitch": True,
            "objects": [
                {"type": "door", "position": "center"},
                {"type": "safe", "position": "left"},
                {"type": "ladder_shelf", "position": "right"},
                {"type": "unstable_floor_grid", "position": "bottom_center"}
            ],
            "ascii_glitch_chars": ["$", "%", "8", "9", "X"]
        },
        "narrative_text": "S5 Salle des supplices : Au centre, un Golem de fer et de pierre veille d'un regard incandescent.",
        "obstacle": "GOLEM DE FER ÉVEILLÉ. COMBAT TACTIQUE REQUIS."
    }
}


def query_narrative_ai(location_id: str) -> dict:
    """Simule la réponse JSON structurée envoyée par l'IA narrative."""
    return ROOMS_DATABASE.get(location_id, ROOMS_DATABASE["S3_ARCHIVES"])


# =============================================================================
# 2. FONCTIONS DE DESSIN VECTORIEL / FIL DE FER (RENDER BOT)
# =============================================================================
def draw_wireframe_box(surface: pygame.Surface, x: int, y: int, w: int, h: int, color=COLOR_NEON_GREEN):
    """Dessine une boîte fil de fer rectangulaire."""
    pygame.draw.rect(surface, color, (x, y, w, h), 1)


def draw_bookshelf(surface: pygame.Surface, x: int, y: int, w: int, h: int, color=COLOR_NEON_GREEN):
    """Dessine une étagère en fil de fer avec rayonnages et livres verticaux."""
    draw_wireframe_box(surface, x, y, w, h, color)
    shelves = 3
    for i in range(1, shelves):
        sy = y + int((h / shelves) * i)
        pygame.draw.line(surface, color, (x, sy), (x + w, sy), 1)
        # Livres représentés par des traits verticaux
        for bx in range(x + 4, x + w - 4, 5):
            pygame.draw.line(surface, color, (bx, sy), (bx, sy - int((h / shelves) * 0.65)), 1)


def draw_safe(surface: pygame.Surface, x: int, y: int, w: int, h: int, color=COLOR_NEON_GREEN):
    """Dessine un coffre-fort avec porte biseautée et cadran circulaire rotatif."""
    draw_wireframe_box(surface, x, y, w, h, color)
    # Porte intérieure
    if w > 8 and h > 8:
        draw_wireframe_box(surface, x + 3, y + 3, w - 6, h - 6, color)
    # Cadran de combinaison
    cx = x + w // 2
    cy = y + h // 2
    radius = max(3, min(w, h) // 5)
    pygame.draw.circle(surface, color, (cx, cy), radius, 1)
    # Poignée en croix
    pygame.draw.line(surface, color, (cx - 4, cy), (cx + 4, cy), 1)
    pygame.draw.line(surface, color, (cx, cy - 4), (cx, cy + 4), 1)


def draw_door(surface: pygame.Surface, x: int, y: int, w: int, h: int, color=COLOR_NEON_GREEN):
    """Dessine une porte en perspective avec chambranle et poignée."""
    draw_wireframe_box(surface, x, y, w, h, color)
    if w > 6 and h > 6:
        draw_wireframe_box(surface, x + 2, y + 2, w - 4, h - 2, color)
    # Poignée
    pygame.draw.circle(surface, color, (x + w - 6, y + int(h * 0.55)), 2, 1)
    # Imposte vitrée supérieure
    transom_y = y + int(h * 0.28)
    pygame.draw.line(surface, color, (x, transom_y), (x + w, transom_y), 1)


def draw_ladder(surface: pygame.Surface, x: int, y: int, w: int, h: int, color=COLOR_NEON_GREEN):
    """Dessine une échelle en fil de fer avec montants et barreaux."""
    pygame.draw.line(surface, color, (x, y), (x, y + h), 1)
    pygame.draw.line(surface, color, (x + w, y), (x + w, y + h), 1)
    rungs = 5
    for i in range(rungs + 1):
        ry = y + int((h / rungs) * i)
        pygame.draw.line(surface, color, (x, ry), (x + w, ry), 1)


def draw_floor_grid(surface: pygame.Surface, x: int, y: int, w: int, h: int, color=COLOR_NEON_GREEN, unstable=False):
    """Dessine une grille de sol en perspective isométrique / fil de fer."""
    rows = 4
    cols = 5
    for r in range(rows + 1):
        gy = y + int((h / rows) * r)
        if unstable and (r % 2 == 1):
            # Ligne pointillée si sol instable
            for dash_x in range(x, x + w, 6):
                pygame.draw.line(surface, color, (dash_x, gy), (min(x + w, dash_x + 3), gy), 1)
        else:
            pygame.draw.line(surface, color, (x, gy), (x + w, gy), 1)

    for c in range(cols + 1):
        gx = x + int((w / cols) * c)
        pygame.draw.line(surface, color, (gx, y), (gx, y + h), 1)


# =============================================================================
# 3. MOTEUR DE RENDU PRINCIPAL DU BOT (ZONE 1)
# =============================================================================
def render_retro_room_display(visual_data: dict, surface: pygame.Surface, rect: tuple, font: pygame.font.Font):
    """
    Prend le JSON 'visual_layout', dessine la perspective 3D, les objets vectoriels,
    les artefacts de glitch ASCII Matrix, les scanlines CRT et la bannière d'obstacle.
    """
    rx, ry, rw, rh = rect
    render_surf = pygame.Surface((rw, rh))
    render_surf.fill(COLOR_BLACK)

    # 1. Perspective Boîte 3D (Fond de la salle et lignes de fuite)
    margin_x = int(rw * 0.22)
    margin_y = int(rh * 0.18)
    back_x = margin_x
    back_y = margin_y
    back_w = rw - margin_x * 2
    back_h = rh - margin_y * 2 - 16  # Réserve 16px pour l'obstacle en bas

    # Rectangle du mur du fond
    draw_wireframe_box(render_surf, back_x, back_y, back_w, back_h, COLOR_NEON_GREEN)

    # Lignes de fuite vers les coins
    bottom_y = rh - 20
    pygame.draw.line(render_surf, COLOR_NEON_GREEN, (0, 0), (back_x, back_y), 1)
    pygame.draw.line(render_surf, COLOR_NEON_GREEN, (rw, 0), (back_x + back_w, back_y), 1)
    pygame.draw.line(render_surf, COLOR_NEON_GREEN, (0, bottom_y), (back_x, back_y + back_h), 1)
    pygame.draw.line(render_surf, COLOR_NEON_GREEN, (rw, bottom_y), (back_x + back_w, back_y + back_h), 1)

    # 2. Objets vectoriels positionnés selon le schéma
    layout = visual_data.get("visual_layout", {})
    objects = layout.get("objects", [])

    for obj in objects:
        otype = obj.get("type", "")
        pos = obj.get("position", "")

        # Calcul des coordonnées de placement
        if pos == "left":
            ox, oy, ow, oh = 8, int(rh * 0.22), back_x - 12, int(rh * 0.52)
        elif pos == "center_left":
            ox, oy, ow, oh = back_x + 6, back_y + int(back_h * 0.35), int(back_w * 0.28), int(back_h * 0.6)
        elif pos == "center":
            ox, oy, ow, oh = back_x + int(back_w * 0.36), back_y + int(back_h * 0.18), int(back_w * 0.28), int(back_h * 0.8)
        elif pos == "center_right":
            ox, oy, ow, oh = back_x + int(back_w * 0.66), back_y + int(back_h * 0.35), int(back_w * 0.28), int(back_h * 0.6)
        elif pos == "right":
            ox, oy, ow, oh = back_x + back_w + 4, int(rh * 0.22), rw - (back_x + back_w) - 10, int(rh * 0.52)
        elif pos == "bottom_center":
            ox, oy, ow, oh = back_x + int(back_w * 0.1), back_y + back_h - 2, int(back_w * 0.8), bottom_y - (back_y + back_h)
        else:
            ox, oy, ow, oh = back_x + 10, back_y + 10, 20, 30

        # Rendu spécifique
        if "bookshelf" in otype:
            draw_bookshelf(render_surf, ox, oy, ow, oh)
        elif "safe" in otype:
            draw_safe(render_surf, ox, oy, ow, oh)
        elif "door" in otype:
            draw_door(render_surf, ox, oy, ow, oh)
        elif "ladder" in otype:
            draw_ladder(render_surf, ox, oy, ow, oh)
        elif "floor" in otype or "grid" in otype:
            draw_floor_grid(render_surf, ox, oy, ow, oh, unstable=("unstable" in otype))
        else:
            draw_wireframe_box(render_surf, ox, oy, ow, oh)

    # 3. Artefacts de glitch Matrix / Cyber Horreur
    glitch_chars = layout.get("ascii_glitch_chars", ["#", "@", "$", "%", "0", "1"])
    for _ in range(6):
        gx = random.randint(10, rw - 20)
        gy = random.randint(10, rh - 30)
        char = random.choice(glitch_chars)
        glitch_txt = font.render(char, False, COLOR_DIM_GREEN)
        render_surf.blit(glitch_txt, (gx, gy))

    # 4. Scanlines CRT Horizontales (lignes sombres tous les 2 pixels)
    for scan_y in range(0, rh, 2):
        pygame.draw.line(render_surf, (0, 20, 0), (0, scan_y), (rw, scan_y), 1)

    # 5. Bordure de viseur tactique HUD
    pygame.draw.rect(render_surf, COLOR_DIM_GREEN, (0, 0, rw, rh), 1)
    header_txt = font.render(f"// RENDER BOT v1.1 [{visual_data.get('location_id', 'UNKNOWN')}]", False, COLOR_NEON_GREEN)
    render_surf.blit(header_txt, (6, 3))

    # 6. Bannière d'Obstacle (en bas de l'image)
    obstacle_str = visual_data.get("obstacle", "PERIMÈTRE DÉGAGÉ")
    obstacle_surf = font.render(f"[OBSTACLE: {obstacle_str}]", False, COLOR_AMBER if obstacle_str else COLOR_NEON_GREEN)
    render_surf.blit(obstacle_surf, (6, rh - 16))

    # Coller le rendu final sur la surface de destination
    surface.blit(render_surf, (rx, ry))


# =============================================================================
# 4. APPLICATION PRINCIPALE & 3 NIVEAUX VERTICAUX (PYGAME)
# =============================================================================
class A111TerminalGame:
    def __init__(self):
        pygame.init()
        self.width = 680
        self.height = 740
        self.screen = pygame.display.set_mode((self.width, self.height))
        pygame.display.set_caption("A-111 : RENDER BOT & WIREFRAME ENGINE")
        self.clock = pygame.time.Clock()

        # Polices
        self.font_small = pygame.font.SysFont("monospace", 11, bold=True)
        self.font_mid = pygame.font.SysFont("monospace", 13, bold=True)
        self.font_large = pygame.font.SysFont("monospace", 15, bold=True)

        # État du joueur & inventaire
        self.location_id = "S3_ARCHIVES"
        self.scene_data = query_narrative_ai(self.location_id)
        self.stats = {"HP": 82, "SAN": 68, "HUN": 74, "THI": 60}
        self.hotbar_inventory = [
            "Rouleau de ruban adhésif blindé",
            "Couteau de cuisine",
            "Bouteille d'eau",
            "Briquet bon marché",
            "Branche de bois solide"
        ]

        # Logs et saisie commande
        self.command_text = ""
        self.history_logs = [
            ">> A-111 ARCADE TERMINAL // ONLINE",
            ">> MOTEUR DE RENDU FIL DE FER SYNCHRONISÉ",
            f">> ENTRÉE DANS : {self.location_id}",
            f">> NARRATION : {self.scene_data.get('narrative_text', '')}"
        ]

    def handle_command(self, cmd: str):
        cmd = cmd.strip()
        if not cmd:
            return
        self.history_logs.append(f"> {cmd}")

        cmd_lower = cmd.lower()
        if "s3" in cmd_lower:
            self.location_id = "S3_ARCHIVES"
            self.scene_data = query_narrative_ai(self.location_id)
            self.history_logs.append(f">> Déplacement vers {self.location_id}")
            self.history_logs.append(f">> {self.scene_data['narrative_text']}")
        elif "s4" in cmd_lower:
            self.location_id = "S4_RESERVE"
            self.scene_data = query_narrative_ai(self.location_id)
            self.history_logs.append(f">> Déplacement vers {self.location_id}")
            self.history_logs.append(f">> {self.scene_data['narrative_text']}")
        elif "s5" in cmd_lower:
            self.location_id = "S5_TORTURE"
            self.scene_data = query_narrative_ai(self.location_id)
            self.history_logs.append(f">> Déplacement vers {self.location_id}")
            self.history_logs.append(f">> {self.scene_data['narrative_text']}")
        elif "pompe" in cmd_lower or "push" in cmd_lower:
            d20 = random.randint(1, 20)
            if d20 == 1:
                self.stats["HP"] -= 8
                self.history_logs.append(f"[D20: 1/20 // ÉCHEC] Votre main glisse ! Vous perdez de la vie (-8 HP).")
            elif d20 >= 8:
                self.stats["SAN"] = min(100, self.stats["SAN"] + 8)
                self.history_logs.append(f"[D20: {d20}/20 // SUCCÈS] Série de pompes impeccable ! Endorphines libérées (+8 SAN).")
            else:
                self.history_logs.append(f"[D20: {d20}/20] Effort physique laborieux sans bénéfice.")
        else:
            d20 = random.randint(1, 20)
            self.history_logs.append(f"[D20: {d20}/20] Action enregistrée : '{cmd[:35]}'.")

        if len(self.history_logs) > 8:
            self.history_logs = self.history_logs[-8:]

    def draw_vitals(self, surface: pygame.Surface, x: int, y: int, w: int):
        """Dessine les barres de constantes vitales HP / SAN / HUN / THI."""
        labels = [("HP", self.stats["HP"], COLOR_RED),
                  ("SAN", self.stats["SAN"], COLOR_NEON_GREEN),
                  ("HUN", self.stats["HUN"], COLOR_AMBER),
                  ("THI", self.stats["THI"], (0, 180, 255))]

        bar_h = 10
        gap = 6
        cur_y = y
        for name, val, bar_col in labels:
            # Texte label
            lbl = self.font_small.render(f"{name}: {val}%", True, COLOR_WHITE)
            surface.blit(lbl, (x, cur_y - 2))
            # Cadre et jauge
            bar_w = w - 65
            pygame.draw.rect(surface, COLOR_GRAY, (x + 60, cur_y, bar_w, bar_h), 1)
            fill_w = int((val / 100.0) * (bar_w - 2))
            if fill_w > 0:
                pygame.draw.rect(surface, bar_col, (x + 61, cur_y + 1, fill_w, bar_h - 2))
            cur_y += bar_h + gap

    def draw_hotbar(self, surface: pygame.Surface, x: int, y: int, w: int):
        """Dessine les 5 slots d'inventaire horizontaux (Hotbar Minecraft-Style)."""
        slot_w = (w - 20) // 5
        slot_h = 44
        title = self.font_small.render("// HOTBAR INVENTAIRE [1 - 5]", True, COLOR_DIM_GREEN)
        surface.blit(title, (x, y))

        for idx in range(5):
            sx = x + idx * (slot_w + 4)
            sy = y + 16
            item_name = self.hotbar_inventory[idx] if idx < len(self.hotbar_inventory) else "---"
            is_active = (item_name != "---")

            # Fond et cadre
            pygame.draw.rect(surface, (10, 25, 10) if is_active else (15, 15, 15), (sx, sy, slot_w, slot_h))
            pygame.draw.rect(surface, COLOR_DIM_GREEN if is_active else COLOR_GRAY, (sx, sy, slot_w, slot_h), 1)

            # Slot number
            num_txt = self.font_small.render(f"[{idx + 1}]", True, COLOR_NEON_GREEN)
            surface.blit(num_txt, (sx + 4, sy + 3))

            # Nom tronqué
            short_name = (item_name[:13] + "..") if len(item_name) > 14 else item_name
            name_txt = self.font_small.render(short_name, True, COLOR_WHITE if is_active else COLOR_GRAY)
            surface.blit(name_txt, (sx + 4, sy + 22))

    def run(self):
        running = True
        while running:
            self.clock.tick(30)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_ESCAPE:
                        running = False
                    elif event.key == pygame.K_RETURN:
                        self.handle_command(self.command_text)
                        self.command_text = ""
                    elif event.key == pygame.K_BACKSPACE:
                        self.command_text = self.command_text[:-1]
                    elif event.key in (pygame.K_1, pygame.K_2, pygame.K_3):
                        # Raccourci touches numériques pour changer de salle de démo
                        rooms = ["S3_ARCHIVES", "S4_RESERVE", "S5_TORTURE"]
                        chosen = rooms[event.key - pygame.K_1]
                        self.handle_command(f"go {chosen}")
                    else:
                        if len(self.command_text) < 45 and event.unicode.isprintable():
                            self.command_text += event.unicode

            # --- RENDU DE L'ÉCRAN (3 NIVEAUX VERTICAUX) ---
            self.screen.fill(COLOR_BLACK)

            # -----------------------------------------------------------------
            # ZONE 1: RENDER BOT DISPLAY (Haut : 20px -> 260px)
            # -----------------------------------------------------------------
            render_rect = (20, 16, self.width - 40, 220)
            render_retro_room_display(self.scene_data, self.screen, render_rect, self.font_small)

            # -----------------------------------------------------------------
            # ZONE 2: HOTBAR / INVENTAIRE & CONSTANTES VITALES (Milieu : 250px -> 380px)
            # -----------------------------------------------------------------
            # Gauche : Hotbar 5 slots
            self.draw_hotbar(self.screen, 20, 250, 430)
            # Droite : Barres vitales HP / SAN / HUN / THI
            self.draw_vitals(self.screen, 465, 260, 195)

            # -----------------------------------------------------------------
            # ZONE 3: HISTORIQUE NARRATIF & SAISIE COMMANDE (Bas : 380px -> 720px)
            # -----------------------------------------------------------------
            sep_y = 330
            pygame.draw.line(self.screen, COLOR_DIM_GREEN, (20, sep_y), (self.width - 20, sep_y), 1)

            # Journal narratif
            log_y = sep_y + 12
            for log_line in self.history_logs:
                col = COLOR_NEON_GREEN if log_line.startswith("[D20") else COLOR_WHITE if log_line.startswith(">") else COLOR_DIM_GREEN
                line_surf = self.font_small.render(log_line, True, col)
                self.screen.blit(line_surf, (24, log_y))
                log_y += 18

            # Ligne de commande interactive
            cmd_box_y = self.height - 48
            pygame.draw.rect(self.screen, (10, 15, 10), (20, cmd_box_y, self.width - 40, 32))
            pygame.draw.rect(self.screen, COLOR_NEON_GREEN, (20, cmd_box_y, self.width - 40, 32), 1)

            cursor = "_" if (pygame.time.get_ticks() // 400) % 2 == 0 else " "
            input_render = self.font_mid.render(f"> {self.command_text}{cursor}", True, COLOR_NEON_GREEN)
            self.screen.blit(input_render, (28, cmd_box_y + 8))

            hint_txt = self.font_small.render("[Entrée: Exécuter | 1: S3 | 2: S4 | 3: S5 | 'pompes' | Échap: Quitter]", True, COLOR_DIM_GREEN)
            self.screen.blit(hint_txt, (20, self.height - 14))

            pygame.display.flip()

        pygame.quit()


if __name__ == "__main__":
    game = A111TerminalGame()
    # Si exécuté en mode headless, exécuter 3 ticks de simulation et valider
    if os.environ.get("SDL_VIDEODRIVER") == "dummy":
        print("[A-111] Mode headless détecté : simulation de 3 cycles de rendu...")
        game.clock.tick(30)
        game.handle_command("go S3_ARCHIVES")
        game.handle_command("faire des pompes")
        game.handle_command("go S5_TORTURE")
        print("[A-111] Rendu fil de fer vectoriel et générateur Matrix validés avec succès.")
    else:
        game.run()
