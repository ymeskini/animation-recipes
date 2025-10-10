const convertDegreesToRadians = (angle: number): number =>
  (angle * Math.PI) / 180;

export const convertPolarToCartesian = (
  angle: number,
  distance: number
): [number, number] => {
  const angleInRadians = convertDegreesToRadians(angle);

  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};

export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;


// same goal as useTransform from motion
// eg. useTransform(x, [0, 100], [0, 1])
export const normalize = (
  number: number,
  currentScale: [number, number],
  newScale: [number, number]
) => {
  const standardNormalization =
    (number - currentScale[0]) / (currentScale[1] - currentScale[0]);

  return (newScale[1] - newScale[0]) * standardNormalization + newScale[0];
};

// In addition to _linear_ interpolation, I sometimes want to use _exponential_ interpolation, where the input is mapped onto a curved line rather than a straight one. This is beyond the scope of this lesson, but feel free to experiment with this!
export const exponentialNormalize = (
  value: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin: number = 0,
  newScaleMax: number = 1,
  exponent: number = 2
): number => {
  const normalizedInput =
    (value - currentScaleMin) / (currentScaleMax - currentScaleMin);

  const exponentialOutput = Math.pow(normalizedInput, exponent);

  return newScaleMin + (newScaleMax - newScaleMin) * exponentialOutput;
};
