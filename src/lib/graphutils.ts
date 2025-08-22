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

