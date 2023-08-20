<script lang="ts">
  import { onMount } from "svelte";

  function dayToName(d: any) {
    switch (d) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
  }

  let time = new Date();
  $: hour = time.getHours();
  $: min = time.getMinutes();
  $: dayOrNight = "AM";
  $: date = time.getDate();
  $: month = time.getMonth();
  $: day = dayToName(time.getDay());

  onMount(async () => {
    const interval = setInterval(() => {
      time = new Date();
      dayOrNight = hour >= 12 ? "PM" : "AM";
    }, 1000);
  });
</script>

<head>
  <link
    rel="stylesheet"
    href="https://github.com/danintosh/Wii-Menu-HTML/blob/main/clock.ttf"
  />
</head>

<div id="menu-bar">
  <button id="left-bar-button" class="bar-button" />

  <img id="menu-svg" src="wii bar final.png" alt="wii bar" />

  <button id="right-bar-button" class="bar-button" />

  <div id="top-text">
    <h3 id="name" class="text">Ezequiel Valencia</h3>

    <p id="description" class="text">
      Uconn CS graduate who also does creative work.
    </p>
  </div>

  <div id="bar-div">
    <p id="clock">
      {hour}:{min}
      {dayOrNight} | {day}
      {date}/{month}
    </p>
  </div>
</div>

<style lang="scss">
  $button-horizontal-offset: 2%;

  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap");

  .bar-button {
    position: absolute;
    border-radius: 50%;
    height: 50%;
    width: 10%;
    z-index: 2;
    bottom: 20%;
  }

  .bar-button:hover {
    cursor: url("/Cursors/Wii-Curso-plain.png") auto;
  }

  .text {
    text-align: center;
    // font-family:'Times New Roman', Times, serif;
  }

  #top-text {
    position: fixed;
    text-align: center;
    top: 75vh;
    // left: 50%;
    width: 100%;
    // height: 50%;
  }

  #clock {
    font-size: 150%;
    font-family: "IBM Plex Mono", monospace;
  }

  #bar-div {
    position: fixed;
    text-align: center;
    width: 30vw;
    bottom: 0%;
  }

  #description {
    // position: absolute;
    // font: size 100vw;
    // font-size: large;
    // top: 25%;
  }

  #name {
    // position: absolute;

    font-size: xx-large;
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
