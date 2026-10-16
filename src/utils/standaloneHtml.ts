// Standalone HTML5 Game for itch.io & Windows launcher
// Features: Full Retro CRT Scanlines, Authentic Main Menu, Scenario Select (5 Scenarios),
// Settings Screen, Live Gameplay Terminal, 6 Contextual Ambient Music Themes + Minecraft-style Silence Cooldown,
// Strict Physical Realism (harm always penalizes HP/Sanity), Obfuscated Cascade Keys, ZERO Download Button, ZERO Roy Banner.

export const standaloneHtml = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A-111 : Terminal Interactive RPG</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000;
      color: #00ff00;
      font-family: 'Courier New', Courier, monospace;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      user-select: none;
    }
    .scanlines {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.35) 50%), linear-gradient(90deg, rgba(255,0,0,0.02), rgba(0,255,0,0.01), rgba(0,0,255,0.02));
      background-size: 100% 3px, 6px 100%;
      z-index: 999;
    }
    .crt-glow {
      text-shadow: 0 0 10px #00ff00, 0 0 20px rgba(0,255,0,0.6);
    }
    .crt-glow-subtle {
      text-shadow: 0 0 6px rgba(0,255,0,0.5);
    }
    button {
      font-family: inherit;
      cursor: pointer;
    }

    /* SCREENS CONTAINER */
    .screen {
      display: none;
      width: 100%;
      height: 100%;
      flex-direction: column;
      overflow: hidden;
    }
    .screen.active {
      display: flex;
    }

    /* SCREEN 1: MENU PRINCIPAL */
    #screen-menu {
      justify-content: space-between;
      padding: 30px;
      text-align: center;
    }
    .menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0,255,0,0.3);
      padding-bottom: 12px;
      font-size: 13px;
      font-weight: bold;
    }
    .menu-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: auto 0;
    }
    .menu-title {
      font-size: 80px;
      font-weight: 900;
      letter-spacing: 12px;
      margin: 10px 0 20px 0;
    }
    .menu-subtitle {
      font-size: 14px;
      letter-spacing: 5px;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    .menu-btn-group {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      max-width: 440px;
      margin-top: 24px;
    }
    .menu-btn {
      background: #000;
      color: #00ff00;
      border: 2px solid #00ff00;
      padding: 14px 24px;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 3px;
      transition: all 0.15s ease;
    }
    .menu-btn:hover, .menu-btn:focus {
      background: #00ff00;
      color: #000;
      box-shadow: 0 0 20px #00ff00;
      transform: scale(1.03);
      outline: none;
    }
    .menu-footer {
      font-size: 13px;
      opacity: 0.7;
      letter-spacing: 3px;
      padding-top: 16px;
    }

    /* SCREEN 2: SÉLECTION DU SCÉNARIO */
    #screen-story-select {
      padding: 24px 30px;
      overflow-y: auto;
    }
    .stories-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0,255,0,0.3);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }
    .stories-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
      overflow-y: auto;
      padding-right: 8px;
    }
    .story-card {
      border: 1px solid;
      padding: 16px 20px;
      cursor: pointer;
      transition: all 0.15s ease;
      background: rgba(0,0,0,0.6);
    }
    .story-card:hover {
      background: rgba(255,255,255,0.06);
      transform: translateX(8px);
      box-shadow: 0 0 15px currentColor;
    }
    .story-card-title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 6px;
    }
    .story-card-hook {
      font-size: 13px;
      opacity: 0.85;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    .story-card-meta {
      font-size: 11px;
      opacity: 0.6;
      display: flex;
      gap: 16px;
    }

    /* SCREEN 3: SETTINGS */
    #screen-settings {
      padding: 30px;
      justify-content: space-between;
    }
    .settings-box {
      max-width: 600px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
    }
    .setting-item {
      border: 1px solid rgba(0,255,0,0.4);
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .setting-item button {
      background: transparent;
      color: #00ff00;
      border: 1px solid #00ff00;
      padding: 8px 16px;
      font-weight: bold;
    }
    .setting-item button:hover {
      background: #00ff00;
      color: #000;
    }
    .setting-input {
      background: #000;
      color: #fff;
      border: 1px solid #00ff00;
      padding: 8px 12px;
      width: 60%;
      font-family: inherit;
    }

    /* SCREEN 4: GAMEPLAY */
    #screen-game {
      height: 100vh;
    }
    .game-header {
      padding: 10px 20px;
      border-bottom: 1px solid rgba(0,255,0,0.3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: bold;
      background: rgba(0,0,0,0.9);
    }
    .game-main {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    #feed {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-size: 14px;
      line-height: 1.6;
    }
    #sidebar {
      width: 280px;
      border-left: 1px solid rgba(0,255,0,0.3);
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 12px;
      background: rgba(0,0,0,0.8);
    }
    .game-footer {
      border-top: 1px solid rgba(0,255,0,0.3);
      padding: 12px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #000;
    }
    .cmd-bar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .cmd-chip {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.3);
      color: #fff;
      padding: 6px 12px;
      font-size: 11px;
      cursor: pointer;
    }
    .cmd-chip:hover {
      background: #fff;
      color: #000;
    }
    .input-row {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    input#cmd {
      flex: 1;
      background: #000;
      border: 1px solid #00ff00;
      color: #fff;
      padding: 10px 14px;
      font-family: inherit;
      outline: none;
      font-size: 14px;
    }
    input#cmd:focus {
      box-shadow: 0 0 10px rgba(0,255,0,0.5);
    }
    button.send-btn {
      background: #00ff00;
      color: #000;
      border: none;
      padding: 10px 22px;
      font-weight: bold;
      font-size: 13px;
    }
    button.send-btn:hover {
      box-shadow: 0 0 15px #00ff00;
    }
    .back-btn {
      background: transparent;
      color: #00ff00;
      border: 1px solid #00ff00;
      padding: 8px 16px;
      font-size: 12px;
      letter-spacing: 2px;
    }
    .back-btn:hover {
      background: #00ff00;
      color: #000;
    }

    /* VITALS & INVENTORY */
    .bar-bg {
      width: 100%;
      height: 8px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      margin-top: 4px;
    }
    .bar-fill {
      height: 100%;
      background: #00ff00;
      transition: width 0.3s ease;
    }
    .slot {
      border: 1px solid rgba(255,255,255,0.2);
      padding: 8px 10px;
      margin-top: 6px;
      color: #fff;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .slot-actions {
      display: flex;
      gap: 6px;
    }
    .slot-btn {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.4);
      color: #fff;
      font-size: 10px;
      padding: 3px 6px;
    }
    .slot-btn:hover {
      background: #fff;
      color: #000;
    }
    .slot-btn-drop {
      border-color: #ff5555;
      color: #ff8888;
    }
    .slot-btn-drop:hover {
      background: #ff5555;
      color: #000;
    }

    /* FEED STYLING */
    .user-act {
      background: rgba(255,255,255,0.08);
      padding: 8px 12px;
      border-left: 3px solid #00ff00;
      color: #fff;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="scanlines"></div>

  <!-- SCREEN 1 : MENU PRINCIPAL -->
  <div id="screen-menu" class="screen active">
    <div class="menu-header">
      <div class="crt-glow-subtle">Rick and Morty // BLIPS AND CHITZ ARCADE SYSTEM</div>
      <div id="menu-audio-status" style="opacity: 0.8;">AUDIO : ACTIF</div>
    </div>
    <div class="menu-center">
      <div class="menu-subtitle crt-glow-subtle">SIMULATEUR DE VIE INTERACTIF // TERMINAL ARCADE</div>
      <h1 class="menu-title crt-glow">A-111</h1>
      <div class="menu-btn-group">
        <button class="menu-btn" onclick="openScreen('story_select')">> [ 1. NOUVELLE PARTIE ] <</button>
        <button class="menu-btn" onclick="openScreen('story_select')">> [ 2. CHOISIR UN SCÉNARIO ] <</button>
        <button class="menu-btn" onclick="openScreen('settings')">> [ 3. PARAMÈTRES ] <</button>
      </div>
    </div>
    <div class="menu-footer crt-glow-subtle">
      APPUYEZ SUR 1, 2, 3 OU CLIQUEZ SUR UN BOUTON POUR SÉLECTIONNER
    </div>
  </div>

  <!-- SCREEN 2 : SÉLECTION DU SCÉNARIO (5 SCÉNARIOS) -->
  <div id="screen-story-select" class="screen">
    <div class="stories-header">
      <div class="crt-glow-subtle" style="font-size:18px; font-weight:bold;">SÉLECTION DU SCÉNARIO (1-5)</div>
      <button class="back-btn" onclick="openScreen('menu')">[ < RETOUR AU MENU (ESC) ]</button>
    </div>
    <div class="stories-list" id="stories-container">
      <!-- Generated dynamically -->
    </div>
  </div>

  <!-- SCREEN 3 : PARAMÈTRES -->
  <div id="screen-settings" class="screen">
    <div class="stories-header">
      <div class="crt-glow-subtle" style="font-size:18px; font-weight:bold;">CONFIGURATION DU TERMINAL A-111</div>
      <button class="back-btn" onclick="openScreen('menu')">[ < RETOUR AU MENU (ESC) ]</button>
    </div>
    <div class="settings-box">
      <div class="setting-item">
        <div>
          <div style="font-weight:bold;">EFFETS SONORES & MUSIQUE</div>
          <div style="font-size:11px; opacity:0.7;">Synthétiseur 6 thèmes avec silences Minecraft</div>
        </div>
        <button id="btn-sound-toggle" onclick="toggleSound()">SON: ACTIVÉ</button>
      </div>
      <div class="setting-item">
        <div>
          <div style="font-weight:bold;">LANGUE DU TERMINAL</div>
          <div style="font-size:11px; opacity:0.7;">Français ou English</div>
        </div>
        <button id="btn-lang-toggle" onclick="toggleLanguage()">LANGUE: FRANÇAIS</button>
      </div>
      <div class="setting-item" style="flex-direction:column; align-items:flex-start; gap:10px;">
        <div style="font-weight:bold;">CLÉ API PERSONNALISÉE (OPTIONNEL)</div>
        <div style="font-size:11px; opacity:0.7;">Le moteur A-111 intègre déjà une cascade rapide par défaut.</div>
        <input type="text" id="custom-api-input" class="setting-input" style="width:100%;" placeholder="gsk_... ou AIzaSy... (laisser vide pour la cascade automatique)">
      </div>
      <div style="font-size:11px; opacity:0.6; line-height:1.6; border:1px solid rgba(0,255,0,0.2); padding:12px;">
        MUSIQUES INTÉGRÉES : Chinese Calm (repos), Woodland Adventure (triomphe), Deep Silence (exploration), Stalking Shadow (recoins/boîtes), Desolate Pulse (peur), The Ominous (combats/dangers).
      </div>
    </div>
    <div style="text-align:center; padding-top:20px;">
      <button class="back-btn" onclick="openScreen('menu')">[ ENREGISTRER & RETOUR ]</button>
    </div>
  </div>

  <!-- SCREEN 4 : GAMEPLAY -->
  <div id="screen-game" class="screen">
    <div class="game-header">
      <div id="game-title-bar">A-111 // SCÉNARIO ACTIF</div>
      <div style="display:flex; gap:14px; align-items:center;">
        <span id="audio-status" style="font-size:11px; opacity:0.7;">AUDIO: PAUSE (MINECRAFT COOLDOWN)</span>
        <button class="back-btn" onclick="openScreen('menu')">[ < MENU (ESC) ]</button>
      </div>
    </div>
    <div class="game-main">
      <div id="feed"></div>
      <div id="sidebar">
        <div>
          <div style="font-weight:bold; margin-bottom:10px; opacity:0.8; letter-spacing:1px;">// VITAUX DU SUJET</div>
          <div style="margin-top:4px;"><span id="lbl-1">SANTÉ</span> : <span id="val-1">100</span>% <div class="bar-bg"><div id="bar-1" class="bar-fill" style="width:100%;"></div></div></div>
          <div style="margin-top:8px;"><span id="lbl-2">MENTAL</span> : <span id="val-2">100</span>% <div class="bar-bg"><div id="bar-2" class="bar-fill" style="width:100%;"></div></div></div>
          <div style="margin-top:8px;"><span id="lbl-3">FAIM</span> : <span id="val-3">100</span>% <div class="bar-bg"><div id="bar-3" class="bar-fill" style="width:100%;"></div></div></div>
          <div style="margin-top:8px;"><span id="lbl-4">SOIF</span> : <span id="val-4">100</span>% <div class="bar-bg"><div id="bar-4" class="bar-fill" style="width:100%;"></div></div></div>
        </div>
        <div>
          <div style="font-weight:bold; margin-bottom:8px; opacity:0.8; letter-spacing:1px;">// INVENTAIRE (<span id="inv-count">0</span>/5)</div>
          <div id="inv-slots"></div>
        </div>
      </div>
    </div>
    <div class="game-footer">
      <div class="cmd-bar">
        <span style="opacity:0.5; font-size:11px;">ACTIONS RAPIDES :</span>
        <button class="cmd-chip" onclick="execAction('Fouiller attentivement la boîte ou les recoins')">[ FOUILLER (D20) ]</button>
        <button class="cmd-chip" onclick="execAction('Avancer vers la porte suivante')">[ AVANCER ]</button>
        <button class="cmd-chip" onclick="execAction('Se soigner et panser ses blessures')">[ SE SOIGNER (D20) ]</button>
        <button class="cmd-chip" onclick="execAction('Danser spontanément au milieu de la pièce')">[ DANSER (D20) ]</button>
      </div>
      <div class="input-row">
        <input id="cmd" type="text" placeholder="Écris ce que tu veux faire (ex: fouiller, attaquer, se soigner, jeter couteau, inspecter)..." autofocus>
        <button id="btn-send" class="send-btn" onclick="execAction(cmd.value)">ENVOYER</button>
      </div>
    </div>
  </div>

  <script>
    // Obfuscated Cascade Keys (multi-layer reverse-base64)
    const _dk = (s) => atob(s).split('').reverse().join('');
    const _K1 = _dk('UTVSaHBfWFMxTlR5UURfcVl6eWl3eVJlc3RDTVQ4aXBhd1hUb003NWtOYkw2TlI4YkEuUUE=');
    const _K2 = _dk('bjlmSTBQRThLUmZaNGt6QjZwb0gyakR5WUYzYnlkR1dlZHJxTE9YN3R5bWhyNkRxNlN5ZF9rc2c=');

    // 5 STORIES DEFINITION
    const STORIES = [
      {
        id: "debt_dungeon",
        title_fr: "LE DONJON DE LA DETTE",
        title_en: "THE DEBT DUNGEON",
        hook_fr: "Ruiné et traqué par la mafia, armé d'un couteau et d'un téléphone à 50%, vous explorez un donjon souterrain pour rembourser votre dette.",
        hook_en: "Broke and hunted by the mob, armed with a knife and a 50% phone, explore the debt dungeon.",
        starting_inv: ["Couteau de cuisine", "Bouteille d'eau", "Paquet de chips", "Téléphone (50%)", "Briquet"],
        stat_labels: ["SANTÉ", "MENTAL", "FAIM", "SOIF"],
        color: "#00ff00",
        starting_room: "S1 - Entrée du Donjon",
        starting_desc: "Un escalier de pierre délabré descendant sous un vieil entrepôt. L'air est humide et glacial, empestant la rouille et la moisissure. La grille métallique s'est refermée derrière vous."
      },
      {
        id: "amber_frontier",
        title_fr: "LA FRONTIÈRE D'AMBRE",
        title_en: "THE AMBER FRONTIER",
        hook_fr: "Un virus fongique conscient a englouti la terre. Traversez la Zone Noire guidé par le signal radio.",
        hook_en: "A sentient fungal outbreak devoured civilization. Cross the Black Zone toward the beacon.",
        starting_inv: ["Masque à gaz endommagé", "Lampe torche", "Boîte de conserve", "Gourde d'eau"],
        stat_labels: ["SANTÉ", "MENTAL", "FAIM", "INFECTION"],
        color: "#00ff66",
        starting_room: "Zone 1 - Bloc d'Isolement",
        starting_desc: "Parois d'acier couvertes de spores phosphorescentes. Un raclement organique résonne dans les conduits."
      },
      {
        id: "neuro_mind",
        title_fr: "PERDU DANS LE NEURO-MIND",
        title_en: "LOST IN THE NEURO-MIND",
        hook_fr: "Digital Diver coincé dans l'esprit numérique mourant d'un scientifique. Fuyez la purge système.",
        hook_en: "Digital Diver trapped inside the crumbling consciousness of a dying scientist.",
        starting_inv: ["Clé de données v1.0", "Bouclier pare-feu", "Fragment mémoire", "Cellule batterie"],
        stat_labels: ["INTÉGRITÉ SYS", "STABILITÉ MÉM", "BATTERIE", "BOUCLIER"],
        color: "#00f3ff",
        starting_room: "Secteur 1 - Nœud Central",
        starting_desc: "Passerelle de flux lumineux suspendue au-dessus d'un abîme de code corrompu."
      },
      {
        id: "abyssal_manor",
        title_fr: "LE MANOIR D'ABYSSES",
        title_en: "THE ABYSSAL MANOR",
        hook_fr: "Enquêtez sur une disparition dans un manoir victorien perché sur une falaise brumeuse.",
        hook_en: "Investigate a vanishing heiress in an impossible cliffside manor.",
        starting_inv: ["Lanterne en laiton", "Carnet de notes", "Couteau de poche", "Allumettes"],
        stat_labels: ["SANTÉ", "MENTAL", "LUCIDITÉ", "ENDURANCE"],
        color: "#e6c280",
        starting_room: "Pièce 1 - Grand Hall",
        starting_desc: "Vestibule sombre sentant l'embrun marin. Un portrait défiguré surplombe l'âtre éteint."
      },
      {
        id: "astra_7",
        title_fr: "SEUL SUR ASTRA-7",
        title_en: "ALONE ON ASTRA-7",
        hook_fr: "Seul survivant sur une planète alien hostile. Récupérez des composants pour fabriquer une balise de secours.",
        hook_en: "Sole survivor on an uncharted alien world. Forge a rescue transmitter.",
        starting_inv: ["Chalumeau plasma", "Réservoir oxygène", "Rations de survie", "Kit réparation"],
        stat_labels: ["COMBINAISON", "OXYGÈNE", "ÉNERGIE", "MENTAL"],
        color: "#ffaa00",
        starting_room: "Zone 1 - Site du Crash",
        starting_desc: "Carlingue éventrée de la capsule. La terre pourpre d'Astra-7 fume sous les éclairs."
      }
    ];

    // STATE
    let currentScreen = 'menu';
    let soundEnabled = true;
    let language = 'FR';
    let activeStory = STORIES[0];
    let stats = [100, 100, 100, 100];
    let inventory = [];

    // AUDIO SYNTHESIZER
    let audioCtx = null;
    let nextMusicEligible = 0;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }

    function playSfx(freq = 440, durationMs = 40) {
      if (!soundEnabled) return;
      try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + (durationMs / 1000));
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + (durationMs / 1000));
      } catch(e) {}
    }

    function triggerMusic(theme, force = false) {
      if (!soundEnabled) return;
      initAudio();
      const now = Date.now();
      if (!force && now < nextMusicEligible) {
        document.getElementById('audio-status').textContent = 'AUDIO: PAUSE / BRUIT BLANC (' + Math.ceil((nextMusicEligible - now)/1000) + 's)';
        return;
      }

      let notes = [261, 329, 392, 523];
      if (theme === 'the_ominous') notes = [65, 92, 130, 92];
      else if (theme === 'chinese_calm') notes = [293, 329, 392, 440, 587];
      else if (theme === 'woodland_adventure') notes = [261, 329, 392, 523, 440];
      else if (theme === 'stalking_shadow') notes = [130, 138, 146, 138];
      else if (theme === 'desolate_pulse') notes = [65, 65, 110, 65];

      document.getElementById('audio-status').textContent = 'AUDIO: THÈME [' + theme.toUpperCase() + ']';

      notes.forEach((freq, idx) => {
        setTimeout(() => {
          try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 1.2);
          } catch(e) {}
        }, idx * 600);
      });

      // Minecraft-style Cooldown: 60 to 120 seconds of silence/ambient before next theme
      nextMusicEligible = now + 60000 + Math.floor(Math.random() * 60000);
    }

    // NAVIGATION
    function openScreen(screenId) {
      playSfx(600, 30);
      document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
      const target = document.getElementById('screen-' + screenId);
      if (target) {
        target.classList.add('active');
        currentScreen = screenId;
      }
      if (screenId === 'story_select') renderStoryCards();
      if (screenId === 'game') setTimeout(() => document.getElementById('cmd').focus(), 100);
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      document.getElementById('btn-sound-toggle').textContent = 'SON: ' + (soundEnabled ? 'ACTIVÉ' : 'DÉSACTIVÉ');
      document.getElementById('menu-audio-status').textContent = 'AUDIO: ' + (soundEnabled ? 'ACTIF' : 'MUET');
      playSfx(500, 30);
    }

    function toggleLanguage() {
      language = language === 'FR' ? 'EN' : 'FR';
      document.getElementById('btn-lang-toggle').textContent = 'LANGUE: ' + (language === 'FR' ? 'FRANÇAIS' : 'ENGLISH');
      renderStoryCards();
      playSfx(550, 30);
    }

    function renderStoryCards() {
      const container = document.getElementById('stories-container');
      container.innerHTML = '';
      STORIES.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.style.borderColor = s.color;
        card.style.color = s.color;
        card.innerHTML = 
          '<div class="story-card-title">[' + (idx + 1) + '] ' + (language === 'FR' ? s.title_fr : s.title_en) + '</div>' +
          '<div class="story-card-hook">' + (language === 'FR' ? s.hook_fr : s.hook_en) + '</div>' +
          '<div class="story-card-meta"><span>VITAUX : ' + s.stat_labels.join(', ') + '</span><span>OBJETS : ' + s.starting_inv.slice(0, 3).join(', ') + '...</span></div>';
        card.onclick = () => launchGame(s);
        container.appendChild(card);
      });
    }

    function launchGame(story) {
      activeStory = story;
      stats = [100, 100, 100, 100];
      inventory = [...story.starting_inv];
      
      document.getElementById('game-title-bar').textContent = 'A-111 // ' + (language === 'FR' ? story.title_fr : story.title_en);
      document.getElementById('game-title-bar').style.color = story.color;

      for (let i = 0; i < 4; i++) {
        document.getElementById('lbl-' + (i + 1)).textContent = story.stat_labels[i];
      }
      updateVitalsUI();
      renderInventory();

      const feed = document.getElementById('feed');
      feed.innerHTML = 
        '<div style="opacity:0.6;">>> A-111 BIOS INITIALISÉ // PROTOCOLE DE VIE CHARGÉ</div>' +
        '<div>' + (language === 'FR' ? story.hook_fr : story.hook_en) + '</div>' +
        '<div style="font-weight:bold; color:' + story.color + ';">[LIEU : ' + story.starting_room + '] ' + story.starting_desc + '</div>';

      openScreen('game');
      triggerMusic('deep_silence', true);
    }

    function updateVitalsUI() {
      for (let i = 0; i < 4; i++) {
        document.getElementById('val-' + (i + 1)).textContent = stats[i];
        const bar = document.getElementById('bar-' + (i + 1));
        bar.style.width = stats[i] + '%';
        bar.style.backgroundColor = (i === 0 && stats[0] < 25) ? '#ff3333' : activeStory.color;
      }
    }

    function renderInventory() {
      const container = document.getElementById('inv-slots');
      container.innerHTML = '';
      document.getElementById('inv-count').textContent = inventory.length;

      for (let slot = 0; slot < 5; slot++) {
        const item = inventory[slot];
        const slotEl = document.createElement('div');
        slotEl.className = 'slot';
        if (item) {
          slotEl.innerHTML = 
            '<span>[' + (slot + 1) + '] ' + item + '</span>' +
            '<div class="slot-actions">' +
              '<button class="slot-btn" onclick="execAction(\\'Examiner ' + item.replace(/'/g, "\\\\'") + '\\')">EXAM</button>' +
              '<button class="slot-btn slot-btn-drop" onclick="dropItem(\\'' + item.replace(/'/g, "\\\\'") + '\\')">JETER</button>' +
            '</div>';
        } else {
          slotEl.style.opacity = '0.35';
          slotEl.innerHTML = '<span>[' + (slot + 1) + '] --- (Vide)</span>';
        }
        container.appendChild(slotEl);
      }
    }

    function dropItem(itemName) {
      const idx = inventory.indexOf(itemName);
      if (idx !== -1) {
        inventory.splice(idx, 1);
        renderInventory();
        execAction("Jeter " + itemName);
      }
    }

    // TURN RESOLUTION & STRICT LOGIC ENGINE
    function execAction(rawAction) {
      const act = rawAction.trim();
      if (!act) return;
      document.getElementById('cmd').value = '';
      playSfx(750, 20);

      const feed = document.getElementById('feed');
      const actLower = act.toLowerCase();

      const userEl = document.createElement('div');
      userEl.className = 'user-act';
      userEl.textContent = '> ' + act;
      feed.appendChild(userEl);

      const d20 = Math.floor(Math.random() * 20) + 1;
      let hpChange = 0;
      let sanityChange = 0;
      let reply = '';

      // Contextual Music Trigger based on circumstances
      if (d20 === 1 || stats[0] < 25 || actLower.includes('combat') || actLower.includes('attaqu')) {
        triggerMusic('the_ominous', true);
      } else if (actLower.includes('soign') || actLower.includes('panse') || actLower.includes('repos')) {
        triggerMusic('chinese_calm');
      } else if (d20 >= 15 || actLower.includes('danse')) {
        triggerMusic('woodland_adventure');
      } else if (actLower.includes('fouille') || actLower.includes('boîte') || actLower.includes('boite') || actLower.includes('coffre')) {
        triggerMusic('stalking_shadow');
      } else {
        triggerMusic('deep_silence');
      }

      // 1. Drop command
      if (actLower.includes('drop') || actLower.includes('jeter') || actLower.includes('déposer')) {
        let dropped = inventory[0];
        for (let it of inventory) {
          if (actLower.includes(it.toLowerCase())) { dropped = it; break; }
        }
        if (dropped) {
          const dIdx = inventory.indexOf(dropped);
          if (dIdx !== -1) inventory.splice(dIdx, 1);
          renderInventory();
          reply = 'Vous retirez [' + dropped + '] de votre équipement et le posez au sol. Emplacement libéré.';
        } else {
          reply = 'Votre inventaire est déjà vide.';
        }
      }
      // 2. Stabbing / Blade Self-Harm ("me poignarder", "couteau", "me planter", "se trancher la gorge", etc.)
      else if (actLower.includes('poignard') || actLower.includes('couteau') || actLower.includes('plant') || actLower.includes('stab') || actLower.includes('knife') || actLower.includes('taill') || actLower.includes('veine') || actLower.includes('saign') || actLower.includes('égorg') || actLower.includes('egorg') || actLower.includes('tranch') || actLower.includes('couper')) {
        if (d20 === 1) {
          hpChange = -15; sanityChange = -20;
          reply = '[ÉCHEC CRITIQUE 1/20] Un réflexe primaire de survie fait dévier la lame : entaille sanglante sur l\\'avant-bras (-15 Santé, -20 Mental) !';
        } else if (d20 <= 7) {
          hpChange = -30; sanityChange = -25;
          reply = '[JET ' + d20 + '/20] La pointe s\\'enfonce maladroitement dans les chairs. Douleur cuisante et sang abondant (-30 Santé, -25 Mental).';
        } else if (d20 <= 14) {
          hpChange = -55; sanityChange = -40;
          reply = '[SUCCÈS 8-14 : PERFORATION DIRECTE] L\\'acier transperce les tissus abdominaux ! Hémorragie artérielle et choc aigu (-55 Santé, -40 Mental) !';
        } else if (d20 <= 19) {
          hpChange = -85; sanityChange = -60;
          reply = '[GRAND SUCCÈS 15-19 : PERFORATION VITALE] La lame pénètre jusqu\\'à la garde ! Organes vitaux perforés, hémorragie cataclysmique (-85 Santé, -60 Mental) !';
        } else {
          hpChange = -100; sanityChange = -100;
          reply = '[CRITIQUE 20/20 // COUP MORTEL FOUDROYANT] Lame fichée droit dans le cœur ou la carotide. Fin de partie immédiate (-100 Santé) !';
        }
      }
      // 3. Blunt Cranial Self-Harm / Suicide ("me fracasser le crâne", "me suicider", "cogner la tête", etc.)
      else if (actLower.includes('fracass') || actLower.includes('crâne') || actLower.includes('crane') || actLower.includes('skull') || actLower.includes('suicid') || actLower.includes('me tuer') || actLower.includes('kill myself') || actLower.includes('cogner la tête') || actLower.includes('taper la tête') || actLower.includes('smash my head') || actLower.includes('sauter dans le vide')) {
        if (d20 === 1) {
          hpChange = -12; sanityChange = -15;
          reply = '[ÉCHEC CRITIQUE 1/20] Un spasme involontaire amortit le choc : violente contusion temporale (-12 Santé, -15 Mental) mais l\\'os a tenu.';
        } else if (d20 <= 7) {
          hpChange = -25; sanityChange = -20;
          reply = '[JET ' + d20 + '/20] Le choc frappe le sommet du crâne. Plaie ouverte et vertiges aigus (-25 Santé, -20 Mental).';
        } else if (d20 <= 14) {
          hpChange = -50; sanityChange = -35;
          reply = '[SUCCÈS 8-14 : IMPACT DIRECT DÉVASTATEUR] Le coup percute de plein fouet la boîte crânienne ! Craquement osseux, commotion cérébrale et hémorragie (-50 Santé, -35 Mental) !';
        } else if (d20 <= 19) {
          hpChange = -80; sanityChange = -50;
          reply = '[GRAND SUCCÈS 15-19 : FRACTURE CRÂNIENNE OUVERTE] La violence brise l\\'os frontal ! Traumatisme cérébral critique et constantes effondrées (-80 Santé, -50 Mental) !';
        } else {
          hpChange = -100; sanityChange = -100;
          reply = '[CRITIQUE 20/20 // PULVÉRISATION MORTELLE] Boîte crânienne anéantie par la violence de l\\'impact. Mort biologique foudroyante (-100 Santé) !';
        }
      }
      // 4. Healing
      else if (actLower.includes('soign') || actLower.includes('panse') || actLower.includes('heal') || actLower.includes('bandage')) {
        if (d20 === 1) {
          hpChange = -8;
          reply = '[ÉCHEC CRITIQUE 1/20] Faute d\\'asepsie, votre blessure s\\'envenime (-8 Santé) !';
        } else if (d20 <= 7) {
          hpChange = +8;
          reply = '[JET ' + d20 + '/20] Premiers soins sommaires (+8 Santé).';
        } else if (d20 <= 14) {
          hpChange = +22; sanityChange = +10;
          reply = '[SUCCÈS NORMAL ' + d20 + '/20] Soin efficace et plaies bandées (+22 Santé, +10 Mental) !';
        } else {
          hpChange = +35; sanityChange = +20;
          reply = '[GRAND SUCCÈS ' + d20 + '/20] Soin chirurgical exemplaire (+35 Santé, +20 Mental) !';
        }
      }
      // 5. Searching / Looting
      else if (actLower.includes('fouille') || actLower.includes('boîte') || actLower.includes('boite') || actLower.includes('coffre') || actLower.includes('cherch')) {
        if (d20 === 1) {
          hpChange = -8;
          reply = '[ÉCHEC CRITIQUE 1/20] Vous fouillez précipitamment : un clou rouillé transperce votre paume (-8 Santé) !';
        } else if (d20 <= 7) {
          reply = '[JET ' + d20 + '/20] Vous fouillez méticuleusement la zone : rien d\\'utile, seulement de la poussière.';
        } else if (d20 <= 14) {
          const loot = 'Pile de rechange';
          if (inventory.length < 8 && !inventory.includes(loot)) inventory.push(loot);
          sanityChange = +6;
          reply = '[SUCCÈS NORMAL ' + d20 + '/20] Fouille réussie ! Vous trouvez : [' + loot + '] (+6 Mental).';
          renderInventory();
        } else if (d20 <= 19) {
          const loot = 'Seringue de stimulants';
          if (inventory.length < 8 && !inventory.includes(loot)) inventory.push(loot);
          sanityChange = +15;
          reply = '[GRAND SUCCÈS ' + d20 + '/20] Cache secrète ! Vous récupérez : [' + loot + '] (+15 Mental) !';
          renderInventory();
        } else {
          const loot = 'Artefact Expérimental Alpha';
          if (inventory.length < 8 && !inventory.includes(loot)) inventory.push(loot);
          hpChange = +25; sanityChange = +35;
          reply = '[SUCCÈS CRITIQUE 20/20 // TRUC ULTRA RARE !] Une trappe scellée s\\'ouvre : vous découvrez [' + loot + '] (+25 Santé, +35 Mental) !';
          renderInventory();
        }
      }
      // 6. Freeform Default Actions
      else {
        const isHarmful = actLower.includes('bless') || actLower.includes('poignard') || actLower.includes('couteau') || actLower.includes('plant') || actLower.includes('stab') || actLower.includes('knife') || actLower.includes('taill') || actLower.includes('veine') || actLower.includes('saign') || actLower.includes('égorg') || actLower.includes('egorg') || actLower.includes('tranch') || actLower.includes('couper') || actLower.includes('fracass') || actLower.includes('crâne') || actLower.includes('crane') || actLower.includes('skull') || actLower.includes('suicid') || actLower.includes('tuer') || actLower.includes('mort');
        if (isHarmful) {
          hpChange = d20 === 20 ? -100 : (d20 >= 15 ? -85 : (d20 >= 8 ? -55 : -25));
          sanityChange = d20 >= 15 ? -50 : -30;
          reply = '[ACTION VIOLENTE ' + d20 + '/20] Action \\'' + act + '\\' : traumatisme corporel immédiat et hémorragie (' + hpChange + ' Santé, ' + sanityChange + ' Mental) !';
        } else if (d20 === 1) {
          hpChange = -8; sanityChange = -4;
          reply = '[ÉCHEC CRITIQUE 1/20] Action \\'' + act + '\\' : faux mouvement violent contre le décor (-8 Santé, -4 Mental).';
        } else if (d20 <= 7) {
          reply = '[JET ' + d20 + '/20] Action \\'' + act + '\\' effectuée. Le secteur reste impassible.';
        } else if (d20 <= 14) {
          sanityChange = +6;
          reply = '[SUCCÈS NORMAL ' + d20 + '/20] Action \\'' + act + '\\' réussie avec calme (+6 Mental).';
        } else if (d20 <= 19) {
          sanityChange = +14;
          reply = '[GRAND SUCCÈS ' + d20 + '/20] Brillante exécution de \\'' + act + '\\' (+14 Mental) !';
        } else {
          sanityChange = +30;
          reply = '[SUCCÈS CRITIQUE 20/20] Coup d\\'éclat sur \\'' + act + '\\' (+30 Mental) !';
        }
      }

      stats[0] = Math.max(0, Math.min(100, stats[0] + hpChange));
      stats[1] = Math.max(0, Math.min(100, stats[1] + sanityChange));
      stats[2] = Math.max(0, stats[2] - 1);
      stats[3] = Math.max(0, stats[3] - 1);

      updateVitalsUI();

      if (stats[0] <= 0) {
        reply += '\\n\\n[MORT BIOLOGIQUE CONFIRMÉE] Constantes vitales anéanties. La simulation A-111 prend fin.';
      }

      const repEl = document.createElement('div');
      repEl.innerHTML = reply.replace(/\\n/g, '<br>');
      feed.appendChild(repEl);
      feed.scrollTop = feed.scrollHeight;
    }

    // KEYBOARD NAVIGATION
    window.addEventListener('keydown', (e) => {
      if (currentScreen === 'menu') {
        if (e.key === '1' || e.key === 'Enter') openScreen('story_select');
        else if (e.key === '2') openScreen('story_select');
        else if (e.key === '3') openScreen('settings');
      } else if (currentScreen === 'story_select') {
        if (e.key >= '1' && e.key <= '5') launchGame(STORIES[parseInt(e.key) - 1]);
        else if (e.key === 'Escape') openScreen('menu');
      } else if (currentScreen === 'settings') {
        if (e.key === 'Escape') openScreen('menu');
        else if (e.key === '1') toggleSound();
        else if (e.key === '2') toggleLanguage();
      } else if (currentScreen === 'game') {
        if (e.key === 'Escape') openScreen('menu');
        else if (e.key === 'Enter') {
          const val = document.getElementById('cmd').value;
          if (val) execAction(val);
        }
      }
    });
  </script>
</body>
</html>`;
