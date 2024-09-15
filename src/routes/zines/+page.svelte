<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Intro from "./intro.svelte";
    import Zines from "./zines.svelte";
</script>



<div id="main-div">
    <Menu songPath="/Audio/Channel-Songs/Sonic Unleashed Windmill Isle Night Acid Jazz.mp3" email="zines.zlfwo@slmails.com" songName="Sonic Unleashed Windmill Isle Night Acid Jazz"></Menu>
    <Intro></Intro>
    <Zines></Zines>
</div>



<style lang="scss">
    #main-div{
        position: absolute;
        left: 0%;
        top: 0%;
        height: 100%;
        width: 100%;
    }
</style>