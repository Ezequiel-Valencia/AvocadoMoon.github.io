<script lang="ts">
  const nRows = 3;
  const nCols = 4;
  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects
  */
  
  // Needs to be initalized with some form of variables or else compiler throws fit
  let channels: { coverImage: string; gifImage: string, currentImage: string }[] = [
    {
      coverImage: '/Channel Covers/covers/no-signal.png',
      gifImage: '/Channel Covers/no signal.gif',
      currentImage: ''
    }
  ];
  const channelPriorLength = channels.length

  // Fill channels with default if still space
  for (let index = 0; index < nRows * nCols; index++) {
    index < ((nRows * nCols) - channelPriorLength)
      ? channels.push({coverImage: '/Channel Covers/covers/no-signal.png', gifImage: '/Channel Covers/no signal.gif', currentImage: ''})
      : null;
    channels[index].currentImage = channels[index].coverImage
  }


  class ChannelFunctions {
    staticImage(event: PointerEvent, id: number) {
      channels[id].currentImage = channels[id].coverImage;
    }
    playgif(event: PointerEvent, id: number) {
      channels[id].currentImage = channels[id].gifImage;
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
          <img src={currentChannel.currentImage} alt="Channel covers" class="channel-cover" />
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  $channelGridHeight: 80vh;
  #mainDiv {
    height: 100vh;
    width: 100vw;
  }

  #grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    height: $channelGridHeight;
  }

  .channel-container {
    background-color: #f1f1f1;
    text-align: center;
    padding: 5px;
    border-radius: 10px;
    display: inline-block;
  }

  .channel-container:hover {
    background: linear-gradient(skyblue, blue);
  }

  .channel-box {
    padding: 2px;
    height: 80%;

    border-radius: 10px;
    background: black;
  }
  .channel-cover{
    height: 100%;
    width:min-content;
    object-fit:contain;
  }
</style>
