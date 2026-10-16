import React from 'react';

export const CrtOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* CRT Scanline bars */}
      <div className="absolute inset-0 crt-scanlines opacity-75" />

      {/* Screen Vignette & Glass Curvature */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 65%, rgba(0,0,0,0.65) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.85)',
        }}
      />

      {/* Subtle CRT Phosphor Glow Vignette */}
      <div className="absolute inset-0 bg-green-500/2 mix-blend-screen pointer-events-none" />
    </div>
  );
};
