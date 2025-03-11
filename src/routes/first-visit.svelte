
<script lang="ts">
  import { musicController, sfxController, hasVisited } from "../common/myLocalStorage";
  import { onMount } from 'svelte';
  import { clickedOff, resumeURL } from '../globals'

  $: showResumeBlock = false;
  $: finished = false;
  $: selectedButton = -1;

  let touchscreen = false
  onMount(() => {
    if (('ontouchstart' in window)){
        touchscreen = true
    }
  })

</script>


<section on:animationend={(e) => {
  if (e.animationName.includes("fadeOut")){
    hasVisited.hasVisited()
  }}
  } class="{finished ? "fade-out" : ""}"
style="position:absolute; left:0%; top:0%; height: 100vh; width:100vw;">

  <div class="gradient-bg">
    <div class="text-glass">
      <h1 style="text-align: center; margin-top:10%; padding-top:2%;">Welcome to EzequielOS</h1>
      <i><p>Before we continue please answer the following questions</p></i>

      <hr>
      <div id="allowAudio" class="text-box">
          <h2>Allow Audio?</h2>
          {#if $musicController}
            <u><p>Even if audio is turned on, autoplay needs to enabled in the browser.</p></u>
            <br>
          {/if}
          <button
            class="{selectedButton == 1 ? "selected" : ""}"
            on:click={(e) => {
              sfxController.allow_sfx();
              musicController.allow_music();
              showResumeBlock = true;
              selectedButton = 1;
            }}
          >
            Yes
          </button>
          <button 
          class="{selectedButton == 2 ? "selected" : ""}"
          on:click={(e) => {
            sfxController.disable_sfx();
            musicController.disable_music();
            showResumeBlock = true;
            selectedButton = 2;
          }}>
            No
          </button>
      </div>

      {#if showResumeBlock}
        {#if touchscreen}
          <h1 style="text-align:center; font-size: large; margin:auto; color: red;">
            This website is best viewed on a computer. It will function, but certain
            features will be unavailable.
          </h1>
        {/if}
        <div class="text-box" id="view-resume">
          <h2>Resume</h2>
            <p>
              For people who want to see everything I've done in the quickest manner possible.</p>
            <br>
            <br>
            <button on:click={(e) => {window.open(resumeURL)}}>
              Open Resume</button>
            <button on:click={(e) => {finished = true}}>Continue</button>
        </div>
      {/if}
      </div>
    </div>
</section>


<style lang="scss">
  @keyframes fadeIn{
    from{
      opacity: 0;
    } to {
      opacity: 1;
    }
  }

  @keyframes fadeOut{
    from{
      opacity: 1;
    } to {
      opacity: 0;
    }
  }

  .fade-out{
    animation: fadeOut 2s forwards;
  }

  .text-box{
    animation: fadeIn 2.5s;
    text-align: center;
  }

  button{
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
    cursor: url("/Cursors/wii-open2.png") ,pointer;
  }

  button:hover{
    background-color: rgb(0, 12, 121);
  }

  h1{
    font-size: xx-large;
    font-family: 'Times New Roman', Times, serif;
  }

  h2{
    font-size: x-large;
    font-family: 'Times New Roman', Times, serif;
  }

  p{
    max-width: 60%;
    margin: auto;
    text-align: center;
  }

  hr{
    max-width: 80%;
    margin-top: 2%;
    color: black;
    border-color: black;
  }

  .selected{
    background-color: rgb(0, 12, 121);
  }

  .gradient-bg{
    background-image: url("/clouds.jpg");
    height: 100vh;
    width: 100vw;
    background-position: 0% 0%;
    position: absolute;
  }

  .text-glass{
    background: rgba(255, 255, 255, 0.253);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    width: fit-content;
    max-width: 90vw;
    min-width: 72vw;
    margin: auto;
    height: 80vh;
    -webkit-backdrop-filter: blur(10px);
  }

  @keyframes gradient{
    0% {
		background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 500px){
    h1{
      font-size: 5vmin;
    }
    h2{
      font-size: 4vmin;
    }

    p{
      font-size: 3vmin;
    }
    button{
      height: 2vmin;
      width: 3vmin;
      font-size: 4vmin;
      // min-height: 4vh;
      // min-width: fit-content;
    }
  }

</style>

