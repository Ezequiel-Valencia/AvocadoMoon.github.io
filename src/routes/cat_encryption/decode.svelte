<script lang="ts">
    import { decodeImage, getImageData } from "./stegnography"
    import { decryptMessage, encryptMethod } from "./encryption"

    let imageFiles: FileList;
    let isCanvasEmpty = true;
    let isEncrypted = false;
    var file: File;

    let keyFiles: FileList;
    let keyFile: File | null;
    let rawKey: ArrayBuffer;

    var message = ""

    async function whenImageLoaded(imageInfo: any){
        if (isEncrypted){
            let encryptedMessage = await decodeImage(imageInfo.data, imageInfo.width, imageInfo.height)
            let cryptoKey = await crypto.subtle.importKey("raw", rawKey, {"name" : encryptMethod},
                                true, ["encrypt", "decrypt"]);
            
            console.log("Decoded and created key")
            message = await decryptMessage(cryptoKey, encryptedMessage);
            isCanvasEmpty = false;
        } else{
            message = await decodeImage(imageInfo.data, imageInfo.width, imageInfo.height)
            isCanvasEmpty = false;
        }
    }

    function imageFileHasBeenInput(){
        let input = document.getElementById("imageFileInput") as HTMLInputElement
        imageFiles = input.files as FileList;
        file = imageFiles.item(0) as File
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            let src = reader.result as string

            if(isEncrypted){
                const keyReader: FileReader = new FileReader()
                keyFile = keyFiles.item(0)
                if (keyFile == null){
                    window.alert("A key is required to decode an encrypted message.")
                    return;
                }
                keyReader.readAsArrayBuffer(keyFile)
                keyReader.onload = () =>{
                    rawKey = keyReader.result as ArrayBuffer
                    getImageData(src, whenImageLoaded)
                }
            } else{
                getImageData(src, whenImageLoaded)
            }

        }
    }    

</script>



<div id="decode-div" style="text-align: center;">

    <h3 class="text" style="">
        Input Encoded Image
    </h3>
    
    <form style="text-align: center;">
        <input bind:checked={isEncrypted} id="checkEncrypt" name="checkEncrypt" style="display:inline-block; margin-left:auto; margin-right:auto;" type="checkbox"> 
        <label for="checkEncrypt" class="text" style="margin-left:auto; margin-right:auto; width:fit-content; display:inline-block;">Was the message encrypted as well?</label>
        
        {#if isEncrypted}
            <br>
            <b><label for="keyFileInput" class="text">Key Input: </label></b> 
            <input id="keyFileInput" class="text" style="margin-left: auto; padding-top:3vh; text-align:center;" bind:files={keyFiles} type="file">
        {/if}

        <br>
        <b><label style="" for="keyFileInput" class="text">Cat Input: </label></b> 
        <input id="imageFileInput" class="text" 
        style="margin-left: auto; padding-top:3vh; text-align:center;" 
        bind:files={imageFiles}   type="file" name="file" accept="image/*">

        <br>
        <button style="width: 15vw; min-width:fit-content; height: 4vh; max-height:max-content; margin-left: auto; margin-top:3vh; text-align:center;" on:click={imageFileHasBeenInput}>
            Decode Cat Image</button>
    </form>

    <canvas class={isCanvasEmpty ? "" : "cat-images"} id="decodedImage"></canvas>

    {#if message.length != 0}
    <span style="margin-top:5vh;">
        <br>
        <br>
        <h4 style="display: inline; padding-top:5vh;" class="text">Decoded Message: </h4> 
        <p style="display: inline;" class="text">{message}</p>
        <br>
        <br>
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

