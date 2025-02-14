

<!-- TODO: Add work experience, school education, personal code projects, art projects, and other cool websites -->
<!-- TODO: Make cursor be appropiate when hover buttons -->

<script lang="ts">
  import { onMount } from "svelte";
  import { musicController, musicTime, sfxController } from "../../common/myLocalStorage";
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
    for (let i = 0; i < channels.length; i++){
      let s = document.getElementById("music-clip-" + i) as HTMLAudioElement
      songElements.push(s)
    }
    getAudioElements()
  })

  function focus(index: number, zIndex: string){
    let node = document.getElementById("channelBox-" + index);
    node ? node.style.zIndex = zIndex: null;
    let menuNode = document.getElementById("menu-bar");
    menuNode ? menuNode.style.zIndex = "-20": null;
  }


  function getAudioElements(){
    bgMusic = document.getElementById("bgm") as HTMLAudioElement
    hoverAudio = document.getElementById("channel-hover-audio") as HTMLAudioElement;
    clickAudio = document.getElementById("channel-click-audio") as HTMLAudioElement;
  }

  function moveChannelToCenter(channelIndex: number){
    let box = document.getElementById("channelBox-" + channelIndex) as HTMLElement;
    const boxRect = box.getBoundingClientRect();

    // Get viewport center
    const centerX = window.innerWidth / 2 + boxRect.width / 4;
    const centerY = window.innerHeight / 2 + boxRect.height / 4;

    // Get the current center of the div
    const boxCenterX = boxRect.left + boxRect.width;
    const boxCenterY = boxRect.top + boxRect.height;

    // Calculate distance to center
    const deltaX = centerX - boxCenterX;
    const deltaY = centerY - boxCenterY;

    // Apply translation
    box.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }

  function resetChannelPosition(channelIndex: number){
    let box = document.getElementById("channelBox-" + channelIndex) as HTMLElement;
    box.style.transform = ``
  }

  musicTime.reset();

  
  const channelFunctions = new ChannelFunctions();

  // https://www.w3schools.com/howto/howto_css_zoom_hover.asp
  // https://svelte.dev/repl/2cf17ac3b4ea47a0ade11361c242e068?version=3.29.4

    
</script>


<section id="grid-container">
{#each channels as currentChannel, index}
    <!-- Focus blur background -->
    

    <div 
      on:mousedown={(e) => {
        getAudioElements()
        if (!currentChannel.focused && $musicController){
          channelFunctions.playMusic(index, bgMusic, songElements[index], false);
        }
        if (currentChannel.redirect != ''){
          focusedChannel = index;
          moveChannelToCenter(index)
        }
      }}
      on:mouseenter={(e) => {
        if($sfxController){
          hoverAudio.play()
        }
      }}
    role="tab" aria-controls="tabpanel-{index}" tabindex="{index}" class="channel-container">
      <!-- Image Div -->
      {#if currentChannel.redirect != ''}
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
        </div>
      {:else}
        <div class="channel-box glass" id="channelBox-{index}">
        </div>
      {/if}
    {#if focusedChannel == index}
      <div class="channel-bar">
        <h2>Continue to {currentChannel.channelName} Page?</h2>
        <button on:click={(e) => {
          focusedChannel = -1
          resetChannelPosition(index)
          if ($sfxController){
            clickAudio.play()
          }
          if ($musicController){
            channelFunctions.playMusic(index, bgMusic,  songElements[index], true)
          }}
        }
        class="menu-button channel-buttons"
        id="mbutton-{index}">
          Back
        </button>

        <button on:click={(e) => { if ($sfxController){clickAudio.play();}
          channelFunctions.redirect(index)}} class="play-button channel-buttons" 
        id="pbutton-{index}">
          Continue
        </button>
      </div>
    {/if}

    </div>
    {#if focusedChannel != -1}
      <div style="height: 100vh; width:100vw; 
      position:absolute; background-color: rgba(255, 255, 255, 0.111);
      backdrop-filter: blur(2px); top:0;left:0;"></div>
    {/if}

    <audio src="{currentChannel.musicClip}" id="music-clip-{index}"></audio>

{/each}
</section>


<style lang="scss">
  @use "channel";
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

</style>