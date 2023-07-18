<script lang="ts">
  const nRows = 4;
  const nCols = 3;
  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */
  
  // Needs to be initalized with some form of variables or else compiler throws fit
  let channels: { coverImage: string; gifImage: string, currentImage: string, hover: boolean }[] = [
    {
      coverImage: '/Channel Covers/covers/no-signal.png',
      gifImage: '/Channel Covers/no signal.gif',
      currentImage: '',
      hover: false
    }
  ];
  const channelPriorLength = channels.length

  // Fill channels with default if still space
  for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
      ? channels.push({coverImage: '/Channel Covers/covers/no-signal.png', gifImage: '/Channel Covers/no signal.gif', currentImage: '', hover:false})
      : null;
    channels[index].currentImage = channels[index].coverImage
  }


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

  }

  const channelFunctions = new ChannelFunctions();

  


</script>

<div id="mainDiv">
  <div id="grid-container">
    {#each channels as currentChannel, index}
      <div class="channel-container">
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
    z-index:1000;
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

  .channel-container {
    padding: 1px;
    border-radius: $border-radius;
    max-height: 25vh;
    max-width: 20vw;
    text-align: center;
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
