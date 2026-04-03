'use client';

/**
 * Encode — equivalent to src/routes/cat_encryption/encode.svelte
 * Encodes a message into a cat image using LSB steganography via a Web Worker.
 * The Vite `?worker` import is replaced with the Next.js-compatible
 * `new Worker(new URL(..., import.meta.url))` pattern.
 */

import React, { useState, useRef } from 'react';
import { StenographyWorkerPayload, getImageData, isAlphaNumeric } from './common';
import { encryptMessage } from './encryption';
import styles from './CatEncryption.module.scss';

type CatImage = { file: string; name: string };

const DEFAULT_IMAGES: CatImage[] = [
  { file: '/cat_encryption/question_cat.png', name: 'Custom Upload' },
  { file: '/cat_encryption/stanced.jpg', name: 'Stanced' },
  { file: '/cat_encryption/doge-cat.jpg', name: 'Doge' },
  { file: '/cat_encryption/demon-cat.jpg', name: 'Demon' },
];

export default function Encode() {
  const [chosenImage, setChosenImage] = useState(0);
  const [encrypt, setEncrypt] = useState(false);
  const images = useRef<CatImage[]>(DEFAULT_IMAGES.map((img) => ({ ...img })));
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function isTextTooLarge(image: HTMLImageElement): boolean {
    const message = textAreaRef.current?.value ?? '';
    return message.length > (image.width * image.height) / 4 || message.length > 65530;
  }

  async function encode(imageInfo: { data: Uint8ClampedArray; width: number; height: number }) {
    const message = textAreaRef.current?.value ?? '';

    if (!isAlphaNumeric(message)) {
      window.alert('Can not encode message. Please use Alpha-numeric characters only.');
      return;
    }

    let encodedMessage: string;

    if (encrypt) {
      const encryptResult = await encryptMessage(message);
      const rawKey = await crypto.subtle.exportKey('raw', encryptResult.key);
      const keyDownload = document.createElement('a');
      const file = new Blob([rawKey]);
      keyDownload.href = URL.createObjectURL(file);
      keyDownload.download = 'key';
      keyDownload.click();
      URL.revokeObjectURL(keyDownload.href);
      encodedMessage = encryptResult.encrypted;
    } else {
      encodedMessage = message;
    }

    // Next.js-compatible Web Worker instantiation (replaces Vite ?worker)
    const encodeWorker = new Worker(
      new URL('./stenography.worker.ts', import.meta.url)
    );
    const payload = new StenographyWorkerPayload(
      encodedMessage,
      imageInfo.data,
      imageInfo.width,
      imageInfo.height,
      true
    );
    encodeWorker.postMessage(payload);

    encodeWorker.onmessage = (e: MessageEvent<StenographyWorkerPayload>) => {
      const canvas = document.createElement('canvas');
      canvas.height = imageInfo.height;
      canvas.width = imageInfo.width;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const imageData = new ImageData(e.data.arrayImage, imageInfo.width, imageInfo.height);
      ctx.globalCompositeOperation = 'copy';
      ctx.putImageData(imageData, 0, 0);
      ctx.imageSmoothingEnabled = false;

      canvas.toBlob(
        (blob) => {
          const castedBlob = blob as Blob;
          const dataURL = URL.createObjectURL(castedBlob);
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = images.current[chosenImage].name;
          a.click();
        },
        'image/png',
        1
      );
    };
  }

  function handleImageFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log('Image Has Been Input');
      const src = reader.result as string;
      images.current[0] = { ...images.current[0], file: src };
    };
  }

  function handleEncodeClick() {
    const image = new Image();
    image.onload = () => {
      if (isTextTooLarge(image)) {
        window.alert('The message you are trying to encode is too large');
      } else {
        getImageData(image, encode);
      }
    };
    image.src = images.current[chosenImage].file;
  }

  const prevImage = () =>
    setChosenImage((prev) => (prev === 0 ? images.current.length - 1 : prev - 1));
  const nextImage = () =>
    setChosenImage((prev) => (prev + 1) % images.current.length);

  return (
    <article id="encode-div" style={{ height: '100%' }}>
      <div id="carousel" className={styles['carousel']}>
        <span className={styles['slider-control']} style={{ left: 0, marginLeft: '5vw' }}>
          <svg
            tabIndex={0}
            aria-roledescription="Select Left"
            role="button"
            onKeyPress={() => {}}
            onClick={prevImage}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
          >
            <style type="text/css">
              {`.st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
            </style>
            <circle style={{ opacity: 0.5 }} className="st0" cx="16" cy="16" r="13" fillOpacity={0} />
            <polyline className="st0" points="18,20.2 13.8,16 18,11.8" />
          </svg>
        </span>

        <div id="image-and-text" className={styles['image-and-text']}>
          <img
            id="cat-image"
            className={styles['cat-images']}
            src={images.current[chosenImage].file}
            alt="catImage"
          />
          <h4 className={styles['encode-text']} style={{ fontSize: 'xx-large', paddingBottom: 0, marginBottom: 0 }}>
            Chosen:
          </h4>
          <p
            className={styles['encode-text']}
            style={{ fontSize: 'xx-large', marginTop: 0, fontStyle: 'italic', paddingBottom: 0, marginBottom: 0 }}
          >
            {images.current[chosenImage].name}
          </p>

          {chosenImage === 0 && (
            <input
              id="imageFileInput"
              className={styles['encode-text']}
              style={{ marginLeft: 'auto', paddingTop: '3vh', textAlign: 'center' }}
              type="file"
              accept="image/*"
              onChange={handleImageFileInput}
            />
          )}
        </div>

        <span className={styles['slider-control']} style={{ marginRight: '5vw', right: 0 }}>
          <svg
            tabIndex={0}
            aria-roledescription="Select Right"
            role="button"
            onKeyPress={() => {}}
            onClick={nextImage}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
          >
            <style type="text/css">
              {`.st0{fill:none;stroke:#ffffff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}`}
            </style>
            <circle style={{ opacity: 0.5 }} className="st0" cx="16" cy="16" r="13" fillOpacity={0} />
            <polyline transform="rotate(180, 16, 16)" className="st0" points="18,20.2 13.8,16 18,11.8" />
          </svg>
        </span>
      </div>

      <br />

      <form id="input-text" className={styles['input-text']} style={{ textAlign: 'center' }}>
        <textarea
          ref={textAreaRef}
          style={{ width: '60vw', height: '6vh', marginLeft: 'auto', marginRight: 'auto' }}
          id="textArea"
          placeholder="Encode Message"
        />
        <br />
        <br />
        <input
          checked={encrypt}
          onChange={(e) => setEncrypt(e.target.checked)}
          id="checkEncrypt"
          name="checkEncrypt"
          style={{ display: 'inline-block', marginLeft: 'auto', marginRight: 'auto' }}
          type="checkbox"
        />
        <label
          htmlFor="checkEncrypt"
          className={styles['encode-text']}
          style={{ marginLeft: 'auto', marginRight: 'auto', width: 'fit-content', display: 'inline-block' }}
        >
          Encrypt Message As Well?
        </label>
        <br />
        <button
          type="button"
          style={{
            width: '15vw',
            minWidth: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '4vh',
            maxHeight: 'max-content',
            marginTop: '2vh',
          }}
          onClick={handleEncodeClick}
        >
          Download Encoded Image
        </button>
        <br />
        <br />
      </form>
    </article>
  );
}
