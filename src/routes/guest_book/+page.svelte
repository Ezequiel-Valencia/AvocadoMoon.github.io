<script lang="ts">
  import { onMount } from "svelte";
  import Menu from "../../common/menu.svelte";
  import Entries from "./entries.svelte";
  import Input from "./input.svelte";
  import BlocksAnimated from "../_decals/blocks-animated.svelte";

  

</script>


<section id="main-body">
    <Menu songName="" songPath="" songVolumeLevel=0.2></Menu>
    

    <div style="height: fit-content; width:fit-content; padding:3%;
    margin-top:10vh; margin-left:auto; margin-right:auto;
    border-width:2px; border-color: black; border-radius:6px; border-style:solid; ">
        <h1>Ezequiel's Guest Book</h1>
        <p>Please be respectful</p>
    </div>
    <Input></Input>
    <BlocksAnimated></BlocksAnimated>
    <Entries></Entries>
</section>


<style lang="scss">
    #main-body{
        height: auto;
        min-height: 100vh;
        width: 100vw;
        margin: 0;
        left: 0;
        top: 0;
        position: absolute;
        // background-color: rgb(70, 172, 255);
        // background-image: linear-gradient(rgb(182, 228, 255), rgb(56, 131, 201));
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

