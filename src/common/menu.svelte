<head>
  <script src="https://kit.fontawesome.com/6a3a94789b.js" crossorigin="anonymous"></script>
</head>
<script lang="ts">
  import { Marquee, Hr } from "flowbite-svelte";
  import { musicController } from "./myLocalStorage";
  import { onMount } from "svelte";


  let display_entire_menu = false;
  export let songName: string;
  export let songPath: string = "";
  export let songVolumeLevel: string = "1";

  var paused = true
  var audioLength: any;
  var currentAudioTime: any;

  onMount(() => {
    let audio = document.getElementById("bg-song") as HTMLAudioElement;
    audio.volume = Number(songVolumeLevel)
    paused = !$musicController
    if (paused){
      audio.pause()
    }
  })

  function formatAudioTime(time: number){
    let mins = Math.floor(time / 60)
    let secs: any = Math.floor(time % 60)
    if (secs < 10){
      secs = "0" + secs
    }
    if (Number.isNaN(mins)){
      return "0:00"
    }
    return mins + ":" + secs
  }

</script>

{#if $musicController}
  <audio id="bg-song" src={songPath} autoplay loop
  bind:paused
  bind:duration={audioLength}
  bind:currentTime={currentAudioTime}
  ></audio>
{:else}
  <audio id="bg-song" src={songPath} loop
  bind:paused
  bind:duration={audioLength}
  bind:currentTime={currentAudioTime}
  ></audio>
{/if}



<!-- ############ When the menu is not open ################## -->

{#if !display_entire_menu}
<div>
  <nav>
    <button id="menu-nav"
      on:click={(e) => {
        display_entire_menu = !display_entire_menu;
        // scroll = false;
      }}>Menu</button
    >
  </nav>
</div>
{/if}


<!-- #################### Menu is Open ########################### -->

{#if display_entire_menu}
  <div id="home-menu-nav">

    <span class="box" id="music-player" style="width:fit-content; text-align: center; margin-left:auto; margin-right:auto; height:fit-content;">
      <!-- Song Name -->
      <h1 style="color: white; text-align:center; padding:5%; padding-bottom:0%;">Music:</h1>
      <Marquee speed={0.3} hoverSpeed={0.2}>
        <h5>{songName}</h5>
      </Marquee>

      <div id="music-nav">
        <!-- Play/Pause Button -->
        {#if paused != true}
          <span id="play-button" class="music-buttons" on:click={(e) => {paused = true}} on:keydown={(e) => {}} role="button" tabindex="0">
            <i style="font-size: x-large;" class="fas fa-pause music-buttons"></i>
          </span>
        {:else}
          <span id="play-button" class="music-buttons" on:click={(e) => {paused = false}} on:keydown={(e) => {}} role="button" tabindex="0">
            <i style="font-size: x-large;" class="fas fa-play music-buttons"></i>
          </span>
        {/if}

        <!-- Seeker -->
        <span id="seeking" style="">
          <span>
            <input id="seeker" type="range" min="1" max={audioLength} value={currentAudioTime}
            on:input={(e) => {currentAudioTime = e.currentTarget.value}}
            >
          </span>
          <span class="text">{formatAudioTime(currentAudioTime)}/{formatAudioTime(audioLength)}</span>
        </span>
      </div>
      
      <Hr classHr="my-8" />
    </span>

    <div style="text-align:center;" id="big-button-div">
      <button
        on:click={(e) => {
          location.href = "/";
        }}>Main Menu</button
      >
      <button
        on:click={(e) => {
          display_entire_menu = !display_entire_menu;
        //   scroll = true;
        }}>Return</button
      >
    </div>

    <span id="contact-me">
      <h1>Contact Me</h1>
      <p>
        Email: <a style="color: white;" href="mailto:wzeke123@gmail.com">wzeke123@gmail.com</a> |
        Github: <a style="color: white;" href="https://github.com/AvocadoMoon">AvocadoMoon</a> |
        Linkedin: <a style="color: white;" href="https://www.linkedin.com/in/ezequielvalencia/">Ezequiel Valencia</a> |
        Resume: <a style="color: white;" href="https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub">
          Personal Resume</a>
      </p>
    </span>
  </div>
{/if}

<style lang="scss">
  .text {
    color: white;
  }

  .music-buttons{
    min-height: 1vh;
    min-width: 2vw;
  }

  .box {
    border-radius: 5%;
    overflow: auto;
    color: white;
  }

  #home-menu-nav {
    display:grid;
    bottom: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background: rgba(0, 0, 0, 0.85);
  }

  #menu-nav {
    border: none;
    color: white;
    margin: 0;
    padding: 0;
    font-size: 3vmin;
    position: fixed;
    padding: 1vmin;
    left: 50%;
    transform: translate(-50%);
    border-bottom-style: solid;
    border-width: 1px;
    border-color: white;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.164);
    max-width: 200px;
    max-height: 55px;
    width: 20vmin;
    height: auto;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #menu-nav:hover {
    text-decoration: underline;
  }

  #big-button-div button {
    background: grey;
    border-radius: 40px;
    height: 10vh;
    width: 20vw;
    margin-left: 5%;
  }

  #contact-me {
    position: relative;
    text-align: center;
    max-height: 20vh;
  }

  #contact-me h1 {
    padding-top: 2vh;
    bottom: 0;
    color: white;
  }

  #contact-me p{
    bottom: 0;
    color: white;
  }

  input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    cursor: pointer;
    width: 15rem;
  }

  @media (max-width: 500px){
    #menu-nav {
      font-size: 5vmin;
      padding: 1vmin;
      width: 30vmin;
      height: auto;
    }
    #music-nav{
      padding-left: 8vw;
      padding-right: 8vw;
    }
  }

  
</style>
