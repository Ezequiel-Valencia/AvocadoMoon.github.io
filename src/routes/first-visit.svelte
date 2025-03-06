
<script lang="ts">
  import { musicController, sfxController, hasVisited } from "../common/myLocalStorage";
  import { onMount } from 'svelte';
  import { clickedOff } from '../globals'

  $: showResumeBlock = false;
  $: finished = false;
  $: selectedButton = -1;

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
        <div class="text-box" id="view-resume">
          <h2>Resume</h2>
            <p>
              For people who want to see everything I've done in the quickest manner possible.</p>
            <br>
            <br>
            <button on:click={(e) => {window.open("https://docs.google.com/document/d/e/2PACX-1vQXG6xgS-gXDlE0v03SPC5k56cUHKYMERYuDSOsqoyo8cLsFWslB_Rmr0B_Het3GDX4m7YfRlge-lbo/pub")}}>
              Open Resume</button>
            <button on:click={(e) => {finished = true}}>Continue to OS</button>
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

  // .gradient-bg{
  //   background: linear-gradient(-45deg, rgb(58, 169, 189, 1), rgb(44, 171, 255), rgb(20, 93, 252));
  //   background-size: 400vw 400vh;
  //   background-position: 0% 0%;
  //   animation: gradient 5s ease infinite reverse;
  //   height: 100vh;
  //   width: 100vw;
  //   position: absolute;
  // }

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

</style>

