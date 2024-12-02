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
          <button class="btn" on:click={(e) => {checkedOutBook()}} on:pointerenter={(e) => {}}
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

    /* 5 */
  .btn {
    background: white;
    color: black;
    line-height: 42px;
    padding: 0;
    border: none;
    border-radius: 5%;
    padding: 1%;
    transition: all 0.3s ease;
    display: inline-block;
    position: relative;
  }
  .btn:hover {
    background: black;
    color: white;
    box-shadow:
    -7px -7px 20px 0px #fff9,
    -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002,
    4px 4px 5px 0px #0001;
  }
  .btn:before,
  .btn:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: white;
    transition:400ms ease all;
  }
  .btn:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }
  .btn:hover:before,
  .btn:hover:after{
    width:100%;
    transition:800ms ease all;
  }


</style>
