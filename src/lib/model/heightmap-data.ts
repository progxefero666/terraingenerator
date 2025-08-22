/**
 * @fileoverview Defines a data model for storing heightmap data.
 */

export class HeightmapData {
    /**
     * @param width The width of the heightmap in pixels.
     * @param height The height of the heightmap in pixels.
     * @param values A 1D array containing the grayscale intensity (0.0 to 1.0) for each pixel.
     */
    constructor(
        public width: number,
        public height: number,
        public values: number[]
    ) { }

    /**
     * Serializes the instance to a formatted JSON string.
     * @returns A JSON string representation of the object.
     */
    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }
}
