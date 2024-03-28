<script lang="ts">
    import type { zineMetaData } from "./zine";
    export let zine: zineMetaData;
</script>



<div style="text-align: center; margin-left:auto; margin-right:auto; padding-top: 7%;
background-image:url('{zine.redirect}/back.jpg');
">
    <object
        class="pdf-object"
        type="application/pdf"
        data="{zine.pdfPath}"
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