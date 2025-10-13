import { useState } from "react";
import { convertPolarToCartesian, random } from "../../utils/math";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const FADE_DURATION = 1000;
const FADE_DELAY = 300;

type Particle = {
  id: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
};

const CursorSparkle = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (prefersReducedMotion) return;

    const x = event.clientX;
    const y = event.clientY;

    const newParticles = Array.from({ length: 5 }, (_, i) => {
      const angle = random(225 - 20, 225 + 20);
      const distance = random(30, 60);
      const [offsetX, offsetY] = convertPolarToCartesian(angle, distance);
      return {
        x,
        y,
        offsetX,
        offsetY,
        rotation: random(0, 360),
        id: Date.now() + i,
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, FADE_DURATION + FADE_DELAY + 200);
  };

  return (
    <>
      <style>{`
        @keyframes fadeToTransparent {
          to {
            opacity: 0;
          }
        }

        @keyframes disperse {
          to {
            transform: translate(var(--x), var(--y)) rotate(var(--rotation));
          }
        }
      `}</style>

      <div
        onClick={handleClick}
        className="min-h-96 bg-black cursor-[url(/cursor/cursor.svg),_auto] select-none active:cursor-[url(/cursor/cursor-active.svg),_auto] touch-none"
        style={
          {
            "--fade-duration": `${FADE_DURATION}ms`,
            "--fade-delay": `${FADE_DELAY}ms`,
            "--particle-curve": "cubic-bezier(0.26, 0.95, 0, 1)",
          } as React.CSSProperties
        }
      >
        {/* Hidden image preloader */}
        <img alt="" src="/cursor/wand-sparkle.svg" className="hidden" />
        {particles.map((particle) => (
          <img
            key={particle.id}
            alt=""
            src="/cursor/wand-sparkle.svg"
            aria-hidden="true"
            className="fixed pointer-events-none z-[9999] [animation:disperse_1000ms_forwards_cubic-bezier(0.26,0.95,0.00,1.00),fadeToTransparent_var(--fade-duration)_var(--fade-delay)_forwards]"
            style={
              {
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                "--x": `${particle.offsetX}px`,
                "--y": `${particle.offsetY}px`,
                "--rotation": `${particle.rotation}deg`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default CursorSparkle;
