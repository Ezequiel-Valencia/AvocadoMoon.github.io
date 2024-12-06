<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Experience from "./experience.svelte";
    import Intro from "./intro.svelte";
    import { createIntroLoadStatus, experiencesSong } from "./experiences";
    import { musicController, musicTime, sfxController } from "../../common/myLocalStorage";
    import { onMount } from "svelte";

    $: introLoaded = createIntroLoadStatus()
    let fromUnderSite: string;
    onMount(() => {
        // let ref = document.referrer.split("/")
        // fromUnderSite = ref[ref.length - 2] == "work_experience" ? 'true' : 'true'
        if($musicController){
            musicTime.setAudioTagTime()
        }
        // console.log(document.referrer)
    })
    
</script>




<div id="main-div" style="height: {$introLoaded ? 'auto': '100vh'}; overflow: {$introLoaded ? 'visible': 'hidden'};">
    <Menu songPath={experiencesSong} email="website@worker.slmail.me" songName="Sabbath - Various Artists"></Menu>
    <div style="opacity: {$introLoaded ? 1: 0};">
        <Intro loadingStatusManager={introLoaded}></Intro>
    </div>
    {#if $introLoaded}
        <Experience></Experience>
    {:else}
        <div style="position: absolute; margin:auto; left:40vw; top:50vh;">
            <h1 style="text-align: center; color:white;">Galaxy is loading, please wait.</h1>
        </div>
    {/if}
</div>

<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        height: 100vh;
    }

</style>