<script lang="ts">
  const nRows = 3;
  const nCols = 4;
  /*
  Trying to create reactive elements using classes is to much of a pain.
  Svelte only seems to recognize top level abstraction elements, and does not bother with 
  reactivity of nested class objects

  */

  class Channel {
    channelImage;
    gifImage;
    currentImage = '';
    hover = false;

    constructor(
      channelImage = "/Channel Covers/covers/no-signal.png",
      gifImage = "/Channel Covers/no signal.gif"
    ) {
      this.channelImage = channelImage;
      this.gifImage = gifImage;
      this.currentImage = channelImage;
    }
    staticImage() {
      this.currentImage = '/Channel Covers/covers/no-signal.png';
      this.hover = false;
      console.log(this.hover);
    }
    playgif(event: PointerEvent) {
      this.currentImage = '/Channel Covers/no signal.gif';
      this.hover = true;
      console.log(this.hover);
      console.log(event.target.id)
    }
  }
  const channelData: { coverImage: string; gifImage: string }[] = [];

  let channels: Channel[] = [];

  // Fill channels with all the different channels available
  for (let index = 0; index < nRows * nCols; index++) {
    index < channelData.length
      ? channels.push(
          new Channel(
            channelData[index].coverImage,
            channelData[index].gifImage
          )
        )
      : channels.push(new Channel());
  }

  $: channels;
</script>

<div id="mainDiv">
  <div id="grid-container">
    {#each channels as currentChannel, index}
      <div class="channel-container">
        <div
          on:pointerenter={currentChannel.playgif}
          on:pointerleave={currentChannel.staticImage}
          class="channel-box"
          id="channelBox-{index}"
        >
          {#if currentChannel.hover}
          <img src={currentChannel.currentImage} alt="GIF" class="gif" />
          {/if}
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
    height: 100%;

    border-radius: 10px;
    background: black;
  }
</style>
