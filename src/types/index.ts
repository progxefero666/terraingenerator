export type Gradient = {
    id: string;
    type: 'circular';
    x: number; // 0-1, center
    y: number; // 0-1, center
    radius: number; // 0-1, relative to canvas width
    scaleX: number;
    scaleY: number;
    rotation: number; // degrees
    intensity: number; // 0-1
};

export type TerrainParams = {
    sideLength: number;
    subdivisions: number;
    maxHeight: number;
};

export type ColorRamp = {
    start: string;
    middle: string;
    end: string;
    bias: number; // 0-1, midpoint for color transition
};

export type TextureParams = {
    sideImage: number;
    colorRamp: ColorRamp;
    scale: number;
};
