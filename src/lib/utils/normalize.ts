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
 * @param number - the number to normalize
 * @param currentScaleMin - the minimum value of the current scale
 * @param currentScaleMax - the maximum value of the current scale
 * @param newScaleMin - the minimum value of the new scale
 * @param newScaleMax - the maximum value of the new scale
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
