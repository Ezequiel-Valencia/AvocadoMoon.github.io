
<!-- TODO: Add music to different channels -->
<!-- TODO: Add work experience, school education, personal code projects, art projects, and other cool websites -->
<!-- TODO: Make cursor be appropiate when hover buttons -->

<script lang="ts">
  import { musicController, sfxController } from "../globals";
    const nRows = 4;
  const nCols = 3;
  
    
    /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */
  
  function focus(index: number, zIndex: string){
    let node = document.getElementById("channelBox-" + index);
    node ? node.style.zIndex = zIndex: null;
    let menuNode = document.getElementById("menu-bar");
    menuNode ? menuNode.style.zIndex = "-20": null;
  }

  let musicClipDir = "/Audio/Intro-Clips"

  // Needs to be initalized with some form of variables or else compiler throws fit
  let channels: { coverImage: string; gifImage: string, currentImage: string, focused:boolean , hover: boolean, redirect: string, musicClip:string }[] = [
    {
      coverImage: '/Channel Covers/about me cover.png',
      gifImage: '/Channel Covers/about me cover.png',
      currentImage: '',
      focused: false,
      hover: false,
      redirect: '/about_me',
      musicClip: musicClipDir + '/About_Me_Intro.mp3'
    },
    {
      coverImage: "/Channel Covers/work experience.jpg",
      gifImage: "/Channel Covers/work experience.jpg",
      currentImage: '',
      focused: false,
      hover: false,
      redirect: '/work_experience',
      musicClip: musicClipDir + '/Work_Exp_Intro.mp3'
    },
    {
      coverImage: "/Channel Covers/Zine_Cover.png",
      gifImage: "Channel Covers/Zine_Cover.png",
      currentImage: '',
      focused: false,
      hover: false,
      redirect: "/zines",
      musicClip: musicClipDir + '/Zine_Intro.mp3'
    }
  ];
  const channelPriorLength = channels.length

  // Fill channels with default if still space
  for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
      ? channels.push({coverImage: '/Channel Covers/no signal low con.gif', gifImage: '/Channel Covers/no signal low con.gif', currentImage: '', hover:false, focused:false, redirect:'', musicClip: ''})
      : null;
    channels[index].currentImage = channels[index].coverImage
  };

    class ChannelFunctions {
      hoverSound = 1;
      clickSound = 2;
      musicClip = 3;
      backgroundMusic = 4;

    staticImage(event: PointerEvent, id: number) {
      channels[id].currentImage = channels[id].coverImage;
      channels[id].hover = false;
    }
    
    async playgif(event: PointerEvent, id: number) {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      channels[id].hover = true;
      await sleep(1000);
      channels[id].hover ? channels[id].currentImage = channels[id].gifImage : null;
    }

    playMusic(id: number, typeOfMusic: number){
      if ($musicController){
        let bgMusic = document.getElementById("bgm") as HTMLAudioElement;
        let musicClip = document.getElementById("music-clip-" + id) as HTMLAudioElement;
        switch (typeOfMusic){
          case this.musicClip:
            bgMusic.pause();
            musicClip.currentTime = 0;
            musicClip.play();
            break;
          
          case this.backgroundMusic:
            musicClip.pause();
            bgMusic.play()
            break
        }
      }
    }

    playSfx(typeOfSound:number){
      if($sfxController){
        switch (typeOfSound){
          case this.hoverSound:
            let audio = document.getElementById("channel-hover-audio") as HTMLAudioElement;
            audio.play();
            break
          case this.clickSound:
            let clickAudio = document.getElementById("channel-click-audio") as HTMLAudioElement;
            clickAudio.play();
            break;
      }
      }
    }

    redirect(id:number){
      if(channels[id].redirect == '') return;
      location.href = channels[id].redirect;
    }


    // https://developer.mozilla.org/en-US/docs/Web/CSS/animation

  };
  const channelFunctions = new ChannelFunctions();

  // https://www.w3schools.com/howto/howto_css_zoom_hover.asp
  // https://svelte.dev/repl/2cf17ac3b4ea47a0ade11361c242e068?version=3.29.4

    
</script>


<div id="grid-container">
{#each channels as currentChannel, index}
    <div 
    on:mousedown={(e) => {currentChannel.focused = true; 
      channelFunctions.playMusic(index, channelFunctions.musicClip)}}

    on:mouseenter={(e) => {channelFunctions.playSfx(channelFunctions.hoverSound)}}
    role="tab"
    aria-controls="tabpanel-{index}"
    tabindex="{index}"
    class="channel-container">
    <div
        on:pointerenter={(e) => channelFunctions.playgif(e, index)}
        on:pointerleave={(e) => channelFunctions.staticImage(e, index)}
        class={currentChannel.focused ? "big-channel-container": "channel-box"}
        id="channelBox-{index}"
        
        on:animationstart={(e) => focus(index, "50")}
        on:animationend={(e) => focus(index, "1")}
        
    >
        <img
        src={currentChannel.currentImage}
        id="channel-image-{index}"
        alt="Channel covers"
        class="channel-image"
        />
        
        {#if currentChannel.focused}
        <div
        class="channel-bar">

        <button 
        on:click={(e) => {currentChannel.focused = false; 
          channelFunctions.playSfx(channelFunctions.clickSound)
          channelFunctions.playMusic(index, channelFunctions.backgroundMusic)
          }}
        class="menu-button channel-buttons"
        id="mbutton-{index}">Menu</button>

        <button on:click={(e) => {channelFunctions.playSfx(channelFunctions.clickSound);
           channelFunctions.redirect(index)}}
        class="play-button channel-buttons" 
        id="pbutton-{index}">Start</button>
        
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