import { describe, expect, test, vi } from "vitest";
import { encodeImage, decodeImage } from "./stegnography";
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

test("Encode and Decode Message", () => {
    let width = 10
    let height = 10

    let message = "Hello World jjjj"


    // process.stdout.write("Going to encode \n")
    let originalArrayImage = new Array(width * height * 4).fill(255)

    let encodedImage = encodeImage(message, originalArrayImage, width, height);
    let decodedMessage = decodeImage(encodedImage, width, height)

    expect(decodedMessage).toBe(message)

    width = getRandomInt(100)
    height = getRandomInt(100)

    message = getRandomString(getRandomInt((width * height) / 4))
    originalArrayImage = new Array(width * height * 4).fill(getRandomInt(255))
    encodedImage = encodeImage(message, originalArrayImage, width, height)
    decodedMessage = decodeImage(encodedImage, width, height)

    expect(decodedMessage).toBe(message)
})

test("Max Message Length", () => {
    let width = 2
    let height = 2

    let message = "Max" //one less than message length because of header


    // process.stdout.write("Going to encode \n")
    let originalArrayImage = new Array(width * height * 4).fill(255)

    let encodedImage = encodeImage(message, originalArrayImage, width, height);
    let decodedMessage = decodeImage(encodedImage, width, height)

    expect(decodedMessage).toBe(message)

    let beyondMax = message + "jj"

    encodedImage = encodeImage(beyondMax, originalArrayImage, width, height)
    decodedMessage = decodeImage(encodedImage, width, height)

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
    

    let originalArrayImage = new Array(width * height * 4).fill(0)
    let encryptedMessage = await encryptMessage(unencryptedMessage)

    // let stringEncryptedMessage = new TextDecoder().decode(new Uint8Array(encryptedMessage.encrypted))
    let encodedImage = encodeImage(encryptedMessage.encrypted, originalArrayImage, width, height);

    let decodedMessage = decodeImage(encodedImage, width, height)
    // let arrayBufferEncryptedMessage = new TextEncoder().encode(decodedMessage).buffer
    let decryptedMessage = await decryptMessage(encryptedMessage.key, decodedMessage)

    expect(decryptedMessage).toBe(unencryptedMessage)
})