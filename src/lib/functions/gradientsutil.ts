//src\lib\functions\gradientsutil.ts
import { v4 as uuidv4 } from 'uuid';
import { Gradient } from "@/lib/terraintypes";

/**
 * class for gradient utilities
 */
export class GradientsUtils {

    /**
     * Generates a random gradient.
     * @returns A random gradient object.
     */
    static generateRandomGradient(): Gradient {
        return {
            id: uuidv4(),
            x: Math.random(),
            y: Math.random(),
            radius: Math.random() * 0.15 + 0.1,
            scaleX: 1,
            scaleY: 1,
            rotation: Math.random() * 360,
            intensity: Math.random() * 0.5 + 0.3,
        };
    }

}//end