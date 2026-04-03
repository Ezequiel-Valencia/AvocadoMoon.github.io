'use client';

/**
 * Explayout — equivalent to src/routes/work_experience/explayout.svelte
 * Individual experience detail page layout shared by all five experience pages.
 */

import React, { useState, useEffect } from 'react';
import type { WorkExperience } from './experiences';
import { experiencesSong } from './experiences';
import { useAppState } from '@/hooks/useAppState';
import { resumeURL } from '@/lib/globals';
import styles from './Explayout.module.scss';
import './explayout.scss';

interface ExplayoutProps {
  experience: WorkExperience;
  description: string[];
  imgSrc: string;
  takeaway: string;
}

export default function Explayout({
  experience,
  description,
  imgSrc,
  takeaway,
}: ExplayoutProps) {
  const { music, setAudioTagTime, updateTimeStamp } = useAppState();
  const [hoveredTech, setHoveredTech] = useState('');

  useEffect(() => {
    if (music) {
      setAudioTagTime(null);
    }

    const handlePointerMove = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el !== null && el.classList.contains('tech')) {
        const n = el.id.split('-');
        setHoveredTech(n[1]);
      } else {
        setHoveredTech('');
      }
    };

    document.addEventListener('pointermove', handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturn = () => {
    if (music) {
      updateTimeStamp(null);
    }
    location.href = '/work_experience#myExperience';
  };

  return (
    <section id="wrapper" className={styles.wrapper}>
      <button onClick={handleReturn}>
        <nav>
          <h2>Return</h2>
        </nav>
      </button>

      <div id="right-wrapper" className={styles['right-wrapper']}>
        <div id="text-wrapper-div" className={styles['text-wrapper-div']}>
          <h1 className={styles.text}>{experience.company}</h1>
          <h2 className={styles.text}>{experience.jobTitle}</h2>
          <h2 className={styles.text}>
            Technologies:{' '}
            {experience.technologies.map((tech, index) => (
              <span
                key={index}
                id={`description-${tech.name}`}
                className={`${styles['description-holder']} tech`}
              >
                {tech.name === hoveredTech && (
                  <div
                    className={styles.description}
                    style={tech.name === 'SQL' ? { marginTop: '5vh' } : undefined}
                  >
                    <h3
                      style={{
                        textAlign: 'center',
                        fontFamily: "'Times New Roman', Times, serif",
                      }}
                    >
                      {tech.name}
                    </h3>
                    <p style={{ textAlign: 'center' }}>{tech.description}</p>
                  </div>
                )}
                <img
                  id={`img-${tech.name}`}
                  className={`${styles.tech} tech`}
                  style={{
                    filter:
                      tech.name === 'SQL' || tech.name === 'Coq'
                        ? 'invert(1)'
                        : undefined,
                  }}
                  src={tech.icon}
                  alt={tech.name}
                />
              </span>
            ))}
          </h2>
          <h3 className={styles.text}>{experience.time}</h3>
          <h5 className={styles.text}>Key Takeaway: {takeaway}</h5>
          <img className={styles['job-img']} src={imgSrc} alt="Work Related" />
          {description.map((paragraph, i) => (
            <p key={i} className={styles.text}>
              {paragraph}
              {/* Inline resume link for the CCAM paragraph */}
              {paragraph.includes('With this mindset') && (
                <a target="_blank" href={resumeURL} rel="noreferrer">
                  resume.
                </a>
              )}
            </p>
          ))}
        </div>
      </div>

      {music && (
        <audio id="bg-song" src={experiencesSong} autoPlay loop />
      )}
    </section>
  );
}
