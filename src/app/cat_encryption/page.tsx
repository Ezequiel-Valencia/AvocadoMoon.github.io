'use client';

/**
 * Cat Encryption page — equivalent to src/routes/cat_encryption/+page.svelte
 * Matrix background canvas + tabbed Encode/Decode interface.
 */

import React, { useState, useEffect } from 'react';
import Menu from '@/components/common/Menu';
import Tabs from '@/components/common/Tabs';
import Encode from './Encode';
import Decode from './Decode';
import { matrixDisplay } from './matrixBG';
import { importSCSSOptions } from '@/lib/globals';
import styles from './CatEncryption.module.scss';
import './cat-encryption.scss';

const imageOptions = ['Encode Cat', 'Decode Cat'];
const imageOptionsEntries = Object.entries(imageOptions);

export default function CatEncryptionPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    matrixDisplay();
  }, []);

  return (
    <div id="main-div" className={styles['main-div']}>
      <Menu
        songVolumeLevel={0.3}
        songPath="https://files.catbox.moe/uc8nho.mp3"
        songName="Intense - Only You (Cat Breakdance Section)"
      />

      <div id="title">
        <h1 id="title-text" className={styles.text}>
          Cat Communication
        </h1>
        <p className={styles.text}>
          Hiding your message in cat images using{' '}
          <a style={{ color: 'cadetblue' }} href="https://en.wikipedia.org/wiki/Steganography">
            Stenography
          </a>
          .
        </p>
      </div>

      <canvas id="matrixCanvas" />

      <article id="content">
        <Tabs
          iterable={imageOptionsEntries}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tabSCSSFileLocation={importSCSSOptions.cat_encryption}
          getTabNameFunction={(e) => e[1]}
        />
        {activeIndex === 0 ? <Encode /> : <Decode />}
      </article>
    </div>
  );
}
