/**
 * Ensures a number falls within a given range. If the number is
 * less than the minimum, it is clamped to the minimum. If the number is
 * greater than the maximum, it is clamped to the maximum.
 *
 * @param value the number to clamp
 * @param min the minimum value of the range
 * @param max the maximum value of the range
 * @returns the clamped number
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

/**
 * gets a random integer between the given min and max values
 *
 * @param min the minimum value of the range
 * @param max the maximum value of the range
 * @returns a random integer between the given min and max values
 */
export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * takes a number that falls within a given scale
 * and normalizes it to a new scale.
 *
 * @exmaple if we have a number that falls within the scale 0-100,
 * and we want to normalize it to the scale 0-360 (degrees), we would call:
 *
 * ```ts
 * normalize(50, 0, 100, 0, 360);
 * ```
 *
 * @param number the number to normalize
 * @param currentScaleMin the minimum value of the current scale
 * @param currentScaleMax the maximum value of the current scale
 * @param newScaleMin the minimum value of the new scale
 * @param newScaleMax the maximum value of the new scale
 * @returns the normalized number
 */
export const normalize = (
    number: number,
    currentScaleMin: number,
    currentScaleMax: number,
    newScaleMin: number = 0,
    newScaleMax: number = 1,
) => {
    const standardNormalization = (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

    return (
        (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
    );
};
