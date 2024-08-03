import { describe, expect, test, vi } from "vitest";
import { encodeImage, decodeImage } from "./stegnography";
import { decryptMessage, encryptMessage } from "./encryption";

test("Encode and Decode Message", () => {
    let width = 10
    let height = 10

    let message = "Hello World jjjj"


    // process.stdout.write("Going to encode \n")
    let originalArrayImage = new Array(width * height * 4).fill(255)

    let encodedImage = encodeImage(message, originalArrayImage, width, height);
    let decodedMessage = decodeImage(encodedImage, width, height)

    expect(decodedMessage).toBe(message)
})


test("Encrypt and Decrypt", async () => {
    let unencryptedMessage = "Hello World jjjj"

    let cipher = await encryptMessage(unencryptedMessage)
    let plainText = await decryptMessage(cipher.key, cipher.encrypted)

    expect(plainText).toBe(unencryptedMessage)
})


test("Encrypt-Encode and Decrypt-Decode", async () =>{
    let width = 11
    let height = 11

    let unencryptedMessage = "Hello World jjjj"
    

    let originalArrayImage = new Array(width * height * 4).fill(0)
    let encryptedMessage = await encryptMessage(unencryptedMessage)
    process.stdout.write("Decrypt")

    // let stringEncryptedMessage = new TextDecoder().decode(new Uint8Array(encryptedMessage.encrypted))
    let encodedImage = encodeImage(encryptedMessage.encrypted, originalArrayImage, width, height);

    let decodedMessage = decodeImage(encodedImage, width, height)
    // let arrayBufferEncryptedMessage = new TextEncoder().encode(decodedMessage).buffer
    let decryptedMessage = await decryptMessage(encryptedMessage.key, decodedMessage)

    expect(decryptedMessage).toBe(unencryptedMessage)
})