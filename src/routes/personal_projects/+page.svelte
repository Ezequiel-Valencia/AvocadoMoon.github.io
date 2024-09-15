<script lang="ts">
  import Menu from "../../common/menu.svelte";
  import Intro from "./intro.svelte";
  import Projects from "./projects.svelte";
</script>


<div id="main-div">
    <Menu songPath="/Audio/Channel-Songs/Zora's Domain - Day (Breath of the Wild).mp3" email="website@worker.slmail.me" songName="Zora's Domain - Day (Breath of the Wild)"></Menu>
    <Intro></Intro>
    <Projects></Projects>
</div>





















<style lang="scss">
    #main-div{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #151f2b;
        overflow: auto;
    }

</style>