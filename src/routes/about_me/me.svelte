<script lang="ts">
</script>

<div id="intro">
  <h1 id="about-me">About Me</h1>

  <div id="squircle" />

  <div id="description">
    <p id="description-text">
      I'm a recent UConn graduate in Cybersecurity. I apply my knowledge to
      differing fields of computer science such as bio-informatics, IT, full-end
      development, and of course cybersecurity. CS is not my entire life and
      although it helps me feel a sense of Ikurgami, life is not only work. In
      my freetime I live life.
    </p>
  </div>
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Tangerine:wght@700&display=swap");

  #intro {
    height: 100vh;
    width: 100vw;
    background-color: #40bfba;
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

  #description-text{
    left: 50%;
    transform: translate(-50%);
    position: absolute;
    margin: 0;
    bottom: 10%;

    font-size: x-large;
  }
</style>
