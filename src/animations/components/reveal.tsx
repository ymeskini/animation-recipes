import { useState } from "react";
import { clamp } from "motion/react";
import { normalize } from "../../utils/math";

export default function Reveal() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  const skew = normalize(value, [0, 100], [25, 0]);
  const rotate = normalize(value, [0, 100], [225, -45]);
  const radius = normalize(value, [0, 100], [50, 5]);

  const scaleY = clamp(0.01, 1, normalize(value, [0, 50], [0.01, 1]));
  const boxHue = clamp(0, 45, normalize(value, [50, 100], [0, 45]));
  const bgLightness = clamp(
    6,
    26,
    value <= 75 ? 6 : normalize(value, [75, 100], [6, 26])
  );

  return (
    <div
      className="relative h-72 w-full flex items-center justify-center transition-colors duration-300"
      style={{
        backgroundColor: `hsl(210deg 15% ${bgLightness}%)`,
      }}
    >
      <div
        className="absolute w-[100px] h-[100px] mb-20"
        style={{
          transform: `scaleY(${scaleY}) rotate(${rotate}deg) skewX(${skew}deg)`,
          borderRadius: `${radius}%`,
          backgroundColor: `hsl(${boxHue}deg 100% 60%)`,
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 p-4 font-semibold text-white bg-black">
        <label htmlFor="slider">Reveal:</label>
        <input
          id="slider"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="w-full max-w-[300px] cursor-pointer"
        />
      </div>
    </div>
  );
}
