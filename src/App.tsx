/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { CrtOverlay } from './components/CrtOverlay';
import { GameScreen } from './components/GameScreen';
import { MainMenu } from './components/MainMenu';
import { SettingsModal } from './components/SettingsModal';
import { StorySelect } from './components/StorySelect';
import { STORIES } from './data/stories';
import { GameSettings, StoryDefinition } from './types/game';
import { terminalAudio } from './utils/audio';

type ScreenType = 'menu' | 'settings' | 'story_select' | 'game';

const SETTINGS_STORAGE_KEY = 'a111_terminal_settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('menu');
  const [activeStory, setActiveStory] = useState<StoryDefinition | null>(null);

  // Settings state with persistence
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      soundEnabled: true,
      language: 'en', // English by default as requested
      customApiKey: '',
      preferredProvider: 'auto',
    };
  });

  // Sync audio enabled state
  useEffect(() => {
    terminalAudio.setSoundEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Audio boot sound on initial mount
  useEffect(() => {
    terminalAudio.playCrtBoot();
  }, []);

  const handleUpdateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handlePlay = () => {
    setCurrentScreen('story_select');
  };

  const handleOpenSettings = () => {
    setCurrentScreen('settings');
  };

  const handleBackToMenu = () => {
    terminalAudio.stopAmbience();
    setCurrentScreen('menu');
    setActiveStory(null);
  };

  const handleSelectStory = (story: StoryDefinition) => {
    setActiveStory(story);
    setCurrentScreen('game');
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-[#00FF00] overflow-hidden select-none font-mono">
      {/* CRT Physical Monitor Overlay with Scanlines & Curve */}
      <CrtOverlay />

      {/* Screen Routing */}
      {currentScreen === 'menu' && (
        <MainMenu
          onPlay={handlePlay}
          onSettings={handleOpenSettings}
          settings={settings}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onBack={handleBackToMenu}
        />
      )}

      {currentScreen === 'story_select' && (
        <StorySelect
          onSelectStory={handleSelectStory}
          onBack={handleBackToMenu}
          settings={settings}
        />
      )}

      {currentScreen === 'game' && activeStory && (
        <GameScreen
          story={activeStory}
          settings={settings}
          onExitToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
