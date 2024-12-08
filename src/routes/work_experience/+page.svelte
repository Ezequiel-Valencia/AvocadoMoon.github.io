<script lang="ts">
    import Menu from "../../common/menu.svelte";
    import Experience from "./experience.svelte";
    import Intro from "./intro.svelte";
    import { experiencesSong } from "./experiences";
    import { musicController, musicTime, sfxController } from "../../common/myLocalStorage";
    import { onMount } from "svelte";
    import Loading from "./loading.svelte";
    import { percentLoaded } from "./experiences";
    
    let fromUnderSite: boolean = false;

    onMount(() => {
        if (window.location.href.includes("#myExperience")){
            fromUnderSite = true;
        }
        if($musicController){
            musicTime.setAudioTagTime()
        }
    })
    
</script>


<!-- https://www.twilio.com/en-us/blog/svelte-stores-share-data-between-components -->

<div id="main-div" style="height: {$percentLoaded == 100 || fromUnderSite ? 'auto': '100vh'}; 
    overflow: {$percentLoaded == 100 ? 'visible': 'hidden'};">
    <Menu songPath={experiencesSong} songName="Sabbath - Various Artists"></Menu>
    {#if !fromUnderSite}
        <div style="opacity: {$percentLoaded == 100 ? 1: 0};">
            <Intro></Intro>
        </div>
    {/if}
    <Experience></Experience>
    
    {#if $percentLoaded != 100}
        <Loading></Loading>
    {/if}
</div>

<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        height: 100vh;
        width: 100vw;
    }

</style>