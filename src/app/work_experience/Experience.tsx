'use client';

/**
 * Experience — equivalent to src/routes/work_experience/experience.svelte
 * IntersectionObserver-driven list of work experiences with slide-in animations.
 */

import React, { useEffect, useRef } from 'react';
import { experiences } from './experiences';
import { useAppState } from '@/hooks/useAppState';
import styles from './Experience.module.scss';
import './experience.scss';

const STAR_COUNT = 60;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { music, updateTimeStamp } = useAppState();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Randomise star positions
    const stars = section.querySelectorAll<HTMLElement>(`.${styles.star}`);
    stars.forEach((star) => {
      star.style.top = `${Math.floor(Math.random() * 100)}%`;
      star.style.left = `${Math.floor(Math.random() * 100)}%`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const n = entry.target.id.split('-');
          const targetId = `entry-${n[n.length - 1]}`;
          const exp = section.querySelector<HTMLElement>(`#${targetId}`);
          if (exp) {
            exp.classList.add(styles['in-view']);
          }
        }
      });
    });

    const watchElements = section.querySelectorAll('.watch');
    watchElements.forEach((el) => observer.observe(el));

    // Scroll to #myExperience if the URL includes it
    if (window.location.href.includes('#myExperience')) {
      const url = location.href;
      location.href = url.replace('#myExperience', '#myExperience');
    }

    return () => observer.disconnect();
  }, []);

  const handleExperienceClick = (redirect: string) => {
    if (music) {
      updateTimeStamp(null);
    }
    location.href = redirect;
  };

  return (
    <section ref={sectionRef} id="wrapper-div" className={styles['wrapper-div']}>
      {Array.from({ length: STAR_COUNT }, (_, i) => (
        <div
          key={i}
          className={styles.star}
          style={
            {
              '--fade-time': `${Math.max((i * Math.random()) % 5, 2 + Math.random())}s`,
            } as React.CSSProperties
          }
        />
      ))}

      <h1 id="world" className={styles.world}>
        World
      </h1>
      <h2 id="myExperience">My Work Experience</h2>

      {Object.entries(experiences).map(([key, experience], index) => (
        <div
          key={key}
          id={`entry-spacer-${index}`}
          className={`${styles.spacer} watch`}
        >
          <div
            id={`entry-${index}`}
            className={`${styles['experience-div']} ${
              index % 2 === 0 ? styles.left : styles.right
            }`}
            onMouseDown={() => handleExperienceClick(experience.redirect)}
            aria-controls={`tab-index-${index}`}
            role="tab"
            tabIndex={index}
          >
            <p className={styles['job-time']}>{experience.time}</p>
            <div className={styles['text-div']}>
              <h3 className={`${styles['company-name']} ${styles.text}`}>
                {experience.company}
              </h3>
              <h5 className={`${styles['job-title']} ${styles.text}`}>
                {experience.jobTitle}
              </h5>
              <p className={`${styles['job-description']} ${styles.text}`}>
                {experience.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Hidden helper — ensures in-view, left, right classes are not tree-shaken */}
      <div className={`${styles['in-view']} ${styles.left} ${styles.right} ${styles['in-view-helper']}`} />
    </section>
  );
}
