<script lang="ts">
    import { encodeImage, getImageData } from "./stegnography"
    const images = ["/cat_encryption/doge-cat.jpg", "/cat_encryption/stanced.jpg", 
    "/cat_encryption/demon-cat.jpg"]
    let chosenImage = 0;

    function encode(){
        let imageInfo = getImageData(images[chosenImage])
        let textArea: HTMLTextAreaElement = document.getElementById("textArea") as HTMLTextAreaElement
        const message = textArea.value
        encodeImage(message, imageInfo.data, imageInfo.width, imageInfo.height)
    }
</script>



<article id="encode-div">
    <div id="carousel">
        
        <div style="text-align: center;">
            <img class="cat-images" src={images[chosenImage]} alt="catImage">
        </div>

        <div>
            <!-- Slider controls -->
            <button on:click={
                (e) => {
                    if(chosenImage == 0){
                        chosenImage = images.length - 1
                    } else{
                        chosenImage -= 1
                    }
                }
            } type="button" class="slider-control absolute top-0 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button on:click={
                (e) => {
                    chosenImage = (chosenImage + 1) % images.length
                }
            } type="button" class="slider-control absolute top-0 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
        </div>
    </div>

    <form id="input-text">
        <textarea id="textArea" placeholder="Encode Message"></textarea>
        <button on:click={
            (e) => {
                encode()
            }
        } >
        <a href="#f" download={images[chosenImage].split("/")[1]}>Download Encoded Message</a>
    </button>

        
    </form>

</article>


<style lang="scss">

    .slider-control{
        background-color: black;
        height: 30vh;
        margin-top: 30%;
        margin-left: 10%;
        margin-right: 10%;
    }

    #carousel{
        height: auto;
    }

    .cat-images{
        margin: 10vh;
        aspect-ratio: 1/1;
        border-style: groove;
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

