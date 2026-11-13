<script lang="ts">
  import { experiences } from './experiences';
  import { musicTime, musicController } from '../../common/myLocalStorage';
  import { onMount } from 'svelte';

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let n = entry.target.id.split('-');
          let r = '#entry-' + n[n.length - 1];
          let exp: HTMLElement | null = document.querySelector(r);
          exp?.classList.add('in-view');
        }
      });
    });
    let stars = document.querySelectorAll('.star') as NodeListOf<HTMLElement>;
    stars.forEach((star) => {
      star.style.top = '' + Math.floor(Math.random() * 100) + '%';
      star.style.left = '' + Math.floor(Math.random() * 100) + '%';
    });

    // Get all the elements with the .animate class applied
    const allElementsToAnimate = document.querySelectorAll('.watch');
    allElementsToAnimate.forEach((element) => {
      observer.observe(element);
    });

    // Wait until all items are loaded in the DOM, then apply the anchor
    if (window.location.href.includes('#myExperience')) {
      location.href = '#myExperience';
    }

    return () => observer.disconnect();
  });
</script>

<section style="" id="wrapper-div">
  {#each { length: 60 } as _, i (i)}
    <div
      style="--fade-time: {Math.max((i * Math.random()) % 5, 2 + Math.random())}s;"
      class="star"
    ></div>
  {/each}
  <h1 id="world">World</h1>
  <h2 id="myExperience">My Work Experience</h2>
  {#each Object.entries(experiences) as [, experience], index (index)}
    <div id={'entry-spacer-' + index} class="spacer watch">
      <a
        id={'entry-' + index}
        class={index % 2 == 0 ? 'experience-div left' : 'experience-div right'}
        href={experience.redirect}
        data-sveltekit-reload
        onclick={() => {
          if ($musicController) {
            musicTime.updateTimeStamp();
          }
        }}
      >
        <p class="job-time">{experience.time}</p>
        <div class="text-div">
          <h3 class="company-name text">{experience.company}</h3>
          <p class="job-title text">{experience.jobTitle}</p>
          <p class="job-description text">{experience.description}</p>
          <span class="read-more text">Read more &#x2192;</span>
        </div>
      </a>
    </div>
  {/each}
  <!-- Implemented so that in-view, right, and left class gets compiled -->
  <div class="in-view left right"></div>
</section>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
  #wrapper-div {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: black;
    width: 100vw;
    text-align: center;
    overflow-x: hidden;
  }

  #world {
    font-family: 'Poiret One', cursive;
    color: white;
    padding-bottom: 50%;
    font-size: 500%;
  }

  h2 {
    color: white;
  }
  .spacer {
    padding: 5%;
  }

  .text-div {
    text-align: center;
    width: 100%;
  }

  .text {
    $margin-percent: 10%;
    color: white;
    margin-left: $margin-percent;
    margin-right: $margin-percent;
  }

  .job-time {
    color: white;
    writing-mode: vertical-lr;
  }

  @keyframes rightToLeft {
    from {
      right: 100%;
      opacity: 0%;
    }
    to {
      right: 0%;
    }
  }

  @keyframes leftToRight {
    from {
      left: 100%;
      opacity: 0%;
    }
    to {
      left: 0%;
    }
  }

  .experience-div {
    text-decoration: none;
    color: inherit;
    margin: auto;
    padding: 2%;
    border-style: dotted;
    border-color: rgb(150, 150, 150);
    width: 80vw;
    display: flex;
    max-width: 1000px;
    right: 100%;
    position: relative;
    background-color: black;
    z-index: 2;
  }

  .experience-div:hover,
  .experience-div:focus-visible {
    background-color: #2e2e2e;
    cursor: pointer;
  }

  .experience-div:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
  }

  .job-title {
    font-weight: bold;
    color: rgb(190, 190, 190);
  }

  .read-more {
    display: block;
    margin-top: 1em;
    color: rgb(88, 255, 255);
    font-size: small;
  }

  @media (max-width: 600px) {
    .experience-div {
      width: 92vw;
      flex-direction: column;
    }

    .job-time {
      writing-mode: horizontal-tb;
      margin: 0 0 0.5em;
    }

    .text {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .star {
      animation: none;
    }

    .in-view.left,
    .in-view.right {
      animation-duration: 0.01s;
    }
  }

  .in-view.left {
    animation: rightToLeft 2.5s ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .in-view.right {
    animation: leftToRight 2.5s ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .star {
    --fade-time: 2s;
    width: 0.3em;
    height: 0.3em;
    background-color: white;
    z-index: 1;
    border-radius: 50%;
    position: absolute;
    animation: fadeInAndOut var(--fade-time) infinite alternate;
  }

  @keyframes fadeInAndOut {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
