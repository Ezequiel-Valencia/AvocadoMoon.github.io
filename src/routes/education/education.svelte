<script lang="ts">
  import { onMount } from 'svelte';
  import { technology_learned } from './education';
  import ScrollDown from '../../common/scroll-down.svelte';

  interface Props {
    bookCheckedOut: boolean;
  }

  let { bookCheckedOut }: Props = $props();

  let mask: HTMLElement;
  let iconIndex = $state(-1);
  let showScrollIcon = $state(true);

  function setLight(clientX: number, clientY: number) {
    const rect = mask.getBoundingClientRect();
    mask.style.setProperty('--mouse-x', clientX - rect.left + 'px');
    mask.style.setProperty('--mouse-y', clientY - rect.top + 'px');
  }

  function hideLight() {
    mask.style.setProperty('--mouse-x', '200%');
    mask.style.setProperty('--mouse-y', '200%');
  }

  // Mouse movement, and taps on touch screens, move the light.
  function onPointer(e: PointerEvent) {
    if (bookCheckedOut) {
      setLight(e.clientX, e.clientY);
    }
  }

  // Keyboard users get the light centered on whatever they focus.
  function onFocusIn(e: FocusEvent) {
    if (!bookCheckedOut) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setLight(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  $effect(() => {
    if (!bookCheckedOut) {
      hideLight();
      iconIndex = -1;
    }
  });

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          showScrollIcon = !entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(mask);
    return () => observer.disconnect();
  });
</script>

<!-- The pointer handlers only move a visual effect; focusin gives keyboard users the same light. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  id="all-education-content"
  onpointermove={onPointer}
  onpointerdown={onPointer}
  onpointerleave={(e) => {
    if (e.pointerType === 'mouse') hideLight();
  }}
  onfocusin={onFocusIn}
>
  <div bind:this={mask} id="black-over-top" class="black-over-top" aria-hidden="true"></div>
  <div class="education-content">
    <article class="education-article">
      <div class="article-text">
        <p class="degree">Bachelor's Degree in Cybersecurity</p>
        <h2 class="institution">University of Connecticut</h2>
        <p class="gpa">GPA: 3.77</p>
        <p>
          Getting my education in Cybersecurity was one of the best decisions I've made. The subject
          requires a grasp on all CS subjects for setting up a secure enterprise system. That is
          network, OS, hardware, front-end, back-end, and CI/CD security. With this knowledge I can
          excel both in personal projects and in the work field.
        </p>
      </div>
      <img
        class="institute-img"
        src="/Education/UConn.JPG"
        alt="Statue at the University of Connecticut"
        loading="lazy"
      />
    </article>
    <article class="education-article">
      <img
        class="institute-img"
        src="https://thesquare.gent/wp-content/uploads/2018/09/large_wIX3ZhzVucOdRFpxCgEU8IA_XviqoYYqm6sjdvaS0dM.jpeg"
        alt="Statue"
        loading="lazy"
      />
      <div class="article-text">
        <p class="degree">Self Taught Expert</p>
        <h2 class="institution">The Internet</h2>
        <p class="gpa">Googling Precision and Accuracy (GPA): 99/100</p>
        <p>
          My degree is simply a preamble to all the learning I'll continue to do for the rest of my
          life. I'm constantly self-teaching by finding projects to act as vehicles to drive my
          motivation through rough patches of complicated technologies.
        </p>
        <ul class="tech-list" aria-label="Technologies I've learned">
          {#each technology_learned as tech, index (index)}
            <li class="image-holder">
              <button
                class="tech-button"
                aria-expanded={iconIndex == index}
                aria-describedby={iconIndex == index ? 'description-' + index : undefined}
                onpointerenter={() => (iconIndex = index)}
                onpointerleave={(e) => {
                  if (e.pointerType === 'mouse') iconIndex = -1;
                }}
                onfocus={() => (iconIndex = index)}
                onblur={() => (iconIndex = -1)}
                onclick={() => (iconIndex = iconIndex == index ? -1 : index)}
              >
                <img class="tech-icon" src={tech.icon} alt={tech.iconName} />
              </button>
              {#if iconIndex == index}
                <div id={'description-' + index} class="description" role="tooltip">
                  <h3>{tech.iconName}</h3>
                  <ul>
                    {#each tech.projects as project (project)}
                      <li>{project}</li>
                    {/each}
                  </ul>
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </article>
  </div>
  {#if showScrollIcon}
    <ScrollDown text="Checkout Book and Scroll Down"></ScrollDown>
  {/if}
</section>

<style lang="scss">
  #all-education-content {
    position: relative;
    text-align: center;
    color: white;
  }

  .black-over-top {
    --mouse-x: 200%;
    --mouse-y: 200%;
    position: absolute;
    inset: 0;
    z-index: 2;
    background-color: black;
    pointer-events: none;
    mask-image: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0) 2vmax,
      rgb(255, 255, 255) 40vmax
    );
  }

  .education-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10vh 16px;
  }

  .education-article {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding-top: 10vh;
  }

  .article-text {
    flex: 1;
    min-width: 0;

    p {
      margin: 1rem 4%;
      font-size: clamp(1rem, 2.2vmin, 1.2rem);
      line-height: 1.6;
    }
  }

  .degree {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(1.6rem, 4vmin, 2.25rem) !important;
    margin-bottom: 0 !important;
  }

  .institution {
    margin: 0.25rem 0;
    font-size: clamp(1.3rem, 3vmin, 1.75rem);
    font-weight: bold;
  }

  .gpa {
    margin-top: 0 !important;
    font-weight: bold;
  }

  .institute-img {
    flex-shrink: 0;
    max-height: 45vh;
    max-width: 35vw;
    border: 2px solid white;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .image-holder {
    position: relative;
    padding: 2vmin;
  }

  .tech-button {
    display: block;
    padding: 0;
    border: none;
    background: none;
    cursor: inherit;

    &:focus-visible {
      outline: 2px solid goldenrod;
      outline-offset: 4px;
    }
  }

  .tech-icon {
    width: clamp(32px, 5vmin, 56px);
    height: clamp(32px, 5vmin, 56px);
  }

  .description {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    width: max-content;
    max-width: min(260px, 80vw);
    padding: 0.5rem 1rem;
    background-color: rgb(138, 98, 53);
    border: 2px solid rgb(41, 23, 0);
    color: black;
    font-family: 'Times New Roman', Times, serif;
    text-align: left;

    h3 {
      margin: 0 0 0.25rem;
      font-weight: bold;
      text-align: center;
    }

    ul {
      margin: 0;
      padding-left: 1.25rem;
      list-style: disc;
    }
  }

  @media (max-width: 800px) {
    .education-article {
      flex-direction: column;
      gap: 1.5rem;
    }

    .institute-img {
      order: -1;
      max-width: 100%;
      max-height: 35vh;
    }
  }
</style>
