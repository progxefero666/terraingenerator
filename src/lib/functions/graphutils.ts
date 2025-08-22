//src\lib\graphutils.ts

/**
 * Converts an ImageData object to a data URI.
 * @param imageData The ImageData to convert.
 * @returns A string containing the data URI.
 */
export function imageDataToDataURI(imageData: ImageData): string {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}

/**
 * Converts a data URI to an ImageData object.
 * @param dataURI The data URI to convert.
 * @returns A promise that resolves with the new ImageData object.
 */
function dataURIToImageData(dataURI: string): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Could not get canvas context'));
                return;
            }
            ctx.drawImage(image, 0, 0);
            resolve(ctx.getImageData(0, 0, image.width, image.height));
        };
        image.onerror = (err) => {
            reject(err);
        };
        image.src = dataURI;
    });
}
