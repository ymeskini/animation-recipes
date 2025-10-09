import { useState, useEffect, useRef } from "react";
import { convertPolarToCartesian, random } from "../../utils/math";

const FADE_DURATION = 1000;

type Particle = {
  id: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
};

const CursorSparkle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      const newParticles = Array.from({ length: 5 }, (_, i) => {
        const angle = random(200, 260);
        const distance = random(30, 100);
        const [offsetX, offsetY] = convertPolarToCartesian(angle, distance);
        return {
          x,
          y,
          offsetX,
          offsetY,
          id: Date.now() + i,
        };
      });

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, FADE_DURATION + 100);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --fade-duration: ${FADE_DURATION}ms;
          --particle-curve: cubic-bezier(0.2, 0.56, 0, 1);
        }
        @keyframes fadeToTransparent {
          to {
            opacity: 0;
          }
        }

        @keyframes disperse {
          to {
            transform: translate(var(--x), var(--y));
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="min-h-screen bg-black cursor-[url(/cursor/cursor.svg),_auto] select-none"
      >
        {/* Hidden image preloader */}
        <img alt="" src="/cursor/wand-sparkle.svg" className="hidden" />
        {particles.map((particle) => (
          <img
            key={particle.id}
            alt=""
            src="/cursor/wand-sparkle.svg"
            className="fixed pointer-events-none z-[9999] [animation:fadeToTransparent_var(--fade-duration)_forwards,disperse_500ms_forwards_var(--particle-curve)]"
            style={
              {
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                "--x": `${particle.offsetX}px`,
                "--y": `${particle.offsetY}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};

export default CursorSparkle;
