'use client';

/**
 * Zines index page — equivalent to src/routes/zines/+page.svelte + zines.svelte
 */

import React, { useState } from 'react';
import Menu from '@/components/common/Menu';
import { zines } from './zine';
import styles from './page.module.scss';

const zinesArray = Object.entries(zines);

export default function ZinesPage() {
  const [hoveredEntity, setHoveredEntity] = useState(-1);

  return (
    <div id="bg" className={styles.bg}>
      <div id="main-div" className={styles['main-div']}>
        <Menu
          songVolumeLevel={0.2}
          songPath="https://files.catbox.moe/0x0xh8.mp3"
          songName="Sonic Unleashed Windmill Isle Night Acid Jazz"
        />
        <div id="gold-border" className={styles['gold-border']}>
          <h1 id="zine-intro" className={styles['zine-intro']}>
            My Zine&apos;s
          </h1>
        </div>

        {/* Zines component (zines.svelte) */}
        <div id="zines" className={styles.zines}>
          {zinesArray.map(([key, zine], index) => (
            <div
              key={key}
              id={zinesArray.length === 1 + index ? 'last-zine' : `zine-${index}`}
              role="tab"
              aria-controls={`tabpanel-${index}`}
              tabIndex={index}
              style={{ display: 'flex', gridRow: 0, gridColumn: index % 1 } as React.CSSProperties}
              className={`${styles['zine-container']} ${
                zinesArray.length === 1 + index ? styles['last-zine'] : ''
              }`}
              onMouseEnter={() => setHoveredEntity(index)}
              onMouseLeave={() => setHoveredEntity(-1)}
              onMouseDown={() => window.open(zine.redirect)}
            >
              {hoveredEntity !== index && (
                <>
                  <img
                    style={{ display: 'flex' }}
                    className={styles['zine-cover']}
                    src={zine.zineCover}
                    alt="Zine Cover"
                  />
                  <p style={{ display: 'flex' }} className={styles.title}>
                    {zine.title}
                  </p>
                </>
              )}
              {hoveredEntity === index && (
                <p className={styles.description}>{zine.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
