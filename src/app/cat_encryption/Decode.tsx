'use client';

/**
 * Decode — equivalent to src/routes/cat_encryption/decode.svelte
 * Decodes a hidden message from a cat image via the steganography Web Worker.
 */

import React, { useState, useRef } from 'react';
import { getImageData, isAlphaNumeric, StenographyWorkerPayload } from './common';
import { decryptMessage, encryptMethod } from './encryption';
import styles from './CatEncryption.module.scss';

export default function Decode() {
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [message, setMessage] = useState('');

  const keyFilesRef = useRef<FileList | null>(null);
  const rawKeyRef = useRef<ArrayBuffer | null>(null);

  function whenImageLoaded(imageInfo: { data: Uint8ClampedArray; width: number; height: number }) {
    // Next.js-compatible Web Worker instantiation
    const decoderWorker = new Worker(
      new URL('./stenography.worker.ts', import.meta.url)
    );
    decoderWorker.postMessage(
      new StenographyWorkerPayload('', imageInfo.data, imageInfo.width, imageInfo.height, false)
    );

    decoderWorker.onmessage = async (e: MessageEvent<StenographyWorkerPayload>) => {
      let decodedMessage = e.data.message;
      if (isEncrypted && rawKeyRef.current) {
        const cryptoKey = await crypto.subtle.importKey(
          'raw',
          rawKeyRef.current,
          { name: encryptMethod },
          true,
          ['encrypt', 'decrypt']
        );
        decodedMessage = await decryptMessage(cryptoKey, decodedMessage);
      }
      setMessage(
        isAlphaNumeric(decodedMessage)
          ? decodedMessage
          : 'It seems that either this image has no hidden message, or that the message got corrupted in transit.'
      );
      setIsCanvasEmpty(false);
    };
  }

  function imageFileHasBeenInput() {
    const input = document.getElementById('imageFileInput') as HTMLInputElement;
    const imageFiles = input.files as FileList;
    const file = imageFiles.item(0) as File;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const src = reader.result as string;
      if (isEncrypted) {
        const keyFile = keyFilesRef.current?.item(0);
        if (keyFile == null) {
          window.alert('A key is required to decode an encrypted message.');
          return;
        }
        const keyReader = new FileReader();
        keyReader.readAsArrayBuffer(keyFile);
        keyReader.onload = () => {
          rawKeyRef.current = keyReader.result as ArrayBuffer;
          getImageData(src, whenImageLoaded);
        };
      } else {
        getImageData(src, whenImageLoaded);
      }
    };
  }

  return (
    <div id="decode-div" style={{ textAlign: 'center' }}>
      <h3 className={styles['decode-text']}>Input Encoded Image</h3>

      <form style={{ textAlign: 'center' }}>
        <input
          checked={isEncrypted}
          onChange={(e) => setIsEncrypted(e.target.checked)}
          id="checkEncrypt"
          name="checkEncrypt"
          style={{ display: 'inline-block', marginLeft: 'auto', marginRight: 'auto' }}
          type="checkbox"
        />
        <label
          htmlFor="checkEncrypt"
          className={styles['decode-text']}
          style={{ marginLeft: 'auto', marginRight: 'auto', width: 'fit-content', display: 'inline-block' }}
        >
          Was the message encrypted as well?
        </label>

        {isEncrypted && (
          <>
            <br />
            <b>
              <label htmlFor="keyFileInput" className={styles['decode-text']}>
                Key Input:{' '}
              </label>
            </b>
            <input
              id="keyFileInput"
              className={styles['decode-text']}
              style={{ marginLeft: 'auto', paddingTop: '3vh', textAlign: 'center' }}
              type="file"
              onChange={(e) => {
                keyFilesRef.current = e.target.files;
              }}
            />
          </>
        )}

        <br />
        <b>
          <label htmlFor="imageFileInput" className={styles['decode-text']}>
            Cat Input:{' '}
          </label>
        </b>
        <input
          id="imageFileInput"
          className={styles['decode-text']}
          style={{ marginLeft: 'auto', paddingTop: '3vh', textAlign: 'center' }}
          type="file"
          name="file"
          accept="image/*"
        />

        <br />
        <button
          type="button"
          style={{
            width: '15vw',
            minWidth: 'fit-content',
            height: '4vh',
            maxHeight: 'max-content',
            marginLeft: 'auto',
            marginTop: '3vh',
            textAlign: 'center',
          }}
          onClick={imageFileHasBeenInput}
        >
          Decode Cat Image
        </button>
      </form>

      <canvas
        className={isCanvasEmpty ? '' : styles['cat-images']}
        id="decodedImage"
      />

      {message.length !== 0 && (
        <span style={{ marginTop: '5vh' }}>
          <br />
          <br />
          <h4 style={{ display: 'inline', paddingTop: '5vh' }} className={styles['decode-text']}>
            Decoded Message:{' '}
          </h4>
          <p style={{ display: 'inline' }} className={styles['decode-text']}>
            {message}
          </p>
          <br />
          <br />
        </span>
      )}
    </div>
  );
}
