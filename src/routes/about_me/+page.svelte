<script lang="ts">
</script>

<div id="main-div">
  <div id="intro">
    <h1 id="about-me">About Me</h1>

    <div id="squircle" />

    <div id="description">
      <p id="description-text">
        Text about me saying stuff about CS, Iregarmi, 
        living life, and vibing.
      </p>
    </div>

  </div>

<div id="hobbies">
  <div id="Atheletic">

  </div>

  <div id="Art">

  </div>

  <div id="Enviromental-Agriculture">

  </div>

  <div id="Community"></div>

  <div id="Entertainment"></div>

</div>
</div>

<!-- https://www.youtube.com/watch?v=vJNVramny9k -->
<!-- Squircle is a lot easier so that for now -->

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap");

  #main-div {
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    padding: 0%;
    position: absolute;
  }

  #intro {
    height: 100vh;
    width: 100vw;
    background-color: rgb(4, 70, 4);
    text-align: center;
  }

  #squircle {
    top: 20%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
    position: absolute;
    height: 40%;
    aspect-ratio: 1/1;
    border-radius: 5%;

    background-image: url("/about_me/stairs-candid.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  #about-me {
    margin: 0;
    font-family: "Tangerine", cursive;
    font-size: 10vh;
    position: absolute;
    text-align: center;
    top: 5%;
    left: 50%;
    transform: translate(-50%);
    // padding-top: 5%;
  }

  #hobbies{
    height: 100vh;
    width: 100vw;
    background: linear-gradient(to bottom, rgb(4, 70, 4), rgb(8, 40, 126), rgb(45, 10, 102));
  }

  #description-text{
    left: 50%;
    transform: translate(-50%);
    position: absolute;
    margin: 0;
    bottom: 25%;

    font-size: x-large;
  }

</style>
