<script lang="ts">
  let { transControl } = $props();
</script>

<div class="stars">
  <div class="notice">
    <h2>This channel features an intro that is only available on computers.</h2>
    <p>You can skip that intro and view my personal projects.</p>
    <button class="skip-intro" onclick={() => transControl.updateToTransitioned()}>
      Skip Intro
    </button>
  </div>
</div>

<style lang="scss">
  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 100vh;
    padding: 8vh 16px;
    box-sizing: border-box;
    background-image: url('/Backgrounds/stars.jpg');
    background-size: cover;
  }

  .notice {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
    background-color: rgba(255, 255, 255, 0.92);
    text-align: center;

    h2 {
      margin-top: 0;
      font-size: x-large;
      font-weight: bold;
    }

    p {
      font-size: large;
    }
  }

  .skip-intro {
    margin-top: 1rem;
    padding: 0.25em 0.75em;
    background: none;
    border: 2px solid black;
    border-radius: 0.5em;
    font-family: 'Times New Roman', Times, serif;
    font-size: x-large;
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
