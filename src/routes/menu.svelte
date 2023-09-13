<script lang="ts">

  let home_menu = false;
  export let email: string;
  export let songName: string;
</script>

{#if !home_menu}
<div>
  <nav>
    <button id="menu-nav"
      on:click={(e) => {
        home_menu = !home_menu;
        // scroll = false;
      }}>Menu</button
    >
  </nav>
</div>
{/if}

{#if home_menu}
  <div id="home-menu-nav">

    <div style="height:auto">
      <h1 style="color: white; text-align:center; padding:5%; padding-bottom:0%;">Song Playing:</h1>
      <h4 style="color: white; text-align:center; margin-top:0%; padding-top:0%;">{songName}</h4>
    </div>

    <div style="height:40vh; text-align:center;" id="big-button-div">
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
  #home-menu-nav {
    display:grid;
    bottom: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: 999;
    background: rgba(0, 0, 0, 0.85);
  }

  #menu-nav {
    border: none;
    color: white;
    margin: 0;
    padding: 0;
    font-size: 3vmin;
    position: fixed;
    padding: 1vmin;
    left: 50%;
    transform: translate(-50%);
    border-bottom-style: solid;
    border-width: 1px;
    border-color: white;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.164);
    max-width: 200px;
    max-height: 55px;
    width: 20vmin;
    height: auto;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #menu-nav:hover {
    text-decoration: underline;
  }

  #big-button-div button {
    background: grey;
    border-radius: 40px;
    height: 10vh;
    width: 20vw;
    margin-left: 5%;
    margin-top: 20vh;
  }

  #contact-me {
    position: relative;
    text-align: center;
    max-height: 20vh;
  }

  #contact-me h1 {
    padding-top: 2vh;
    bottom: 0;
    color: white;
  }

  #contact-me p {
    bottom: 0;
    color: white;
  }

  
</style>
