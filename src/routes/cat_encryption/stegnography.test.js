import { expect, test, vi } from "vitest";
import { encodeImage, decodeImage } from "./stegnography";

test("Encode and Decode Message", () => {
    let width = 10
    let height = 10

    let message = "Hello World jjjj"


    // process.stdout.write("Going to encode \n")
    let originalArrayImage = new Array(width * height * 4).fill(255)

    console.log("Test")
    let encodedImage = encodeImage(message, originalArrayImage, width, height);
    let decodedMessage = decodeImage(encodedImage, width, height)

    expect(decodedMessage).toBe(message)
})