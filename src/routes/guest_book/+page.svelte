<script lang="ts">
  import { onMount } from "svelte";
  import Menu from "../../common/menu.svelte";
  import Entries from "./entries.svelte";
  import Input from "./input.svelte";
  import BlocksAnimated from "../_decals/blocks-animated.svelte";

  

</script>


<section id="main-body">
    <Menu songName="" songPath="" songVolumeLevel=0.2></Menu>

    <section id="focus">
        <div style="padding-top: 2vh;"></div>
        <div style="height: fit-content; width:fit-content; padding:3%;
        margin-top: 5vh; margin-left:auto; margin-right:auto;
        border-width:2px; border-color: black; border-radius:6px; border-style:solid; ">
            <h1>Ezequiel's Digital Geocache</h1>
            <p>Please leave a message and be respectful</p>
        </div>
        <Input></Input>
        <Entries></Entries>
        <!-- <BlocksAnimated></BlocksAnimated> -->
    </section>
    
</section>


<style lang="scss">
    #main-body{
        height: auto;
        min-height: 100vh;
        width: 100vw;
        overflow-x: hidden;
        margin: 0;
        left: 0;
        top: 0;
        position: absolute;
        background-image: url("/guest_book/forest2.jpg");
        // background-image: radial-gradient(circle at center, rgba(46, 119, 255, 0.712) 0%, rgba(32, 103, 255, 0.699) 50%);
        // background-color: rgb(70, 172, 255);
        // background-image: linear-gradient(rgb(182, 228, 255), rgb(56, 131, 201));
    }
    #focus{
        height: auto;
        min-height: 80vh;
        // padding-top: 1vh;
        padding-bottom: 5vh;
        margin-top: 4vh;
        margin-bottom: 4vh;
        width: 90vw;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        // margin: auto;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.925);

        // position: absolute;
    }
    h1{
        text-align: center;
        margin: auto;
    }
    p{
        text-align: center;
        margin: auto;
        padding-top: 3%;
    }

</style>

