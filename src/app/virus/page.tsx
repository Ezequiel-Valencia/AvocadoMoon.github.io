'use client';

/**
 * Virus page — equivalent to src/routes/virus/+page.svelte
 */

import React from 'react';
import { useAppState } from '@/hooks/useAppState';

export default function VirusPage() {
  const { music: musicController } = useAppState();

  return (
    <span
      id="main-div"
      style={{
        position: 'absolute',
        left: '0%',
        top: '0%',
        height: '100%',
        width: '100%',
        backgroundImage: 'url("/virus/house.png")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div style={{ backgroundColor: 'white' }}>
        <h1>Davids Lovely Delight ;)</h1>
        <a href="/virus/FreeFrameRate.zip">Download Me</a>
      </div>

      {musicController && (
        <audio src="https://files.catbox.moe/ll8iaa.mp3" autoPlay loop />
      )}
    </span>
  );
}
