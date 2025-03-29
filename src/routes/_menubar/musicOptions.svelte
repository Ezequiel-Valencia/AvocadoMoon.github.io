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
    <a target="_blank" style="text-align: center; margin:auto;" class="menu-med-text" href="https://docs.google.com/document/d/e/2PACX-1vSkQh2B7KYF8omxPyYL0deWwESOxGK9V_uYcxOaFljqY3RCpwSB0rmU0HjWcz3p5RE5ShrXQv-5MjIQ/pub">
      <p>Songs I Use</p>
    </a>
    <button
      id="sfx"
      class="menu-med-text"
      on:click={(e) => {
        sfxController.toggle_sfx();
      }}
    >
      Turn SFX {$sfxController ? "Off" : "On"}
    </button>
    <button
      id="music"
      class="menu-med-text"
      on:click={(e) => {
        musicController.toggle_music();
      }}
    >
      Turn Music {$musicController ? "Off" : "On"}
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
  
    button {
      margin: auto;
      padding: 2%;
      transform: translateY(100%);
      cursor: url("/Cursors/wii-open2.png") ,pointer;
    }
  </style>


