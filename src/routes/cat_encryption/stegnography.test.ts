import { describe, expect, test, vi } from "vitest";
import { StenographyWorkerPayload } from "./common";
import { exportedForTesting } from "./stenography.worker"
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

    const encodedImage = exportedForTesting.encodeImage(message, originalArrayImage, width, height)
    const decodedMessage = exportedForTesting.decodeImage(encodedImage, width, height)
    expect(decodedMessage).toBe(message)
})

test("Random Message Encode Decode", () => {
    let width = getRandomInt(100)
    let height = getRandomInt(100)

    let message = getRandomString(getRandomInt((width * height) / 4))
    let originalArrayImage = new Uint8ClampedArray(new Array(width * height * 4).fill(getRandomInt(255)))

    const encodedImage = exportedForTesting.encodeImage(message, originalArrayImage, width, height)
    const decodedMessage = exportedForTesting.decodeImage(encodedImage, width, height)
    expect(decodedMessage).toBe(message)
})

test("Max Message Length", async () => {
    let width = 2
    let height = 2

    let message = "Ma" //two less than message length because of header


    // process.stdout.write("Going to encode \n")
    let originalArrayImage = new Array(width * height * 4).fill(255)

    let encodedImage = exportedForTesting.encodeImage(message, originalArrayImage, width, height)
    let decodedMessage = exportedForTesting.decodeImage(encodedImage, width, height)
    expect(decodedMessage).toBe(message)

    let beyondMax = message + "jj"

    encodedImage = exportedForTesting.encodeImage(beyondMax, originalArrayImage, width, height)
    decodedMessage = exportedForTesting.decodeImage(encodedImage, width, height)
    expect(decodedMessage).toBe(message)


    originalArrayImage = new Array(200 * 200 * 4).fill(0)
    message = getRandomString(400)
    encodedImage = exportedForTesting.encodeImage(message, originalArrayImage, 200, 200)
    decodedMessage = exportedForTesting.decodeImage(encodedImage, 200, 200)
    expect(decodedMessage).toBe(message)
})


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

    const encodedImage = exportedForTesting.encodeImage(encryptedMessage.encrypted, originalArrayImage, width, height)
    const decodedMessage = exportedForTesting.decodeImage(encodedImage, width, height)

    let decryptedMessage = await decryptMessage(encryptedMessage.key, decodedMessage)
    expect(decryptedMessage).toBe(unencryptedMessage)

})