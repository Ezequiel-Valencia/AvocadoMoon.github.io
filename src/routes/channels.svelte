

<!-- TODO: Add work experience, school education, personal code projects, art projects, and other cool websites -->
<!-- TODO: Make cursor be appropiate when hover buttons -->

<script lang="ts">
  import { onMount } from "svelte";
  import { musicController, musicTime, sfxController } from "../common/myLocalStorage";
  import { channels } from "./channelObject.js";
  import { ChannelFunctions } from "./channelFunctions";

  let bgMusic: HTMLAudioElement
  let songElements: HTMLAudioElement[] = []
  let hoverAudio: HTMLAudioElement
  let clickAudio: HTMLAudioElement
  let focusedChannel = -1

  onMount(() => {
    let video = document.querySelector('video');
    if (video != null){
      video.playbackRate = 0.5;
    }
    bgMusic = document.querySelector("bgm") as HTMLAudioElement
    for (let i = 0; i < channels.length; i++){
      let s = document.getElementById("music-clip-" + i) as HTMLAudioElement
      songElements.push(s)
    }
    hoverAudio = document.getElementById("channel-hover-audio") as HTMLAudioElement;
    clickAudio = document.getElementById("channel-click-audio") as HTMLAudioElement;
  })

  function focus(index: number, zIndex: string){
    let node = document.getElementById("channelBox-" + index);
    node ? node.style.zIndex = zIndex: null;
    let menuNode = document.getElementById("menu-bar");
    menuNode ? menuNode.style.zIndex = "-20": null;
  }

  musicTime.reset();

  
  const channelFunctions = new ChannelFunctions();

  // https://www.w3schools.com/howto/howto_css_zoom_hover.asp
  // https://svelte.dev/repl/2cf17ac3b4ea47a0ade11361c242e068?version=3.29.4

    
</script>


<div id="grid-container">
{#each channels as currentChannel, index}
    <div 
      on:mousedown={(e) => {
        if (!currentChannel.focused && $musicController){
          channelFunctions.playMusic(index, bgMusic, songElements[index], false);
        }
        focusedChannel = index;
      }}
      on:mouseenter={(e) => {
        if($sfxController){
          hoverAudio.play()
        }
      }}
    role="tab" aria-controls="tabpanel-{index}" tabindex="{index}" class="channel-container">
    <div
        class={focusedChannel == index ? "big-channel-container": "channel-box"}
        id="channelBox-{index}"
        on:animationstart={(e) => focus(index, "50")}
        on:animationend={(e) => focus(index, "1")}>

        {#if currentChannel.currentImage.includes(".webm")}
          <video autoplay loop muted playsinline src={currentChannel.currentImage}
            class="channel-image" playbackRate={3}>
          </video>
        {:else}
            <img src={currentChannel.currentImage} id="channel-image-{index}"
            alt="Channel covers"class="channel-image"/>
        {/if}
        
        
        {#if focusedChannel == index}
          <script>console.log("focused")</script>
          <div class="channel-bar">
            <button on:click={(e) => {
              focusedChannel = -1
              if ($sfxController){
                clickAudio.play()
              }
              if ($musicController){
                channelFunctions.playMusic(index, bgMusic,  songElements[index], true)
              }}
            }
            class="menu-button channel-buttons"
            id="mbutton-{index}">Menu</button>

            <button on:click={(e) => { if ($sfxController){clickAudio.play();}
              channelFunctions.redirect(index)}} class="play-button channel-buttons" 
            id="pbutton-{index}">
              Start
            </button>
          </div>
        {/if}
    </div>

    </div>

    <audio src="{currentChannel.musicClip}" id="music-clip-{index}"></audio>

{/each}
</div>


<style lang="scss">
    $channel-button-height: 40%;
    $channel-button-width: 40%;
    $channel-button-offset: -5%;
    $border-radius: 40px;
    #grid-container {
    display:grid;
    grid-template-columns: repeat(4, 0fr);
    grid-template-rows: repeat(3, 1fr);
    text-align: center;
    justify-content: center;
    gap: 1%;
    max-height: $channel-view-height;
    max-width: 100vw;
    padding: 1.5%;
  }

  .play-button{
    position: relative;
    height: $channel-button-height;
    width: $channel-button-width;
    right: $channel-button-offset;
    text-align: center;
    top: 20%;
  }

  .big-channel-container{
    position: fixed;
    left: 50%;
    top: 50%;
    max-width: 100vw;
    max-height: 100vh;
    transform: translate(-50%,-50%);
    width: 100vw;
    height: 100vh;
    z-index: 50;
    transition: all 1s;
    border-radius: $border-radius;
  }

  .channel-container {
    padding: 1px;
    border-radius: $border-radius;
    max-height: 25vh;
    max-width: 20vw;
    // text-align: center;
  }

  .channel-container:hover {
    // background: linear-gradient(skyblue, blue);
    box-shadow: 0px 0px 100px 100px lightblue inset;
  }


  .channel-box {
    padding: 2px;
    height: 20vh;
    width: 19.85vw;
    overflow: hidden;
    border-radius: $border-radius;
    transition: all 1s;
    z-index: 1;
    animation: z-high 1s linear;
  }

  @keyframes z-high{
    0%{
      z-index: 100;
    }
    100%{
      z-index: 100;
    }
  }

  .channel-box:hover{
    box-shadow: 0px 0px 10px 10vh lightblue inset;
  }


  .channel-image {
    object-fit: inherit;
    height: 100%;
    width: 100%;
    border-radius: 40px;
    text-align: center;
  }

  .menu-button{
    position: relative;
    height: $channel-button-height;
    width: $channel-button-width;
    left: $channel-button-offset;
    text-align: center;
    top: 20%;

  }

  .channel-bar{
    position: relative;
    overflow: hidden;
    background-color: white;
    height: 15%;
    width: 100%;
    bottom: 15%;
    display:block;
    border-radius: $border-radius;
  }
</style>