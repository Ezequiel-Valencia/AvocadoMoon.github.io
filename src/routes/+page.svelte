<script lang="ts">
  const nRows = 3;
  const nCols = 4;
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
            class="channel-cover"
          />
        </div>
      </div>
    {/each}
  </div>
  <div id='meta-data'>

  </div>
</div>

<style lang="scss">
  #mainDiv {
    height: 100vh;
    width: 100vw;
    background: url('/wi-background.png');
    // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
    cursor: url("/Cursors/Wii-Curso-plain.png"), auto;
  }

  #grid-container {
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    max-height: 80vh;
    max-width: 100vw;
  }

  .channel-container {
    background-color: #f1f1f1;
    text-align: center;
    padding: 5px;
    border-radius: 10px;
    max-height: 20vh;
    gap: 10px;
  }

  .channel-container:hover {
    background: linear-gradient(skyblue, blue);
  }


  .channel-box {
    padding: 2px;
    height: 100%;

    border-radius: 10px;
    background: black;
  }

  .channel-cover {
    object-fit: cover;
    height: 100%;
    width: 100%
  }

  
</style>
