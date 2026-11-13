<script lang="ts">
  import Tabs from '../../common/tabs.svelte';
  import { projects } from './project_object';
  import { onMount } from 'svelte';
  import { transitionStates } from './common';
  import ScrollDown from '../../common/scroll-down.svelte';

  const projectIterator = Object.entries(projects);
  let activeIndex = $state(0);

  let { transControl } = $props();

  // "<projectIndex>-<techName>" of the technology whose description is showing.
  let activeTech = $state('');
  let showScrollIcon = $state(true);

  let sunAnimation: HTMLElement;
  let projectsWrapper: HTMLElement;

  const icons = [
    ['', 'Full Stack'],
    ['', 'DevOps/IT'],
    ['', 'Cybersecurity'],
    ['', 'Misc. Software'],
  ];

  // Random values are computed once so the clouds don't jump between renders.
  const clouds = Array.from({ length: 7 }, (_, i) => ({
    src: './personal_projects/cloud' + (i % 2) + '.svg',
    left: Math.random() * 30 + i * 10,
    top: Math.random() * 30,
    timeDif: (Math.random() * 2).toFixed(2),
  }));

  // Blank lines in a description separate paragraphs.
  function paragraphs(text: string) {
    return text
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s+/g, ' ').trim())
      .filter((p) => p.length > 0);
  }

  onMount(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    let gradPercent = 0;
    let blackTransparent = 1;

    // Expand black circle to transparent, or immediately show my projects
    if (transControl.read() == transitionStates.transitionToProjects) {
      interval = setInterval(() => {
        if (gradPercent <= 100) {
          sunAnimation.style.setProperty('--grad-size', gradPercent + '%');
          sunAnimation.style.setProperty('--black-transparent', blackTransparent + '');
          blackTransparent -= 0.01;
          gradPercent += 3;
        } else {
          sunAnimation.style.setProperty('--black-transparent', '0');
          sunAnimation.style.zIndex = '-1';
          transControl.updateToTransitioned();
          clearInterval(interval);
        }
      }, 40);
    } else {
      sunAnimation.style.opacity = '0';
      sunAnimation.style.zIndex = '-1';
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        showScrollIcon = !entry.isIntersecting;
      });
    });
    observer.observe(projectsWrapper);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
</svelte:head>

