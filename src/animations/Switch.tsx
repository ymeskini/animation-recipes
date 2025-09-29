import { useId, useState } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

import { cn } from "../utils/cn";

// doc for radix switch: https://www.radix-ui.com/primitives/docs/components/switch
export default function Switch() {
  const id = useId();
  const [airplaneMode, setAirplaneMode] = useState(false);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Switch</h1>
          <form
            action={(formData) => {
              console.log({
                airplaneMode: formData.get("airplaneMode"),
              });
            }}
          >
            <label className="flex space-x-4" htmlFor={id}>
              <span className="font-medium">Airplane mode</span>
              <RadixSwitch.Root
                id={id}
                name="airplaneMode"
                checked={airplaneMode}
                onCheckedChange={setAirplaneMode}
                className={cn(
                  "w-11 bg-gray-700 rounded-full transition p-px shadow-inner shadow-black/50 min-w-11",
                  "data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400 active:bg-gray-600",
                  "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                )}
              >
                <RadixSwitch.Thumb className="size-6 bg-gray-200 block rounded-full data-[state=checked]:bg-white data-[state=checked]:translate-x-[18px] transition will-change-transform shadow-sm" />
              </RadixSwitch.Root>
            </label>
            <button className="mt-4" type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
