<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Experience from "./experience.svelte";
    import Intro from "./intro.svelte";
    import { experiencesSong } from "./experiences";
    import { musicController, musicTime, sfxController } from "../../common/myLocalStorage";
    import { onMount } from "svelte";

    onMount(() => {
        if($musicController){
            musicTime.setAudioTagTime()
        }
    })
</script>




<div id="main-div">
    <Menu songPath={experiencesSong} email="website@worker.slmail.me" songName="Sabbath - Various Artists"></Menu>
    <Intro></Intro>
    <Experience></Experience>
</div>

<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
    }

</style>