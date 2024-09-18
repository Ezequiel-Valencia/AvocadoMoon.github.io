<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Intro from "./intro.svelte";
    import Zines from "./zines.svelte";
</script>



<div id="bg">
    <div id="main-div">
        <Menu songPath="/Audio/Channel-Songs/Sonic Unleashed Windmill Isle Night Acid Jazz.mp3" email="zines.zlfwo@slmails.com" songName="Sonic Unleashed Windmill Isle Night Acid Jazz"></Menu>
        <div id="gold-border">
            <h1 id="zine-intro">My Zine's</h1>
        </div>
        <!-- <Intro></Intro> -->
        <Zines></Zines>
    </div>
</div>



<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');
    #main-div {
        position: absolute;
        left: 0%;
        top: 0%;
        min-height: 100%;
        height:auto;
        width: 100%;
        overflow-y: auto;
        backdrop-filter: saturate(0) blur(3px); // applies filter to all background elements
    }

    #bg{
        position: absolute;
        left: 0%;
        top: 0%;
        min-height: 100%;
        height:auto;
        width: 100%;
        background-image: url('zines/night sky ny.webp');
        background-repeat: no-repeat;
        background-size: cover;
        overflow-y: auto;
    }
    #gold-border{
        height: 10vh;
        width: 50vw;
        max-width: 500px;
        max-height: 60px;
        border-style:outset;
        border-color: rgb(255, 255, 255);
        border-radius: 20px;
        
        margin: auto;
        margin-top: 8vh;
        margin-bottom: 2vh;
        background-color: rgba(0, 0, 0, 0.801);
        text-align: center;
    }

    #zine-intro{
        margin: auto;
        transform: translateY(20%);
        font-family: 'Playfair Display', serif;
        color: rgb(255, 255, 255);
    }
</style>