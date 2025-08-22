import type { ColorRamp } from '@/types';

/**
 * Parses a hex color string (#RRGGBB) into an [r, g, b] array.
 * @param hex The hex color string.
 * @returns An array of numbers [r, g, b].
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

/**
 * Linearly interpolates between two colors.
 * @param color1 The start color as [r, g, b].
 * @param color2 The end color as [r, g, b].
 * @param factor The interpolation factor (0 to 1).
 * @returns The interpolated color as [r, g, b].
 */
function lerpColor(
  color1: [number, number, number],
  color2: [number, number, number],
  factor: number
): [number, number, number] {
  const r = color1[0] + factor * (color2[0] - color1[0]);
  const g = color1[1] + factor * (color2[1] - color1[1]);
  const b = color1[2] + factor * (color2[2] - color1[2]);
  return [r, g, b];
}

/**
 * Applies a coastal effect to soften the transition between water and land.
 * @param imageData The texture ImageData to modify.
 * @param width The width of the image.
 * @param height The height of the image.
 * @param waterColor The RGB color of the water.
 * @param landColor The RGB color of the shore.
 * @param distance The max distance in pixels for the effect.
 */
function applyCoastalEffect(
    imageData: ImageData,
    width: number,
    height: number,
    waterColor: [number, number, number],
    landColor: [number, number, number],
    distance: number
) {
    const data = imageData.data;
    const isWater = new Array(width * height).fill(false);
    
    // First pass: identify all water pixels
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] === waterColor[0] && data[i + 1] === waterColor[1] && data[i + 2] === waterColor[2]) {
            isWater[i / 4] = true;
        }
    }

    const newData = new Uint8ClampedArray(data);

    // Second pass: apply the blend effect
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = y * width + x;
            if (!isWater[index]) continue; // Only apply effect to water pixels

            let minSqDist = Infinity;

            // Search for the nearest land pixel in a search box
            const searchRadius = distance;
            for (let j = -searchRadius; j <= searchRadius; j++) {
                for (let i = -searchRadius; i <= searchRadius; i++) {
                    const nx = x + i;
                    const ny = y + j;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const nIndex = ny * width + nx;
                        if (!isWater[nIndex]) {
                            const sqDist = i * i + j * j;
                            if (sqDist < minSqDist) {
                                minSqDist = sqDist;
                            }
                        }
                    }
                }
            }

            const dist = Math.sqrt(minSqDist);

            if (dist <= distance) {
                const factor = 1.0 - (dist / distance);
                const blendedColor = lerpColor(waterColor, landColor, factor * 0.75); // Use 0.75 to make the blend more subtle towards the land
                
                const pixelIndex = index * 4;
                newData[pixelIndex] = blendedColor[0];
                newData[pixelIndex + 1] = blendedColor[1];
                newData[pixelIndex + 2] = blendedColor[2];
            }
        }
    }
    
    data.set(newData);
}


/**
 * Generates a colored texture from a heightmap ImageData.
 * @param heightmap The source heightmap ImageData (grayscale).
 * @param colorRamp The color ramp with start, middle, and end colors, and a bias.
 * @param waterColorHex The hex color for water (areas of 0 height).
 * @returns A new ImageData object representing the colored texture.
 */
export function generateTextureFromHeightmap(
  heightmap: ImageData,
  colorRamp: ColorRamp,
  waterColorHex: string
): ImageData {
  const { width, height, data } = heightmap;
  const textureData = new Uint8ClampedArray(width * height * 4);

  const startColor = hexToRgb(colorRamp.start);
  const middleColor = hexToRgb(colorRamp.middle);
  const endColor = hexToRgb(colorRamp.end);
  const waterColor = hexToRgb(waterColorHex);
  const bias = colorRamp.bias;

  for (let i = 0; i < data.length; i += 4) {
    // Height is stored in the R channel (it's grayscale)
    const heightValue = data[i];
    const pixelIndex = i;

    // Pure white (255) in the heightmap is the lowest point (water)
    if (heightValue === 255) {
      textureData[pixelIndex] = waterColor[0];
      textureData[pixelIndex + 1] = waterColor[1];
      textureData[pixelIndex + 2] = waterColor[2];
      textureData[pixelIndex + 3] = 255;
    } else {
      // The heightmap is inverted (0=black=highest, 255=white=lowest)
      // We normalize it to a 0-1 range where 0 is the start of land and 1 is the highest peak.
      const normalizedHeight = (254 - heightValue) / 254.0; // Use 254 to prevent full white from being land

      let finalColor: [number, number, number];

      if (normalizedHeight <= bias) {
        // Interpolate between start and middle
        const factor = normalizedHeight / bias; // scale 0-bias range to 0-1
        finalColor = lerpColor(startColor, middleColor, factor);
      } else {
        // Interpolate between middle and end
        const factor = (normalizedHeight - bias) / (1 - bias); // scale bias-1 range to 0-1
        finalColor = lerpColor(middleColor, endColor, factor);
      }
      
      textureData[pixelIndex] = finalColor[0];
      textureData[pixelIndex + 1] = finalColor[1];
      textureData[pixelIndex + 2] = finalColor[2];
      textureData[pixelIndex + 3] = 255;
    }
  }

  const finalImageData = new ImageData(textureData, width, height);

  // Apply the coastal effect
  applyCoastalEffect(finalImageData, width, height, waterColor, startColor, 8);

  return finalImageData;
}
