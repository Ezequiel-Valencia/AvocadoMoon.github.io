<script lang="ts">
    import { decodeImage, getImageData } from "./stegnography"

    let files: FileList;

    $: if(files) {
        
        console.log(files)
        let file : File = files.item(0) as File
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            let src = reader.result as string
            let imageInfo = getImageData(src, (imageInfo) =>{
                message = decodeImage(imageInfo.data, imageInfo.width, imageInfo.height)
            })
        }
    }

    var message = ""
    function readImage(){
        const reader = new FileReader()
        let newImage = new Image()
        console.log("Read")
        reader.addEventListener('load', (event) => {
            let src = event.target?.result as string
            
        })
    }
    

</script>



<div id="decode-div">

    <form>
        <input bind:files  type="file" name="file" accept="image/*">
    </form>

    <p class="text">{message}</p>


</div>


<style lang="scss">
    .text{
        color: white;
    }
    
</style>

