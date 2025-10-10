import { useEffect, useState } from "react";
import { convertPolarToCartesian, random } from "../../utils/math";

const COLORS = [
  "hsl(35deg 100% 50%)",
  "hsl(40deg 100% 50%)",
  "hsl(45deg 100% 60%)",
  "hsl(50deg 100% 65%)",
];

const FADE_DURATION = 500;
const FADE_DELAY = 500;

type Particle = {
  id: string;
  color: string;
  angle: number;
  distance: number;
  x: number;
  y: number;
};

const RocketParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {

    const interval = setInterval(() => {
      const distance = random(45, 80);
      const angle = random(90 - 30, 90 + 30);
      const [x, y] = convertPolarToCartesian(angle, distance);
      const newParticle: Particle = {
        angle,
        distance,
        x,
        y,
        id: crypto.randomUUID(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };

      setParticles((prev) => [...prev, newParticle]);

      // Remove particle after animation completes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 2000);

    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
            transform: translate(var(--x), var(--y));
          }
        }

        @keyframes oscillate {
          from {
            transform: translateY(-5%);
          }
          to {
            transform: translateY(5%);
          }
        }
      `}</style>
      <div
        style={
          {
            "--fade-duration": `${FADE_DURATION}ms`,
            "--fade-delay": `${FADE_DELAY}ms`,
          } as React.CSSProperties
        }
        className="h-96 bg-black flex flex-col justify-center items-center border rounded"
      >
        <div className="relative">
          {particles.map((particle) => {
            return (
              <div
                key={particle.id}
                className="absolute right-0 left-0 bottom-5 w-[10px] h-[10px] rounded-full mx-auto [animation:disperse_750ms_forwards,fadeToTransparent_var(--fade-duration)_var(--fade-delay)_forwards]"
                style={
                  {
                    backgroundColor: particle.color,
                    "--x": `${particle.x}px`,
                    "--y": `${particle.y}px`,
                  } as React.CSSProperties
                }
              />
            );
          })}
          <img
            className="w-[125px] max-w-full aspect-[500/503] relative [animation:oscillate_1500ms_ease-in-out_infinite_alternate]"
            alt="A cute 3D illustration of a rocketship made of clay"
            src="/clay-rocket.png"
          />
        </div>
      </div>
    </>
  );
};

export default RocketParticles;
