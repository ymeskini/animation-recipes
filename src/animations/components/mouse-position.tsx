import { useEffect, useState } from "react";

import { normalize } from "../../utils/math";

export default function MousePosition() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);

  const handlePointerMove = (event: PointerEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    // we want a percentage value between 0 and 100
    // we pass the value, min and max of input range
    // and min and max of output range
    const xAsPercentage = Math.round(
      normalize(x, [0, window.innerWidth], [0, 100])
    );
    const yAsPercentage = Math.round(
      normalize(y, [0, window.innerHeight], [0, 100])
    );

    setMouseX(xAsPercentage);
    setMouseY(yAsPercentage);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-96 bg-black text-white text-center">
      <div>
        <h1 className="text-2xl mb-4">Mouse Position</h1>
        <ul className="flex justify-center w-[12.5rem] gap-8 p-0 list-none">
          <li className="flex-1 flex flex-col items-center">
            <span className="text-base text-[hsl(210,20%,55%)]">
              Horizontal
            </span>
            <span className="text-xl font-bold">
              {mouseX !== null ? `${mouseX}%` : "—"}
            </span>
          </li>
          <li className="flex-1 flex flex-col items-center">
            <span className="text-base text-[hsl(210,20%,55%)]">Vertical</span>
            <span className="text-xl font-bold">
              {mouseY !== null ? `${mouseY}%` : "—"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
