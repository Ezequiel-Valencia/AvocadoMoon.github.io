'use client';

/**
 * DisplayZine — equivalent to src/routes/zines/displayZine.svelte
 * Shows the PDF for a given zine using an <object> tag.
 */

import React from 'react';
import Menu from '@/components/common/Menu';
import type { ZineMetaData } from './zine';

interface DisplayZineProps {
  zine: ZineMetaData;
}

export default function DisplayZine({ zine }: DisplayZineProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        textAlign: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Menu email="" songName="" />
      <div
        style={{
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '7%',
          backgroundImage: `url('${zine.redirect}/back.jpg')`,
        }}
      >
        <object
          style={{
            marginTop: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '100vh',
            width: '80vw',
          }}
          type="application/pdf"
          data={zine.pdfPath}
          aria-label="Zine"
        />
      </div>
    </div>
  );
}
