import React, { useEffect } from 'react';
import { Language, StoryDefinition } from '../types/game';
import { terminalAudio } from '../utils/audio';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryLog: string[];
  story: StoryDefinition;
  turnCount: number;
  language: Language;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  isOpen,
  onClose,
  summaryLog,
  story,
  turnCount,
  language,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && (e.key === 'Escape' || e.key === 'Tab')) {
        e.preventDefault();
        terminalAudio.playKeyClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = language === 'fr' ? story.titleFr : story.titleEn;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono">
      <div 
        className="relative w-full max-w-2xl bg-black border-2 p-6 sm:p-8 flex flex-col max-h-[85vh] shadow-2xl"
        style={{
          borderColor: story.initialColor,
          boxShadow: `0 0 30px ${story.initialColor}44`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: `${story.initialColor}55` }}>
          <div>
            <div className="text-xs uppercase opacity-75 tracking-widest text-[#00FF00]">
              Rick and Morty // A-111 ARCHIVES
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
              {language === 'fr' ? 'RÉSUMÉ À LA 3E PERSONNE' : '3RD-PERSON CHRONICLE SUMMARY'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              terminalAudio.playKeyClick();
              onClose();
            }}
            className="text-sm px-3 py-1 border border-white/40 hover:bg-white hover:text-black cursor-pointer font-bold transition-colors"
          >
            [ X ]
          </button>
        </div>

        {/* Campaign Info */}
        <div className="text-xs opacity-75 mb-4 flex items-center justify-between">
          <span>{title}</span>
          <span>{language === 'fr' ? `TOUR : ${turnCount}` : `TURN : ${turnCount}`}</span>
        </div>

        {/* Narrative chronicle list */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 my-2 border border-white/10 p-3 bg-black/60">
          {summaryLog.length === 0 ? (
            <p className="text-sm opacity-50 italic">
              {language === 'fr'
                ? "Aucune action majeure enregistrée pour l'instant..."
                : 'No major chronicle actions logged yet...'}
            </p>
          ) : (
            summaryLog.map((entry, idx) => (
              <div key={idx} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                <span className="font-bold opacity-60 text-xs mt-0.5 select-none" style={{ color: story.initialColor }}>
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <span className="text-white/90">
                  {entry}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
          <div className="text-xs opacity-60">
            {language === 'fr' ? 'APPUYEZ SUR ÉCHAP OU TAB POUR FERMER' : 'PRESS ESC OR TAB TO CLOSE'}
          </div>
          <button
            type="button"
            onClick={() => {
              terminalAudio.playKeyClick();
              onClose();
            }}
            className="px-6 py-2 border font-bold text-xs uppercase cursor-pointer transition-colors"
            style={{
              borderColor: story.initialColor,
              color: '#000000',
              backgroundColor: story.initialColor,
            }}
          >
            [ {language === 'fr' ? 'FERMER' : 'CLOSE'} ]
          </button>
        </div>
      </div>
    </div>
  );
};
