<script lang="ts">
  import { Marquee, Hr, Range } from "flowbite-svelte";
  import { musicController } from "../myLocalStorage";


  let display_entire_menu = false;
  export let email: string;
  export let songName: string;

  let playing = $musicController

</script>
<head>
  <script src="https://kit.fontawesome.com/6a3a94789b.js" crossorigin="anonymous"></script>
</head>
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

{#if display_entire_menu}
  <div id="home-menu-nav">

    <span class="box" id="music-player" style="width:fit-content; text-align: center; margin-left:auto; margin-right:auto; height:fit-content;">
      <h1 style="color: white; text-align:center; padding:5%; padding-bottom:0%;">Music Player:</h1>
      <Marquee speed={0.4} hoverSpeed={0.2} reverse={true}>
        <h5>{songName}</h5>
      </Marquee>
      <Hr classHr="my-8" />
      {#if playing}
        <div id="play-button">
          <i class="fas fa-pause"></i>
        </div>
      {:else}
        <span id="play-button">
          <i style="font-size: xx-large;" class="fas fa-play"></i>
        </span>
      {/if}
      <br>
      <span id="seeking" style="">
        <span class="text">0:00</span>
        <span>
          <input id="seeker" type="range" min="1" max="100" value="0">
        </span>
        <span class="text">2:56</span>
      </span>
    </span>

    <div style="height:40vh; text-align:center;" id="big-button-div">
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
    margin-top: 20vh;
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

  
</style>
