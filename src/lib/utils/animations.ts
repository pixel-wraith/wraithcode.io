/**
 * checks if the user has requested reduced motion or not
 *
 * @returns false if the user has requested reduced motion
 * or if `prefers-reduced-motion` is not supported, true otherwise
 */
export function isMotionEnabled(): boolean {
    return window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
}
