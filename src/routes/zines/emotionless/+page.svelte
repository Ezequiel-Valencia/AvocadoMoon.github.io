<script lang="ts">
  import { zines } from "../zine";
  import DisplayZine from "../displayZine.svelte";
  import Menu from "../../menu.svelte";

</script>





<div style="position: absolute; top: 0; left: 0; text-align:center;
 height:100%; width: 100%;
 ">
    <Menu email="" songName=""></Menu>
    <DisplayZine zineIndex={0}></DisplayZine>
</div>




<style lang="scss">


</style>