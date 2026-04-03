'use client';

/**
 * Birthday party invite page — equivalent to src/routes/birthday/ezequiel/24/+page.svelte
 */

import React from 'react';
import Menu from '@/components/common/Menu';

export default function BirthdayPage() {
  return (
    <section
      id="main-div"
      style={{
        backgroundImage: 'url("/birthday/abstract-ocean.jpg")',
        height: 'auto',
        minHeight: '100vh',
        width: '100vw',
        alignItems: 'center',
        top: 0,
        left: 0,
        position: 'absolute',
      }}
    >
      <Menu
        songVolumeLevel={0.3}
        songPath="https://files.catbox.moe/way98y.mp3"
        songName="Zora's Domain - Day (Breath of the Wild)"
      />

      <div
        id="text-div"
        style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.911)',
          maxWidth: '80vw',
          margin: 'auto',
          borderRadius: '5px',
          position: 'relative',
          marginTop: '10%',
          marginBottom: '1%',
          padding: '1%',
        }}
      >
        <h1 style={{ color: 'rgb(0, 0, 0)' }}>
          You&apos;ve been invited to Ezequiel&apos;s 24th birthday party:
        </h1>
        <div style={{ width: '100%', margin: 'auto' }}>
          <img src="/birthday/cat-jumping.gif" alt="cat-jumping" />
          <br />
          <i>*Let&apos;s Go*</i>
          <br />
          <br />
        </div>
        <div style={{ width: '60vw', margin: 'auto', marginBottom: '10%' }}>
          <h2>The Plan:</h2>
          For my birthday I either want to attend the Hartford science center or an aquarium, but
          I&apos;m not sure which one yet. Please help me decide by voting on it in this google
          form.
          <i>
            <h4>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfSjg2SIMJ8Xg16Gh2gmagu_yZ762YdlYyKE1bWGqWKqWok3Q/viewform?usp=dialog"
              >
                The Form
              </a>
            </h4>
          </i>
          The date for either event will be July 19th, Saturday, and more details will be given
          once everyone casts their votes. See you there :)
        </div>
        <audio src="" />
      </div>
    </section>
  );
}
