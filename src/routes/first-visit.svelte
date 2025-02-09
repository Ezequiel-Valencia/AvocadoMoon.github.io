
<script lang="ts">
  import { musicController, sfxController, hasVisited } from "../common/myLocalStorage";
  import { onMount } from 'svelte';
  import { clickedOff } from '../globals'

  onMount(async () => {
    document.addEventListener("click", (event) : void => {
      if (clickedOff("allowAudio", event)) {
        hasVisited.hasVisited();
      }
    });
  })

</script>




<div id="allowAudio" class="menu-popup">
    <h2 class="menu-large-text">Allow Audio</h2>
    <p class="menu-med-text" style="margin-left: 2%; margin-right: 2%;">
      This website plays different background music and sound effects for each channel. 
      Do you want to allow this audio?
    </p>
    {#if $musicController}
      <u><p>Even if audio is turned on, autoplay needs to enabled in the browser.</p></u>
    {/if}
    <button
      id="music"
      class="music-option-buttons menu-med-text"
      on:click={(e) => {
        sfxController.toggle_sfx();
        musicController.toggle_music();
      }}
    >
      Turn Audio {$musicController ? "Off" : "On"}
    </button>
    
    <h2 class="menu-large-text">Resume</h2>
    <p style="margin-left: 2%; margin-right: 2%;" class="menu-med-text">For people who want to see everything I've done in the quickest manner possible.</p>
    <a href="https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub">
    Link to Resume
    </a>
    <br>
    <br>
    <button class="music-option-buttons menu-med-text" on:click={(e) => {hasVisited.hasVisited()}}>Close</button>

</div>



<style lang="scss">
  @use 'homeMenu';
</style>

