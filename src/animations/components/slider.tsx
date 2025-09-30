import { useState } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { clamp } from "motion/react";

import { cn } from "../../utils/cn";

function roundToStep(value: number, step: number) {
  const inverseStep = 1 / step;
  return Math.round(value * inverseStep) / inverseStep;
}

export default function Slider(props: {
  max?: number;
  min?: number;
  step?: number;
  value?: number;
  onValueChange?: (value: number) => void;
}) {
  const [isUsingPointer, setIsUsingPointer] = useState(false);
  const [value, setValue] = useState(props.value ?? 50);
  const [startingPoints, setStartingPoints] = useState({
    clienX: 0,
    internalValue: 50,
  });

  const { max = 100, min = 0, step = 1, onValueChange = () => {} } = props;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Slider</h1>

      <div className="mx-auto w-full max-w-xs">
        <form
          className="space-y-8 rounded"
          action={(formData) => {
            console.log(formData.get("volume"));
          }}
        >
          <span className="text-sm font-medium">Settings</span>

          <div className="group flex items-center mt-4 gap-3 hover:-mx-3 transition-all *:duration-[350ms] bg-black p-6 rounded hover:cursor-grab active:cursor-grabbing touch-none select-none">
            <SpeakerXMarkIcon className="size-5 group-hover:text-white group-hover:scale-125 transition text-gray-300" />
            <RadixSlider.Root
              min={min}
              max={max}
              step={step}
              onValueCommit={([v]) => {
                setValue(v);
                onValueChange(v);
              }}
              value={[value]}
              defaultValue={[50]}
              name="volume"
              className="relative h-1.5 flex items-center grow group-hover:h-4 transition-all"
              onPointerDown={(e) => {
                setIsUsingPointer(true);
                setStartingPoints({
                  clienX: e.clientX,
                  internalValue: value,
                });
              }}
              onPointerMove={(e) => {
                if (e.buttons > 0) {
                  const diffInPixels = e.clientX - startingPoints.clienX;
                  const sliderWidth = e.currentTarget.clientWidth;
                  const pixelsPerUnit = (max - min) / sliderWidth;
                  const diffInUnits = diffInPixels * pixelsPerUnit;

                  const newValue = roundToStep(
                    clamp(min, max, startingPoints.internalValue + diffInUnits),
                    step
                  );
                  setValue(newValue);
                  onValueChange(newValue);
                }
              }}
              onBlur={() => setIsUsingPointer(false)}
            >
              <RadixSlider.Track
                className={cn(
                  "grow bg-gray-700 h-full rounded-full overflow-hidden relative",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                  !isUsingPointer &&
                    "group-has-[:focus-visible]:outline outline-sky-500 outline-offset-2"
                )}
              >
                <RadixSlider.Range className="bg-gray-300 group-hover:bg-white absolute h-full">
                  <div className="absolute inset-0 group-has-[:focus-visible]:bg-white" />
                </RadixSlider.Range>
              </RadixSlider.Track>
              <RadixSlider.Thumb />
            </RadixSlider.Root>
            <SpeakerWaveIcon className="size-5 text-gray-300 group-hover:text-white group-hover:scale-125 transition " />
          </div>

          {value}
          <div className="mt-5 flex items-center justify-between">
            <button className="rounded bg-gray-400/[.15] px-3 py-1 text-sm font-medium">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
