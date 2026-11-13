<script lang="ts">
  import { musicController } from './myLocalStorage';
  import { onMount, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { isYoutubeUrl, PlayerState, type YouTubePlayer } from './youtube';
  import YoutubeAudio from './youtube-audio.svelte';

  interface Props {
    songName: string;
    // An audio file, or any YouTube watch, youtu.be, embed, or live URL
    songPath?: string;
    songVolumeLevel?: string;
  }

  let { songName, songPath = '', songVolumeLevel = '1' }: Props = $props();

  const contacts = [
    { label: 'Email', href: 'mailto:ezq.valencia@gmail.com', icon: 'fas fa-envelope' },
    { label: 'GitHub', href: 'https://github.com/AvocadoMoon', icon: 'fab fa-github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ezequielvalencia/',
      icon: 'fab fa-linkedin',
    },
    {
      label: 'Resume',
      href: 'https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub',
      icon: 'fas fa-file-alt',
    },
  ];

  let isYoutube = $derived(isYoutubeUrl(songPath));
  // Pages without a song still get the menu, just without the player
  let hasSong = $derived(songPath !== '');

  let open = $state(false);
  let toggleButton: HTMLButtonElement | undefined = $state();
  let panel: HTMLDivElement | undefined = $state();

  let paused = $state(true);
  let audioLength: number = $state(0);
  let currentAudioTime: number = $state(0);

  let audio: HTMLAudioElement | undefined = $state();
  let youtubePlayer: YouTubePlayer | undefined;

  // Only scroll the title when it doesn't fit
  let titleBox: HTMLDivElement | undefined = $state();
  let titleText: HTMLSpanElement | undefined = $state();
  let titleOverflows = $state(false);

  onMount(() => {
    if (!isYoutube) {
      if (!audio) return;
      audio.volume = Number(songVolumeLevel);
      paused = !$musicController;
      if (paused) {
        audio.pause();
      }
      return;
    }

    // The <audio> tag keeps these in sync through its bindings; YouTube has to be asked
    const poll = setInterval(() => {
      if (!youtubePlayer) return;
      currentAudioTime = youtubePlayer.getCurrentTime();
      audioLength = youtubePlayer.getDuration();
    }, 500);

    return () => {
      clearInterval(poll);
      youtubePlayer = undefined;
    };
  });

  // Keep the page behind the menu from scrolling while it's open
  $effect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  });

  $effect(() => {
    if (!open || !titleBox || !titleText) return;
    const measure = () => {
      titleOverflows = titleText!.scrollWidth > titleBox!.clientWidth;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(titleBox);
    return () => observer.disconnect();
  });

  async function openMenu() {
    open = true;
    await tick();
    // Focus the menu itself so the next Tab lands on its first control
    panel?.focus();
  }

  async function closeMenu() {
    open = false;
    await tick();
    toggleButton?.focus();
  }

  // Moves the node to <body>. The wrapper itself stays mounted, so Svelte's own blocks and
  // transitions inside it are unaffected
  function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      },
    };
  }

  function onKeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
    }
  }

  // Keeps Tab and Shift+Tab cycling inside the panel while it's open
  function trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const panel = event.currentTarget as HTMLElement;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onYoutubeStateChange(state: number) {
    // Buffering and cueing leave the button as it was
    if (state === PlayerState.PLAYING) paused = false;
    if (state === PlayerState.PAUSED) paused = true;
    if (state === PlayerState.ENDED) {
      youtubePlayer?.seekTo(0, true);
      youtubePlayer?.playVideo();
    }
  }

  function setPaused(value: boolean) {
    paused = value;
    if (value) youtubePlayer?.pauseVideo();
    else youtubePlayer?.playVideo();
  }

  function seek(time: number) {
    currentAudioTime = time;
    youtubePlayer?.seekTo(time, true);
  }

  function formatAudioTime(time: number | undefined) {
    if (time === undefined || !Number.isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  let progress = $derived(audioLength > 0 ? (currentAudioTime / audioLength) * 100 : 0);
</script>

<svelte:window onkeydown={onKeydown} />

{#if hasSong}
  {#if isYoutube}
    <YoutubeAudio
      url={songPath}
      title={songName}
      volume={Number(songVolumeLevel)}
      onready={(player) => {
        youtubePlayer = player;
        if ($musicController) player.playVideo();
      }}
      onstatechange={onYoutubeStateChange}
    ></YoutubeAudio>
  {:else}
    <audio
      bind:this={audio}
      id="bg-song"
      src={songPath}
      autoplay={$musicController}
      loop
      bind:paused
      bind:duration={audioLength}
      bind:currentTime={currentAudioTime}
    ></audio>
  {/if}
{/if}

<!-- Lives on <body> so page wrappers with their own z-index or transform can never cover it -->
<div class="menu-root" use:portal>
  <!-- The tab at the top of every page. It stays put so the page never jumps when the menu opens -->
  <button
    bind:this={toggleButton}
    id="menu-tab"
    class="pointer"
    aria-haspopup="dialog"
    aria-expanded={open}
    aria-controls="site-menu"
    onclick={openMenu}
  >
    Menu
  </button>

  {#if open}
    <!-- Clicking the dimmed area around the panel closes it, like the Return button -->
    <div
      id="menu-backdrop"
      transition:fade={{ duration: 180 }}
      onclick={(e) => {
        if (e.target === e.currentTarget) closeMenu();
      }}
      role="presentation"
    >
      <div
        id="site-menu"
        class="panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        bind:this={panel}
        tabindex="-1"
        onkeydown={trapFocus}
        transition:fly={{ y: -24, duration: 220 }}
      >
        {#if hasSong}
          <section class="music" aria-label="Music">
            <p class="eyebrow now-playing">
              {paused ? 'Paused' : 'Now playing'}
              {#if !paused}
                <span class="eq" aria-hidden="true"><span></span><span></span><span></span></span>
              {/if}
            </p>
            <div class="title" class:scrolling={titleOverflows} bind:this={titleBox}>
              <span bind:this={titleText}>{songName || 'Untitled track'}</span>
            </div>

            <div class="player">
              <button
                class="play-button pointer"
                aria-label={paused ? 'Play music' : 'Pause music'}
                onclick={() => setPaused(!paused)}
              >
                <i class={paused ? 'fas fa-play' : 'fas fa-pause'} aria-hidden="true"></i>
              </button>

              <div class="seek">
                <input
                  type="range"
                  aria-label="Seek"
                  min="0"
                  max={audioLength || 0}
                  step="any"
                  value={currentAudioTime || 0}
                  style="--progress: {progress}%"
                  oninput={(e) => seek(Number(e.currentTarget.value))}
                />
                <div class="times">
                  <span>{formatAudioTime(currentAudioTime)}</span>
                  <span>{formatAudioTime(audioLength)}</span>
                </div>
              </div>
            </div>
          </section>

          <hr class="divider" />
        {/if}

        <nav class="actions" aria-label="Site">
          <a class="big-button pointer" href="/">
            <i class="fas fa-home" aria-hidden="true"></i>
            Main Menu
          </a>
          <button class="big-button pointer" onclick={closeMenu}>
            <i class="fas fa-undo-alt" aria-hidden="true"></i>
            Return
          </button>
        </nav>

        <hr class="divider" />

        <section class="contact" aria-labelledby="contact-title">
          <h3 id="contact-title" class="eyebrow">Contact me</h3>
          <ul>
            {#each contacts as contact (contact.label)}
              <li>
                <a
                  class="pointer"
                  href={contact.href}
                  target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                >
                  <i class={contact.icon} aria-hidden="true"></i>
                  <span>{contact.label}</span>
                </a>
              </li>
            {/each}
          </ul>
        </section>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  $accent: #34bef0;
  $muted: rgba(255, 255, 255, 0.65);

  .menu-root {
    display: contents;
  }

  .pointer:hover {
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  button,
  a {
    font: inherit;
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid $accent;
    outline-offset: 2px;
  }

  /* ---------- Closed: the tab ---------- */

  #menu-tab {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0.45rem 1.4rem 0.55rem;
    font-family: system-ui, sans-serif;
    font-size: clamp(0.9rem, 2.2vmin, 1.15rem);
    font-weight: 600;
    letter-spacing: 0.04em;
    color: white;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-top: none;
    border-radius: 0 0 14px 14px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    transition:
      padding-top 0.15s ease,
      background 0.15s ease;
  }

  #menu-tab:hover,
  #menu-tab:focus-visible {
    padding-top: 0.75rem;
    background: rgba(0, 0, 0, 0.55);
  }

  .now-playing {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* Little equalizer that shows the page's music is playing */
  .eq {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 0.8em;
  }

  .eq span {
    width: 3px;
    height: 100%;
    background: $accent;
    border-radius: 1px;
    animation: eq 0.9s ease-in-out infinite;
    transform-origin: bottom;
  }

  .eq span:nth-child(2) {
    animation-delay: -0.3s;
  }

  .eq span:nth-child(3) {
    animation-delay: -0.6s;
  }

  @keyframes eq {
    0%,
    100% {
      transform: scaleY(0.3);
    }
    50% {
      transform: scaleY(1);
    }
  }

  /* ---------- Open: backdrop and panel ---------- */

  #menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 2rem 1rem;
    overflow-y: auto;
    /* The whole screen is one frosted pane: the page shows through, blurred and softly lit */
    background:
      linear-gradient(170deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.03)),
      rgba(10, 12, 16, 0.4);
    backdrop-filter: blur(24px) saturate(150%);
    cursor:
      url('/Cursors/Wii-Curso-plain.png') 10 1,
      pointer;
  }

  /* Without blur the page behind would make the menu unreadable, so go solid instead */
  @supports not (backdrop-filter: blur(1px)) {
    #menu-backdrop {
      background: rgba(20, 22, 28, 0.94);
    }
  }

  /* No box of its own: just a column of content resting on the frosted pane */
  .panel {
    width: min(100%, 30rem);
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    font-family: system-ui, sans-serif;
    color: white;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
    cursor:
      url('/Cursors/Wii-Curso-plain.png') 10 1,
      auto;
  }

  /* A hairline that fades out at both ends, so sections are separated without being boxed in */
  .divider {
    width: 100%;
    height: 1px;
    margin: 0;
    border: none;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.35) 20%,
      rgba(255, 255, 255, 0.35) 80%,
      transparent
    );
  }

  .panel:focus {
    outline: none;
  }

  .eyebrow {
    margin: 0 0 0.35rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $muted;
  }

  /* ---------- Music ---------- */

  .title {
    overflow: hidden;
    white-space: nowrap;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .title span {
    display: inline-block;
  }

  /* The left padding starts the title just past the right edge, and the animation moves it
     until it has fully left on the left before starting again */
  .title.scrolling span {
    padding-left: 100%;
    animation: marquee 12s linear infinite;
  }

  .title.scrolling:hover span {
    animation-play-state: paused;
  }

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .player {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-top: 0.85rem;
  }

  .play-button {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: none;
    border-radius: 50%;
    font-size: 1rem;
    color: #0b1a22;
    background: $accent;
    box-shadow: 0 4px 12px rgba(52, 190, 240, 0.35);
    transition: transform 0.12s ease;
  }

  .play-button:hover {
    transform: scale(1.06);
  }

  .play-button:active {
    transform: scale(0.96);
  }

  .seek {
    flex: 1;
    min-width: 0;
  }

  .times {
    display: flex;
    justify-content: space-between;
    margin-top: 0.3rem;
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    color: $muted;
  }

  input[type='range'] {
    --progress: 0%;
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    margin: 0;
    background: transparent;
    cursor: pointer;
  }

  /* Played portion in the accent color, the rest faint */
  input[type='range']::-webkit-slider-runnable-track {
    height: 0.35rem;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      $accent var(--progress),
      rgba(255, 255, 255, 0.25) var(--progress)
    );
  }

  input[type='range']::-moz-range-track {
    height: 0.35rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.25);
  }

  input[type='range']::-moz-range-progress {
    height: 0.35rem;
    border-radius: 999px;
    background: $accent;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 0.95rem;
    width: 0.95rem;
    margin-top: -0.3rem; /* centers the thumb on the track in Chromium/WebKit */
    border: 0;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }

  input[type='range']::-moz-range-thumb {
    height: 0.95rem;
    width: 0.95rem;
    border: 0;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }

  /* ---------- Main Menu / Return ---------- */

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  /* Rounded, glossy pills in the spirit of the Wii menu buttons */
  .big-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 3.25rem;
    padding: 0 1rem;
    border: 2px solid rgba(255, 255, 255, 0.55);
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
    color: #2a2f36;
    text-shadow: none;
    background: linear-gradient(to bottom, #ffffff 0%, #e9edf1 50%, #d5dbe1 100%);
    box-shadow:
      0 4px 10px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 white;
    transition:
      transform 0.12s ease,
      border-color 0.12s ease;
  }

  .big-button:hover {
    border-color: $accent;
    transform: translateY(-1px);
  }

  .big-button:active {
    transform: translateY(1px);
  }

  /* ---------- Contact ---------- */

  .contact ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .contact a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    padding: 0.65rem 0.25rem;
    border-radius: 12px;
    font-size: 0.75rem;
    text-decoration: none;
    color: white;
    transition: background 0.15s ease;
  }

  .contact a i {
    font-size: 1.3rem;
  }

  .contact a:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (prefers-reduced-motion: reduce) {
    .eq span,
    .title.scrolling span {
      animation: none;
    }

    .title.scrolling span {
      padding-left: 0;
    }

    .title {
      text-overflow: ellipsis;
    }
  }
</style>
