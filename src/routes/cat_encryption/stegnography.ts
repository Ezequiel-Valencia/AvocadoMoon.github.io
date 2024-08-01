
// https://www.jiit.ac.in/jiit/ic3/IC3_2008/IC3-2008/APP2_21.pdf

function encodeImage(message: string, imageURL: string){
    let shadowCanvas = document.createElement('canvas');
    let shadowCtx = shadowCanvas.getContext('2d')
    let image = new Image()
    image.src = imageURL;
    shadowCtx?.drawImage(image, 0, 0);
    var imageDataObject = shadowCtx?.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height)
    
    var arrayImage: any = imageDataObject == null ? [] : imageDataObject.data;

    var focusedChar = 0;

    // first byte encoded within the Image is used for holding length of the message
    let pastMessageLength: number = message.length
    message = String.fromCharCode(pastMessageLength) + message;


    for(var i = 0; i < shadowCanvas.width || focusedChar == message.length; i++){
        for(var j = 0; j < shadowCanvas.height || focusedChar == message.length; j++){
            var indices = getColorIndicesForCord(i, j, shadowCanvas.width)
            var c1: number = message.charCodeAt(focusedChar);
            let currentRGBA = 0;
            for(var bitIndex = 0; bitIndex < 8; bitIndex+=2){

                let blankSlate = 3; // 3 is 0000 0011
                let result = blankSlate & c1; // either 0000 0011, 0000 0010, 0000 0001, or 0000 0000
                let newPixelValue = ((Number.MAX_VALUE - 3) & arrayImage[indices[currentRGBA]]) & result
                arrayImage[indices[currentRGBA]] = newPixelValue;
                currentRGBA++;

                c1 >>> 2; //bit shift by two
            }
            focusedChar++;
        }
    }
    return shadowCanvas;
}



function decodeImage(image: HTMLImageElement){
    let shadowCanvas = document.createElement('canvas')
    let shadowCtx = shadowCanvas.getContext('2d')
    shadowCtx?.drawImage(image, 0, 0)
    let arrayImage = shadowCtx?.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height).data
    let normalArrayImage = Array.prototype.slice.call(arrayImage)

    let messageLength: number = getChar(getColorIndicesForCord(0,0,shadowCanvas.width), normalArrayImage)

    let message = ""
    for(let i = 0; i < shadowCanvas.width; i++){
        for (let j = 0; j < shadowCanvas.height; i++){
            if (i != 0 && j != 0){
                message = message + getChar(getColorIndicesForCord(i, j, shadowCanvas.width), normalArrayImage)
            }
        }
    }

    return message
}

function getChar(indices: number[], arrayImage: any[]){
    let char = 3

    for(let i =0; i < indices.length; i++){
        let currentRGBA = arrayImage[indices[i]]
        let hidden2Bits = 3 & currentRGBA // 0000 0011 & x
        hidden2Bits = hidden2Bits | 252 // mask everything with 1 except for the last two bits to retain chars upper bits when doing AND
        
        char = char & hidden2Bits
        char = char << 2
        char = char | 3
    }
    return char
}


// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
function getColorIndicesForCord(x: number, y: number, width: number){
    const red = y * (width * 4) + x * 4;
    // Red, Green, Blue, Alpha
    return [red, red + 1, red + 2, red + 3]
}





