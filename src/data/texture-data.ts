/**
 * @fileoverview Defines a data model for storing colored texture data.
 */

export class TextureData {
  /**
   * @param width The width of the texture in pixels.
   * @param height The height of the texture in pixels.
   * @param pixels A 1D array containing the red, green, and blue components (0-255) for each pixel.
   */
  constructor(
    public width: number,
    public height: number,
    public pixels: number[]
  ) {}

  /**
   * Serializes the instance to a formatted JSON string.
   * @returns A JSON string representation of the object.
   */
  public toJsonString(): string {
    return JSON.stringify(this, null, 4);
  }
}
