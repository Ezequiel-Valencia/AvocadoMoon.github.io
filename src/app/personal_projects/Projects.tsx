'use client';

/**
 * Projects — equivalent to src/routes/personal_projects/projects.svelte
 * Sunny ocean intro + tabbed personal projects list.
 * transControl state is passed in via props instead of a Svelte store.
 */

import React, { useState, useEffect, useRef } from 'react';
import Tabs from '@/components/common/Tabs';
import ScrollDown from '@/components/common/ScrollDown';
import { projects } from './project_object';
import { importSCSSOptions } from '@/lib/globals';
import styles from './Projects.module.scss';
import './projects.scss';

const TRANSITION_STATES = {
  stillInDream: 'stillInDream',
  transitionToProjects: 'transitionToProjects',
  showPersonalProjects: 'showPersonalProjects',
} as const;

type TransitionState = (typeof TRANSITION_STATES)[keyof typeof TRANSITION_STATES];

interface ProjectsProps {
  transitionState: TransitionState;
  onTransitioned: () => void;
}

const projectIterator = Object.entries(projects);
const icons: [string, string][] = [
  ['', 'Full Stack'],
  ['', 'DevOp/IT'],
  ['', 'CyberSecurity'],
  ['', 'Misc. Software'],
];

export default function Projects({ transitionState, onTransitioned }: ProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [techHovered, setTechHovered] = useState('');
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  // Stable cloud left positions to avoid re-render flicker
  const cloudData = useRef(
    Array.from({ length: 7 }, (_, i) => ({
      left: `${Math.random() * 30 + i * 10}%`,
      top: `${Math.random() * 30}%`,
    }))
  );

  useEffect(() => {
    // Randomise cloud sway time offsets
    const clouds = document.querySelectorAll<HTMLElement>('.cloud');
    clouds.forEach((c) => {
      c.style.setProperty('--time-dif', `${Math.floor(Math.random() * 1)}s`);
    });

    const bGradient = document.querySelector<HTMLElement>('#sun-animation');
    if (!bGradient) return;

    let gradPercent = 0;
    let blackTransparent = 1;

    if (transitionState === TRANSITION_STATES.transitionToProjects) {
      const interval = setInterval(() => {
        if (gradPercent <= 100) {
          bGradient.style.setProperty('--grad-size', `${gradPercent}%`);
          bGradient.style.setProperty('--black-transparent', `${blackTransparent}`);
          blackTransparent -= 0.01;
          gradPercent += 3;
        } else {
          bGradient.style.setProperty('--black-transparent', '0');
          bGradient.style.zIndex = '-1';
          onTransitioned();
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      bGradient.style.opacity = '0';
      bGradient.style.zIndex = '-1';
    }
  }, [transitionState, onTransitioned]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el !== null && el.classList.contains('tech')) {
        const n = el.id.split('-');
        setTechHovered(n[1]);
      } else {
        setTechHovered('');
      }
    };
    document.addEventListener('pointermove', handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useEffect(() => {
    const projectsWrapper = document.querySelector<HTMLElement>('#projects-wrapper');
    if (!projectsWrapper) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setShowScrollIcon(!entry.isIntersecting);
      });
    });
    observer.observe(projectsWrapper);
    return () => observer.disconnect();
  }, []);

  const showProjects = transitionState === TRANSITION_STATES.showPersonalProjects;

  return (
    <section>
      <section id="sunny-ocean-intro">
        <div id="sun-animation" />
        <div
          id="headline-text"
          style={{ textAlign: 'center', paddingTop: '5%', zIndex: 3, position: 'relative' }}
        >
          <h1 style={{ fontSize: 'xx-large' }}>Personal Projects</h1>
          <u style={{ color: 'rgb(154, 204, 248)' }}>
            <h3 style={{ maxWidth: '50%', margin: 'auto' }}>
              Revealing an ocean of creativity from my dreams
            </h3>
          </u>
        </div>
        <div id="sun" />
        {cloudData.current.map((c, i) => (
          <img
            key={i}
            className="cloud"
            src={`./personal_projects/cloud${i % 2}.svg`}
            alt={`cloud${i}`}
            style={
              {
                '--left-p': c.left,
                top: c.top,
              } as React.CSSProperties
            }
          />
        ))}

        <div id="ocean" style={{ position: 'absolute', top: '1vh', width: '100vw' }}>
          <svg
            className={styles.waves}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(15, 101, 202, 0.8)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(15, 101, 202, 0.61)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(15, 101, 202, 0.36)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(46, 68, 112)" />
            </g>
          </svg>
        </div>
      </section>

      <section id="projects-wrapper">
        {showProjects && (
          <>
            <div className={styles['side-image']} />
            <div id="project-article">
              <Tabs
                iterable={projectIterator}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                tabSCSSFileLocation={importSCSSOptions.personal_projects}
                getTabNameFunction={(e) => e[0]}
                icons={icons}
              />
              {projectIterator.map(([key, category], index) =>
                activeIndex === index ? (
                  <article key={key} className={styles.category}>
                    <h2 className={styles['category-title']}>
                      {icons[index][1]} Description:{' '}
                    </h2>
                    <h3>{key}</h3>
                    {category.map((project, projectIndex) => (
                      <div key={projectIndex} className={styles.project}>
                        <h3>{project.name}</h3>
                        <h5 style={{ marginBottom: '0%' }}>{project.year}</h5>
                        <h5 style={{ marginTop: '0%' }}>
                          Technologies:{' '}
                          {project.technologies.map((tech, ti) => (
                            <span
                              key={ti}
                              id={`description-${tech.name}${projectIndex}`}
                              className={`${styles['description-holder']} tech`}
                            >
                              {`${tech.name}${projectIndex}` === techHovered && (
                                <div className={styles.description} style={{ zIndex: 3 }}>
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
                                id={`img-${tech.name}${projectIndex}`}
                                className="tech"
                                style={{ height: '3em', position: 'static' }}
                                src={tech.icon}
                                alt={tech.name}
                              />
                            </span>
                          ))}
                        </h5>
                        <p>{project.description}</p>
                      </div>
                    ))}
                  </article>
                ) : null
              )}
            </div>
            <div className={styles['side-image']} />
          </>
        )}
      </section>

      {showScrollIcon && <ScrollDown />}
    </section>
  );
}