<section>
  <section id="sunny-ocean-intro">
    <div bind:this={sunAnimation} id="sun-animation" aria-hidden="true"></div>
    <div id="headline-text">
      <h1>Personal Projects</h1>
      <p class="subtitle">Revealing an ocean of creativity from my dreams</p>
    </div>
    <div id="sun" aria-hidden="true"></div>
    {#each clouds as cloud, i (i)}
      <img
        class="cloud"
        src={cloud.src}
        alt=""
        style="--left-p: {cloud.left}%; --time-dif: {cloud.timeDif}s; top: {cloud.top}%"
      />
    {/each}

    <div id="ocean" aria-hidden="true">
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(15, 101, 202, 0.8)" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(15, 101, 202, 0.61)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(15, 101, 202, 0.36)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="rgb(46, 68, 112)" />
        </g>
      </svg>
    </div>
  </section>
  <section bind:this={projectsWrapper} id="projects-wrapper">
    {#if $transControl == transitionStates.showPersonalProjects}
      <div class="side-image" aria-hidden="true"></div>
      <div id="project-article">
        <Tabs
          iterable={projectIterator}
          bind:activeIndex
          getTabNameFunction={(e) => {
            return e[0];
          }}
          {icons}
        ></Tabs>
        {#each projectIterator as [key, category], index (index)}
          {#if activeIndex == index}
            <article class="category">
              <h2 class="category-title">{icons[index][1]}</h2>
              <p class="category-description">{key}</p>

              {#each category as project, projectIndex (projectIndex)}
                <section class="project">
                  <h3>{project.name}</h3>
                  <p class="year">{project.year}</p>
                  <ul class="tech-list" aria-label="Technologies used">
                    {#each project.technologies as tech (tech.name)}
                      {@const techId = projectIndex + '-' + tech.name}
                      <li class="tech-holder">
                        <button
                          class="tech-button"
                          aria-expanded={activeTech == techId}
                          aria-describedby={activeTech == techId
                            ? 'description-' + techId
                            : undefined}
                          onpointerenter={() => (activeTech = techId)}
                          onpointerleave={(e) => {
                            if (e.pointerType === 'mouse') activeTech = '';
                          }}
                          onfocus={() => (activeTech = techId)}
                          onblur={() => (activeTech = '')}
                          onclick={() => (activeTech = activeTech == techId ? '' : techId)}
                        >
                          <img class="tech-icon" src={tech.icon} alt={tech.name} loading="lazy" />
                        </button>
                        {#if activeTech == techId}
                          <div id={'description-' + techId} class="description" role="tooltip">
                            <p class="description-name">{tech.name}</p>
                            <p>{tech.description}</p>
                          </div>
                        {/if}
                      </li>
                    {/each}
                  </ul>
                  {#each paragraphs(project.description) as paragraph, p (p)}
                    <p>{paragraph}</p>
                  {/each}
                </section>
              {/each}
            </article>
          {/if}
        {/each}
      </div>
      <div class="side-image" aria-hidden="true"></div>
    {/if}
  </section>
  {#if showScrollIcon}
    <ScrollDown></ScrollDown>
  {/if}
</section>

<style lang="scss">
  @use './projects.scss';

  #headline-text {
    text-align: center;
    padding: 5% 16px 0;
    z-index: 3;
    position: relative;

    h1 {
      font-size: xx-large;
    }
  }

  .subtitle {
    max-width: 50ch;
    margin: auto;
    color: rgb(154, 204, 248);
    font-size: large;
    font-weight: bold;
    text-decoration: underline;
  }

  .cloud {
    position: absolute;
    height: 10vmin;
    opacity: 15%;
    left: var(--left-p);
    animation: swayClouds calc(20s + var(--time-dif)) linear alternate-reverse infinite;
  }

  #sun {
    left: 10%;
    top: 10%;
    border-radius: 50%;
    height: 10vmin;
    width: 10vmin;
    background-color: rgba(255, 166, 0, 0.829);
    position: absolute;
    z-index: 2;
  }

  #sunny-ocean-intro {
    height: 101vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
    background-image: linear-gradient(
      rgb(71, 113, 252),
      rgb(71, 113, 252),
      rgb(71, 113, 252),
      rgb(96, 144, 240)
    );
  }

  #ocean {
    position: absolute;
    top: 1vh;
    width: 100vw;
  }

  #projects-wrapper {
    width: 100%;
    min-height: 100vh;
    height: max-content;
    background-image: linear-gradient(rgb(46, 68, 112), #151f2b);
    display: flex;
  }

  #project-article {
    position: relative;
    flex: 1;
    min-width: 0;
    padding-bottom: 4rem;
  }

  .side-image {
    width: 10vw;
    flex-shrink: 0;
    background-image: url('/personal_projects/animal star blue.png');
    background-repeat: repeat;
    background-size: contain;
  }

  .category {
    margin-left: auto;
    margin-right: auto;
    padding: 0 16px;
    max-width: 1000px;
  }

  .category-title {
    padding-top: 5%;
    border-bottom-style: ridge;
  }

  .category-description {
    color: rgb(154, 204, 248);
    font-size: large;
    font-weight: bold;
  }

  .project {
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(154, 204, 248, 0.2);

    &:last-child {
      border-bottom: none;
    }

    h3 {
      font-size: x-large;
      font-weight: bold;
      margin: 0;
    }

    p {
      line-height: 1.6;
      margin: 0.75rem 0;
    }
  }

  .year {
    color: rgb(112, 188, 255);
    font-style: italic;
    margin-top: 0.25rem !important;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
    padding: 0;
    list-style: none;
  }

  .tech-holder {
    position: relative;
  }

  .tech-button {
    display: block;
    padding: 0;
    border: none;
    background: none;
    cursor: help;

    &:focus-visible {
      outline: 2px solid rgb(154, 204, 248);
      outline-offset: 4px;
    }
  }

  .tech-icon {
    width: 3em;
    height: 3em;
    object-fit: contain;
  }

  .description {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    width: max-content;
    max-width: min(280px, 80vw);
    margin-top: 0.25rem;
    padding: 0.5rem 1rem;
    background-color: rgb(53, 83, 138);
    border: 2px solid rgb(1, 115, 150);
    text-align: center;

    p {
      margin: 0;
      line-height: 1.4;
    }
  }

  .description-name {
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    margin-bottom: 0.25rem !important;
  }

  // Tab colors, scoped to this page so they don't leak onto other channels.
  #project-article :global(.tab) {
    background-color: rgb(8, 63, 88);
    color: white;
  }

  #project-article :global(.tab:hover) {
    background-color: #122269;
  }

  #project-article :global(.selected_tab) {
    background-color: transparent;
    border-bottom: white;
    color: white;
  }

  @media (max-width: 700px) {
    .side-image {
      display: none;
    }
  }
</style>
