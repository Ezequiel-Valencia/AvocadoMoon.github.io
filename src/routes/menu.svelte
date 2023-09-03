<script lang="ts">
//   import { onMount } from "svelte";
//   import { browser } from "$app/environment";
//   import { gsap } from "gsap";
//   import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

//   let scroll: any = true;

//   let scrollTop: any = null;
//   let scrollLeft: any = null;

//   function disableScroll() {
//     if (browser) {
//       scrollTop = window.scrollY || window.document.documentElement.scrollTop;
//       (scrollLeft =
//         window.scrollX || window.document.documentElement.scrollLeft),
//         (window.onscroll = function () {
//           window.scrollTo(scrollLeft, scrollTop);
//         });
//     }
//   }

//   function enableScroll() {
//     if (browser) {
//       window.onscroll = function () {};
//     }
//   }

//   $: if (!scroll) {
//     disableScroll();
//   } else {
//     enableScroll();
//   }

  let home_menu = false;
//   let contact_me = false;
  export let email: string;

//   onMount(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     gsap.from(".nav", {scrollTrigger: {pin: "#home-menu-nav"}})
//   })

</script>

{#if !home_menu}
  <nav id="menu-nav">
    <button
      on:click={(e) => {
        home_menu = !home_menu;
        // scroll = false;
      }}>Menu</button
    >
  </nav>
{/if}

{#if home_menu}
  <div id="home-menu-nav">
    <div id="big-button-div">
      <button
        on:click={(e) => {
          location.href = "/";
        }}>Main Menu</button
      >
      <button
        on:click={(e) => {
          home_menu = !home_menu;
        //   scroll = true;
        }}>Return</button
      >
    </div>
    <div id="contact-me">
      <h1>Contact Me</h1>
      <p>Email: {email}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  #menu-nav {
    $border-style: solid;
    position: fixed;
    top: 0;
    padding: 1%;
    left: 50%;
    transform: translate(-50%);
    border-bottom-style: $border-style;
    border-width: 1px;
    border-color: white;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.164);
    width: 20%;
    height: 2%;
    max-width: 200px;
    max-height: 150px;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #home-menu-nav {
    top: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 2;
    background: rgba(0, 0, 0, 0.75);
  }

  #menu-nav button {
    background: none;
    border: none;
    font-size: large;
    color: white;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #menu-nav button:hover {
    text-decoration: underline;
  }

  #big-button-div {
    position: relative;
    height: 60vh;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }

  #big-button-div button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    background: grey;
    border-radius: 40px;
    height: 10vh;
    width: 20vw;
    margin-left: 5%;
  }

  #contact-me {
    position: relative;
    background-color: rgba(0, 0, 0, 0.137);
    height: 20vh;
    bottom: -20%;
    text-align: center;
  }

  #contact-me h1 {
    transform: translateY(100%);
    color: white;
  }

  #contact-me p {
    transform: translateY(200%);
    color: white;
  }

  #contact-me:hover {
    background-image: linear-gradient(rgb(0, 183, 255), black);
  }
</style>
