<head>
  <script src="https://kit.fontawesome.com/6a3a94789b.js" crossorigin="anonymous"></script>
</head>
<script lang="ts">
  import { Marquee, Hr } from "flowbite-svelte";
  import { musicController } from "../myLocalStorage";


  let display_entire_menu = false;
  export let email: string;
  export let songName: string;
  export let songPath: string = "";

  let playing = $musicController

</script>

{#if $musicController}
  <audio id="bg-song" volume=0.5 src={songPath} autoplay loop></audio>
  <script lang="ts">
    var audio = document.getElementById("bg-song");
    audio.volume = 0.1;
  </script>
{:else}
  <audio id="bg-song" volume=0.1 src={songPath} loop></audio>
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
      <h1 style="color: white; text-align:center; padding:5%; padding-bottom:0%;">Music:</h1>
      <Marquee speed={0.3} hoverSpeed={0.2}>
        <h5>{songName}</h5>
      </Marquee>
      {#if playing}
        <span id="play-button" on:click={(e) => {playing = false}} on:keydown={(e) => {}} role="button" tabindex="0">
          <i style="font-size: x-large;" class="fas fa-pause"></i>
        </span>
      {:else}
        <span id="play-button" on:click={(e) => {playing = true}} on:keydown={(e) => {}} role="button" tabindex="0">
          <i style="font-size: x-large;" class="fas fa-play"></i>
        </span>
      {/if}
      <span id="seeking" style="">
        <span>
          <input id="seeker" type="range" min="1" max="100" value="0">
        </span>
        <span class="text">0:00/2:56</span>
      </span>
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

    <div id="contact-me">
      <h1>Contact Me</h1>
      <p>Email: {email}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  .text {
    color: white;
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

  #contact-me p {
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

  
</style>
