import React, { useEffect, useRef, useState } from 'react';
import { VisualLayout, Language, VisualItem, VisualObject } from '../types/game';

interface RenderBotDisplayProps {
  visualLayout?: VisualLayout | null;
  locationId: string;
  locationName: string;
  obstacle?: string | null;
  lang: Language;
  themeColor?: string;
}

export const RenderBotDisplay: React.FC<RenderBotDisplayProps> = ({
  visualLayout,
  locationId,
  locationName,
  obstacle,
  lang,
  themeColor = '#00FF00',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [glitchTick, setGlitchTick] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Default fallback layout if none provided
  const layout: VisualLayout = visualLayout || {
    room_type: 'perspective_box',
    background_glitch: true,
    objects: [
      { type: 'door', position: 'center' },
      { type: 'table', position: 'center_left', label: 'Table' },
      { type: 'drawer', position: 'left', label: 'Tiroir' },
      { type: 'bag', position: 'right', label: 'Sac' },
      { type: 'floor_grid', position: 'bottom_center' },
    ],
    items: [
      { name: 'Clé en laiton', type: 'key', container: 'table', position: 'on_table', inReach: true },
    ],
    ascii_glitch_chars: ['#', '@', '$', '0', '1', '%', '!'],
    obstacle: obstacle || null,
  };

  // Matrix glitch animation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setGlitchTick((prev) => (prev + 1) % 1000);
    }, 180);
    return () => clearInterval(timer);
  }, []);

  // Main Procedural Wireframe Drawing Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // 1. Black Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);

    // Phosphor Green & Amber Palette
    const green = '#00FF00';
    const darkGreen = '#004400';
    const dimGreen = '#008800';
    const brightGreen = '#55FF55';
    const amber = '#FFCC00';
    const cyan = '#00FFFF';

    ctx.strokeStyle = green;
    ctx.fillStyle = green;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 3;
    ctx.shadowColor = green;

    // 2. Draw 3D Perspective Box (Room Walls & Ceiling/Floor)
    const marginX = W * 0.22;
    const marginY = H * 0.2;
    const backX = marginX;
    const backY = marginY;
    const backW = W - marginX * 2;
    const backH = H - marginY * 2.1;

    // Back wall rectangle
    ctx.beginPath();
    ctx.rect(backX, backY, backW, backH);
    ctx.stroke();

    // Vanishing perspective lines (Corners of room to screen edges)
    ctx.beginPath();
    // Top-left
    ctx.moveTo(0, 0);
    ctx.lineTo(backX, backY);
    // Top-right
    ctx.moveTo(W, 0);
    ctx.lineTo(backX + backW, backY);
    // Bottom-left
    ctx.moveTo(0, H - 18);
    ctx.lineTo(backX, backY + backH);
    // Bottom-right
    ctx.moveTo(W, H - 18);
    ctx.lineTo(backX + backW, backY + backH);
    ctx.stroke();

    // Container anchor points to place items directly on top or inside them!
    const containerAnchors: Record<string, { x: number; y: number; w: number; h: number }> = {};

    // 3. Helper drawing routines for Architecture & Containers
    const drawBookshelf = (x: number, y: number, w: number, h: number) => {
      ctx.strokeRect(x, y, w, h);
      const shelves = 3;
      for (let i = 1; i < shelves; i++) {
        const sy = y + (h / shelves) * i;
        ctx.beginPath();
        ctx.moveTo(x, sy);
        ctx.lineTo(x + w, sy);
        ctx.stroke();
        // Wireframe books
        for (let bx = x + 3; bx < x + w - 4; bx += 5) {
          ctx.beginPath();
          ctx.moveTo(bx, sy);
          ctx.lineTo(bx, sy - (h / shelves) * 0.65);
          ctx.stroke();
        }
      }
    };

    const drawDoor = (x: number, y: number, w: number, h: number) => {
      // Outer frame
      ctx.strokeRect(x, y, w, h);
      // Inner panel
      ctx.strokeRect(x + 2, y + 2, w - 4, h - 2);
      // Door knob / electronic handle
      ctx.beginPath();
      ctx.arc(x + w - 5, y + h * 0.55, 2, 0, Math.PI * 2);
      ctx.stroke();
      // Transom window lines
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.28);
      ctx.lineTo(x + w, y + h * 0.28);
      ctx.stroke();
    };

    const drawSafe = (x: number, y: number, w: number, h: number) => {
      ctx.strokeRect(x, y, w, h);
      // Inner beveled door
      ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
      // Combination dial
      ctx.beginPath();
      ctx.arc(x + w * 0.5, y + h * 0.5, Math.min(w, h) * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      // Handle crossbar
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5 - 5, y + h * 0.5);
      ctx.lineTo(x + w * 0.5 + 5, y + h * 0.5);
      ctx.stroke();
    };

    const drawLadder = (x: number, y: number, w: number, h: number) => {
      // Rails
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + h);
      ctx.moveTo(x + w, y);
      ctx.lineTo(x + w, y + h);
      ctx.stroke();
      // Rungs
      const rungs = 5;
      for (let i = 0; i <= rungs; i++) {
        const ry = y + (h / rungs) * i;
        ctx.beginPath();
        ctx.moveTo(x, ry);
        ctx.lineTo(x + w, ry);
        ctx.stroke();
      }
    };

    const drawFloorGrid = (x: number, y: number, w: number, h: number, unstable: boolean) => {
      const rows = 4;
      const cols = 5;
      ctx.save();
      if (unstable) {
        ctx.setLineDash([3, 2]);
      }
      for (let r = 0; r <= rows; r++) {
        const gy = y + (h / rows) * r;
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
        ctx.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        const gx = x + (w / cols) * c;
        ctx.beginPath();
        ctx.moveTo(gx, y);
        ctx.lineTo(gx, y + h);
        ctx.stroke();
      }
      ctx.restore();
    };

    // --- USER REQUESTED CONTAINERS: TABLE, DRAWER, BAG ---

    // 1. Table: 3D perspective workshop/wooden table
    const drawTable = (x: number, y: number, w: number, h: number) => {
      const topH = h * 0.35;
      const slant = 8;
      // Perspective tabletop slab
      ctx.beginPath();
      ctx.moveTo(x + slant, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w - slant, y + topH);
      ctx.lineTo(x, y + topH);
      ctx.closePath();
      ctx.stroke();

      // Front rim thickness
      ctx.beginPath();
      ctx.moveTo(x, y + topH);
      ctx.lineTo(x, y + topH + 3);
      ctx.lineTo(x + w - slant, y + topH + 3);
      ctx.lineTo(x + w - slant, y + topH);
      ctx.stroke();

      // 4 Legs
      const legW = 3;
      // Front-left leg
      ctx.strokeRect(x + 2, y + topH + 3, legW, h - topH - 3);
      // Front-right leg
      ctx.strokeRect(x + w - slant - legW - 2, y + topH + 3, legW, h - topH - 3);
      // Back-left leg (dimmed)
      ctx.save();
      ctx.strokeStyle = dimGreen;
      ctx.strokeRect(x + slant + 2, y, legW, topH + (h - topH) * 0.65);
      // Back-right leg (dimmed)
      ctx.strokeRect(x + w - legW - 2, y, legW, topH + (h - topH) * 0.65);
      // Support crossbeam
      ctx.beginPath();
      ctx.moveTo(x + 2, y + topH + (h - topH) * 0.55);
      ctx.lineTo(x + w - slant - 2, y + topH + (h - topH) * 0.55);
      ctx.stroke();
      ctx.restore();

      // Store anchor position for items placed on the table!
      containerAnchors['table'] = {
        x: x + w * 0.45,
        y: y + topH * 0.4,
        w: w * 0.6,
        h: topH,
      };

      // Label
      ctx.font = '7px monospace';
      ctx.fillStyle = dimGreen;
      ctx.fillText(lang === 'fr' ? 'TABLE' : 'TABLE', x + 2, y - 2);
    };

    // 2. Drawer / Dresser Unit (Closed tiers with handles so contents remain unrevealed)
    const drawDrawer = (x: number, y: number, w: number, h: number) => {
      // Main cabinet body
      ctx.strokeRect(x, y, w, h);

      // 3 closed drawer tiers
      const dH = (h - 8) / 3;
      for (let i = 0; i < 3; i++) {
        const dy = y + 2 + i * (dH + 2);
        ctx.strokeRect(x + 2, dy, w - 4, dH);
        // Central pull handle
        ctx.strokeRect(x + w * 0.5 - 3, dy + dH * 0.4, 6, 2);
      }

      // Label (Drawer is visible, but closed)
      ctx.font = '7px monospace';
      ctx.fillStyle = dimGreen;
      ctx.fillText(lang === 'fr' ? 'TIROIR' : 'DRAWER', x, y - 2);
    };

    // 3. Survival Bag / Tactical Backpack
    const drawBag = (x: number, y: number, w: number, h: number) => {
      // Main rounded body
      ctx.beginPath();
      ctx.moveTo(x + 4, y + 6);
      ctx.quadraticCurveTo(x + w * 0.5, y, x + w - 4, y + 6);
      ctx.lineTo(x + w, y + h - 4);
      ctx.quadraticCurveTo(x + w * 0.5, y + h, x, y + h - 4);
      ctx.closePath();
      ctx.stroke();

      // Top Flap
      ctx.beginPath();
      ctx.moveTo(x + 2, y + h * 0.32);
      ctx.lineTo(x + w - 2, y + h * 0.32);
      ctx.stroke();

      // Buckle straps
      ctx.beginPath();
      ctx.moveTo(x + w * 0.28, y + 4);
      ctx.lineTo(x + w * 0.28, y + h * 0.7);
      ctx.moveTo(x + w * 0.72, y + 4);
      ctx.lineTo(x + w * 0.72, y + h * 0.7);
      ctx.stroke();

      // Buckle rectangles
      ctx.strokeRect(x + w * 0.28 - 2, y + h * 0.32 - 1, 4, 3);
      ctx.strokeRect(x + w * 0.72 - 2, y + h * 0.32 - 1, 4, 3);

      // Front exterior zippered pocket
      ctx.strokeRect(x + w * 0.2, y + h * 0.45, w * 0.6, h * 0.4);
      // Pocket zipper line
      ctx.beginPath();
      ctx.moveTo(x + w * 0.2, y + h * 0.52);
      ctx.lineTo(x + w * 0.8, y + h * 0.52);
      ctx.stroke();

      // Side dangling strap
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.7);
      ctx.lineTo(x - 3, y + h * 0.95);
      ctx.stroke();

      // Store anchor position for items placed near the bag!
      containerAnchors['bag'] = {
        x: x + w + 8,
        y: y + h * 0.6,
        w: 20,
        h: 20,
      };

      // Label
      ctx.font = '7px monospace';
      ctx.fillStyle = dimGreen;
      ctx.fillText(lang === 'fr' ? 'SAC' : 'BAG', x, y - 2);
    };

    const drawTerminal = (x: number, y: number, w: number, h: number) => {
      // Monitor
      ctx.strokeRect(x, y, w, h * 0.65);
      ctx.strokeRect(x + 2, y + 2, w - 4, h * 0.65 - 4);
      // Text scan lines on screen
      ctx.beginPath();
      ctx.moveTo(x + 5, y + 6);
      ctx.lineTo(x + w - 5, y + 6);
      ctx.moveTo(x + 5, y + 10);
      ctx.lineTo(x + w * 0.6, y + 10);
      ctx.stroke();
      // Stand & keyboard
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y + h * 0.65);
      ctx.lineTo(x + w * 0.5, y + h * 0.85);
      ctx.lineTo(x + 2, y + h);
      ctx.lineTo(x + w - 2, y + h);
      ctx.stroke();
    };

    const drawChest = (x: number, y: number, w: number, h: number) => {
      ctx.strokeRect(x, y + h * 0.35, w, h * 0.65);
      // Arched lid
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.35);
      ctx.quadraticCurveTo(x + w * 0.5, y, x + w, y + h * 0.35);
      ctx.stroke();
      // Lock clasp
      ctx.strokeRect(x + w * 0.5 - 2, y + h * 0.35 - 1, 4, 5);

      containerAnchors['chest'] = {
        x: x + w * 0.5,
        y: y + h * 0.2,
        w: w,
        h: h,
      };
    };

    const drawCables = (x: number, y: number, w: number, h: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + w * 0.3, y + h * 0.8, x + w * 0.7, y + h * 0.9, x + w, y + h * 0.3);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 4, y);
      ctx.bezierCurveTo(x + w * 0.35, y + h * 0.95, x + w * 0.65, y + h, x + w - 4, y + h * 0.4);
      ctx.stroke();
    };

    const drawAltar = (x: number, y: number, w: number, h: number) => {
      ctx.strokeRect(x, y + h * 0.6, w, h * 0.4);
      ctx.strokeRect(x + 4, y + h * 0.2, w - 8, h * 0.4);
      // Glowing relic rune diamond
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w * 0.5 + 4, y + 6);
      ctx.lineTo(x + w * 0.5, y + 12);
      ctx.lineTo(x + w * 0.5 - 4, y + 6);
      ctx.closePath();
      ctx.stroke();
    };

    // --- PROCEDURAL VECTOR DRAWINGS FOR ITEMS ---
    const drawItemVector = (
      type: string,
      x: number,
      y: number,
      label?: string,
      inReach = true
    ) => {
      ctx.save();
      ctx.strokeStyle = inReach ? brightGreen : green;
      ctx.fillStyle = inReach ? brightGreen : green;
      ctx.shadowColor = inReach ? brightGreen : green;
      ctx.shadowBlur = inReach ? 5 : 2;

      const t = type.toLowerCase();

      if (t.includes('key') || t.includes('cle')) {
        // Brass / Iron Key
        ctx.beginPath();
        // Bow ring
        ctx.arc(x - 5, y, 3.5, 0, Math.PI * 2);
        ctx.stroke();
        // Stem
        ctx.beginPath();
        ctx.moveTo(x - 1.5, y);
        ctx.lineTo(x + 7, y);
        // Bit / Teeth
        ctx.moveTo(x + 4, y);
        ctx.lineTo(x + 4, y + 3.5);
        ctx.moveTo(x + 6.5, y);
        ctx.lineTo(x + 6.5, y + 4.5);
        ctx.stroke();
        // Sparkle / Glint
        if (glitchTick % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(x - 5, y - 5);
          ctx.lineTo(x - 5, y + 5);
          ctx.moveTo(x - 10, y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      } else if (t.includes('knife') || t.includes('couteau') || t.includes('blade') || t.includes('dagger')) {
        // Knife / Blade
        ctx.beginPath();
        // Handle
        ctx.rect(x - 7, y - 1.5, 5, 3);
        // Guard
        ctx.moveTo(x - 2, y - 3.5);
        ctx.lineTo(x - 2, y + 3.5);
        // Blade
        ctx.moveTo(x - 2, y - 2);
        ctx.lineTo(x + 8, y - 2);
        ctx.lineTo(x + 10, y);
        ctx.lineTo(x - 2, y + 2);
        ctx.closePath();
        ctx.stroke();
      } else if (t.includes('bottle') || t.includes('bouteille') || t.includes('water') || t.includes('eau') || t.includes('flask')) {
        // Bottle / Flask
        ctx.beginPath();
        // Body
        ctx.strokeRect(x - 3.5, y - 1, 7, 10);
        // Neck & Cork
        ctx.strokeRect(x - 1.5, y - 5, 3, 4);
        ctx.strokeRect(x - 2, y - 6.5, 4, 1.5);
        // Liquid level line
        ctx.save();
        ctx.setLineDash([2, 1]);
        ctx.beginPath();
        ctx.moveTo(x - 3, y + 3);
        ctx.lineTo(x + 3, y + 3);
        ctx.stroke();
        ctx.restore();
      } else if (t.includes('can') || t.includes('chips') || t.includes('food') || t.includes('ration') || t.includes('conserve')) {
        // Can of food
        ctx.beginPath();
        ctx.strokeRect(x - 4, y - 5, 8, 10);
        // Top and bottom rims
        ctx.strokeRect(x - 4.5, y - 6, 9, 1.5);
        ctx.strokeRect(x - 4.5, y + 4.5, 9, 1.5);
        // Label line
        ctx.beginPath();
        ctx.moveTo(x - 3, y);
        ctx.lineTo(x + 3, y);
        ctx.stroke();
      } else if (t.includes('bandage') || t.includes('pansement') || t.includes('medkit') || t.includes('soin')) {
        // Medkit / Bandage pouch with cross
        ctx.strokeRect(x - 5, y - 4, 10, 8);
        // Medical cross
        ctx.beginPath();
        ctx.moveTo(x, y - 2.5);
        ctx.lineTo(x, y + 2.5);
        ctx.moveTo(x - 2.5, y);
        ctx.lineTo(x + 2.5, y);
        ctx.stroke();
      } else if (t.includes('flashlight') || t.includes('torche') || t.includes('lampe') || t.includes('briquet') || t.includes('lighter')) {
        // Flashlight / Torch
        ctx.strokeRect(x - 6, y - 2, 8, 4);
        ctx.beginPath();
        ctx.moveTo(x + 2, y - 3.5);
        ctx.lineTo(x + 5, y - 4.5);
        ctx.lineTo(x + 5, y + 4.5);
        ctx.lineTo(x + 2, y + 3.5);
        ctx.closePath();
        ctx.stroke();
        // Light cone wireframe rays
        ctx.save();
        ctx.setLineDash([2, 2]);
        ctx.strokeStyle = darkGreen;
        ctx.beginPath();
        ctx.moveTo(x + 5, y - 3);
        ctx.lineTo(x + 15, y - 7);
        ctx.moveTo(x + 5, y + 3);
        ctx.lineTo(x + 15, y + 7);
        ctx.stroke();
        ctx.restore();
      } else if (t.includes('battery') || t.includes('phone') || t.includes('pile') || t.includes('téléphone')) {
        // Battery cell
        ctx.strokeRect(x - 4, y - 5, 8, 10);
        ctx.strokeRect(x - 1.5, y - 7, 3, 2);
        // Plus sign
        ctx.font = '6px monospace';
        ctx.fillText('+', x - 1.5, y + 2);
      } else if (t.includes('crowbar') || t.includes('pied') || t.includes('pipe') || t.includes('tuyau')) {
        // Crowbar
        ctx.beginPath();
        ctx.moveTo(x - 8, y + 3);
        ctx.lineTo(x + 4, y - 3);
        ctx.lineTo(x + 7, y - 6);
        ctx.lineTo(x + 8, y - 3);
        ctx.stroke();
      } else if (t.includes('note') || t.includes('page') || t.includes('diary') || t.includes('livre') || t.includes('document')) {
        // Folded note
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 6);
        ctx.lineTo(x + 2, y - 6);
        ctx.lineTo(x + 5, y - 3);
        ctx.lineTo(x + 5, y + 6);
        ctx.lineTo(x - 4, y + 6);
        ctx.closePath();
        ctx.stroke();
        // Scan lines
        ctx.beginPath();
        ctx.moveTo(x - 2, y);
        ctx.lineTo(x + 3, y);
        ctx.moveTo(x - 2, y + 3);
        ctx.lineTo(x + 2, y + 3);
        ctx.stroke();
      } else {
        // Default tactical item container
        ctx.strokeRect(x - 4, y - 4, 8, 8);
        ctx.beginPath();
        ctx.moveTo(x - 2, y);
        ctx.lineTo(x + 2, y);
        ctx.stroke();
      }

      // Tactical Reach Targeting Brackets (⌜ ⌝ ⌞ ⌟)
      if (inReach) {
        ctx.strokeStyle = amber;
        ctx.lineWidth = 1;
        const bSize = 9;
        // Top-left
        ctx.beginPath();
        ctx.moveTo(x - bSize, y - bSize + 3);
        ctx.lineTo(x - bSize, y - bSize);
        ctx.lineTo(x - bSize + 3, y - bSize);
        ctx.stroke();
        // Top-right
        ctx.beginPath();
        ctx.moveTo(x + bSize - 3, y - bSize);
        ctx.lineTo(x + bSize, y - bSize);
        ctx.lineTo(x + bSize, y - bSize + 3);
        ctx.stroke();
        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(x - bSize, y + bSize - 3);
        ctx.lineTo(x - bSize, y + bSize);
        ctx.lineTo(x - bSize + 3, y + bSize);
        ctx.stroke();
        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(x + bSize - 3, y + bSize);
        ctx.lineTo(x + bSize, y + bSize);
        ctx.lineTo(x + bSize, y + bSize - 3);
        ctx.stroke();

        // Label above item
        if (label) {
          ctx.font = '7px monospace';
          ctx.fillStyle = amber;
          const shortLabel = label.split(' ')[0].toUpperCase();
          ctx.fillText(`[${shortLabel}]`, x - 8, y - bSize - 2);
        }
      }

      ctx.restore();
    };

    // 4. Render All Architecture & Furniture in Visual Layout
    (layout.objects || []).forEach((obj) => {
      let ox = backX;
      let oy = backY;
      let ow = 20;
      let oh = 35;

      switch (obj.position) {
        case 'left':
          ox = 8;
          oy = H * 0.24;
          ow = backX - 12;
          oh = H * 0.55;
          break;
        case 'center_left':
          ox = backX + 8;
          oy = backY + backH * 0.35;
          ow = backW * 0.28;
          oh = backH * 0.6;
          break;
        case 'center':
          ox = backX + backW * 0.35;
          oy = backY + backH * 0.15;
          ow = backW * 0.3;
          oh = backH * 0.82;
          break;
        case 'center_right':
          ox = backX + backW * 0.66;
          oy = backY + backH * 0.35;
          ow = backW * 0.28;
          oh = backH * 0.6;
          break;
        case 'right':
          ox = backX + backW + 4;
          oy = H * 0.22;
          ow = W - (backX + backW) - 10;
          oh = H * 0.58;
          break;
        case 'bottom_center':
          ox = backX + backW * 0.15;
          oy = backY + backH - 2;
          ow = backW * 0.7;
          oh = H - 20 - (backY + backH);
          break;
        case 'top_left':
          ox = 4;
          oy = 4;
          ow = backX * 1.2;
          oh = backY * 1.1;
          break;
        case 'top_right':
          ox = backX + backW * 0.5;
          oy = 4;
          ow = W - (backX + backW * 0.5);
          oh = backY * 1.1;
          break;
        case 'floor_left':
          ox = backX + 4;
          oy = backY + backH + 4;
          ow = 14;
          oh = 14;
          break;
        case 'floor_right':
          ox = backX + backW - 18;
          oy = backY + backH + 4;
          ow = 14;
          oh = 14;
          break;
        default:
          ox = backX + 10;
          oy = backY + 10;
      }

      const oType = obj.type.toLowerCase();

      // Draw matched furniture / architecture
      if (oType.includes('table')) {
        drawTable(ox, oy, ow, oh);
      } else if (oType.includes('drawer')) {
        drawDrawer(ox, oy, ow, oh);
      } else if (oType.includes('bag') || oType.includes('backpack')) {
        drawBag(ox, oy, ow, oh);
      } else if (oType.includes('bookshelf')) {
        drawBookshelf(ox, oy, ow, oh);
      } else if (oType.includes('door')) {
        drawDoor(ox, oy, ow, oh);
      } else if (oType.includes('safe')) {
        drawSafe(ox, oy, ow, oh);
      } else if (oType.includes('ladder')) {
        drawLadder(ox, oy, ow, oh);
      } else if (oType.includes('floor') || oType.includes('grid')) {
        drawFloorGrid(ox, oy, ow, oh, oType.includes('unstable'));
      } else if (oType.includes('terminal')) {
        drawTerminal(ox, oy, ow, oh);
      } else if (oType.includes('chest')) {
        drawChest(ox, oy, ow, oh);
      } else if (oType.includes('cable') || oType.includes('pipe')) {
        drawCables(ox, oy, ow, oh);
      } else if (oType.includes('altar') || oType.includes('statue')) {
        drawAltar(ox, oy, ow, oh);
      }
    });

    // Helper to ensure hidden drawer items are NOT shown
    const isHiddenContainerItem = (it: { container?: string; position?: string; hidden?: boolean }) => {
      const c = (it.container || '').toLowerCase();
      const p = (it.position || '').toLowerCase();
      return c === 'drawer' || p.includes('drawer') || Boolean(it.hidden);
    };

    // 5. Render All Visible & Reachable Items in Plain Sight (On Table or Ground)
    const itemsToDraw: VisualItem[] = [
      ...(layout.items || []).filter((it) => !isHiddenContainerItem(it)),
      // Also check if any objects are items directly in plain sight
      ...((layout.objects || [])
        .filter((o) =>
          ['key', 'knife', 'bottle', 'can', 'bandage', 'flashlight', 'battery', 'crowbar', 'note', 'food', 'medkit'].some((k) =>
            o.type.toLowerCase().includes(k)
          ) && !isHiddenContainerItem(o)
        )
        .map((o) => ({
          name: o.label || o.type,
          type: o.type,
          container: o.container || (o.position.includes('table') ? 'table' : 'floor'),
          position: o.position,
          inReach: o.inReach ?? true,
        }))),
    ];

    // Deduplicate items by name
    const seenItems = new Set<string>();
    const uniqueItems: VisualItem[] = [];
    for (const it of itemsToDraw) {
      if (!seenItems.has(it.name)) {
        seenItems.add(it.name);
        uniqueItems.push(it);
      }
    }

    uniqueItems.forEach((it, idx) => {
      let ix = backX + backW * 0.5;
      let iy = backY + backH * 0.7;

      const containerKey = it.container || (it.position?.includes('table') ? 'table' : it.position?.includes('drawer') ? 'drawer' : it.position?.includes('bag') ? 'bag' : '');

      if (containerKey && containerAnchors[containerKey]) {
        const anchor = containerAnchors[containerKey];
        ix = anchor.x;
        iy = anchor.y;
      } else if (it.position === 'on_table' && containerAnchors['table']) {
        ix = containerAnchors['table'].x;
        iy = containerAnchors['table'].y;
      } else if (it.position === 'in_drawer' && containerAnchors['drawer']) {
        ix = containerAnchors['drawer'].x;
        iy = containerAnchors['drawer'].y;
      } else if (it.position === 'near_bag' && containerAnchors['bag']) {
        ix = containerAnchors['bag'].x;
        iy = containerAnchors['bag'].y;
      } else if (it.position === 'floor_left') {
        ix = backX + 15;
        iy = backY + backH + 6;
      } else if (it.position === 'floor_right') {
        ix = backX + backW - 15;
        iy = backY + backH + 6;
      } else {
        // Stagger along reachable center ground
        ix = backX + 25 + idx * 30;
        iy = backY + backH + 4;
      }

      drawItemVector(it.type, ix, iy, it.name, it.inReach !== false);
    });

    // 6. Floating Matrix ASCII Glitch Noise Effect (Cyber horror)
    const glitchChars = layout.ascii_glitch_chars || ['#', '@', '$', '%', '0', '1', '&'];
    ctx.font = '8px monospace';
    ctx.fillStyle = dimGreen;
    ctx.shadowBlur = 0;

    const glitchSeed = glitchTick % 7;
    for (let i = 0; i < 7; i++) {
      const gx = ((i * 37 + glitchTick * 11) % (W - 20)) + 10;
      const gy = ((i * 29 + glitchTick * 7) % (H - 30)) + 12;
      const char = glitchChars[(i + glitchSeed) % glitchChars.length];
      ctx.fillText(char, gx, gy);
    }

    // 7. Horizontal CRT Scanline Filter Overlay (Dark lines every 2 pixels)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
    for (let y = 0; y < H; y += 2) {
      ctx.fillRect(0, y, W, 1);
    }

    // 8. Viewfinder corner ticks (Tactical HUD)
    ctx.strokeStyle = darkGreen;
    ctx.lineWidth = 1;
    const tickLen = 6;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(2, 2 + tickLen);
    ctx.lineTo(2, 2);
    ctx.lineTo(2 + tickLen, 2);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(W - 2 - tickLen, 2);
    ctx.lineTo(W - 2, 2);
    ctx.lineTo(W - 2, 2 + tickLen);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(2, H - 2 - tickLen);
    ctx.lineTo(2, H - 2);
    ctx.lineTo(2 + tickLen, H - 2);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(W - 2 - tickLen, H - 2);
    ctx.lineTo(W - 2, H - 2);
    ctx.lineTo(W - 2, H - 2 - tickLen);
    ctx.stroke();
  }, [visualLayout, locationId, glitchTick, lang]);

  const activeObstacle = layout.obstacle || obstacle || null;

  // Compile list of visible items in plain sight (ignoring hidden drawer items)
  const visibleItems = (layout.items || []).filter(
    (it) => it.container !== 'drawer' && !it.position?.includes('drawer') && !(it as any).hidden
  );

  return (
    <div className="relative w-full border border-emerald-500/40 bg-black overflow-hidden shadow-[0_0_12px_rgba(0,255,0,0.15)] mb-2 font-mono">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-2 py-0.5 bg-emerald-950/40 border-b border-emerald-500/30 text-[9px] text-emerald-400">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider">// RENDER BOT v2.0</span>
          <span className="opacity-60 truncate">[{locationId || locationName}]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-emerald-400/80 border border-emerald-500/30 px-1 py-0.2 bg-emerald-950/30 hidden sm:inline-block">
            {visibleItems.length > 0 ? (lang === 'fr' ? `${visibleItems.length} EN VUE` : `${visibleItems.length} IN SIGHT`) : (lang === 'fr' ? 'TIROIR À FOUILLER' : 'DRAWER TO SEARCH')}
          </span>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Toggle blueprint zoom"
            className="text-[8px] px-1 py-0.2 border border-emerald-500/40 hover:bg-emerald-500/20 text-emerald-300"
          >
            {isExpanded ? '[-]' : '[+]'}
          </button>
        </div>
      </div>

      {/* Retro Wireframe Canvas */}
      <div className="relative w-full flex items-center justify-center bg-black">
        <canvas
          ref={canvasRef}
          width={300}
          height={isExpanded ? 190 : 125}
          className="w-full h-auto block select-none"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Tactical Environmental Radar / Containers & Visible Items */}
      <div className="px-2 py-1 bg-emerald-950/30 border-t border-emerald-500/20 text-[9px] flex flex-wrap items-center justify-between gap-1 text-emerald-300">
        <div className="flex items-center gap-1.5 flex-wrap">
          {visibleItems.length > 0 ? (
            <>
              <span className="text-amber-400 font-bold tracking-wider text-[8px]">
                {lang === 'fr' ? '>> EN VUE :' : '>> IN SIGHT :'}
              </span>
              {visibleItems.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 bg-black/80 px-1.5 py-0.5 border border-amber-400/50 rounded-xs text-[8.5px] text-amber-300 shadow-[0_0_6px_rgba(255,204,0,0.2)]"
                >
                  <span className="opacity-60 font-mono text-[7px]">
                    {item.container === 'table' ? '[TABLE]' : '[SOL]'}
                  </span>
                  <span className="font-bold">{item.name}</span>
                </span>
              ))}
            </>
          ) : (
            <span className="text-emerald-500/60 text-[8px]">
              {lang === 'fr' ? '>> AUCUN OBJET POSÉ EN ÉVIDENCE' : '>> NO ITEMS IN PLAIN SIGHT'}
            </span>
          )}
        </div>

        {/* Searchable Containers with unrevealed contents */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className="opacity-50 text-[8px]">// {lang === 'fr' ? 'CONTENANTS :' : 'CONTAINERS :'}</span>
          <span className="bg-black/60 px-1 py-0.2 border border-emerald-500/30 text-[8px] text-emerald-400">
            {lang === 'fr' ? '[TABLE]' : '[TABLE]'}
          </span>
          <span className="bg-black/60 px-1 py-0.2 border border-emerald-500/30 text-[8px] text-emerald-400">
            {lang === 'fr' ? '[TIROIR]' : '[DRAWER]'}
          </span>
          <span className="bg-black/60 px-1 py-0.2 border border-emerald-500/30 text-[8px] text-emerald-400">
            {lang === 'fr' ? '[SAC]' : '[BAG]'}
          </span>
        </div>
      </div>

      {/* Obstacle Text Footer (Zone 1 Bottom) */}
      <div className="px-2 py-1 bg-black/90 border-t border-emerald-500/30 text-[10px] flex items-center justify-between gap-1">
        <span className="text-emerald-400/80 font-bold truncate">
          {activeObstacle ? (
            <span className="text-amber-400 animate-pulse">
              [OBSTACLE: {activeObstacle}]
            </span>
          ) : (
            <span className="text-emerald-500/70">
              {lang === 'fr' ? '[SCAN: PÉRIMÈTRE ÉVALUÉ - VOIE DÉGAGÉE]' : '[SCAN: PERIMETER EVALUATED - PATH CLEAR]'}
            </span>
          )}
        </span>
        <span className="text-[8px] opacity-40 font-mono">VECTOR_SYNC</span>
      </div>
    </div>
  );
};
