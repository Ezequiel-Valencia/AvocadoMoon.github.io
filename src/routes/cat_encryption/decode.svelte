<script lang="ts">
    import { decodeImage, getImageData } from "./stegnography"
    import { decryptMessage, stringToArrayBuffer, encryptMethod } from "./encryption"

    let files: FileList;
    let isCanvasEmpty = true;
    let isEncrypted = false;
    let key = ""
    var file: File;

    async function whenImageLoaded(imageInfo: any){
        if (isEncrypted){
            let encryptedMessage = decodeImage(imageInfo.data, imageInfo.width, imageInfo.height)
            let cryptoKey = await crypto.subtle.importKey("raw", stringToArrayBuffer(key), {"name" : encryptMethod},
                                true, ["encrypt", "decrypt"]);
            
            console.log("Decoded and created key")
            message = await decryptMessage(cryptoKey, encryptedMessage);
            isCanvasEmpty = false;
        } else{
            message = decodeImage(imageInfo.data, imageInfo.width, imageInfo.height)
            isCanvasEmpty = false;
        }
    }

    $: if(files) {
        
        console.log(files)
        file = files.item(0) as File
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            let src = reader.result as string
            let imageInfo = getImageData(src, whenImageLoaded)
        }
    }

    var message = ""
    

</script>



<div id="decode-div" style="text-align: center;">

    <h3 class="text" style="">
        <u>Input Encoded Image</u>
    </h3>
    
    <form style="text-align: center;">
        <input bind:checked={isEncrypted} id="checkEncrypt" name="checkEncrypt" style="display:inline-block; margin-left:auto; margin-right:auto;" type="checkbox"> 
        <label for="checkEncrypt" class="text" style="margin-left:auto; margin-right:auto; width:fit-content; display:inline-block;">Was the message encrypted as well?</label>
        
        {#if isEncrypted}
            <br>
            <input bind:value={key} type="text" placeholder="Paste Key Here">
        {/if}

        <br>
        <input class="text" style="margin-left: auto; padding-top:3vh; text-align:center;" bind:files  type="file" name="file" accept="image/*">
    </form>

    <canvas class={isCanvasEmpty ? "" : "cat-images"} id="decodedImage"></canvas>

    {#if message.length != 0}
    <span style="margin-top:5vh;">
        <br>
        <br>
        <h4 style="display: inline; padding-top:5vh;" class="text">Decoded Message: </h4> 
        <p style="display: inline;" class="text">{message}</p>
    </span>


    {/if}


</div>


<style lang="scss">
    .text{
        color: white;
    }
    .cat-images{
        margin-top: 5vh;
        aspect-ratio: 1/1;
        border-style:solid;
        border-color: white;
        border-width: 5px;
        height: 40vmin;
        width: 50vmin;

        max-height: 800px;
        max-width: 900px;
    }
</style>

