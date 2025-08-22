//src\lib\graphutils.ts

import { DocFormats } from "../docformats";

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
export function dataURIToImageData(dataURI: string): Promise<ImageData> {
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
};

export const exportCanvasImage = (canvas:HTMLCanvasElement|null,width:number,height:number, exportFormat: string) => {
    if (!canvas) return;

    // For JPG, we need to redraw on a canvas with a solid background color
    // because toDataURL will use a transparent background otherwise.
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = width;
    exportCanvas.height = height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(canvas, 0, 0);
    let dataUrl: string = '';
    if (exportFormat === DocFormats.FORMAT_JPG.value || exportFormat === DocFormats.FORMAT_JPEG.value) {
        dataUrl = exportCanvas.toDataURL(`image/${exportFormat}`, 1.0);
    }
    else {
        dataUrl = exportCanvas.toDataURL(`image/${exportFormat}`);
    }
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `heightmap.${exportFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

