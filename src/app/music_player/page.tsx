'use client';

/**
 * Music Player page — equivalent to src/routes/music_player/+page.svelte
 */

import React from 'react';
import Menu from '@/components/common/Menu';

export default function MusicPlayerPage() {
  return (
    <div id="main-div">
      <Menu
        email="website@worker.slmail.me"
        songName="Zora's Domain - Day (Breath of the Wild)"
      />
    </div>
  );
}
