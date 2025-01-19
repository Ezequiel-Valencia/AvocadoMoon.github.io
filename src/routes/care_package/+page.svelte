<script lang="ts">
</script>

<section id="main-div">
  <div id="text-div" style="">
    <h1>Hidden amongst the stars:</h1>
    <div style="width: 20vw; margin:auto;">
      <ul style="text-align: center;">
        <li>
          <a href="https://youtu.be/ovW7yRi1iJ8">Cat music video</a>
        </li>
        <li>
          <a href="https://www.instagram.com/reel/DEuCV38uB7h/?igsh=a2w3M3M3ZWo0aW1h">Cat Edit</a>
        </li>
        <li>
          <a href="https://kry.pt/">Terminal Site</a>
        </li>
        <li>
          <a href="https://juneish.neocities.org/">Strange world</a>
        </li>
        <li>
          <a href="https://youtu.be/ET2JmjbjE68">Ambient Music Mix :)</a>
        </li>
        <li>
          <a href="https://youtu.be/Nrk8sqZfsgI">How to pronounce GIF</a>
        </li>
        <li>
          <a href="https://scottts.itch.io/different-strokes">Interactive art gallery</a>
        </li>
        <li>
          <a href="https://cosmicadventuresquad.itch.io/it-was-all-for-the-tuna">Fisherman</a>
        </li>
        <li>
          <a href="https://anaissalla.itch.io/nomnom">Animal Chef Jam :0</a>
        </li>
        <li>
          <a href="https://rewindgames.itch.io/tanuki-sunset"> Racoon tricks</a>
        </li>
        <li>
          <a href="https://youtu.be/WSbUPaLTTUg">The sun is pretty.</a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Kiki%27s_Delivery_Service">Flying animation</a>
        </li>
        <li>
          <a href="https://neal.fun/">Interesting Games</a>
        </li>
      </ul>
    </div>
  
  </div>
  
</section>

<style lang="scss">
  #main-div {
    background-image: url("/Backgrounds/stars.jpg");
    height: auto;
    min-height: 100vh;
    width: 100vw;
    align-items: center;
    top: 0;
    left: 0;
    position: absolute;
  }

  #text-div{
    text-align: center;
    background-color: rgba(255, 255, 255, 0.911);
    max-width: 80vw;
    margin: auto;
    border-radius: 5px;
    position: relative;
    margin-top: 1%;
    margin-bottom: 1%;
    padding: 1%;
  }

  h1, li, a{
    color: rgb(0, 0, 0);
  }

 

  li{
    text-indent: -5%;
    padding-top: 2vh;
    padding-bottom: 2vh;
    list-style: none;
  }
   ul li{
    display: flex;
    align-items: center; /* Align items vertically in the middle */
   }

  ul li::before {
  content: "";
  display: block;
  width: 20px; /* Set the size of the list item marker */
  height: 20px; /* Set the size of the list item marker */
  background-image: url('/personal_projects/moon.svg'); /* Your custom image */
  background-size: cover; /* Resize the image to cover the size set */
  margin-right: 15px; /* Space between the marker and the list item text */
}

</style>
