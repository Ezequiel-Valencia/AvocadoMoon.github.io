import { describe, expect, test, vi } from "vitest";
import { StenographyWorkerPayload } from "./common";
import StenographyWorker from "./stenography.worker?worker"
import { decryptMessage, encryptMessage, arrayBufferToString, stringToArrayBuffer, encryptMethod } from "./encryption";


function getRandomInt(max: number){
    return Math.floor(Math.random() * max)
}

function getRandomString(stringLen: number){
    let resultString = ""

    for(let i = 0; i < stringLen; i++){
        resultString += String.fromCharCode(getRandomInt(255))
    }
    return resultString;
}

test("Encode and Decode Message", async () => {
    let width = 10
    let height = 10

    let message = "Hello World jjjj"


    // process.stdout.write("Going to encode \n")
    let originalArrayImage = new Uint8ClampedArray(new Array(width * height * 4).fill(255))

    const encodeWorker = new StenographyWorker()
    const decodeWorker = new StenographyWorker()
    encodeWorker.postMessage(new StenographyWorkerPayload(message, originalArrayImage, width, height, true))

    encodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
        decodeWorker.postMessage(new StenographyWorkerPayload(e.data.message, e.data.arrayImage, e.data.width, e.data.height, false))
    }

    decodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
        expect(e.data.message).toBe(message)
    }
})

test("Random Message Encode Decode", () => {
    let width = getRandomInt(100)
    let height = getRandomInt(100)

    let message = getRandomString(getRandomInt((width * height) / 4))
    let originalArrayImage = new Uint8ClampedArray(new Array(width * height * 4).fill(getRandomInt(255)))

    const encodeWorker = new StenographyWorker()
    const decodeWorker = new StenographyWorker()


    encodeWorker.postMessage(new StenographyWorkerPayload(message, originalArrayImage, width, height, true))

    encodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
        decodeWorker.postMessage(new StenographyWorkerPayload(e.data.message, e.data.arrayImage, e.data.width, e.data.height, false))
    }

    decodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
        expect(e.data.message).toBe(message)
    }
})

// test("Max Message Length", async () => {
//     let width = 2
//     let height = 2

//     let message = "Max" //one less than message length because of header


//     // process.stdout.write("Going to encode \n")
//     let originalArrayImage = new Array(width * height * 4).fill(255)

//     let encodedImage = await encodeImage(message, originalArrayImage, width, height);
//     let decodedMessage = await decodeImage(encodedImage, width, height)

//     expect(decodedMessage).toBe(message)

//     let beyondMax = message + "jj"

//     encodedImage = await encodeImage(beyondMax, originalArrayImage, width, height)
//     decodedMessage = await decodeImage(encodedImage, width, height)

//     expect(decodedMessage).toBe(message)
// })


test("Encrypt and Decrypt", async () => {
    let unencryptedMessage = "Hello World jjjj"

    let cipher = await encryptMessage(unencryptedMessage)
    let plainText = await decryptMessage(cipher.key, cipher.encrypted)

    expect(plainText).toBe(unencryptedMessage)
})

test("Encrypt and Decrypt with String Key", async () =>{
    let unencryptedMessage = "Hello World jjjj"

    let cipher = await encryptMessage(unencryptedMessage)
    let rawKey = await crypto.subtle.exportKey("raw", cipher.key)
    let key = arrayBufferToString(rawKey)
    rawKey = stringToArrayBuffer(key);
    let cipherKey = await crypto.subtle.importKey("raw", rawKey, {name: encryptMethod}, true, ["decrypt", "encrypt"])
    let plainText = await decryptMessage(cipherKey, cipher.encrypted)

    expect(plainText).toBe(unencryptedMessage)
})


test("Encrypt-Encode and Decrypt-Decode", async () =>{
    let width = 11
    let height = 11

    let unencryptedMessage = "Hello World jjjj"
    

    let originalArrayImage = new Uint8ClampedArray(new Array(width * height * 4).fill(0))
    let encryptedMessage = await encryptMessage(unencryptedMessage)

    const encodeWorker = new StenographyWorker()
    const decodeWorker = new StenographyWorker()
    encodeWorker.postMessage(new StenographyWorkerPayload(encryptedMessage.encrypted, originalArrayImage, width, height, true))

    encodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
        decodeWorker.postMessage(new StenographyWorkerPayload(e.data.message, e.data.arrayImage, e.data.width, e.data.height, false))
    }

    decodeWorker.onmessage = async (e: MessageEvent<StenographyWorkerPayload>) => {
        let decryptedMessage = await decryptMessage(encryptedMessage.key, e.data.message)
        expect(decryptedMessage).toBe(unencryptedMessage)

    }
})