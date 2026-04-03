// Equivalent to src/routes/cat_encryption/encryption.ts

export const encryptMethod = 'AES-CBC';

export async function decryptMessage(key: CryptoKey, base64String: string) {
  const combinedBuffer = stringToArrayBuffer(base64String);
  const iv = combinedBuffer.slice(0, 16);
  const cipherText = combinedBuffer.slice(16);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: encryptMethod, iv },
    key,
    cipherText
  );
  const plainText = new TextDecoder().decode(decrypted);
  return plainText;
}

export async function encryptMessage(message: string) {
  const key = await window.crypto.subtle.generateKey(
    { name: encryptMethod, length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const encoded = new TextEncoder().encode(message);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: encryptMethod, iv },
    key,
    encoded
  );
  const combinedBuffer = new Uint8Array(iv.length + encrypted.byteLength);
  combinedBuffer.set(iv);
  combinedBuffer.set(new Uint8Array(encrypted), iv.length);
  return { key, iv, encrypted: arrayBufferToString(combinedBuffer.buffer as ArrayBuffer) };
}

export function arrayBufferToString(arrayBuffer: ArrayBuffer) {
  let resultString = '';
  const bytes = new Uint8Array(arrayBuffer);
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    resultString += String.fromCharCode(bytes[i]);
  }
  return resultString;
}

export function stringToArrayBuffer(message: string) {
  const len = message.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = message.charCodeAt(i);
  }
  return bytes.buffer;
}
