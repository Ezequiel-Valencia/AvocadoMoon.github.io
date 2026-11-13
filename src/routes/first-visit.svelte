<script lang="ts">
  import { musicController, sfxController, hasVisited } from '../common/myLocalStorage';
  import { onMount } from 'svelte';
  import { resumeURL } from '../globals';

  let showResumeBlock = $state(false);
  let finished = $state(false);
  let selectedButton = $state(-1);

  let touchscreen = $state(false);
  onMount(() => {
    if ('ontouchstart' in window) {
      touchscreen = true;
    }
  });
</script>

<div
  id="first-visit"
  onanimationend={(e) => {
    if (e.animationName.includes('fadeOut')) {
      hasVisited.enable();
    }
  }}
  class={finished ? 'fade-out' : ''}
  role="dialog"
  aria-modal="true"
  aria-labelledby="welcome-title"
>
  <div class="gradient-bg">
    <div class="text-glass">
      <h1 id="welcome-title">Welcome to EzequielOS</h1>
      <p class="intro">Before we continue, please answer the following questions.</p>

      <hr />
      <div id="allowAudio" class="text-box">
        <h2>Allow Audio?</h2>
        {#if $musicController}
          <p class="note">Even with audio on, autoplay needs to be enabled in the browser.</p>
        {/if}
        <button
          aria-pressed={selectedButton == 1}
          class={selectedButton == 1 ? 'selected' : ''}
          onclick={() => {
            sfxController.enable();
            musicController.enable();
            showResumeBlock = true;
            selectedButton = 1;
          }}
        >
          Yes
        </button>
        <button
          aria-pressed={selectedButton == 2}
          class={selectedButton == 2 ? 'selected' : ''}
          onclick={() => {
            sfxController.disable();
            musicController.disable();
            showResumeBlock = true;
            selectedButton = 2;
          }}
        >
          No
        </button>
      </div>

      {#if showResumeBlock}
        {#if touchscreen}
          <p class="warning">
            This website is best viewed on a computer. It will function, but certain features will
            be unavailable.
          </p>
        {/if}
        <div class="text-box" id="view-resume">
          <h2>Resume</h2>
          <p>For people who want to see everything I've done in the quickest manner possible.</p>
          <div class="actions">
            <a class="button" href={resumeURL} target="_blank" rel="noopener noreferrer">
              Open Resume
            </a>
            <button
              onclick={() => {
                finished = true;
              }}>Continue</button
            >
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .fade-out {
    animation: fadeOut 2s forwards;
  }

  .text-box {
    animation: fadeIn 2.5s;
    text-align: center;
  }

  #first-visit {
    position: absolute;
    inset: 0;
    height: 100vh;
    height: 100dvh;
    width: 100vw;
  }

  #welcome-title {
    text-align: center;
    margin-top: 0;
  }

  .intro {
    font-style: italic;
  }

  .note {
    text-decoration: underline;
    margin-bottom: 16px;
  }

  .warning {
    color: rgb(190, 20, 20);
    font-size: large;
    font-weight: bold;
    margin: 24px auto 0;
  }

  .actions {
    margin-top: 24px;
  }

  button,
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 12px;
    text-decoration: none;
    background-color: rgb(84, 134, 243);
    border: 0;
    border-radius: 4px;
    height: 4vmin;
    width: 6vmin;
    min-height: 4vh;
    min-width: fit-content;
    font-size: large;
    font-family: 'Times New Roman', Times, serif;
    color: white;
    cursor:
      url('/Cursors/wii-open2.png') 17 1,
      pointer;
  }

  button:hover,
  .button:hover,
  button:focus-visible,
  .button:focus-visible {
    background-color: rgb(0, 12, 121);
  }

  button:focus-visible,
  .button:focus-visible {
    outline: 3px solid white;
    outline-offset: 2px;
  }

  h1 {
    font-size: xx-large;
    font-family: 'Times New Roman', Times, serif;
  }

  h2 {
    font-size: x-large;
    font-family: 'Times New Roman', Times, serif;
  }

  p {
    max-width: 60%;
    margin: auto;
    text-align: center;
  }

  hr {
    max-width: 80%;
    margin-top: 2%;
    color: black;
    border-color: black;
  }

  .selected {
    background-color: rgb(0, 12, 121);
  }

  .gradient-bg {
    background-image: url('/clouds.jpg');
    background-size: cover;
    height: 100%;
    width: 100vw;
    background-position: 0% 0%;
    position: absolute;
    display: flex;
    align-items: center;
    overflow-y: auto;
  }

  .text-glass {
    background: rgba(255, 255, 255, 0.253);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    width: fit-content;
    max-width: 90vw;
    min-width: 72vw;
    margin: auto;
    padding: 48px 0;
    box-sizing: border-box;
    -webkit-backdrop-filter: blur(10px);
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 20px;
    }

    p {
      font-size: 15px;
      max-width: 85%;
    }
    button,
    .button {
      height: auto;
      min-height: 44px;
      padding: 0 20px;
      margin: 4px;
      font-size: 18px;
    }
    .text-glass {
      padding-bottom: 24px;
    }
  }
</style>
