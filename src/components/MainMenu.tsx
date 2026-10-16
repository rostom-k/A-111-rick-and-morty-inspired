import React, { useEffect, useState } from 'react';
import { GameSettings } from '../types/game';
import { terminalAudio } from '../utils/audio';

interface MainMenuProps {
  onPlay: () => void;
  onSettings: () => void;
  settings: GameSettings;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onPlay, onSettings, settings }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0); // 0 = PLAY, 1 = SETTINGS

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        terminalAudio.playKeyClick();
        setSelectedIdx((prev) => (prev > 0 ? prev - 1 : 1));
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        terminalAudio.playKeyClick();
        setSelectedIdx((prev) => (prev < 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        terminalAudio.playEnterBeep();
        if (selectedIdx === 0) {
          onPlay();
        } else if (selectedIdx === 1) {
          onSettings();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, onPlay, onSettings]);

  const lang = settings.language;

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-black p-6 md:p-12 text-[#00FF00] select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full border-b border-[#00FF00]/30 pb-3">
        <div className="text-sm md:text-base tracking-widest text-[#00FF00]/80 crt-glow-subtle font-bold">
          Rick and Morty
          <span className="ml-3 text-xs text-[#00FF00]/50 tracking-normal hidden sm:inline">
            // BLIPS AND CHITZ ARCADE SYSTEM
          </span>
        </div>
        <div className="text-xs text-[#00FF00]/60 font-mono tracking-widest">
          SYS://A-111_ONLINE
        </div>
      </div>

      {/* Main Center Area */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Subtitle */}
        <div className="text-xs md:text-sm tracking-[0.35em] text-[#00FF00]/70 mb-2 uppercase crt-glow-subtle">
          {lang === 'fr' ? 'SIMULATEUR DE VIE INTERACTIF' : 'INTERACTIVE LIFE SIMULATION SYSTEM'}
        </div>

        {/* Giant Title "A-111" */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#00FF00] crt-glow mb-8 animate-flicker select-none">
          A-111
        </h1>

        {/* Centered Buttons */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          {/* PLAY Button */}
          <button
            type="button"
            onClick={() => {
              terminalAudio.playEnterBeep();
              onPlay();
            }}
            onMouseEnter={() => {
              terminalAudio.playKeyClick();
              setSelectedIdx(0);
            }}
            className={`w-full py-3.5 px-6 text-xl sm:text-2xl font-bold tracking-widest transition-all duration-150 border-2 cursor-pointer flex items-center justify-center gap-3 ${
              selectedIdx === 0
                ? 'bg-[#00FF00] text-black border-[#00FF00] shadow-[0_0_25px_#00FF00] scale-105'
                : 'bg-black text-[#00FF00] border-[#00FF00]/50 hover:border-[#00FF00] hover:text-[#00FF00]'
            }`}
          >
            <span>{selectedIdx === 0 ? '>' : ' '}</span>
            <span>[ {lang === 'fr' ? 'JOUER' : 'PLAY'} ]</span>
            <span>{selectedIdx === 0 ? '<' : ' '}</span>
          </button>

          {/* SETTINGS Button */}
          <button
            type="button"
            onClick={() => {
              terminalAudio.playEnterBeep();
              onSettings();
            }}
            onMouseEnter={() => {
              terminalAudio.playKeyClick();
              setSelectedIdx(1);
            }}
            className={`w-full py-3.5 px-6 text-xl sm:text-2xl font-bold tracking-widest transition-all duration-150 border-2 cursor-pointer flex items-center justify-center gap-3 ${
              selectedIdx === 1
                ? 'bg-[#00FF00] text-black border-[#00FF00] shadow-[0_0_25px_#00FF00] scale-105'
                : 'bg-black text-[#00FF00] border-[#00FF00]/50 hover:border-[#00FF00] hover:text-[#00FF00]'
            }`}
          >
            <span>{selectedIdx === 1 ? '>' : ' '}</span>
            <span>[ {lang === 'fr' ? 'PARAMÈTRES' : 'SETTINGS'} ]</span>
            <span>{selectedIdx === 1 ? '<' : ' '}</span>
          </button>
        </div>
      </div>

      {/* Bottom Center Prompt */}
      <div className="flex flex-col items-center justify-center text-center pb-2">
        <div className="text-sm sm:text-base tracking-[0.25em] text-[#00FF00] crt-glow animate-pulse">
          {lang === 'fr' ? 'APPUYEZ SUR ENTRÉE POUR SÉLECTIONNER' : 'PRESS ENTER TO SELECT'}
        </div>
        <div className="text-xs text-[#00FF00]/50 tracking-wider mt-1.5">
          {lang === 'fr' ? 'TOUCHES HAUT/BAS OU CLIC SOURIS' : 'KEYBOARD UP/DOWN OR MOUSE CLICK'}
        </div>
      </div>
    </div>
  );
};
