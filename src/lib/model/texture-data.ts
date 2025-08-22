/**
 * @fileoverview Defines a data model for storing colored texture data.
 */

export class TextureData {

    constructor(
        public width: number,
        public height: number,
        public pixels: number[]
    ) { }

    /**
     * Serializes the instance to a formatted JSON string.
     * @returns A JSON string representation of the object.
     */
    public toJsonString(): string {
        return JSON.stringify(this, null, 4);
    }

};//end 
