<script lang="ts">
    import { StenographyWorkerPayload , getImageData, isAlphaNumeric } from "./common"
    import { encryptMessage } from "./encryption"
    import StenographyWorker from './stenography.worker?worker'

    type CatImages = {
        file: string,
        name: string
    }
    const images: CatImages[] = [{file:"/cat_encryption/question_cat.png", name: "Custom Upload"}, 
    {file: "/cat_encryption/stanced.jpg", name: "Stanced"},
    {file:"/cat_encryption/doge-cat.jpg", name: "Doge"},  
    {file: "/cat_encryption/demon-cat.jpg", name: "Demon"}]
    let chosenImage = 0;
    let encrypt = false;
    let uploadedImage: FileList;


    async function encode(imageInfo: any){

        // https://www.mdpi.com/2073-8994/13/2/165
        // https://incoherency.co.uk/image-steganography/
        // Potential solution is to make a blob URL 

        
        let textArea: HTMLTextAreaElement = document.getElementById("textArea") as HTMLTextAreaElement
        if (!isAlphaNumeric(textArea.value)){
            window.alert("Can not encode message. Please use Alpha-numeric characters only.")
            return;
        }
        
        let message;
        if (encrypt){
            let encryptResult = await encryptMessage(textArea.value)
            let rawKey =  await crypto.subtle.exportKey("raw", encryptResult.key)
            const keyDownload = document.createElement("a");
            const file = new Blob([rawKey])
            keyDownload.href = URL.createObjectURL(file)
            keyDownload.download = "key"
            keyDownload.click()
            URL.revokeObjectURL(keyDownload.href)
            message = encryptResult.encrypted;
        } else{
            message = textArea.value;
        }
        const encodeWorker = new StenographyWorker()
        let encodeMessage : StenographyWorkerPayload = new StenographyWorkerPayload(message, imageInfo.data, imageInfo.width, imageInfo.height, true)
        encodeWorker.postMessage(encodeMessage)

        encodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
            let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement
            canvas.height = imageInfo.height
            canvas.width = imageInfo.width
            let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            const imageData = new ImageData(e.data.arrayImage, imageInfo.width, imageInfo.height)
            ctx.globalCompositeOperation = "copy"
            

            ctx.putImageData(imageData, 0, 0)
            ctx.imageSmoothingEnabled = false;


            canvas.toBlob((blob) => {
                let castedBlob: Blob = blob as Blob
                const dataURL = URL.createObjectURL(castedBlob)
                let a = document.createElement('a')
                a.href = dataURL
                a.download = images[chosenImage].name;
                a.click()
            }, 'image/png', 1)

            // let dataURL = canvas.toDataURL()
            
            
        }
        
    }

    function imageFileHasBeenInput(){
        var file: File;
        let input = document.getElementById("imageFileInput") as HTMLInputElement
        uploadedImage = input.files as FileList;
        file = uploadedImage.item(0) as File
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            console.log("Image Has Been Input")
            let src = reader.result as string
            images[0].file = src
        }
    }  

    function isTextToLarge(image: HTMLImageElement): boolean{
        let textArea: HTMLTextAreaElement = document.getElementById("textArea") as HTMLTextAreaElement
        let message = textArea.value
        return message.length > ((image.width * image.height) / 4) || message.length > 65530
    }
</script>



<article id="encode-div" style="height: 100%">
    <div id="carousel">
        <span class="slider-control" style="left: 0; margin-left: 5vw">
            <svg style="z-index: 3;"  tabindex="0" aria-roledescription="Select Left" role="button" on:keypress={(e) => {}} on:click={(e) => {
                console.log(chosenImage)
                if(chosenImage == 0){
                        chosenImage = images.length - 1
                    } else{
                        chosenImage -= 1
                    }
                }} 
                version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                </style>
                <circle style="opacity: .5;" class="st0" cx="16" cy="16" r="13" fill-opacity=0 />
                <polyline class="st0" points="18,20.2 13.8,16 18,11.8 "/>
            </svg>
        </span>
        
        <div id="image-and-text">
            <img id="cat-image" class="cat-images" src={images[chosenImage].file} alt="catImage">
            <h4 class="text" style="font-size:xx-large; padding-bottom:0; margin-bottom:0;">Chosen:</h4>
            <p class="text" style="font-size: xx-large; margin-top:0; font-style:italic; padding-bottom:0; margin-bottom:0;">{images[chosenImage].name}</p>

            {#if chosenImage == 0}
                <input id="imageFileInput" class="text" style="margin-left: auto; padding-top:3vh; text-align:center;" 
                bind:files={uploadedImage} type="file" accept="image/*" on:input={imageFileHasBeenInput}>

            {/if}
        </div>

        
        <span class="slider-control" style="margin-right: 5vw; right:0; rotate: 10">
            <svg style="rotate: 10;" tabindex="0" aria-roledescription="Select Right" role="button" on:keypress={(e) => {}} on:click={(e) => {
                    chosenImage = (chosenImage + 1) % images.length
                }} 
                version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                </style>
                <circle style="opacity: .5;" class="st0" cx="16" cy="16" r="13" fill-opacity=0 />
                <polyline transform="rotate(180, 16, 16)" class="st0" points="18,20.2 13.8,16 18,11.8 "/>
            </svg>
        </span>
        
    </div>

    <br>

    <form id="input-text" style=" text-align:center;">
        <textarea style="width: 60vw; height: 6vh; margin-left:auto; margin-right:auto;" id="textArea" placeholder="Encode Message"></textarea>
        <br>
        <br>
        <input bind:checked={encrypt} id="checkEncrypt" name="checkEncrypt" style="display:inline-block; margin-left:auto; margin-right:auto;" type="checkbox"> 
        <label for="checkEncrypt" class="text" style="margin-left:auto; margin-right:auto; width:fit-content; display:inline-block;">Encrypt Message As Well?</label>
        
        <br>
        <button style="width: 15vw; min-width:fit-content; margin-left:auto; margin-right:auto; height: 4vh; max-height:max-content; margin-top: 2vh;" on:click={
            (e) => {
                const image = new Image()
                image.onload = (j) => {

                    if (isTextToLarge(image)) {
                        window.alert("The message you are trying to encode is to large")
                    } else{
                        getImageData(image, encode)
                    }
                }
                image.src = images[chosenImage].file
            }
        } >Download Encoded Image
    </button>
    
    <br>
    <br>
        
    </form>

</article>


<style lang="scss">

    .text{
        color: white;
    }

    #image-and-text{
        position: relative;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    svg:focus{
        border: none;
        outline: none;
    }
    
    

    .slider-control{
        position: absolute;
        text-align: center;
        width: 10vw;
        height: 10vh;
        display: flex;
        // height: 30vh;
        margin-top: 25vh;
    }

    #carousel{
        height: auto;
        display: flex;
        text-align: center;
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

    #input-text{
        text-align: center;
    }

</style>

