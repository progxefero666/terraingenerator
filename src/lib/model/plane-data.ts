/**
 * @fileoverview Defines a data model for storing 3D plane geometry vertex data.
 */

export class PlaneData {
  /**
   * @param vertices A 1D array containing the x, y, z coordinates for each vertex of the plane.
   */
  constructor(public vertices: number[]) {}

  /**
   * Serializes the instance to a formatted JSON string.
   * @returns A JSON string representation of the object.
   */
  public toJsonString(): string {
    return JSON.stringify(this, null, 4);
  }
}
