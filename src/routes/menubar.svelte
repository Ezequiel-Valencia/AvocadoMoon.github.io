<div id="menu-bar">
  <button id="left-bar-button" class="bar-button" />

  <img id="menu-svg" src="wii bar final.png" alt="wii bar" />

  <button id="right-bar-button" class="bar-button" />

  <h3 id="name" class="text">Ezequiel Valencia</h3>
  <p id="description" class="text">
    I'm a CS UConn graduate <br /> who also does creative work.
  </p>
</div>

<style lang="scss">
  $button-horizontal-offset: 2%;

  .bar-button {
    position: absolute;
    border-radius: 50%;
    height: 50%;
    width: 10%;
    z-index: 2;
    bottom: 20%;
  }

  .text {
    position: absolute;
  }

  #text-div {
    text-align: center;
    width: 10%;
  }

  #description {
    bottom: 10%;
  }

  #left-bar-button {
    left: $button-horizontal-offset;
  }

  #right-bar-button {
    right: $button-horizontal-offset;
  }

  #menu-svg {
    position: fixed;
    height: 20vh;
    bottom: 0%;
    width: 100%;
  }

  #menu-bar {
    position: fixed;
    height: 100vh - $channel-view-height;
    width: 100vw;
    bottom: 100%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    text-align: center;
    // background-color: white;
  }
</style>
