
// https://www.jiit.ac.in/jiit/ic3/IC3_2008/IC3-2008/APP2_21.pdf
// https://github.com/thavixt/steganography-svelte/blob/master/src/components/ImageSection.svelte

export function getImageData(imageURL: string, afterImageDataGotten: (para: any) => void){
    const image = new Image()
    image.onload = async () =>{
        // console.log(imageURL)
        let canvas = document.getElementById("decodedImage") == null ?  
            document.createElement('canvas') : document.getElementById("decodedImage") as HTMLCanvasElement;
        canvas.width = image.width
        canvas.height = image.height
        let ctx = canvas.getContext("2d")
        ctx?.drawImage(image, 0, 0);
        var imageDataObject = ctx?.getImageData(0, 0, image.width, image.height) as ImageData

        // console.log(imageDataObject.data)
        let infoObject = {data: imageDataObject.data, width: image.width, height: image.height};
        afterImageDataGotten(infoObject)
    }
    image.src = imageURL
}







export function isAlphaNumeric(str: string) {
    return str.match(/^[a-zA-Z0-9 \n\;\[\]$@!;?,:.'"]+$/) !== null;
};





// Communication Mechanisms

export class StenographyWorkerPayload {
    message: string;
    arrayImage: Uint8ClampedArray;
    width: number
    height: number
    encode: boolean
    constructor(message: string, arrayImage: Uint8ClampedArray, width: number, height: number, encode: boolean){
        this.message = message;
        this.arrayImage = arrayImage;
        this.width = width;
        this.height = height;
        this.encode = encode;
    }
}



