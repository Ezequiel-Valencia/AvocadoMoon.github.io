'use client';

/**
 * About Me page — equivalent to src/routes/about_me/+page.svelte
 */

import React, { useEffect, useState } from 'react';
import Menu from '@/components/common/Menu';
import styles from './page.module.scss';
import circleStyles from './circles.module.scss';
import './circles.scss';

function Me() {
  return (
    <div id="intro" className={styles.intro}>
      <h1 id="about-me" className={styles.aboutMe}>About Me</h1>
      <div id="squircle" className={styles.squircle} />
      <article>
        <div id="description" className={styles.description}>
          <p id="description-text" className={styles.descriptionText}>
            I&apos;m a Cybersecurity graduate from UConn class 2023. I apply my knowledge to
            differing fields of computer science, such as bio-informatics, IT, full-end development,
            and of course cybersecurity. Although computer science helps me feel a sense of Ikigai,
            work is not life, so I try to spend my free time exploring life to its fullest.
          </p>
        </div>
      </article>
    </div>
  );
}

type Activity = {
  name: string;
  description: string;
  image: string;
};

const hobbies: { category: string; active: boolean; activity: Activity[] }[] = [
  {
    category: 'Athletic',
    active: true,
    activity: [
      { name: 'Biking', description: 'Was in multiple biking clubs, and used to bike every day. At one point I even tried to form my own small biking unit. Now I try to bike every day, and try to find biking organizations outside of UConn.', image: '/about_me/bike-trip.jpg' },
      { name: 'Rock Climbing', description: 'I love to climb anything such as walls, trees, boulders, and more. I used to frequent climbing gyms, however, due to time constraints my climbing is regulated only to trees.', image: '/about_me/cowboy-climb.jpg' },
      { name: 'Skydiving', description: "I've skydived once, and it'd do it again. At first, when falling to earth at terminal velocity it can be stressful, but after a minute it becomes relaxing due to the beautiful view and weightless feeling.", image: '/about_me/sky-dive.jpg' },
      { name: 'Krav Maga', description: 'For 1.5 years I occasionally attended a Krav Maga self-defense class. The classes were always fun since the knowledge I learned made me feel more capable and diligent. I still enjoy sparing every once and a while with the hope that it\'d start attending lessons again in the future.', image: '/about_me/krav_maga.jpg' },
      { name: 'Weight Lifting', description: "I enjoy weight lifting and pushing the limits of what weights I can exercise with. It's very rewarding since I know my strength gained in the gym lets me do other physical activities with more confidence.", image: '/about_me/weight lift.jpg' },
    ],
  },
  {
    category: 'Art',
    active: false,
    activity: [
      { name: 'Zine', description: 'Attended clubs at UConn focused on making magazines and collages. I love making my magazines, and I still try to make magazines :)', image: '/about_me/Expressionless Cover.png' },
      { name: 'Radio Show', description: 'UConn has a radio station where students can slot an hour to be a DJ. When I still attended the university I found it a lot of fun to have my radio show, talk, and play music.', image: '/about_me/radio-show.jpg' },
      { name: 'Breakdancing', description: "Been breakdancing now for two years, and try to continue break dancing. It's hard to find both time and a place to breakdance, but I still try. In the past, I've won a casual, informal dancing competition, and that was the peak of my dancing :v.", image: '/about_me/bboy.jpg' },
      { name: 'Swing dancing', description: 'Before I did breakdancing, I spent six months or so dancing to jazz music and enjoyed it, although I found it difficult due to its structured nature.', image: '/about_me/swing-dancing.jpg' },
      { name: 'Saxophone', description: "Played saxophone since elementary school and enjoy it. I don't play as much as I used to.", image: '/about_me/sax.jpg' },
    ],
  },
  {
    category: 'Environment/Agriculture',
    active: false,
    activity: [
      { name: 'Wood Cutting', description: 'I have been helping my father cut wood for my fireplace since I was a child. I spent summers arriving at sites where large trees had recently been cut, taking the rolls of lumber into my family truck, and cutting them in my backyard to *cut* the electric bill in the winter. Continuing the tradition as my father grows older.', image: '/about_me/wood-cutting.webp' },
      { name: 'Hiking/Camping', description: "My first backpacking trip was at the age of 12 when I decided to hike 50 miles in one week with my scout troop, carrying a 30-pound pack—one-third of my body weight. On the first day, half of my fellow Boy Scouts left early, I rolled my ankle, and by day two, the trip was canceled. Despite this less-than-stellar first experience, I still enjoy camping and hiking today—though in moderation and with significantly more preparation.", image: '/about_me/camping.webp' },
      { name: 'Beekeeping', description: "For a year I was attending bee club, just learning the theory of beekeeping, then in the last month I attended, I finally kept some bees. I love bees, and managing them is rewarding, but it takes too much time for me right now so I don't do it for now.", image: '/about_me/bees.jpg' },
      { name: 'Eco Husky', description: "An organization at UConn that promotes green activities in life and for the campus to be more green. I still try to support organizations that try to make the world a more environmentally friendly place now that I've graduated college.", image: '/about_me/eco.jpg' },
    ],
  },
];

