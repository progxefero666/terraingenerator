//src\lib\planeutils.ts


/**
 * Finds a safe random position for a circle (gradient) to ensure it fits within the 1x1 canvas.
 * @param radius The radius of the circle.
 * @returns An object containing the safe x and y coordinates.
 */
export const findSafeRandomPosition = (radius: number): { x: number, y: number } => {
    let x, y;
    const maxAttempts = 100;
    let attempts = 0;

    do {
        x = Math.random();
        y = Math.random();
        attempts++;
        if (attempts > maxAttempts) {
            console.warn("Could not find a safe position for the gradient after 100 attempts. Placing it at center.");
            return { x: 0.5, y: 0.5 };
        }
    } while (
        x - radius < 0 ||
        x + radius > 1 ||
        y - radius < 0 ||
        y + radius > 1
    );

    return { x, y };
};