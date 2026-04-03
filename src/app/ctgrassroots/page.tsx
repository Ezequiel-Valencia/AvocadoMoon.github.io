'use client';

/**
 * CTGrassRoots page — equivalent to src/routes/ctgrassroots/+page.svelte + FAQ.svelte
 * Flowbite <Accordion>/<AccordionItem> is replaced with a native HTML details/summary
 * accordion — same visual behaviour, no external dependency.
 */

import React, { useState } from 'react';
import Menu from '@/components/common/Menu';
import { exp } from './explination';

export default function CTGrassRootsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      style={{
        backgroundImage: "url('/ctgrassroots/back.jpg')",
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: '#087575',
        overflow: 'auto',
      }}
      id="main-div"
    >
      <Menu
        songPath="https://files.catbox.moe/kaznbt.mp3"
        email="website@worker.slmail.me"
        songName="It's Just Begun (2002 Remastered)"
      />

      <div
        id="intro"
        style={{
          height: '50vh',
          width: '100vw',
          textAlign: 'center',
          display: 'flex',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <img
            style={{
              textAlign: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              margin: 'auto',
              width: '30dvh',
              height: 'auto',
            }}
            src="/ctgrassroots/7upup.png"
            alt="Img"
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'black' }}>FAQ:</h1>
      </div>

      {/* FAQ accordion — replaces flowbite-svelte <Accordion> */}
      <article id="accordion">
        {exp.map((panel, index) => (
          <div
            key={index}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '80vw',
              maxWidth: '1000px',
              backgroundColor: 'gray',
              marginBottom: '4px',
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                fontWeight: 'medium',
                textAlign: 'left',
                padding: '1rem',
                border: 'none',
                background: openIndex === index ? '#d1d5db' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <span>{panel.header}</span>
              <span>{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div style={{ padding: '1rem' }}>
                <p
                  style={{ color: 'black' }}
                  dangerouslySetInnerHTML={{ __html: panel.explanation }}
                />
              </div>
            )}
          </div>
        ))}
      </article>
    </div>
  );
}
