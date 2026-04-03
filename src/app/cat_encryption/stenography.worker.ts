// Equivalent to src/routes/cat_encryption/stenography.worker.ts
// Web Worker for LSB steganography encode/decode.
// In Next.js, instantiate with: new Worker(new URL('./stenography.worker.ts', import.meta.url))

import { StenographyWorkerPayload } from './common';

function encodeImage(
  message: string,
  arrayImage: Uint8ClampedArray,
  width: number,
  height: number
): Uint8ClampedArray {
  console.log('Encoding');
  let focusedChar = 0;

  const firstHalfMessageLength = Math.ceil(message.length / 2);
  const latterHalfMessageLength = Math.floor(message.length / 2);
  message =
    String.fromCharCode(latterHalfMessageLength) +
    String.fromCharCode(firstHalfMessageLength) +
    message;

  for (let i = 0; i < width; i++) {
    if (focusedChar === message.length) break;
    for (let j = 0; j < height; j++) {
      if (focusedChar === message.length) break;
      const indices = getColorIndicesForCord(i, j, width);
      let c1 = message.charCodeAt(focusedChar);
      let currentRGBA = 0;
      for (let bitIndex = 0; bitIndex < 8; bitIndex += 2) {
        const blankSlate = 3;
        const result = blankSlate & c1;
        const newPixelValue = ((255 - 3) & arrayImage[indices[currentRGBA]]) | result;
        arrayImage[indices[currentRGBA]] = newPixelValue;
        currentRGBA += 1;
        c1 = c1 >>> 2;
      }
      focusedChar++;
    }
  }
  return arrayImage;
}

function decodeImage(arrayImage: Uint8ClampedArray, width: number, height: number) {
  const indices0 = getColorIndicesForCord(0, 0, width);
  const indices1 = getColorIndicesForCord(0, 1, width);
  const messageLength = getChar(indices0, arrayImage) + getChar(indices1, arrayImage);
  console.log('Message Length: ' + messageLength);

  let message = '';
  let indices: number[];

  for (let i = 0; i < width; i++) {
    if (message.length === messageLength) break;
    for (let j = 0; j < height; j++) {
      if (message.length === messageLength) break;
      const intHeader = (i === 0 && j === 0) || (i === 0 && j === 1);
      if (!intHeader) {
        indices = getColorIndicesForCord(i, j, width);
        const char = getChar(indices, arrayImage);
        message += String.fromCharCode(char);
      }
    }
  }
  console.log('Resulting Message: ' + JSON.stringify(message));
  return message;
}

function getChar(indices: number[], arrayImage: Uint8ClampedArray) {
  let char = 0;
  let i = indices.length - 1;
  while (i > -1) {
    char = char << 2;
    char = char | 3;
    const currentRGBA = arrayImage[indices[i]];
    let hidden2Bits = 3 & currentRGBA;
    hidden2Bits = hidden2Bits | 252;
    char = char & hidden2Bits;
    i -= 1;
  }
  return char;
}

function getColorIndicesForCord(x: number, y: number, width: number) {
  const red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}

onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
  if (!e.data.encode) {
    e.data.message = decodeImage(e.data.arrayImage, e.data.width, e.data.height);
    postMessage(e.data);
  } else if (e.data.encode) {
    e.data.arrayImage = encodeImage(e.data.message, e.data.arrayImage, e.data.width, e.data.height);
    postMessage(e.data);
  }
};

export const exportedForTesting = {
  encodeImage,
  decodeImage,
};

export {};
