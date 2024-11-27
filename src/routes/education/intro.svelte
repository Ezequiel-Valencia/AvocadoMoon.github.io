<script lang="ts">
  import { onMount } from "svelte";
  import { createBookCheckout } from "./education";
  
  let bookCheckout = createBookCheckout()

  function checkedOutBook(){
    bookCheckout.toggleBookStatus()
    let main = document.querySelector("#main-div") as HTMLElement
    if (bookCheckout.read()){
      main.style.cursor = 'url("/Education/book-cursor.png") 28 23, auto' //numbers tell where in image to center hot-spot of cursor
    } else {
      main.style.cursor = 'default'
    }
    
  }
  
</script>


<section id="intro-div" style="height: 100vh;">
  <div style="height: 100vh;background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.99));">
    <div class="content-div" style="top: 25%; margin-bottom:25%">
      <article>
        <div>
          <p class="text" style="margin-top:0; font-size:2.5em;">
            “Education is the movement from darkness to light.” – Allan Bloom
          </p>
          <button on:click={(e) => {checkedOutBook()}} 
            style="margin-top:0; font-size:2.5em; font-family: 'Times New Roman', Times, serif;">
            {#if $bookCheckout}
              Return Book
            {:else}
              Checkout Book
            {/if}
          </button>
        </div>
      </article>
    </div>
  </div>
</section>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
  #intro-div {
    height: auto;
    width: 100vw;
    background-image: url("https://bh.novlr.org/wp-content/uploads/2023/11/jez-timms-vTKLujPJecw-unsplash-1536x1026.jpg");
    background-repeat:no-repeat;
    background-size:cover;
  }

  p{
    color: white;
  }

  article {
    height: auto;
    width: auto;
    display: flex;
  }
  .content-div {
    width: 80vw;
    height: 80vh;
    text-align: center;
    margin: auto;
    position: relative;
  }

  

  .text {
    margin-top: 10vh;
    margin-left: 5vw;
    text-align: left;
    font-size: 5em;
    font-family: 'Times New Roman', Times, serif;
  }

</style>
