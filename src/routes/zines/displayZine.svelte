<script lang="ts">
    import { zines } from "./zine";
    export let zineIndex: number;
</script>



<div style="text-align: center; margin-left:auto; margin-right:auto; padding-top: 7%;
background-image:url('/zines/{zines[zineIndex].name}/back.jpg');
">
    <object
        class="pdf-object"
        type="application/pdf"
        data="/zines/{zines[zineIndex].name}/{zines[zineIndex].name}.pdf"
        aria-label="Zine"
    >
    </object>
</div>






<style lang="scss">
    .pdf-object{
        margin-top: 0;
        margin-left: auto;
        margin-right: auto;
        height: 100vh;
        width: 80vw;
    }
</style>