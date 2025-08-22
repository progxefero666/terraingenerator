//src\lib\terrainsconfig.ts

import { TerrainParams, TextureParams } from "@/lib/terraintypes";

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


/**
 * class TerrEditionConfig
 */
export class TerrEditionConfig {
    
    public static SIZE_MIN:number = 512;
    public static SIZE_MAX:number = 4096;
    public static SIZE_STEP:number = 256;

    public static SCALE_MIN:number = 100;
    public static SCALE_MAX:number = 200;
    public static SCALE_STEP:number = 1;

}//end

/**
 * class TerrImages.FORMATS
 */
export class TerrImages {
    
    public static FORMATS = ['png', 'jpg', 'jpeg'];
    public static DEF_FORMAT = TerrImages.FORMATS[0];

}//end