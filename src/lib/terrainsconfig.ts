//src\lib\terrainsconfig.ts

import { Gradient, TerrainParams, TextureParams, ColorRamp } from "@/types";

export const HEIGHMAP_RESOLUTION = 500;
export const WATER_COLOR = '#4d8df0'; // A nice blue for water

export const DEFAULT_TERRAIN_PARAMS: TerrainParams = {
    sideLength: 1000,
    subdivisions: 128,
    maxHeight: 250,
};

export const DEFAULT_TEXTURE_PARAMS: TextureParams = {
    sideImage: 512,
    colorRamp: {
        start: '#5e4f3f', // Dark brown
        middle: '#5d7a3e', // Earthy green
        end: '#d2b48c', // Tan
        bias: 0.5,
    },
    scale: 100,
};