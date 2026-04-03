'use client';

/**
 * Care Package page — equivalent to src/routes/care_package/+page.svelte
 */

import React from 'react';

export default function CarePackagePage() {
  return (
    <section
      id="main-div"
      style={{
        backgroundImage: "url('/Backgrounds/stars.jpg')",
        height: 'auto',
        minHeight: '100vh',
        width: '100vw',
        alignItems: 'center',
        top: 0,
        left: 0,
        position: 'absolute',
      }}
    >
      <div
        id="text-div"
        style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.911)',
          maxWidth: '80vw',
          margin: 'auto',
          borderRadius: '5px',
          position: 'relative',
          marginTop: '1%',
          marginBottom: '1%',
          padding: '1%',
        }}
      >
        <h1 style={{ color: 'rgb(0, 0, 0)' }}>Hidden amongst the stars:</h1>
        <div style={{ width: '20vw', margin: 'auto' }}>
          <ul
            style={{
              textAlign: 'center',
              paddingLeft: 0,
            }}
          >
            {[
              { href: 'https://youtu.be/ovW7yRi1iJ8', label: 'Cat music video' },
              {
                href: 'https://www.instagram.com/reel/DEuCV38uB7h/?igsh=a2w3M3M3ZWo0aW1h',
                label: 'Cat Edit',
              },
              { href: 'https://kry.pt/', label: 'Terminal Site' },
              { href: 'https://juneish.neocities.org/', label: 'Strange world' },
              { href: 'https://youtu.be/ET2JmjbjE68', label: 'Ambient Music Mix :)' },
              { href: 'https://youtu.be/Nrk8sqZfsgI', label: 'How to pronounce GIF' },
              {
                href: 'https://scottts.itch.io/different-strokes',
                label: 'Interactive art gallery',
              },
              {
                href: 'https://cosmicadventuresquad.itch.io/it-was-all-for-the-tuna',
                label: 'Fisherman',
              },
              { href: 'https://anaissalla.itch.io/nomnom', label: 'Animal Chef Jam :0' },
              {
                href: 'https://rewindgames.itch.io/tanuki-sunset',
                label: 'Racoon tricks',
              },
              { href: 'https://youtu.be/WSbUPaLTTUg', label: 'The sun is pretty.' },
              {
                href: 'https://en.wikipedia.org/wiki/Kiki%27s_Delivery_Service',
                label: 'Flying animation',
              },
              { href: 'https://neal.fun/', label: 'Interesting Games' },
            ].map(({ href, label }, i) => (
              <li
                key={i}
                style={{
                  textIndent: '-5%',
                  paddingTop: '2vh',
                  paddingBottom: '2vh',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Moon bullet image — replicated from the original ul li::before */}
                <span
                  style={{
                    display: 'block',
                    width: '20px',
                    height: '20px',
                    backgroundImage: "url('/personal_projects/moon.svg')",
                    backgroundSize: 'cover',
                    marginRight: '15px',
                    flexShrink: 0,
                  }}
                />
                <a href={href} style={{ color: 'rgb(0, 0, 0)' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
