import React, { useEffect, useState } from 'react';
import { STORIES } from '../data/stories';
import { GameSettings, StoryDefinition } from '../types/game';
import { terminalAudio } from '../utils/audio';

interface StorySelectProps {
  onSelectStory: (story: StoryDefinition) => void;
  onBack: () => void;
  settings: GameSettings;
}

export const StorySelect: React.FC<StorySelectProps> = ({
  onSelectStory,
  onBack,
  settings,
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const lang = settings.language;
  const currentStory = STORIES[selectedIdx];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        terminalAudio.playKeyClick();
        setSelectedIdx((prev) => (prev > 0 ? prev - 1 : STORIES.length - 1));
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        terminalAudio.playKeyClick();
        setSelectedIdx((prev) => (prev < STORIES.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        terminalAudio.playEnterBeep();
        onSelectStory(STORIES[selectedIdx]);
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        terminalAudio.playKeyClick();
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, onSelectStory, onBack]);

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-black p-4 sm:p-8 md:p-12 text-[#00FF00] font-mono select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#00FF00]/30 pb-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              terminalAudio.playKeyClick();
              onBack();
            }}
            className="text-xs px-2 py-1 border border-[#00FF00]/60 hover:bg-[#00FF00] hover:text-black cursor-pointer font-bold"
          >
            &lt; {lang === 'fr' ? 'RETOUR' : 'BACK'}
          </button>
          <div className="text-xs sm:text-sm tracking-widest text-[#00FF00]/80 font-bold uppercase">
            Rick and Morty // {lang === 'fr' ? 'SÉLECTION DU SCÉNARIO' : 'CAMPAIGN SELECT'}
          </div>
        </div>
        <div className="text-xs text-[#00FF00]/50 tracking-wider hidden sm:block">
          5 PROTOCOLS DISPONIBLES
        </div>
      </div>

      {/* Main Grid: Story List (Left) & Scenario Dossier Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-4">
        {/* Story List (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-xs text-[#00FF00]/60 tracking-widest uppercase mb-1">
            {lang === 'fr' ? 'CHOISISSEZ UNE SIMULATION :' : 'SELECT A PROTOCOL :'}
          </div>
          {STORIES.map((story, idx) => {
            const isSelected = idx === selectedIdx;
            const title = lang === 'fr' ? story.titleFr : story.titleEn;
            const genre = lang === 'fr' ? story.genreFr : story.genreEn;

            return (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  terminalAudio.playEnterBeep();
                  setSelectedIdx(idx);
                  onSelectStory(story);
                }}
                onMouseEnter={() => {
                  if (selectedIdx !== idx) {
                    terminalAudio.playKeyClick();
                    setSelectedIdx(idx);
                  }
                }}
                className={`text-left p-3.5 border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#00FF00]/10 border-[#00FF00] shadow-[0_0_15px_rgba(0,255,0,0.4)]'
                    : 'border-[#00FF00]/30 bg-black/60 hover:border-[#00FF00]/70'
                }`}
                style={{
                  borderColor: isSelected ? story.initialColor : undefined,
                  color: isSelected ? story.initialColor : '#00FF00',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-base sm:text-lg tracking-wider flex items-center gap-2">
                    <span>{isSelected ? '>' : ' '}</span>
                    <span>{title}</span>
                  </div>
                  <span className="text-xs opacity-70">
                    {idx + 1}/5
                  </span>
                </div>
                <div className="text-xs opacity-75 mt-1 tracking-tight">
                  {genre}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Scenario Dossier Preview (7 Cols) */}
        <div 
          className="lg:col-span-7 border-2 p-5 sm:p-6 bg-black flex flex-col justify-between"
          style={{
            borderColor: currentStory.initialColor,
            boxShadow: `0 0 25px ${currentStory.initialColor}33`,
          }}
        >
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: `${currentStory.initialColor}44` }}>
              <div>
                <span className="text-xs tracking-widest uppercase opacity-75">
                  {lang === 'fr' ? 'DOSSIER DE MISSION' : 'MISSION DOSSIER'}
                </span>
                <h3 
                  className="text-2xl sm:text-3xl font-black tracking-wider uppercase mt-0.5"
                  style={{ color: currentStory.initialColor }}
                >
                  {lang === 'fr' ? currentStory.titleFr : currentStory.titleEn}
                </h3>
              </div>
              <div 
                className="text-xs font-bold px-2.5 py-1 border uppercase"
                style={{
                  borderColor: currentStory.initialColor,
                  color: currentStory.initialColor,
                }}
              >
                {currentStory.rooms.length} {lang === 'fr' ? 'ZONES' : 'ROOMS'}
              </div>
            </div>

            {/* Hook / Narrative Context */}
            <div className="mb-5">
              <div className="text-xs uppercase opacity-60 tracking-wider mb-1">
                // {lang === 'fr' ? "L'ACCROCHE ET CONTEXTE :" : 'SCENARIO HOOK & CONTEXT :'}
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-white/90">
                {lang === 'fr' ? currentStory.hookFr : currentStory.hookEn}
              </p>
            </div>

            {/* Starting Inventory */}
            <div className="mb-5">
              <div className="text-xs uppercase opacity-60 tracking-wider mb-2">
                // {lang === 'fr' ? 'INVENTAIRE DE DÉPART :' : 'STARTING GEAR :'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'fr' ? currentStory.startingInventoryFr : currentStory.startingInventoryEn).map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 border border-white/30 bg-white/5 text-white/90 font-mono"
                  >
                    [{item}]
                  </span>
                ))}
              </div>
            </div>

            {/* Key Mechanics */}
            <div className="mb-4">
              <div className="text-xs uppercase opacity-60 tracking-wider mb-2">
                // {lang === 'fr' ? 'MÉCANIQUES DE SURVIE :' : 'SURVIVAL PARAMETERS :'}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="border border-white/20 p-2 text-center bg-white/5">
                  <div className="text-xs opacity-60 mb-0.5">STAT-1</div>
                  <div className="font-bold">{lang === 'fr' ? currentStory.statLabels.stat1.fr : currentStory.statLabels.stat1.en}</div>
                </div>
                <div className="border border-white/20 p-2 text-center bg-white/5">
                  <div className="text-xs opacity-60 mb-0.5">STAT-2</div>
                  <div className="font-bold">{lang === 'fr' ? currentStory.statLabels.stat2.fr : currentStory.statLabels.stat2.en}</div>
                </div>
                <div className="border border-white/20 p-2 text-center bg-white/5">
                  <div className="text-xs opacity-60 mb-0.5">STAT-3</div>
                  <div className="font-bold">{lang === 'fr' ? currentStory.statLabels.stat3.fr : currentStory.statLabels.stat3.en}</div>
                </div>
                <div className="border border-white/20 p-2 text-center bg-white/5">
                  <div className="text-xs opacity-60 mb-0.5">STAT-4</div>
                  <div className="font-bold">{lang === 'fr' ? currentStory.statLabels.stat4.fr : currentStory.statLabels.stat4.en}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <button
            type="button"
            onClick={() => {
              terminalAudio.playEnterBeep();
              onSelectStory(currentStory);
            }}
            className="w-full py-3.5 border-2 font-black tracking-widest text-lg sm:text-xl uppercase transition-all duration-150 cursor-pointer mt-4 flex items-center justify-center gap-3"
            style={{
              backgroundColor: currentStory.initialColor,
              color: '#000000',
              borderColor: currentStory.initialColor,
              boxShadow: `0 0 20px ${currentStory.initialColor}`,
            }}
          >
            <span>[ {lang === 'fr' ? 'DÉMARRER LA SIMULATION' : 'INITIALIZE SIMULATION'} ]</span>
          </button>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="flex items-center justify-between border-t border-[#00FF00]/30 pt-3 text-xs text-[#00FF00]/60">
        <div>
          {lang === 'fr'
            ? 'UTILISEZ LES TOUCHES HAUT/BAS PUIS ENTRÉE'
            : 'USE ARROW KEYS [UP/DOWN] THEN PRESS ENTER'}
        </div>
        <div>
          [ ESC / BACKSPACE = {lang === 'fr' ? 'MENU PRINCIPAL' : 'MAIN MENU'} ]
        </div>
      </div>
    </div>
  );
};
