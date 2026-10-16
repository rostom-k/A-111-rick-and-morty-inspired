import React, { useEffect, useRef, useState } from 'react';
import { GameSettings, GameState, StoryDefinition } from '../types/game';
import { executePlayerTurn } from '../utils/aiEngine';
import { terminalAudio } from '../utils/audio';
import { translateItem, getItemUtility } from '../utils/itemTranslations';
import { getRoomVisualLayout } from '../utils/visualEngine';
import { SummaryModal } from './SummaryModal';
import { RenderBotDisplay } from './RenderBotDisplay';

interface GameScreenProps {
  story: StoryDefinition;
  settings: GameSettings;
  onExitToMenu: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  story,
  settings,
  onExitToMenu,
}) => {
  const lang = settings.language;

  // Initial Game State Setup
  const [gameState, setGameState] = useState<GameState>(() => {
    const startingRoom = story.rooms.find((r) => r.id === story.startingRoomId) || story.rooms[0];
    const initialDesc = lang === 'fr' ? startingRoom.descriptionFr : startingRoom.descriptionEn;
    const initialHook = lang === 'fr' ? story.hookFr : story.hookEn;
    const startingInv = lang === 'fr' ? story.startingInventoryFr : story.startingInventoryEn;
    const startingVisual = getRoomVisualLayout(startingRoom, lang);

    return {
      currentStoryId: story.id,
      currentRoomId: startingRoom.id,
      stats: {
        stat1: 100,
        stat2: 100,
        stat3: 100,
        stat4: 100,
        trends: {
          stat1: 'neutral',
          stat2: 'neutral',
          stat3: 'neutral',
          stat4: 'neutral',
        },
      },
      inventory: [...startingInv].slice(0, 8),
      history: [
        {
          id: 'boot',
          role: 'system',
          text: `>> A-111 ARCADE TERMINAL ONLINE // PROTOCOL INITIALIZED\n>> SIMULATION : ${lang === 'fr' ? story.titleFr : story.titleEn}`,
          timestamp: Date.now(),
        },
        {
          id: 'hook',
          role: 'narrator',
          text: `[MISSION BRIEFING]\n${initialHook}`,
          timestamp: Date.now() + 1,
        },
        {
          id: 'start-room',
          role: 'narrator',
          text: `[CURRENT LOCATION: ${lang === 'fr' ? startingRoom.nameFr : startingRoom.nameEn}]\n${initialDesc}`,
          timestamp: Date.now() + 2,
          roomName: lang === 'fr' ? startingRoom.nameFr : startingRoom.nameEn,
        },
      ],
      summaryLog: [
        lang === 'fr'
          ? `Initialisation : ${story.titleFr}. Réveil dans ${startingRoom.nameFr}.`
          : `Initialized: ${story.titleEn}. Woke up in ${startingRoom.nameEn}.`,
      ],
      turnCount: 1,
      isGameOver: false,
      gameOverReason: null,
      isVictory: false,
      currentBiome: story.defaultBiome,
      visitedRooms: [startingRoom.id],
      currentVisualLayout: startingVisual.visualLayout,
      currentObstacle: startingVisual.obstacle,
    };
  });

  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Active theme based on current biome
  const currentBiomeData = story.biomes[gameState.currentBiome] || story.biomes[story.defaultBiome] || {
    nameEn: 'Standard',
    nameFr: 'Standard',
    color: story.initialColor,
    bg: story.initialBg,
    audioAmbience: 'default',
  };

  const themeColor = currentBiomeData.color || story.initialColor;
  const themeBg = currentBiomeData.bg || story.initialBg;

  // Minecraft-style audio sync on biome/room entry
  useEffect(() => {
    // Initial room tone & ambient entry
    const biomeAud = currentBiomeData.audioAmbience.toLowerCase();
    if (biomeAud.includes('spore') || biomeAud.includes('cyber') || biomeAud.includes('alien')) {
      terminalAudio.notifyContextEvent('desolate_pulse', false);
    } else if (biomeAud.includes('forest') || biomeAud.includes('woodland')) {
      terminalAudio.notifyContextEvent('woodland_adventure', false);
    } else {
      terminalAudio.notifyContextEvent('deep_silence', false);
    }

    return () => {
      terminalAudio.stopAmbience();
    };
  }, [gameState.currentRoomId, currentBiomeData.audioAmbience]);

  // Autoscroll history
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [gameState.history, isProcessing]);

  // Keep focus on input
  useEffect(() => {
    if (!showSummary && !gameState.isGameOver && !gameState.isVictory) {
      inputRef.current?.focus();
    }
  }, [showSummary, gameState.isGameOver, gameState.isVictory]);

  // Real-Time Pressure Timer Countdown
  useEffect(() => {
    if (!gameState.activeTimer || gameState.isGameOver || gameState.isVictory) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (!prev.activeTimer) return prev;
        const nextSec = prev.activeTimer.secondsLeft - 1;

        if (nextSec > 0) {
          terminalAudio.playTimerTick();
          return {
            ...prev,
            activeTimer: {
              ...prev.activeTimer,
              secondsLeft: nextSec,
            },
          };
        }

        // Timer Expired!
        terminalAudio.playAlarmAlert();
        const penalty = prev.activeTimer.penaltyAmount || 50;
        const nextHp = Math.max(0, prev.stats.stat1 - penalty);
        const isDead = nextHp <= 0 || prev.activeTimer.penaltyType === 'death';

        const expiredText = lang === 'fr'
          ? `[TEMPS ÉCOULÉ ! CHRONOMÈTRE EXPIRÉ]\nVous n'avez pas réagi à temps ! La menace fond sur vous avec une violence inouïe (-${penalty} Santé) !`
          : `[TIME EXPIRED! EMERGENCY TIMER DEPLETED]\nYou did not react in time! The menace strikes with devastating fury (-${penalty} Health)!`;

        return {
          ...prev,
          activeTimer: null,
          stats: {
            ...prev.stats,
            stat1: nextHp,
          },
          isGameOver: isDead,
          gameOverReason: isDead
            ? (lang === 'fr' ? 'Délai d\'urgence expiré - submergé par la menace.' : 'Emergency time expired - overwhelmed by threat.')
            : prev.gameOverReason,
          history: [
            ...prev.history,
            {
              id: `timer-expired-${Date.now()}`,
              role: 'system',
              text: expiredText,
              timestamp: Date.now(),
            },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.activeTimer, gameState.isGameOver, gameState.isVictory, lang]);

  // Amber Frontier: Night Fall Cycle every 15 minutes (or 900s)
  useEffect(() => {
    if (story.id !== 'amber_frontier' || gameState.isGameOver || gameState.isVictory) return;

    const nightTimeout = setTimeout(() => {
      setGameState((prev) => {
        if (prev.isGameOver || prev.isVictory || prev.activeTimer) return prev;
        terminalAudio.playAlarmAlert();
        return {
          ...prev,
          activeTimer: {
            secondsLeft: 15,
            totalSeconds: 15,
            label: lang === 'fr' ? 'LA NUIT TOMBE : 15s POUR TE CACHER !' : 'NIGHT FALLS: 15s TO HIDE!',
            penaltyType: 'damage',
            penaltyAmount: 60,
          },
          history: [
            ...prev.history,
            {
              id: `night-${Date.now()}`,
              role: 'system',
              text: lang === 'fr'
                ? `[ALERTE NOCTURNE : LA NUIT TOMBE SUR LA FRONTIÈRE D'AMBRE !]\nL'obscurité totale s'abat sur la forêt. Les hurlements d'une armée de mutants retentissent dans les bois !\n⏱️ Vous avez 15 secondes pour dire où vous vous cachez ! (15% de risque si mal abrité) !`
                : `[NIGHT FALL ALERT: DARKNESS CONSUMES THE AMBER FRONTIER!]\nPitch black night falls. A mutant army swarms the woods!\n⏱️ You have 15 seconds to declare where you hide! (15% danger of being caught)!`,
              timestamp: Date.now(),
            },
          ],
        };
      });
    }, 15 * 60 * 1000);

    return () => clearTimeout(nightTimeout);
  }, [story.id, gameState.isGameOver, gameState.isVictory, lang]);

  // Periodic Minecraft-style Spooky Cave Sound Effect (every ~110 seconds)
  useEffect(() => {
    if (gameState.isGameOver || gameState.isVictory || !settings.soundEnabled) return;

    const caveInterval = setInterval(() => {
      terminalAudio.playMinecraftCaveNoise();
      setGameState((prev) => {
        if (prev.isGameOver || prev.isVictory) return prev;
        return {
          ...prev,
          history: [
            ...prev.history,
            {
              id: `cave-noise-${Date.now()}`,
              role: 'system',
              text: lang === 'fr'
                ? '[* Un son étrange et angoissant résonne dans les profondeurs... *]'
                : '[* An eerie subterranean noise echoes in the dark... *]',
              timestamp: Date.now(),
            },
          ],
        };
      });
    }, 110 * 1000);

    return () => clearInterval(caveInterval);
  }, [gameState.isGameOver, gameState.isVictory, settings.soundEnabled, lang]);

  // Execute Player Action
  const handleAction = async (actionToRun?: string) => {
    const rawAction = actionToRun || inputText;
    if (!rawAction.trim() || isProcessing || gameState.isGameOver || gameState.isVictory) return;

    terminalAudio.playEnterBeep();
    const action = rawAction.trim();
    setInputText('');
    setInputHistory((prev) => [action, ...prev.slice(0, 19)]);
    setHistoryIndex(-1);
    setIsProcessing(true);

    // Append Player command to history
    setGameState((prev) => ({
      ...prev,
      history: [
        ...prev.history,
        {
          id: `player-${Date.now()}`,
          role: 'player',
          text: `> ${action}`,
          timestamp: Date.now(),
        },
      ],
    }));

    try {
      const result = await executePlayerTurn(story, gameState, action, settings);

      setGameState((prev) => {
        let nextStat1 = Math.max(0, Math.min(100, prev.stats.stat1 + result.statChanges.stat1));
        const nextStat2 = Math.max(0, Math.min(100, prev.stats.stat2 + result.statChanges.stat2));
        const nextStat3 = Math.max(0, Math.min(100, prev.stats.stat3 + result.statChanges.stat3));
        const nextStat4 = Math.max(0, Math.min(100, prev.stats.stat4 + result.statChanges.stat4));

        if (nextStat1 < prev.stats.stat1 || nextStat2 < prev.stats.stat2) {
          terminalAudio.playWarningBeep();
        }

        let updatedInv = [...prev.inventory];
        if (result.itemsDropped.length > 0) {
          const droppedNorm = result.itemsDropped.map((d) => d.toLowerCase());
          updatedInv = updatedInv.filter(
            (it) => !droppedNorm.some((d) => it.toLowerCase().includes(d) || d.includes(it.toLowerCase()))
          );
        }
        for (const item of result.itemsPicked) {
          const localized = translateItem(item, lang);
          if (updatedInv.length < 8 && !updatedInv.includes(localized)) {
            updatedInv.push(localized);
            terminalAudio.playItemPickup();
          }
        }

        const nextRoomId = result.newRoomId || prev.currentRoomId;
        const nextVisited = prev.visitedRooms.includes(nextRoomId)
          ? prev.visitedRooms
          : [...prev.visitedRooms, nextRoomId];

        const updatedSummary = result.summarySentence
          ? [...prev.summaryLog, result.summarySentence]
          : prev.summaryLog;

        const isOver = result.isGameOver || nextStat1 <= 0;

        const newEntries = [
          {
            id: `d20-${Date.now()}`,
            role: 'system' as const,
            text: `[D20 ROLL: ${result.d20Roll}/20] -> ${result.d20Label}`,
            timestamp: Date.now() + 1,
          },
        ];

        // Craft fusion indicator
        if (result.itemsDropped.length >= 2 && result.itemsPicked.length > 0) {
          const fusedIngreds = result.itemsDropped.map((it) => translateItem(it, lang)).join(' + ');
          const createdItem = result.itemsPicked.map((it) => translateItem(it, lang)).join(', ');
          newEntries.push({
            id: `fusion-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[⚡ FUSION D'ARTISANAT: ${fusedIngreds} ➔ ${createdItem}]`
              : `[⚡ CRAFT FUSION: ${fusedIngreds} ➔ ${createdItem}]`,
            timestamp: Date.now() + 1.8,
          });
        }

        if (result.itemsDropped.length > 0) {
          const droppedLocalized = result.itemsDropped.map((it) => translateItem(it, lang)).join(', ');
          newEntries.push({
            id: `drop-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[INVENTAIRE: ${droppedLocalized} retiré - emplacement libéré]`
              : `[INVENTORY: ${droppedLocalized} discarded - slot freed]`,
            timestamp: Date.now() + 2,
          });
        }

        if (result.statChanges.stat1 < 0) {
          newEntries.push({
            id: `damage-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[⚠️ DÉGÂTS SUBIS: ${result.statChanges.stat1} Santé]`
              : `[⚠️ DAMAGE TAKEN: ${result.statChanges.stat1} Health]`,
            timestamp: Date.now() + 2.8,
          });
        }

        if (result.statChanges.stat1 > 0) {
          newEntries.push({
            id: `heal-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[💚 RÉCUPÉRATION: +${result.statChanges.stat1} Santé]`
              : `[💚 RECOVERY: +${result.statChanges.stat1} Health]`,
            timestamp: Date.now() + 3,
          });
        }

        if (result.statChanges.stat2 > 0) {
          newEntries.push({
            id: `sanity-up-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[🧠 SÉRÉNITÉ / VOLONTÉ: +${result.statChanges.stat2} Mental]`
              : `[🧠 SANITY / RESOLVE: +${result.statChanges.stat2} Sanity]`,
            timestamp: Date.now() + 3.1,
          });
        } else if (result.statChanges.stat2 < 0) {
          newEntries.push({
            id: `sanity-down-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[⚡ STRESS / CHOC: ${result.statChanges.stat2} Mental]`
              : `[⚡ STRESS / DREAD: ${result.statChanges.stat2} Sanity]`,
            timestamp: Date.now() + 3.1,
          });
        }

        if (result.itemsPicked.length > 0) {
          const pickedLocalized = result.itemsPicked.map((it) => translateItem(it, lang)).join(', ');
          newEntries.push({
            id: `pick-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr'
              ? `[🎒 NOUVEL ÉQUIPEMENT: +1 ${pickedLocalized}]`
              : `[🎒 ITEM ACQUIRED: +1 ${pickedLocalized}]`,
            timestamp: Date.now() + 3.2,
          });
        }

        // Poison tracking
        let nextPoisoned = prev.isPoisoned;
        if (result.poisonCured) {
          nextPoisoned = false;
        } else if (result.isPoisoned) {
          nextPoisoned = true;
        }

        // Active timer update
        let nextActiveTimer = prev.activeTimer;
        if (result.triggerTimer) {
          nextActiveTimer = {
            secondsLeft: result.triggerTimer.seconds,
            totalSeconds: result.triggerTimer.seconds,
            label: result.triggerTimer.label,
            penaltyType: result.triggerTimer.penaltyType,
            penaltyAmount: result.triggerTimer.penaltyAmount,
          };
        } else if (result.clearTimer || prev.activeTimer) {
          if (prev.activeTimer && prev.activeTimer.label.includes('NUIT')) {
            const isHiding = action.toLowerCase().includes('cach') || action.toLowerCase().includes('abri') || action.toLowerCase().includes('arbre') || action.toLowerCase().includes('terrier') || action.toLowerCase().includes('bunker');
            if (isHiding) {
              const caught = Math.random() < 0.15;
              if (caught) {
                newEntries.push({
                  id: `night-caught-${Date.now()}`,
                  role: 'system' as const,
                  text: lang === 'fr'
                    ? `[ALERTE !] Les bêtes mutantes ont éventré votre cachette (15% de malchance) ! Vous subissez une sévère blessure (-40 Santé) !`
                    : `[ALERT!] The mutant horde found your shelter (15% chance)! Taking heavy trauma (-40 Health)!`,
                  timestamp: Date.now() + 3.5,
                });
                nextStat1 = Math.max(0, nextStat1 - 40);
              } else {
                newEntries.push({
                  id: `night-safe-${Date.now()}`,
                  role: 'system' as const,
                  text: lang === 'fr'
                    ? `[NUIT ÉCOULÉE AVEC SUCCÈS] Vous êtes resté totalement invisible jusqu'au lever du jour. L'armée de mutants a quitté la zone.`
                    : `[NIGHT SURVIVED] You remained undetected until dawn. The horde moved on.`,
                  timestamp: Date.now() + 3.5,
                });
              }
            }
          }
          nextActiveTimer = null;
        }

        if (result.poisonCured && prev.isPoisoned) {
          newEntries.push({
            id: `cure-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr' ? '[GUÉRISON: Le poison a été neutralisé !]' : '[CURED: Venom has been neutralized!]',
            timestamp: Date.now() + 2.5,
          });
        } else if (result.isPoisoned && !prev.isPoisoned) {
          newEntries.push({
            id: `poison-${Date.now()}`,
            role: 'system' as const,
            text: lang === 'fr' ? '[☣️ ALERTE VENIN: Vous êtes empoisonné(e) (-2 Santé par tour) !]' : '[☣️ POISON ALERT: You are poisoned (-2 Health per turn)!]',
            timestamp: Date.now() + 2.5,
          });
        }

        return {
          ...prev,
          currentRoomId: nextRoomId,
          stats: {
            stat1: nextStat1,
            stat2: nextStat2,
            stat3: nextStat3,
            stat4: nextStat4,
            trends: {
              stat1: result.statChanges.stat1 > 0 ? 'up' : result.statChanges.stat1 < 0 ? 'down' : 'neutral',
              stat2: result.statChanges.stat2 > 0 ? 'up' : result.statChanges.stat2 < 0 ? 'down' : 'neutral',
              stat3: result.statChanges.stat3 > 0 ? 'up' : result.statChanges.stat3 < 0 ? 'down' : 'neutral',
              stat4: result.statChanges.stat4 > 0 ? 'up' : result.statChanges.stat4 < 0 ? 'down' : 'neutral',
            },
          },
          inventory: updatedInv,
          turnCount: prev.turnCount + 1,
          isGameOver: isOver,
          gameOverReason: isOver ? (result.gameOverReason || 'VITAL SIGNS DEPLETED') : null,
          isVictory: result.isVictory,
          currentBiome: result.biome || prev.currentBiome,
          visitedRooms: nextVisited,
          summaryLog: updatedSummary,
          isPoisoned: nextPoisoned,
          activeTimer: nextActiveTimer,
          currentVisualLayout: result.visualLayout || prev.currentVisualLayout,
          currentObstacle: result.obstacle !== undefined ? result.obstacle : prev.currentObstacle,
          history: [
            ...prev.history,
            ...newEntries,
            {
              id: `narrator-${Date.now()}`,
              role: 'narrator' as const,
              text: result.narrative,
              timestamp: Date.now() + 4,
            },
          ],
        };
      });

      // Extract lowercase action for audio triggers
      const actLower = action.toLowerCase();

      // Victory Fanfare Trigger
      if (result.isVictory) {
        terminalAudio.playVictoryFanfare();
      }

      // Biome & Atmospheric Environment Sound Triggers
      const nextRoom = result.newRoomId || gameState.currentRoomId;
      if (story.id === 'abyssal_manor' && (nextRoom === 'Pièce 5' || nextRoom === 'Pièce 11' || nextRoom === 'Pièce 12' || actLower.includes('dehors') || actLower.includes('sortir') || actLower.includes('balcon') || actLower.includes('vacances') || actLower.includes('ville'))) {
        terminalAudio.playCityOutsideAmbience();
      } else if (story.id === 'amber_frontier' && (nextRoom.includes('Zone') || actLower.includes('forêt') || actLower.includes('dehors') || actLower.includes('arbre'))) {
        terminalAudio.playViscousMutantSteps();
      } else if (story.id === 'debt_dungeon') {
        if (Math.random() < 0.5) terminalAudio.playWaterDrip();
        else terminalAudio.playChainRattle();
      } else if (story.id === 'neuro_mind') {
        terminalAudio.playDigitalGlitch();
      } else if (story.id === 'astra_7') {
        terminalAudio.playAirlockHiss();
      }

      // Contextual Music Trigger (Minecraft-style: plays, then white noise period, then respawns)
      let targetMood: import('../utils/audio').MusicTheme = 'deep_silence';
      let forceImmediate = false;

      if (result.isGameOver || result.d20Roll === 1 || actLower.includes('combat') || actLower.includes('attaqu') || actLower.includes('ennemi')) {
        targetMood = 'the_ominous';
        forceImmediate = true;
      } else if (result.statChanges.stat1 > 0 || actLower.includes('soign') || actLower.includes('panse') || actLower.includes('repose') || actLower.includes('médit')) {
        targetMood = 'chinese_calm';
      } else if (result.d20Roll >= 15 || result.itemsPicked.length > 0 || actLower.includes('danse')) {
        targetMood = 'woodland_adventure';
      } else if (actLower.includes('fouille') || actLower.includes('cherch') || actLower.includes('boîte') || actLower.includes('inspect') || actLower.includes('examin')) {
        targetMood = 'stalking_shadow';
      } else if (currentBiomeData.audioAmbience.includes('spore') || currentBiomeData.audioAmbience.includes('cyber') || currentBiomeData.audioAmbience.includes('alien')) {
        targetMood = 'desolate_pulse';
      } else {
        targetMood = 'deep_silence';
      }

      terminalAudio.notifyContextEvent(targetMood, forceImmediate);
    } catch {
      setGameState((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          {
            id: `err-${Date.now()}`,
            role: 'narrator' as const,
            text: lang === 'fr'
              ? 'Vous observez les environs. Le silence froid du secteur persiste.'
              : 'You observe the surroundings. The cold silence persists.',
            timestamp: Date.now(),
          },
        ],
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputHistory.length > 0 && historyIndex < inputHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputText(inputHistory[nextIdx]);
        terminalAudio.playKeyClick();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInputText(inputHistory[prevIdx]);
        terminalAudio.playKeyClick();
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputText('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setShowSummary((prev) => !prev);
    } else {
      terminalAudio.playKeyClick();
    }
  };

  const renderTrendText = (trend: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <span className="text-emerald-400 font-bold ml-1">[+]</span>;
    if (trend === 'down') return <span className="text-red-400 font-bold ml-1">[-]</span>;
    return <span className="opacity-30 ml-1">[=]</span>;
  };

  const currentRoom = story.rooms.find((r) => r.id === gameState.currentRoomId) || story.rooms[0];
  const currentRoomName = lang === 'fr' ? currentRoom.nameFr : currentRoom.nameEn;

  return (
    <div 
      className="relative flex h-screen w-full flex-col bg-black text-[#00FF00] font-mono overflow-hidden select-none transition-colors duration-500"
      style={{
        backgroundColor: themeBg,
        color: themeColor,
      }}
    >
      {/* Sleek Minimal Header */}
      <header 
        className="flex items-center justify-between px-3 py-1.5 border-b bg-black/90 text-xs shrink-0 z-10"
        style={{ borderColor: `${themeColor}33` }}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              terminalAudio.playKeyClick();
              onExitToMenu();
            }}
            className="px-2 py-0.5 border text-[11px] font-bold hover:bg-white hover:text-black cursor-pointer transition-colors"
            style={{ borderColor: `${themeColor}66`, color: themeColor }}
          >
            [ {lang === 'fr' ? 'QUITTER' : 'EXIT'} ]
          </button>
          <span className="font-bold tracking-wider">
            A-111 // {lang === 'fr' ? story.titleFr : story.titleEn}
          </span>
          <span className="opacity-50 hidden sm:inline">|</span>
          <span className="opacity-75 hidden sm:inline">{currentRoomName}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-mono">
          <span className="opacity-60">{lang === 'fr' ? 'TOUR' : 'TURN'}: {gameState.turnCount}</span>
          <span className="px-1.5 py-0.5 bg-white/10 uppercase" style={{ color: themeColor }}>
            {lang === 'fr' ? currentBiomeData.nameFr : currentBiomeData.nameEn}
          </span>
        </div>
      </header>

      {/* Active Pressure Timer Banner */}
      {gameState.activeTimer && (
        <div className="bg-red-950/95 border-b-2 border-red-500 text-red-400 px-3 py-1.5 flex items-center justify-between font-mono font-bold text-xs shrink-0 z-20 shadow-[0_0_15px_rgba(255,0,0,0.4)]">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-black animate-pulse">⚠️ [CHRONO D'URGENCE]</span>
            <span className="truncate text-white font-semibold">{gameState.activeTimer.label}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-white font-mono text-sm sm:text-base font-black animate-pulse">
              {String(Math.floor(gameState.activeTimer.secondsLeft / 60)).padStart(2, '0')}:
              {String(gameState.activeTimer.secondsLeft % 60).padStart(2, '0')}
            </span>
            <div className="w-16 sm:w-28 h-2 bg-black border border-red-500 overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${Math.max(0, (gameState.activeTimer.secondsLeft / (gameState.activeTimer.totalSeconds || 15)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Screen Layout: Large Primary Terminal Feed + Compact Side HUD */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Terminal Feed: The Conversation with the AI (Dominates Screen) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Scrollable Dialogue Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 space-y-4 font-mono text-xs sm:text-sm leading-relaxed"
          >
            {gameState.history.map((entry) => {
              if (entry.role === 'player') {
                return (
                  <div 
                    key={entry.id} 
                    className="p-2.5 bg-white/5 border-l-2 font-bold text-white text-xs sm:text-sm"
                    style={{ borderColor: themeColor }}
                  >
                    <span className="opacity-60 mr-1 text-[11px] font-normal">[ACTION]</span>
                    <span>{entry.text}</span>
                  </div>
                );
              }
              if (entry.role === 'system') {
                const isCrit20 = entry.text.includes('20/20') || entry.text.includes('CRITIQUE');
                const isFumble1 = entry.text.includes('1/20') || entry.text.includes('ÉCHEC CRITIQUE') || entry.text.includes('FUMBLE');
                const isFusion = entry.text.includes('FUSION');
                const isDamage = entry.text.includes('DÉGÂTS') || entry.text.includes('DAMAGE');
                const isHeal = entry.text.includes('RÉCUPÉRATION') || entry.text.includes('RECOVERY') || entry.text.includes('SOIN');
                const isSanityUp = entry.text.includes('SÉRÉNITÉ') || entry.text.includes('RESOLVE') || entry.text.includes('VOLONTÉ');
                const isSanityDown = entry.text.includes('STRESS') || entry.text.includes('DREAD') || entry.text.includes('CHOC');
                const isItemGet = entry.text.includes('ÉQUIPEMENT') || entry.text.includes('ACQUIRED') || entry.text.includes('CRAFT');
                const isDrop = entry.text.includes('INVENTAIRE') || entry.text.includes('INVENTORY');

                return (
                  <div 
                    key={entry.id} 
                    className={`text-xs font-mono tracking-wider border-b pb-1.5 flex items-center gap-2 ${
                      isCrit20
                        ? 'text-yellow-400 font-bold border-yellow-500/40 bg-yellow-950/20 px-2 py-1'
                        : isFumble1 || isDamage
                        ? 'text-red-400 font-bold border-red-500/40 bg-red-950/25 px-2 py-1'
                        : isFusion
                        ? 'text-purple-300 font-bold border-purple-500/50 bg-purple-950/30 px-2 py-1 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                        : isHeal
                        ? 'text-emerald-400 font-bold border-emerald-500/40 bg-emerald-950/20 px-2 py-1'
                        : isSanityUp
                        ? 'text-cyan-300 font-bold border-cyan-500/40 bg-cyan-950/20 px-2 py-1'
                        : isSanityDown
                        ? 'text-orange-400 font-bold border-orange-500/40 bg-orange-950/20 px-2 py-1'
                        : isItemGet
                        ? 'text-amber-300 font-bold border-amber-500/40 bg-amber-950/25 px-2 py-1'
                        : isDrop
                        ? 'text-zinc-400 font-bold border-zinc-500/40 bg-zinc-950/20 px-2 py-1'
                        : 'text-cyan-400 font-semibold opacity-90'
                    }`}
                    style={{ borderColor: `${themeColor}33` }}
                  >
                    <span>{entry.text}</span>
                  </div>
                );
              }
              return (
                <div key={entry.id} className="text-white/95 whitespace-pre-line pl-1 leading-relaxed">
                  {entry.text}
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs font-bold animate-pulse pl-1" style={{ color: themeColor }}>
                <span>&gt;&gt;</span>
                <span>{lang === 'fr' ? 'ANALYSE DU TERMINAL EN COURS...' : 'TERMINAL COMPUTING CONSEQUENCES...'}</span>
              </div>
            )}

            {/* Victory Box */}
            {gameState.isVictory && (
              <div 
                className="mt-4 border-2 p-5 text-center bg-black/95 shadow-[0_0_25px_rgba(255,215,0,0.5)] border-yellow-400 text-yellow-300"
              >
                <div className="text-2xl sm:text-3xl font-black mb-1.5 tracking-wider animate-flicker">
                  {lang === 'fr' ? '🏆 GG, TU AS RÉUSSI ! // FIN' : '🏆 GG, YOU WON! // THE END'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-2">
                  {lang === 'fr' ? '[ DÉNOUEMENT ATTEINT // SIMULATION COMPLÉTÉE ]' : '[ ENDING REACHED // SIMULATION COMPLETE ]'}
                </div>
                <p className="text-xs text-white/80 max-w-lg mx-auto mb-4 leading-relaxed font-mono">
                  {lang === 'fr'
                    ? 'Félicitations ! Vous êtes arrivé au terme de cette aventure A-111 ou avez forgé votre propre fin selon vos choix !'
                    : 'Congratulations! You accomplished the ultimate conclusion of this A-111 simulation or shaped your very own ending!'}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSummary(true)}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase cursor-pointer shadow-[0_0_15px_#FFD700] transition-transform hover:scale-105"
                  >
                    [ {lang === 'fr' ? 'CHRONIQUE DE VOTRE FIN' : 'ENDING CHRONICLE'} ]
                  </button>
                  <button
                    type="button"
                    onClick={onExitToMenu}
                    className="px-4 py-2 border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black font-bold text-xs uppercase cursor-pointer transition-colors"
                  >
                    [ {lang === 'fr' ? 'RETOUR MENU' : 'RETURN MENU'} ]
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Box */}
            {gameState.isGameOver && (
              <div className="mt-4 border-2 border-red-500 p-4 text-center bg-black/90 text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                <div className="text-xl sm:text-2xl font-black mb-1 tracking-wider animate-flicker">
                  [SESSION TERMINÉE // CONSTANTES ANÉANTIES]
                </div>
                <p className="text-xs text-white/90 mb-3">
                  {lang === 'fr'
                    ? 'Le sujet a succombé. La simulation s’arrête ici.'
                    : 'The subject flatlined. Simulation terminated.'}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSummary(true)}
                    className="px-4 py-1.5 bg-red-600 text-white font-black text-xs uppercase cursor-pointer"
                  >
                    [ {lang === 'fr' ? 'VOIR RÉSUMÉ' : 'VIEW LOG'} ]
                  </button>
                  <button
                    type="button"
                    onClick={onExitToMenu}
                    className="px-4 py-1.5 border border-red-500 text-red-400 font-bold text-xs uppercase cursor-pointer hover:bg-red-500 hover:text-black"
                  >
                    [ {lang === 'fr' ? 'RETOUR MENU' : 'RETURN MENU'} ]
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div 
            className="border-t bg-black/95 p-2.5 sm:p-3 shrink-0"
            style={{ borderColor: `${themeColor}33` }}
          >
            {/* Quick Action Chips (Plain Text) */}
            <div className="flex flex-wrap items-center gap-1 mb-2">
              <span className="text-[10px] opacity-40 uppercase mr-1">
                {lang === 'fr' ? 'CMD:' : 'CMD:'}
              </span>
              <button
                type="button"
                onClick={() => handleAction(lang === 'fr' ? 'Fouiller attentivement' : 'Search carefully')}
                className="text-[10px] px-2 py-0.5 border border-white/20 bg-white/5 hover:border-white text-white/90 cursor-pointer transition-colors"
              >
                [ {lang === 'fr' ? 'FOUILLER (D20)' : 'SEARCH (D20)'} ]
              </button>
              <button
                type="button"
                onClick={() => handleAction(lang === 'fr' ? 'Avancer prudemment' : 'Advance cautiously')}
                className="text-[10px] px-2 py-0.5 border border-white/20 bg-white/5 hover:border-white text-white/90 cursor-pointer transition-colors"
              >
                [ {lang === 'fr' ? 'AVANCER' : 'FORWARD'} ]
              </button>
              <button
                type="button"
                onClick={() => handleAction(lang === 'fr' ? 'Se soigner et panser ses blessures' : 'Heal and bandage wounds')}
                className="text-[10px] px-2 py-0.5 border border-white/20 bg-white/5 hover:border-white text-white/90 cursor-pointer transition-colors"
              >
                [ {lang === 'fr' ? 'SE SOIGNER' : 'HEAL'} ]
              </button>
              <button
                type="button"
                onClick={() => handleAction(lang === 'fr' ? 'Danser spontanément au milieu de la pièce' : 'Dance spontaneously in the room')}
                className="text-[10px] px-2 py-0.5 border border-white/20 bg-white/5 hover:border-white text-white/90 cursor-pointer transition-colors"
              >
                [ {lang === 'fr' ? 'DANSER (D20)' : 'DANCE (D20)'} ]
              </button>
            </div>

            {/* Input Line and Action Buttons */}
            <div className="flex items-center gap-2">
              <div 
                className="flex-1 flex items-center bg-black border px-2.5 py-1.5 text-xs sm:text-sm font-mono"
                style={{ borderColor: themeColor }}
              >
                <span className="font-bold mr-2 text-sm select-none" style={{ color: themeColor }}>
                  &gt;
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  disabled={isProcessing || gameState.isGameOver || gameState.isVictory}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAction();
                    } else {
                      handleKeyDown(e);
                    }
                  }}
                  placeholder={
                    gameState.isGameOver || gameState.isVictory
                      ? (lang === 'fr' ? 'Session terminée.' : 'Session ended.')
                      : (lang === 'fr' ? 'Action libre (ex: fouiller la boîte, danser, jeter couteau, soigner plaies)...' : 'Freeform action (e.g., search the box, dance, drop knife, heal wounds)...')
                  }
                  className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none font-mono"
                />
                <span className="animate-cursor font-bold select-none" style={{ color: themeColor }}>
                  _
                </span>
              </div>

              <button
                type="button"
                disabled={isProcessing || gameState.isGameOver || gameState.isVictory}
                onClick={() => handleAction()}
                className="px-3.5 py-1.5 font-bold text-xs uppercase cursor-pointer transition-colors disabled:opacity-40"
                style={{
                  backgroundColor: themeColor,
                  color: '#000000',
                }}
              >
                [ {lang === 'fr' ? 'ENVOYER' : 'SEND'} ]
              </button>

              <button
                type="button"
                onClick={() => {
                  terminalAudio.playKeyClick();
                  setShowSummary(true);
                }}
                className="px-3 py-1.5 border bg-black font-bold text-xs uppercase cursor-pointer hover:bg-white hover:text-black transition-colors"
                style={{ borderColor: themeColor, color: themeColor }}
              >
                [ {lang === 'fr' ? 'RÉSUMÉ' : 'SUMMARY'} ]
              </button>
            </div>
          </div>
        </div>

        {/* Compact Right Side HUD: Vitals on top, Small Minecraft-style Inventory slots below */}
        <aside 
          className="w-56 sm:w-64 border-l bg-black/60 flex flex-col justify-between p-2.5 shrink-0 z-10"
          style={{ borderColor: `${themeColor}33` }}
        >
          {/* Top of Sidebar: Small Survival Vitals Bars */}
          <div>
            <div className="text-[10px] font-bold tracking-wider opacity-60 uppercase mb-2 border-b pb-1" style={{ borderColor: `${themeColor}22` }}>
              // {lang === 'fr' ? 'VITAUX' : 'VITALS'}
            </div>

            <div className="space-y-2">
              {/* Stat 1 */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="truncate">{lang === 'fr' ? story.statLabels.stat1.fr : story.statLabels.stat1.en}</span>
                  <span className="font-bold">
                    {gameState.stats.stat1}%{renderTrendText(gameState.stats.trends.stat1)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 mt-0.5 overflow-hidden border border-white/20">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${gameState.stats.stat1}%`,
                      backgroundColor: gameState.stats.stat1 < 25 ? '#FF2222' : themeColor,
                    }}
                  />
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="truncate">{lang === 'fr' ? story.statLabels.stat2.fr : story.statLabels.stat2.en}</span>
                  <span className="font-bold">
                    {gameState.stats.stat2}%{renderTrendText(gameState.stats.trends.stat2)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 mt-0.5 overflow-hidden border border-white/20">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${gameState.stats.stat2}%`,
                      backgroundColor: gameState.stats.stat2 < 25 ? '#FF2222' : themeColor,
                    }}
                  />
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="truncate">{lang === 'fr' ? story.statLabels.stat3.fr : story.statLabels.stat3.en}</span>
                  <span className="font-bold">
                    {gameState.stats.stat3}%{renderTrendText(gameState.stats.trends.stat3)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 mt-0.5 overflow-hidden border border-white/20">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${gameState.stats.stat3}%`,
                      backgroundColor: gameState.stats.stat3 < 25 ? '#FF8800' : themeColor,
                    }}
                  />
                </div>
              </div>

              {/* Stat 4 */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="truncate">{lang === 'fr' ? story.statLabels.stat4.fr : story.statLabels.stat4.en}</span>
                  <span className="font-bold">
                    {gameState.stats.stat4}%{renderTrendText(gameState.stats.trends.stat4)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 mt-0.5 overflow-hidden border border-white/20">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${gameState.stats.stat4}%`,
                      backgroundColor: gameState.stats.stat4 < 25 ? '#FF8800' : themeColor,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Status Effect Badges */}
            {gameState.isPoisoned && (
              <div className="mt-2.5 px-2 py-1 bg-emerald-950/70 border border-emerald-500/80 text-emerald-300 text-[10px] font-mono font-bold animate-pulse flex items-center justify-between shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                <span className="flex items-center gap-1">☣️ {lang === 'fr' ? 'EMPOISONNÉ' : 'POISONED'}</span>
                <span className="text-red-400 font-mono">-2 HP/{lang === 'fr' ? 'tour' : 'turn'}</span>
              </div>
            )}
          </div>

          {/* ZONE 1: RENDER BOT DISPLAY (Retro wireframe canvas above Hotbar) */}
          <div className="mt-4 pt-3 border-t" style={{ borderColor: `${themeColor}22` }}>
            <RenderBotDisplay
              visualLayout={gameState.currentVisualLayout}
              locationId={currentRoom?.id || gameState.currentRoomId}
              locationName={lang === 'fr' ? (currentRoom?.nameFr || currentRoom?.id || '') : (currentRoom?.nameEn || currentRoom?.id || '')}
              obstacle={gameState.currentObstacle}
              lang={lang}
              themeColor={themeColor}
            />

            <div className="flex items-center justify-between text-[10px] font-bold tracking-wider opacity-60 uppercase mb-2 mt-2">
              <span>// {lang === 'fr' ? 'INVENTAIRE' : 'HOTBAR'}</span>
              <span>{gameState.inventory.length}/8</span>
            </div>

            {/* 8 Small Slots like a compact Minecraft hotbar list */}
            <div className="space-y-1.5">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((slotIdx) => {
                const rawItem = gameState.inventory[slotIdx];
                const item = rawItem ? translateItem(rawItem, lang) : '';
                const utility = rawItem ? getItemUtility(rawItem, lang) : '';
                return (
                  <div
                    key={slotIdx}
                    title={utility || undefined}
                    className={`px-2 py-1.5 border text-xs flex flex-col gap-0.5 transition-colors ${
                      item
                        ? 'border-white/30 bg-white/5 text-white'
                        : 'border-white/10 bg-black/40 text-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 w-full">
                      <div className="flex items-center gap-1.5 truncate flex-1 min-w-0">
                        <span className="text-[10px] font-mono opacity-50 font-bold">[{slotIdx + 1}]</span>
                        <span className="truncate text-[11px] font-semibold">{item || '---'}</span>
                      </div>
                      {item && (
                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(lang === 'fr' ? `utiliser ${item}` : `use ${item}`);
                            }}
                            className="text-[9px] px-1 py-0.5 border border-white/30 hover:bg-white hover:text-black uppercase cursor-pointer"
                          >
                            {lang === 'fr' ? 'UTIL' : 'USE'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(lang === 'fr' ? `jeter ${item}` : `drop ${item}`);
                            }}
                            className="text-[9px] px-1 py-0.5 border border-red-500/50 text-red-300 hover:bg-red-500 hover:text-black uppercase cursor-pointer"
                          >
                            {lang === 'fr' ? 'JET' : 'DROP'}
                          </button>
                        </div>
                      )}
                    </div>
                    {item && utility && (
                      <div className="text-[9px] font-mono text-white/45 truncate pl-4">
                        {utility.slice(0, 48)}...
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Subtle Minecraft-style Audio Ambient Mode */}
            <div className="mt-3 pt-2 border-t text-[10px] opacity-40 font-mono tracking-wider flex items-center justify-between" style={{ borderColor: `${themeColor}22` }}>
              <span>// AMBIANCE :</span>
              <span className="uppercase text-[9px]">{settings.soundEnabled ? 'CYCLE MINECRAFT' : 'MUET'}</span>
            </div>
          </div>
        </aside>
      </div>

      {/* 3rd-Person Summary Modal */}
      <SummaryModal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        summaryLog={gameState.summaryLog}
        story={story}
        turnCount={gameState.turnCount}
        language={lang}
      />
    </div>
  );
};
