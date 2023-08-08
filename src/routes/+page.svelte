<script lang="ts">
  const nRows = 4;
  const nCols = 3;
  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */
  
  // Needs to be initalized with some form of variables or else compiler throws fit
  let channels: { coverImage: string; gifImage: string, currentImage: string, focused:boolean , hover: boolean }[] = [
    {
      coverImage: '/Channel Covers/covers/no-signal.png',
      gifImage: '/Channel Covers/no signal.gif',
      currentImage: '',
      focused: false,
      hover: false
    }
  ];
  const channelPriorLength = channels.length

  // Fill channels with default if still space
  for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
      ? channels.push({coverImage: '/Channel Covers/covers/no-signal.png', gifImage: '/Channel Covers/no signal.gif', currentImage: '', hover:false, focused:false})
      : null;
    channels[index].currentImage = channels[index].coverImage
  };


  class ChannelFunctions {
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

    zoom(e: MouseEvent, id:number){
      console.log("Zoomed")
      let node = document.getElementById("channelBox-" + id)
      function zoomIn(duration: number){
        node ? node.style.position = "fixed": null;
        node ? node.style.left = "50%": null;
        node ? node.style.top = "50%": null;
        node ? node.style.transform = "translate(-50%, -50%)": null;
        node ? node.style.width = '100vw' : null;
        node ? node.style.height = '100vh' : null;
        node ? node.style.transition = 'all 2s ease-in-out' : null;

        // node ? node.classList.remove("channel-container"): null;
        // node ? node.classList.add("big-channel-container"): null;


      }

      function zoomOut(duration: number){
        return {
          duration,
          css: 'transform: scale(1)'
        }
      }

      let duration = 1
      return channels[id].focused ? zoomIn(duration * 1.2) : zoomOut(duration) 
    }
  };
  const channelFunctions = new ChannelFunctions();

  // https://www.w3schools.com/howto/howto_css_zoom_hover.asp
  // https://svelte.dev/repl/2cf17ac3b4ea47a0ade11361c242e068?version=3.29.4

</script>

<div id="mainDiv">
  <div id="grid-container">
    {#each channels as currentChannel, index}
      <div 
      on:mousedown={(e) => {currentChannel.focused = true; channelFunctions.zoom(e, index)}}
      role="tab"
      aria-controls="tabpanel-{index}"
      tabindex="{index}"
      class="channel-container">
        {#key currentChannel.focused}
        <div
          on:pointerenter={(e) => channelFunctions.playgif(e, index)}
          on:pointerleave={(e) => channelFunctions.staticImage(e, index)}
          class="channel-box"
          id="channelBox-{index}"
        >
          <img
            src={currentChannel.currentImage}
            alt="Channel covers"
            class="channel-image"
          />
        </div>
      {/key}

      </div>

    {/each}

    {#each channels as currentChannel, index}


    <div class="center-channel-copy">

    </div>
      
    {/each}
  </div>
  <div id='meta-data'>

  </div>
</div>

<style lang="scss">
  $border-radius: 40px;
  #mainDiv {
    height: 100vh;
    width: 100vw;
    // background: url('/wi-background.png');
    background-color: rgb(0, 119, 255);
    padding: 0%;
    position: fixed;
    // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
    cursor: url("/Cursors/Wii-Curso-plain.png"), auto;

    // covers whole screen
    top:0px;
    left:0px;
  }

  #grid-container {
    display:grid;
    grid-template-columns: repeat(4, 0fr);
    grid-template-rows: repeat(3, 1fr);
    text-align: center;
    justify-content: center;
    gap: 1%;
    max-height: 80vh;
    max-width: 100vw;
    padding: 1.5%;
  }

  .big-channel-container{
    width: 100vw;
    height: 100vh;
    left: 50%;
    top: 50%;
    position:fixed;
    transform: translate(-50%, -50%);
    -webkit-transition: all 2s ease-in-out;
    transition: all 2s ease-in-out;
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

    border-radius: $border-radius;
  }

  .channel-box:hover{
    box-shadow: 0px 0px 10px 10vh lightblue inset;
  }


  .channel-image {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 40px;
    text-align: center;
  }

  
</style>
