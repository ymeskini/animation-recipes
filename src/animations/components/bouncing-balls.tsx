export default function BouncingBalls() {
  return (
    <>
      <style>
        {`
          @keyframes bounce {
            to {
              transform: translateY(calc(var(--distance) * -1));
            }
          }
        `}
      </style>
      <div
        style={
          {
            "--bounce-bezier": "cubic-bezier(0.15, 0.68, 0.65, 1.00)",
          } as React.CSSProperties
        }
        className="grid place-content-center p-32 bg-black"
      >
        <div className="relative flex gap-4 px-4 border-b-4 border-white rounded">
          {[
            { distance: "30px", duration: "500ms" },
            { distance: "50px", duration: "400ms" },
            { distance: "70px", duration: "500ms" },
          ].map((ball, index) => (
            <div
              key={index}
              className="size-[50px] rounded-full bg-yellow-500 [animation:bounce_var(--duration)_infinite_alternate_var(--bounce-bezier)]"
              style={
                {
                  "--distance": ball.distance,
                  "--duration": ball.duration,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
