<script lang="ts">
</script>

<div id="intro">
  <h1 id="about-me">About Me</h1>

  <div id="squircle" />

  <div id="description">
    <p id="description-text">
      I'm a Cybersecurity graduate from UConn. 
      I apply my knowledge to differing fields of computer science, 
      such as bio-informatics, IT, full-end development, and of course cybersecurity. 
      Although computer science helps me feel a sense of Ikigai, work is not life, 
      so I try to spend my free time exploring life to its fullest.
    </p>
  </div>
</div>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&family=Merriweather:wght@300&display=swap');

  #intro {
    height: 100vh;
    width: 100vw;
    background-color: #40bfba;
    text-align: center;
  }
  #squircle {
    height: 40%;
    aspect-ratio: 1/1;
    border-radius: 5%;
    overflow: auto;
    margin: auto;

    background-image: url("/about_me/stairs-candid.jpg");
    background-size:cover;
    background-repeat: no-repeat;
    background-attachment:local;
  }

  #about-me {
    margin: 0;
    padding: 2%;
    font-family: 'Cormorant Garamond', serif;
    font-size: 10vh;
    font-weight: 100;
    text-align: center;
    top: 5%;
  }

  #description-text{
    padding: 5%;
    margin: auto;
    max-width: 900px;

    font-size: x-large;
  }
</style>
