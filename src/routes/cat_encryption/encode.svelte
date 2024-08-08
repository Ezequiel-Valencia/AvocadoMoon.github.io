<script lang="ts">
    import { decodeImage, encodeImage, getImageData } from "./stegnography"
    import { encryptMessage, arrayBufferToString } from "./encryption"

    type CatImages = {
        file: string,
        name: string
    }
    const images: CatImages[] = [{file:"/cat_encryption/doge-cat.png", name: "Doge"}, 
    {file: "/cat_encryption/stanced.jpg", name: "Stanced"}, 
    {file: "/cat_encryption/demon-cat.jpg", name: "Demon"}]
    let chosenImage = 0;
    let encrypt = false;
    let key = ""

    async function encode(imageInfo: any){

        // https://www.mdpi.com/2073-8994/13/2/165
        // https://incoherency.co.uk/image-steganography/
        // Potential solution is to make a blob URL 

        
        let textArea: HTMLTextAreaElement = document.getElementById("textArea") as HTMLTextAreaElement
        
        let message;
        if (encrypt){
            let encryptResult = await encryptMessage(textArea.value)
            let rawKey =  await crypto.subtle.exportKey("raw", encryptResult.key)
            key = arrayBufferToString(rawKey)
            message = encryptResult.encrypted;
        } else{
            message = textArea.value;
        }
        let data = encodeImage(message, imageInfo.data, imageInfo.width, imageInfo.height)

        let canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement
        canvas.height = imageInfo.height
        canvas.width = imageInfo.width
        let ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const imageData = new ImageData(data, imageInfo.width, imageInfo.height)
        ctx.globalCompositeOperation = "copy"
        

        ctx.putImageData(imageData, 0, 0)
        ctx.imageSmoothingEnabled = false;

        // decodeImage(, imageInfo.width, imageInfo.height)
        
        
        // let image = new Image()
        // ctx.drawImage(image, 0, 0)
        let dataURL = canvas.toDataURL()
        
        let a = document.createElement('a')
        a.href = dataURL
        a.download = images[chosenImage].file.split("/")[2];
        a.click()
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
                <!-- <circle class="st0" cx="16" cy="16" r="13" fill-opacity=.5 /> -->
                <polyline class="st0" points="18,20.2 13.8,16 18,11.8 "/>
            </svg>
        </span>
        
        <div id="image-and-text">
            <img id="cat-image" class="cat-images" src={images[chosenImage].file} alt="catImage">
            <h4 class="text" style="font-size:xx-large; padding-bottom:0; margin-bottom:0;">Chosen:</h4>
            <p class="text" style="font-size: xx-large; margin-top:0; font-style:italic;">{images[chosenImage].name}</p>
        </div>

        
        <span class="slider-control" style="margin-right: 5vw; right:0; rotate: 10">
            <svg style="rotate: 10;" tabindex="0" aria-roledescription="Select Right" role="button" on:keypress={(e) => {}} on:click={(e) => {
                    chosenImage = (chosenImage + 1) % images.length
                }} 
                version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
                <style type="text/css">
                    .st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                </style>
                <!-- <circle class="st0" cx="16" cy="16" r="13" fill-opacity=.5 /> -->
                <polyline transform="rotate(180, 16, 16)" class="st0" points="18,20.2 13.8,16 18,11.8 "/>
            </svg>
        </span>
        
    </div>

    <form id="input-text" style=" text-align:center;">
        <textarea style="width: 60vw; height: 6vh; margin-left:auto; margin-right:auto;" id="textArea" placeholder="Encode Message"></textarea>
        <br>
        <br>
        <input bind:checked={encrypt} id="checkEncrypt" name="checkEncrypt" style="display:inline-block; margin-left:auto; margin-right:auto;" type="checkbox"> 
        <label for="checkEncrypt" class="text" style="margin-left:auto; margin-right:auto; width:fit-content; display:inline-block;">Encrypt Message As Well?</label>
        {#if encrypt}
            <br>
            <p class="text">The Key To Decrypt This Message Is: {key}</p>
        {/if}
        <br>
        <button style="width: 15vw; min-width:fit-content; margin-left:auto; margin-right:auto; height: 3vh; margin-top: 2vh;" on:click={
            (e) => {
                getImageData(images[chosenImage].file, encode)
            }
        } >Download Encoded Image
    </button>

        
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

