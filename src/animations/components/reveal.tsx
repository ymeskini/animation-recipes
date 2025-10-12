import {
  useMotionValue,
  useTransform,
  motion,
  useMotionTemplate,
} from "motion/react";
import { useState } from "react";

export default function Reveal() {
  const [value, setValue] = useState(0);
  const sliderValue = useMotionValue(0);

  // Transform calculations using useTransform
  const skew = useTransform(sliderValue, [0, 100], [25, 0]);
  const rotate = useTransform(sliderValue, [0, 100], [225, -45]);
  const radius = useTransform(sliderValue, [0, 100], [50, 5]);
  // scaleY: grow from 0.01 to 1 over the first half (0-50), then stay at 1
  const scaleY = useTransform(sliderValue, [0, 50, 100], [0.01, 1, 1]);
  // boxHue: stay at 0° for first half, then scale from 0° to 45° in second half
  const boxHue = useTransform(sliderValue, [0, 50, 100], [0, 0, 45]);
  // bgLightness: stay at 6% for first 75%, then scale from 6% to 26% in final 25%
  const bgLightness = useTransform(sliderValue, [0, 75, 100], [6, 6, 26]);

  const borderRadius = useMotionTemplate`${radius}%`;
  const backgroundColor = useMotionTemplate`hsl(${boxHue}deg 100% 60%)`;
  const bgColor = useMotionTemplate`hsl(210deg 15% ${bgLightness}%)`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.valueAsNumber;
    setValue(newValue);
    sliderValue.set(newValue);
  };

  return (
    <motion.div
      className="relative h-72 w-full flex items-center justify-center"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <motion.div
        className="absolute w-[100px] h-[100px] mb-20"
        style={{
          skewX: skew,
          rotate: rotate,
          scaleY: scaleY,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
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
    </motion.div>
  );
}
