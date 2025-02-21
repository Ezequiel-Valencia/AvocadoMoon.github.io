
<script lang="ts">
  import { musicController, sfxController, hasVisited } from "../common/myLocalStorage";
  import { onMount } from 'svelte';
  import { clickedOff } from '../globals'

  $: showResumeBlock = false;
  $: finished = false;

</script>


<section on:animationend={(e) => {
  if (e.animationName.includes("fadeOut")){
    hasVisited.hasVisited()
  }}
  } class="{finished ? "fade-out" : ""}"
style="position:absolute; left:0%; top:0%; height: 100vh; width:100vw; background: rgb(58, 169, 189, 1);">

  <h1 style="text-align: center; margin-top:10%;">Welcome to EzequielOS</h1>
  <p style="text-align: center;">The latest operating system all 
    about Ezequiel Valencia, and his various projects.</p>
  <div id="allowAudio" style="margin-top:5%;" class="text-box">
      <h2 style="" class="menu-large-text terminal">Allow Audio</h2>
      <p class="menu-med-text" style="margin-left: 2%; margin-right: 2%;">
        This operating system plays different background music and sound effects for each program. 
        Do you want this audio on?
      </p>
      {#if $musicController}
        <u><p>Even if audio is turned on, autoplay needs to enabled in the browser.</p></u>
      {/if}
      <button
        id="music"
        class=""
        on:click={(e) => {
          sfxController.allow_sfx();
          musicController.allow_music();
          showResumeBlock = true;
        }}
      >
        Yes
      </button>
      <button on:click={(e) => {
        sfxController.disable_sfx();
        musicController.disable_music();
        showResumeBlock = true;
      }}>
        No
      </button>
  </div>

  {#if showResumeBlock}
    <div class="text-box" id="view-resume">
      <h2 class="menu-large-text">Resume</h2>
        <p style="margin-left: 2%; margin-right: 2%;" class="menu-med-text">
          For people who want to see everything I've done in the quickest manner possible.</p>
        <a href="https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub">
        Link to Resume
        </a>
        <br>
        <br>
        <button class="music-option-buttons menu-med-text" 
        on:click={(e) => {finished = true}}>Continue to OS</button>
    </div>
  {/if}

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
    animation: fadeOut 3s forwards;
  }

  .text-box{
    animation: fadeIn 3s;
    text-align: center;
  }

  button{
    background-color: rgb(84, 134, 243);
    border: 0;
    border-radius: 4px;
    height: 4vmin;
    width: 6vmin;
    min-height: fit-content;
    min-width: fit-content;
    font-size: large;
    font-family: 'Times New Roman', Times, serif;
    color: white;
  }

  button:hover{
    background-color: rgb(0, 12, 121);
  }



</style>

