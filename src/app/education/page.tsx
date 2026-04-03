'use client';

/**
 * Education page — equivalent to src/routes/education/+page.svelte + intro.svelte + education.svelte
 * Combined into a single page component for simplicity.
 * The Svelte writable store (createBookCheckout) is replaced with useState + localStorage.
 */

import React, { useState, useEffect, useRef } from 'react';
import Menu from '@/components/common/Menu';
import ScrollDown from '@/components/common/ScrollDown';
import { technology_learned, bookCheckoutStore } from './education';
import styles from './Education.module.scss';

export default function EducationPage() {
  const [touchscreen, setTouchscreen] = useState(false);
  const [bookCheckedOut, setBookCheckedOut] = useState(false);
  const [iconIndex, setIconIndex] = useState(-1);
  const [showScrollIcon, setShowScrollIcon] = useState(true);
  const educationContentRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const inMaskRef = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window) setTouchscreen(true);
    bookCheckoutStore.init();
  }, []);

  // ---- Mask gradient effect (education.svelte) ----
  function updateMaskHeight() {
    if (maskRef.current && educationContentRef.current) {
      maskRef.current.style.setProperty(
        '--var-height',
        `${educationContentRef.current.clientHeight}px`
      );
    }
  }

  function moveGradient(e: MouseEvent) {
    const div = e.target as HTMLDivElement;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    maskRef.current?.style.setProperty('--mouse-x', `${x}px`);
    maskRef.current?.style.setProperty('--mouse-y', `${y}px`);
  }

  function hideGradient() {
    maskRef.current?.style.setProperty('--mouse-x', '200%');
    maskRef.current?.style.setProperty('--mouse-y', '200%');
  }

  function displayIconsDescription(e: MouseEvent) {
    if (!maskRef.current) return;
    maskRef.current.style.pointerEvents = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (el !== null && el.classList.contains('tech')) {
      const n = el.id.split('-');
      setIconIndex(Number(n[n.length - 1]));
    } else {
      setIconIndex(-1);
    }
    maskRef.current.style.pointerEvents = 'auto';
  }

  useEffect(() => {
    updateMaskHeight();

    const handleMouseMove = (e: MouseEvent) => {
      if (maskRef.current && bookCheckoutStore.read() && inMaskRef.current) {
        displayIconsDescription(e);
        moveGradient(e);
      } else if (maskRef.current) {
        hideGradient();
      }
    };

    const handleScroll = () => updateMaskHeight();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    const mask = maskRef.current;
    const handleMouseLeave = () => { inMaskRef.current = false; };
    const handleMouseEnter = () => {
      inMaskRef.current = true;
      updateMaskHeight();
    };
    mask?.addEventListener('mouseleave', handleMouseLeave);
    mask?.addEventListener('mouseenter', handleMouseEnter);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setShowScrollIcon(!entry.isIntersecting));
      },
      { threshold: 0.05 }
    );
    const wrapper = document.querySelector<HTMLElement>('#black-over-top');
    if (wrapper) observer.observe(wrapper);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      mask?.removeEventListener('mouseleave', handleMouseLeave);
      mask?.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Intro — book checkout button (intro.svelte) ----
  function checkedOutBook() {
    const next = bookCheckoutStore.toggle();
    setBookCheckedOut(next);
    const main = document.querySelector<HTMLElement>('#main-div');
    if (main) {
      main.style.cursor = next
        ? 'url("/Education/book-cursor.png") 28 23, auto'
        : 'default';
    }
  }

  return (
    <div id="main-div" className={styles['main-div']}>
      {touchscreen && (
        <div id="touch-screen" className={styles['touch-screen']}>
          <h1>Warning:</h1>
          <p style={{ textAlign: 'center' }}>
            This channel is meant to be viewed on a computer with a mouse. The experience on mobile
            may be dysfunctional so please if possible revisit this channel on a computer.
          </p>
          <button onClick={() => setTouchscreen(false)}>Continue</button>
        </div>
      )}

      <Menu
        songVolumeLevel={0.3}
        songPath="https://files.catbox.moe/p5bsgp.mp3"
        songName="Mozart Symphony 40"
      />

      {/* Intro section (intro.svelte) */}
      <section id="intro-div" className={styles['intro-div']} style={{ height: '100vh' }}>
        <div
          style={{
            height: '100vh',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.99))',
          }}
        >
          <div className={styles['content-div']} style={{ top: '25%', marginBottom: '25%' }}>
            <article className={styles['intro-article']}>
              <div>
                <p className={`${styles['intro-text']} ${styles['intro-p']}`} style={{ marginTop: 0, fontSize: '2.5em' }}>
                  &quot;Education is the movement from darkness to light.&quot; – Allan Bloom
                </p>
                <button className={styles.btn} onClick={checkedOutBook}>
                  {bookCheckedOut ? 'Return Book' : 'Checkout Book'}
                </button>
                <br />
                <br />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Education section (education.svelte) */}
      <section id="all-education-content">
        <div id="black-over-top" ref={maskRef} className={styles['black-over-top']} />
        <div ref={educationContentRef} className={styles['education-content']}>
          <article className={styles['education-article']}>
            <div>
              <h3 className={styles.degree}>Bachelors Degree In Cybersecurity</h3>
              <h2 className={styles['edu-h2']}>University of Connecticut</h2>
              <h5 className={styles['edu-h5']}>GPA: 3.77</h5>
              <p className={styles['edu-p']} style={{ margin: '4%' }}>
                Getting my education in Cybersecurity was one of the best decisions I&apos;ve made.
                The subject requires a grasp on all CS subjects for setting a secure enterprise
                system. That is network, OS, hardware, front-end, back-end, and CI/CD security.
                With this knowledge I can both excel in personal projects and in the work field.
              </p>
            </div>
            <img className={styles['institute-img']} src="/Education/UConn.JPG" alt="Statue" />
          </article>

          <article className={styles['education-article']}>
            <img
              className={styles['institute-img']}
              src="https://thesquare.gent/wp-content/uploads/2018/09/large_wIX3ZhzVucOdRFpxCgEU8IA_XviqoYYqm6sjdvaS0dM.jpeg"
              alt="Statue"
            />
            <div>
              <h3 className={styles.degree}>Self Taught Expert</h3>
              <h2 className={styles['edu-h2']}>The Internet</h2>
              <h5 className={styles['edu-h5']}>
                Googling Precision and Accuracy (GPA): 99/100
              </h5>
              <p className={styles['edu-p']} style={{ margin: '4%' }}>
                My degree is simply a preamble to all the learning it&apos;ll continue to do for the
                rest of my life. Constantly self-teaching by finding projects to act as vehicles to
                drive my motivation through rough patches of complicated technologies.
              </p>
              <div style={{ display: 'flex', height: 'auto', flexWrap: 'wrap' }}>
                {technology_learned.map((icon, index) => (
                  <div
                    key={index}
                    id={`holder-${index}`}
                    className={`${styles['image-holder']} tech`}
                  >
                    {index === iconIndex && (
                      <div id={`description-${index}`} className={`${styles['description-holder']} tech`}>
                        <div className={styles.description}>
                          <h3 style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                            {icon.iconName}
                          </h3>
                          <ul style={{ textAlign: 'left', fontFamily: "'Times New Roman', Times, serif" }}>
                            {icon.projects.map((project, pi) => (
                              <li key={pi}>{project}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    <img
                      id={`tech-icon-${index}`}
                      className="tech"
                      style={{ height: '5vmin', width: '5vmin' }}
                      src={icon.icon}
                      alt="Technology Icon"
                    />
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
        {showScrollIcon && <ScrollDown text="Checkout Book and Scroll Down" />}
      </section>
    </div>
  );
}
