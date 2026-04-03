// Equivalent to src/routes/cat_encryption/common.ts

export function getImageData(
  image: HTMLImageElement | string,
  afterImageDataGotten: (para: any) => void
): void {
  const imageHasLoaded = (loadedImage: HTMLImageElement) => {
    const existing = document.getElementById('decodedImage');
    const canvas: HTMLCanvasElement =
      existing != null
        ? (existing as HTMLCanvasElement)
        : document.createElement('canvas');
    canvas.width = loadedImage.width;
    canvas.height = loadedImage.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(loadedImage, 0, 0);
    const imageDataObject = ctx?.getImageData(
      0,
      0,
      loadedImage.width,
      loadedImage.height
    ) as ImageData;
    const infoObject = {
      data: imageDataObject.data,
      width: loadedImage.width,
      height: loadedImage.height,
    };
    afterImageDataGotten(infoObject);
  };

  if (typeof image === 'string') {
    const loadedImage = new Image();
    loadedImage.onload = async () => {
      imageHasLoaded(loadedImage);
    };
    loadedImage.src = image;
  } else {
    imageHasLoaded(image);
  }
}

export function isAlphaNumeric(str: string) {
  return str.match(/^[a-zA-Z0-9 \n\;\[\]$@!;?,:.'"]+$/) !== null;
}

export class StenographyWorkerPayload {
  message: string;
  arrayImage: Uint8ClampedArray;
  width: number;
  height: number;
  encode: boolean;

  constructor(
    message: string,
    arrayImage: Uint8ClampedArray,
    width: number,
    height: number,
    encode: boolean
  ) {
    this.message = message;
    this.arrayImage = arrayImage;
    this.width = width;
    this.height = height;
    this.encode = encode;
  }
}
