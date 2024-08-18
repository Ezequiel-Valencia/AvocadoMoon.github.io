import { StenographyWorkerPayload } from "./common"

function encodeImage(message: string, arrayImage: any, width: number, height: number): Uint8ClampedArray{
    console.log("Encoding")
    var focusedChar = 0;

    // first byte encoded within the Image is used for holding length of the message
    let pastMessageLength: number = message.length
    message = String.fromCharCode(pastMessageLength) + message;

    for(var i = 0; i < width; i++){
        if (focusedChar == message.length){
            break
        }
        for(var j = 0; j < height; j++){
            if (focusedChar == message.length){
                break
            }
            let indices = getColorIndicesForCord(i, j, width)
            var c1: number = message.charCodeAt(focusedChar);
            let currentRGBA = 0;
            for(var bitIndex = 0; bitIndex < 8; bitIndex+=2){

                let blankSlate = 3; // 3 is 0000 0011
                // console.log("Current c1: " + c1.toString(2))
                let result = blankSlate & c1; // either 0000 0011, 0000 0010, 0000 0001, or 0000 0000
                // console.log("Result: " + result.toString(2))
                let newPixelValue = ((255 - 3) & arrayImage[indices[currentRGBA]]) | result
                arrayImage[indices[currentRGBA]] = newPixelValue;
                currentRGBA += 1;

                c1 = c1 >>> 2; //bit shift by two
            }
            focusedChar++;
        }
    }
    return arrayImage
    
}

function decodeImage(arrayImage: any, width: number, height: number){
    let indices = getColorIndicesForCord(0, 0, width)
    let messageLength: number = getChar(indices, arrayImage)
    console.log("Message Length: " + messageLength)

    let message = ""

    
    for(let i = 0; i < width; i++){
        if (message.length == messageLength){
            break
        }
        for (let j = 0; j < height; j++){
            if (message.length == messageLength){
                break
            }
            let intHeader = i == 0 && j == 0
            if (!intHeader){
                indices = getColorIndicesForCord(i, j, width)
                let char = getChar(indices, arrayImage)
                message += String.fromCharCode(char)
            }
            
        }
    }
    console.log("Resulting Message: " + JSON.stringify(message))
    return message
}

function getChar(indices: number[], arrayImage: any[]){
    let char = 0

    let i = indices.length - 1
    while(i > -1){
        char = char << 2
        char = char | 3
        let currentRGBA = arrayImage[indices[i]]
        let hidden2Bits = 3 & currentRGBA // 0000 0011 & x
        hidden2Bits = hidden2Bits | 252 // mask everything with 1 except for the last two bits to retain chars upper bits when doing AND
        
        char = char & hidden2Bits
        i -=1
    }
    return char
}


// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
function getColorIndicesForCord(x: number, y: number, width: number){
    const red = y * (width * 4) + x * 4;
    // Red, Green, Blue, Alpha
    return [red, red + 1, red + 2, red + 3]
}

onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
    if (!e.data.encode){
        e.data.message = decodeImage(e.data.arrayImage, e.data.width, e.data.height)
        postMessage(e.data)
    } else if(e.data.encode){
        e.data.arrayImage = encodeImage(e.data.message, e.data.arrayImage, e.data.width, e.data.height)
        postMessage(e.data)
    }
}

export const exportedForTesting = {
    encodeImage,
    decodeImage
}

export {}