function Hobbies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const icons: [string, string][] = [
    ['material-symbols-outlined', 'fitness_center'],
    ['material-symbols-outlined', 'brush'],
    ['material-symbols-outlined', 'forest'],
  ];

  return (
    <section id="hobbies" className={styles.hobbies}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <u style={{ color: 'white' }}>
        <i>
          <h2 style={{ textAlign: 'center', color: 'white', fontFamily: "'Times New Roman', Times, serif", fontSize: 'xx-large' }}>
            Hobbies<br />
          </h2>
        </i>
      </u>

      {/* Tab navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0 }}>
        {hobbies.map((hob, i) => (
          <button
            key={hob.category}
            onClick={() => setActiveIndex(i)}
            className={`button inline-block p-5 border-b-2 rounded-t-lg ${activeIndex === i ? 'selected_tab' : 'tab'}`}
            style={{ fontSize: '5vmin' }}
          >
            <span className={`icon ${icons[i]?.[0] ?? ''}`}>{icons[i]?.[1] ?? ''}</span>
          </button>
        ))}
      </div>

      {hobbies.map((hob, index) =>
        activeIndex === index ? (
          <div key={hob.category} id={hob.category} className={styles.category}>
            {hob.activity.map((activity) => (
              <div key={activity.name} id={activity.name} className={styles.activity}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h3>{activity.name}</h3>
                        <p id={`${activity.name}-description`} className={styles.activityDescription}>
                          {activity.description}
                        </p>
                      </td>
                      <td>
                        <img
                          src={activity.image}
                          alt="activity"
                          className={styles.activityImage}
                          id={`${activity.name}-image`}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ) : null,
      )}
    </section>
  );
}

export default function AboutMePage() {
  const [touchscreen, setTouchscreen] = useState(false);

  useEffect(() => {
    setTouchscreen('ontouchstart' in window);

    const interBubble = document.querySelector<HTMLDivElement>('[class*="interactive"]');
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble!.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    const onMouseMove = (event: MouseEvent) => {
      tgX = event.pageX;
      tgY = event.pageY;
    };

    document.addEventListener('mousemove', onMouseMove);
    move();

    return () => document.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section id="main-div" className={styles.mainDiv}>
      {/* SVG filter for goo effect */}
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={circleStyles.gradientsContainer}>
        <div className={circleStyles.g3} />
        <div className={circleStyles.g4} />
        <div className={circleStyles.g5} />
        {!touchscreen && <div className={circleStyles.interactive} />}
      </div>

      <Menu
        songVolumeLevel={0.4}
        songPath="https://files.catbox.moe/ll8iaa.mp3"
        songName="Samurai Champloo Aruarian Dance"
      />
      <Me />
      <Hobbies />
    </section>
  );
}
