import React from 'react';
import { GameSettings, Language } from '../types/game';
import { terminalAudio } from '../utils/audio';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onBack: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onBack,
}) => {
  const lang = settings.language;

  const handleToggleSound = () => {
    terminalAudio.playKeyClick();
    const nextVal = !settings.soundEnabled;
    terminalAudio.setSoundEnabled(nextVal);
    onUpdateSettings({ soundEnabled: nextVal });
  };

  const handleToggleLanguage = () => {
    terminalAudio.playKeyClick();
    const nextLang: Language = settings.language === 'en' ? 'fr' : 'en';
    onUpdateSettings({ language: nextLang });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-between bg-black p-6 md:p-12 text-[#00FF00] font-mono select-none">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between border-b border-[#00FF00]/30 pb-4">
        <div className="text-sm tracking-widest text-[#00FF00]/80 font-bold">
          Rick and Morty // BIOS CONFIGURATION
        </div>
        <div className="text-xs text-[#00FF00]/60">
          NODE: SYS_SETUP
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="w-full max-w-2xl my-auto border-2 border-[#00FF00] p-6 sm:p-10 bg-black/90 shadow-[0_0_30px_rgba(0,255,0,0.2)]">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-black tracking-widest text-center text-[#00FF00] crt-glow mb-8 uppercase">
          {lang === 'fr' ? 'PARAMÈTRES' : 'SETTINGS'}
        </h2>

        <div className="space-y-6">
          {/* Option 1: SOUND ON/OFF */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#00FF00]/20 pb-4">
            <div>
              <div className="text-lg font-bold tracking-wider">
                OPTION 1 : {lang === 'fr' ? 'AUDIO' : 'SOUND'}
              </div>
              <div className="text-xs text-[#00FF00]/60">
                {lang === 'fr'
                  ? 'Activer ou désactiver les synthèses sonores et ambiances'
                  : 'Toggle terminal synthesizer sound effects and ambiances'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              className={`px-6 py-2 border-2 font-bold tracking-widest cursor-pointer transition-colors ${
                settings.soundEnabled
                  ? 'bg-[#00FF00] text-black border-[#00FF00] shadow-[0_0_15px_#00FF00]'
                  : 'bg-black text-[#00FF00]/70 border-[#00FF00]/40 hover:border-[#00FF00]'
              }`}
            >
              SOUND: {settings.soundEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Option 2: LANGUAGE ENGLISH / FRENCH */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#00FF00]/20 pb-4">
            <div>
              <div className="text-lg font-bold tracking-wider">
                OPTION 2 : {lang === 'fr' ? 'LANGUE' : 'LANGUAGE'}
              </div>
              <div className="text-xs text-[#00FF00]/60">
                {lang === 'fr'
                  ? "Langue de l'interface et narration de la simulation"
                  : 'Interface language and game narrative generation'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleLanguage}
              className="px-6 py-2 border-2 border-[#00FF00] bg-black text-[#00FF00] font-bold tracking-widest cursor-pointer hover:bg-[#00FF00] hover:text-black transition-colors shadow-[0_0_10px_rgba(0,255,0,0.3)]"
            >
              LANGUAGE: {settings.language === 'en' ? 'ENGLISH' : 'FRANÇAIS'}
            </button>
          </div>

          {/* System Status info */}
          <div className="bg-[#00FF00]/5 border border-[#00FF00]/30 p-4 text-xs space-y-1.5">
            <div className="font-bold tracking-wider text-[#00FF00]">
              SYS://NEURAL_AI_ROUTING: {lang === 'fr' ? 'SÉCURISÉ & INVISIBLE' : 'SECURE & INVISIBLE'}
            </div>
            <div className="text-[#00FF00]/70">
              {lang === 'fr'
                ? "Toutes les requêtes d'intelligence artificielle et d'arbitrage de dé D20 sont traitées de manière sécurisée côté serveur. Aucune clé d'API n'est exposée côté client."
                : "All neural AI inference and D20 dice adjudication runs securely via backend proxy. Zero API keys exposed on client."}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              terminalAudio.playEnterBeep();
              onBack();
            }}
            className="w-full sm:w-64 py-3 border-2 border-[#00FF00] bg-black text-[#00FF00] text-xl font-bold tracking-widest cursor-pointer hover:bg-[#00FF00] hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,0,0.3)]"
          >
            [ {lang === 'fr' ? 'RETOUR' : 'BACK'} ]
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-[#00FF00]/50 tracking-widest text-center pb-2">
        A-111 // REAL-TIME D20 TERMINAL ENGINE
      </div>
    </div>
  );
};
