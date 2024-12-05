<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Experience from "./experience.svelte";
    import Intro from "./intro.svelte";
    import { experiencesSong } from "./experiences";
    import { musicController, musicTime, sfxController } from "../../common/myLocalStorage";
    import { onMount } from "svelte";

    let introLoaded = false
    onMount(() => {
        if($musicController){
            musicTime.setAudioTagTime()
        }
        introLoaded = true
    })
</script>




<div id="main-div">
    <Menu songPath={experiencesSong} email="website@worker.slmail.me" songName="Sabbath - Various Artists"></Menu>
    <Intro></Intro>
    {#if introLoaded}
        <Experience></Experience>
    {/if}
</div>

<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
    }

</style>