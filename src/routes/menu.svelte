<script lang="ts">
    let home_menu = false;
    let contact_me = false;
    export let email:string;
</script>


{#if !home_menu}
<nav id="menu-nav">
    <button on:click={(e)=> {home_menu = !home_menu}}>Menu</button>
</nav>
{/if}

{#if home_menu}

    <div id="home-menu-nav">
        <div id="big-button-div">
            <button on:click={(e) => {location.href="/"}}>Main Menu</button>
            <button on:click={(e) => {home_menu = !home_menu}}>Return</button>
        </div>
        <div id="contact-me">
            <h1>Contact Me</h1>
            <p>Email: {email}</p>
        </div>

    </div>

{/if}







<style lang="scss">
    #menu-nav{
        $border-style: solid;
        position: absolute;
        padding: 1%;
        left: 50%;
        transform: translate(-50%);
        // border-left-style: $border-style;
        // border-right-style: $border-style;
        border-bottom-style: $border-style;
        border-width: 1px;
        
    }

    #home-menu-nav{
        position: absolute;
        height: 100vh;
        width: 100vw;
        z-index: 2;
        background: rgba(0, 0, 0, 0.75);
    }

    #menu-nav button{
        background: none;
        border: none;
        font-size: large;
    }

    #menu-nav button:hover{
        text-decoration: underline;
    }

    #big-button-div{
        position: relative;
        height: 60vh;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
    }

    #big-button-div button{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        background: grey;
        border-radius: 100px;
        height: 10vh;
        width: 20vw;
        margin-left: 5%;
        // max-height: 100px;
        // max-width: 200px;
    }

    #contact-me{
        position: relative;
        background-color: rgba(0, 0, 0, 0.137);
        height: 20vh;
        bottom: -20%;
        text-align: center;
    }

    #contact-me h1{
        transform: translateY(100%);
    }

    #contact-me p{
        transform: translateY(200%);
    }

    #contact-me:hover{
        background-image: linear-gradient(rgb(0, 183, 255), black);
    }

</style>