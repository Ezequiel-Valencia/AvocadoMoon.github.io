<script lang="ts">
  interface Props {
    bookCheckedOut: boolean;
  }

  let { bookCheckedOut = $bindable() }: Props = $props();
</script>

<section id="intro-div">
  <div class="fade">
    <div class="content-div">
      <blockquote class="text">
        “Education is the movement from darkness to light.”
        <cite>- Allan Bloom</cite>
      </blockquote>
      <button
        class="btn"
        aria-pressed={bookCheckedOut}
        onclick={() => {
          bookCheckedOut = !bookCheckedOut;
        }}
      >
        {bookCheckedOut ? 'Return Book' : 'Checkout Book'}
      </button>
    </div>
  </div>
</section>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

  #intro-div {
    width: 100%;
    background-image: url('/Education/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .fade {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.99));
  }

  .content-div {
    width: min(80vw, 1100px);
    margin: 0 auto;
    text-align: left;
  }

  .text {
    margin: 0 0 1.5rem;
    color: white;
    font-size: clamp(1.5rem, 5vmin, 2.5em);
    font-family: 'Times New Roman', Times, serif;

    cite {
      display: block;
      margin-top: 0.5rem;
      font-style: normal;
    }
  }

  .btn {
    position: relative;
    display: inline-block;
    padding: 0.25em 0.75em;
    border: none;
    border-radius: 6px;
    background: white;
    color: black;
    font-family: 'Times New Roman', Times, serif;
    font-size: clamp(1.4rem, 4vmin, 2.5em);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .btn:hover,
  .btn:focus-visible {
    background: black;
    color: white;
    box-shadow:
      -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001;
  }
  .btn:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
  }
  .btn:before,
  .btn:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 0;
    background: white;
    transition: 400ms ease all;
  }
  .btn:after {
    right: inherit;
    top: inherit;
    left: 0;
    bottom: 0;
  }
  .btn:hover:before,
  .btn:hover:after,
  .btn:focus-visible:before,
  .btn:focus-visible:after {
    width: 100%;
    transition: 800ms ease all;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn,
    .btn:before,
    .btn:after {
      transition: none !important;
    }
  }
</style>
