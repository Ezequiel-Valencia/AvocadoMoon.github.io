<script lang="ts">

    export let transControl;
</script>


<div style="position:absolute; top:0; left:0; background-image: url('/Backgrounds/stars.jpg'); width:100vw; height:100vh;">
    <div style="opacity:0.92; margin-top: 8vh; text-align:center; margin-left:auto; margin-right:auto; width: 80vw; height:60vh; background-color:white;">
      <h1 style="padding-top: 2vh;">This channel features an intro that is only available on computers.</h1>
      <h3>You can skip that intro and view my personal projects.</h3>
      <button on:click={transControl.updateToTransitioned()} style="">
        <u>
          <i>
            <h3 style="font-family: 'Times New Roman', Times, serif; font-size:x-large;">Skip Intro</h3>
          </i>
        </u>
      </button>
    </div>
</div>