<script lang="ts">
    import { sfxController, musicController } from "../../common/myLocalStorage";
</script>





<div id="music-options" class="menu-popup">
    <h2 class="menu-large-text">Audio Options</h2>
    <p class="menu-med-text" style="margin: 5%;">
      If you can't hear this sites music here are some trouble
      shooting methods:
    </p>
    <ol class="menu-med-text" style="margin: 5%;">
      <li class="menu-med-text">Turn on and off the audio.</li>
      <li class="menu-med-text">Go to site settings in your browser, and enable autoplay.</li>
      <li class="menu-med-text">Unmute the tab</li>
    </ol>
    <button
      id="sfx"
      class="music-option-buttons menu-med-text"
      on:click={(e) => {
        sfxController.toggle_sfx();
      }}
    >
      SFX {$sfxController ? "On" : "Off"}
    </button>
    <button
      id="music"
      class="music-option-buttons menu-med-text"
      on:click={(e) => {
        musicController.toggle_music();
      }}
    >
      Music {$musicController ? "On" : "Off"}
    </button>
  </div>


  <style lang="scss">
    $button-horizontal-offset: 2%;
    @use '../homeMenu';
    @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap");
  
    @font-face{
      src: url("/terminal-font.ttf");
      font-family: 'Terminal Font';
    }
  
    .music-option-buttons {
      width: 15%;
      height: 15%;
      margin: auto;
      padding: 2%;
      transform: translateY(100%);
    }
  </style>


