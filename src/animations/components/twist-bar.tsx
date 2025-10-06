import { useId, useState } from "react";

export default function TwistBar() {
  const [rotation, setRotation] = useState(0);
  const id = useId();

  return (
    <div className="flex items-center flex-col px-6 py-14 gap-12 bg-black text-white rounded">
      <style>{`
        @keyframes twist {
          from {
            transform: rotate(var(--rotation));
          }
          to {
            transform: rotate(calc(var(--rotation) * -1));
          }
        }
      `}</style>
      <div
        className="w-[100px] h-[30px] rounded bg-yellow-500 animate-[twist_750ms_infinite_alternate_ease-in-out]"
        style={
          {
            "--rotation": `${rotation}deg`,
          } as React.CSSProperties
        }
      />

      <div className="flex flex-col items-center gap-2 p-4 text-sm font-bold uppercase">
        <label htmlFor={id}>Rotate Amount</label>
        <input
          type="range"
          id={id}
          min="0"
          max="180"
          value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="block w-[400px] max-w-9/12"
        />
      </div>
    </div>
  );
}
