<script lang="ts">
  import type { WorkExperience } from './experiences';
  import { experiencesSong } from './experiences';
  import { musicController, musicTime } from '../../common/myLocalStorage';
  import { onMount } from 'svelte';

  // A paragraph can end with a link, e.g. pointing to the resume
  export type Paragraph = string | { text: string; linkHref: string; linkText: string };

  interface Props {
    experience: WorkExperience;
    description: Paragraph[];
    imgSrc: string;
    takeaway: string;
  }

  let { experience, description, imgSrc, takeaway }: Props = $props();

  // Dark monochrome icons that need inverting to show up on the black background
  const invertedIcons = ['SQL', 'Coq'];

  function saveMusicTime() {
    if ($musicController) {
      musicTime.updateTimeStamp();
    }
  }

  onMount(() => {
    if ($musicController) {
      musicTime.setAudioTagTime();
    }
  });
</script>

<svelte:head>
  <title>{experience.company} | Work Experience</title>
</svelte:head>

<section id="wrapper">
  <a
    id="return"
    href="/work_experience#myExperience"
    data-sveltekit-reload
    onclick={saveMusicTime}
    aria-label="Return to work experience"
  >
    <span>&#x2190; Return</span>
  </a>

  <article id="text-wrapper-div">
    <h1 class="text">{experience.company}</h1>
    <h2 class="text">{experience.jobTitle}</h2>
    <p class="text time">{experience.time}</p>

    {#if experience.technologies.length > 0}
      <div class="text technologies">
        <h3>Technologies</h3>
        <ul>
          {#each experience.technologies as tech (tech.name)}
            <li class="tech">
              <button type="button" aria-describedby="tip-{tech.name}">
                <img
                  class:inverted={invertedIcons.includes(tech.name)}
                  src={tech.icon}
                  alt={tech.name}
                />
              </button>
              <span class="tooltip" role="tooltip" id="tip-{tech.name}">
                <strong>{tech.name}</strong>
                {tech.description}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <blockquote class="text takeaway">
      <strong>Key Takeaway:</strong>
      {takeaway}
    </blockquote>

    <img class="job-img" src={imgSrc} alt="{experience.company} related" />
    {#each description as paragraph, i (i)}
      {#if typeof paragraph === 'string'}
        <p class="text">{paragraph}</p>
      {:else}
        <p class="text">
          {paragraph.text}
          <a target="_blank" rel="noopener noreferrer" href={paragraph.linkHref}
            >{paragraph.linkText}</a
          >
        </p>
      {/if}
    {/each}
  </article>

  {#if $musicController}
    <audio id="bg-song" src={experiencesSong} autoplay loop></audio>
  {/if}
</section>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
  #wrapper {
    min-height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    display: flex;
    color: white;
  }

  #text-wrapper-div {
    width: 100%;
    max-width: 1080px;
    padding: 2rem 5% 4rem;
    box-sizing: border-box;
  }

  .text {
    max-width: 700px;
    line-height: 1.6;
  }

  h1 {
    font-family: 'Poiret One', cursive;
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 0.25em;
  }

  h2 {
    color: rgb(190, 190, 190);
    font-size: x-large;
    margin: 0;
  }

  .time {
    color: gray;
    margin-top: 0.25em;
  }

  a {
    color: rgb(88, 255, 255);
  }

  a:hover {
    color: rgb(0, 156, 156);
  }

  #return {
    writing-mode: vertical-lr;
    display: flex;
    align-items: flex-start;
    padding: 1.5rem 0.6rem;
    border-right: ridge #535353;
    color: white;
    text-decoration: none;
    font-size: 1.4em;
    font-weight: bold;
    flex-shrink: 0;
  }

  #return:hover,
  #return:focus-visible {
    background: #53535375;
    color: white;
  }

  .technologies h3 {
    color: gray;
    font-size: large;
    margin-bottom: 0.5em;
  }

  .technologies ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tech {
    position: relative;
  }

  .tech button {
    background: none;
    border: none;
    padding: 0;
    cursor: help;
    outline-offset: 4px;
  }

  .tech img {
    height: 2.5em;
    display: block;
  }

  .tech img.inverted {
    filter: invert(1);
  }

  .tooltip {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: min(260px, 80vw);
    z-index: 3;
    padding: 0.5em 0.75em;
    background-color: black;
    border: 1px solid white;
    text-align: center;
    font-size: small;
    transition: opacity 0.15s ease;
  }

  .tooltip strong {
    display: block;
    font-family: 'Times New Roman', Times, serif;
  }

  .tech:hover .tooltip,
  .tech:focus-within .tooltip {
    visibility: visible;
    opacity: 1;
  }

  .takeaway {
    margin: 1.5rem 0;
    padding: 0.5rem 1rem;
    border-left: 3px solid rgb(88, 255, 255);
    color: rgb(200, 200, 200);
  }

  .job-img {
    max-height: 250px;
    max-width: 40%;
    float: right;
    margin: 0 0 1rem 1.5rem;
  }

  @media (max-width: 700px) {
    #wrapper {
      flex-direction: column;
    }

    #return {
      writing-mode: horizontal-tb;
      padding: 1rem;
      border-right: none;
      border-bottom: ridge #535353;
    }

    .job-img {
      float: none;
      display: block;
      max-width: 100%;
      margin: 1rem auto;
    }
  }
</style>
