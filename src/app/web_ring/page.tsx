'use client';

/**
 * Web Ring page — equivalent to src/routes/web_ring/+page.svelte + websites.svelte
 */

import React, { useState } from 'react';
import Menu from '@/components/common/Menu';
import Tabs from '@/components/common/Tabs';
import { webRing } from './WebsInRing';
import { importSCSSOptions } from '@/lib/globals';
import styles from './page.module.scss';

const webRingIterable = Object.entries(webRing);
const icons: [string, string][] = [
  ['material-symbols-outlined', 'construction'],
  ['material-symbols-outlined', 'palette'],
];

export default function WebRingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ height: 'auto' }} id="main-div" className={styles['main-div']}>
      <Menu
        songVolumeLevel={0.3}
        songPath="https://files.catbox.moe/lgaw6k.mp3"
        songName="Anodyne 2 - Center City Cenote"
      />

      <div style={{ height: 'auto', minHeight: '100vh', textAlign: 'center', margin: 'auto' }}>
        <img id="anim" className={styles.anim} src="/web_ring/zekeanimsmall.gif" alt="Web ring" />
        <div
          style={{
            display: 'flex',
            margin: 'auto',
            textAlign: 'center',
            width: 'fit-content',
            height: 'auto',
          }}
        >
          <img style={{ height: '10vh' }} src="/web_ring/www.gif" alt="WWW" />
          <h2 className={styles['page-h2']} style={{ fontSize: '5vmin' }}>
            Portal for Interesting Websites
          </h2>
          <img
            style={{ height: '10vh' }}
            src="/web_ring/computer_surfing.gif"
            alt="Computer Surfing"
          />
        </div>
      </div>

      {/* Websites component (websites.svelte) */}
      <article style={{ textAlign: 'center', height: 'auto' }}>
        <Tabs
          iterable={webRingIterable}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          tabSCSSFileLocation={importSCSSOptions.web_ring}
          getTabNameFunction={(e) => e[0]}
          icons={icons}
        />

        {webRingIterable.map(([key, webList], index) =>
          activeIndex === index ? (
            <div key={key}>
              <div style={{ paddingBottom: '5vh' }}>
                <div
                  style={{
                    width: '35vw',
                    margin: 'auto',
                    borderBottomStyle: 'solid',
                    borderBottomColor: 'white',
                  }}
                >
                  <h3 className={styles['web-h3']} style={{ fontSize: '4vmin' }}>
                    {key}
                  </h3>
                </div>
              </div>

              {webList.map((web, wi) => (
                <div key={wi} style={{ textAlign: 'center', paddingBottom: '5%', height: 'auto' }}>
                  <div
                    className={styles['content-div']}
                    onMouseDown={() => window.open(web.url, '_blank')}
                    role="tab"
                    aria-controls={`tabpanel-${wi}`}
                    tabIndex={wi}
                  >
                    <div
                      style={{
                        paddingLeft: '2vw',
                        paddingRight: '2vw',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                      }}
                    >
                      <img
                        className={styles['web-image']}
                        src={web.imgLocation}
                        alt="Website Cover"
                      />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <h2 className={styles['web-h2']} style={{ fontSize: '3.5vmin', paddingRight: '2vw' }}>
                        {web.webTitle}
                      </h2>
                      <h5 className={styles['web-h5']} style={{ fontSize: '2.7vmin', paddingRight: '2vw' }}>
                        {web.description}
                      </h5>
                      <p className={styles['web-p']} style={{ fontSize: '2.5vmin', paddingRight: '2vw' }}>
                        Thoughts: {web.opinion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null
        )}
      </article>
    </div>
  );
}
