# A-111 : ITCH.IO DISTRIBUTION GUIDE

Welcome to **A-111**, the retro terminal interactive fiction RPG inspired by the "Roy: A Life Well Lived" episode from Rick & Morty (Season 3, Episode 6 / Blips and Chitz).

---

## 🚀 Option 1: Generate Windows Executable (`.exe`)
1. Make sure Python 3.9+ is installed on Windows.
2. Double-click `build_exe.bat` (or run in cmd/terminal: `pip install -r requirements.txt pyinstaller && pyinstaller --onefile --noconsole --name "A-111" a111_game.py`).
3. Once completed, your standalone executable will be in the `dist/` directory as **`A-111.exe`**.
4. Right-click `A-111.exe` -> "Send to" -> "Compressed (zipped) folder" to make `A-111_Windows.zip`.
5. On your itch.io dashboard, create a new project:
   - Classification: **Games**
   - Kind of project: **Downloadable**
   - Upload `A-111_Windows.zip` and tick **Executable (.exe)**.

---

## 🌐 Option 2: Upload as HTML5 Web Game on itch.io (Directly Playable in Browser)
Itch.io natively supports playing HTML5 games inside the player's web browser!
1. Build the web app with `npm run build`.
2. Zip the contents of the `dist/` folder (with `index.html` at the zip root).
3. On itch.io, set:
   - Kind of project: **HTML**
   - Upload your `.zip` file and tick **This file will be played in the browser**.
   - Embed options: **1080 x 720** (or responsive).

---

## 🎮 Included Features:
- 5 Complete RPG Survival Campaigns (The Debt Dungeon, Amber Frontier, Lost in the Neuro-Mind, The Abyssal Manor, Alone on Astra-7).
- 4 dynamic survival bars with real-time trend arrows and retro emoji alerts.
- 5 inventory slots.
- Dual English / French language toggle in Settings.
- Sound synthesis ON / OFF toggle.
- Invisible 3-tier AI failover (Gemini -> Groq -> HuggingFace -> Offline Procedural Dungeon Master).
- Custom API key field for players in Settings.
- 3rd-person chronological summary log button.
