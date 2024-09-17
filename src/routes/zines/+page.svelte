<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Intro from "./intro.svelte";
    import Zines from "./zines.svelte";
</script>



<div id="bg"></div>
<div id="main-div">
    <Menu songPath="/Audio/Channel-Songs/Sonic Unleashed Windmill Isle Night Acid Jazz.mp3" email="zines.zlfwo@slmails.com" songName="Sonic Unleashed Windmill Isle Night Acid Jazz"></Menu>
    <div id="gold-border">
        <h1 id="zine-intro">My Zine's</h1>
    </div>
    <!-- <Intro></Intro> -->
    <Zines></Zines>
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
        background-image: url('zines/night-city.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        overflow-y: auto;
    }

    #bg{
        position: absolute;
        left: 0%;
        top: 0%;
        height: 100%;
        width: 100%;
        
    }
    #gold-border{
        height: 10vh;
        width: 50vw;
        border-style:outset;
        border-color: rgb(255, 255, 255);
        border-radius: 20px;
        
        // top: 20%;
        // transform: translateY(-50%);
        margin: auto;
        margin-top: 8vh;
        margin-bottom: 2vh;
        // position: relative;
        background-color: rgba(0, 0, 0, 0.801);
    }

    #zine-intro{
        position: relative;
        margin: 0%;
        padding: 0%;
        font-family: 'Playfair Display', serif;
        
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        color: rgb(255, 255, 255);
    }
</style>