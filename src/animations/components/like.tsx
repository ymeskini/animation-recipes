import { useState } from "react";
import { cn } from "../../utils/cn";
import { convertPolarToCartesian, normalize, random } from "../../utils/math";

const MIN_DISTANCE = 32;
const MAX_DISTANCE = 64;
const MIN_FADE_DURATION = 1000 - 500;
const MAX_FADE_DURATION = 1000 + 500;
const MAX_FADE_DELAY = 500;
const MAX_FADE_ADJUST = 200;
const NUM_OF_PARTICLES = 15;

type Particle = {
  id: string;
  x: number;
  y: number;
  fadeDuration: number;
  fadeDelay: number;
  popDuration: number;
  size: number;
  twinkleDuration: number;
  twinkleAmount: number;
};

export default function Like() {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);

    if (newLiked) {
      const newParticles = Array.from<Particle, Particle>(
        { length: NUM_OF_PARTICLES },
        (_, index) => {
          const angle =
            normalize(index, [0, NUM_OF_PARTICLES], [0, 360]) + random(-40, 40);
          const distance = random(MIN_DISTANCE, MAX_DISTANCE);
          const [x, y] = convertPolarToCartesian(angle, distance);
          return {
            x,
            y,
            id: crypto.randomUUID(),
            fadeDelay:
              normalize(
                distance,
                [MIN_DISTANCE, MAX_DISTANCE],
                [0, MAX_FADE_DELAY]
              ) + random(0, 200),
            fadeDuration:
              normalize(
                distance,
                [MIN_DISTANCE, MAX_DISTANCE],
                [MIN_FADE_DURATION, MAX_FADE_DURATION]
              ) + random(-200, 200),
            popDuration:
              normalize(distance, [MIN_DISTANCE, MAX_DISTANCE], [300, 700]) +
              random(-200, 200),
            size: random(9, 16),
            twinkleDuration: random(150, 300),
            twinkleAmount: random(0.5, 1),
          };
        }
      );

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, MAX_FADE_DURATION + MAX_FADE_DELAY + MAX_FADE_ADJUST + 200);
    }
  };

  return (
    <div className="p-8 bg-black rounded w-full flex justify-center">
      <style>{`
        @keyframes fadeToTransparent {
          /* fade from the opacity value of an element which is 1 by default */
          to {
            opacity: 0;
          }
        }

        /* v2 with dynamic values */
        @keyframes disperse {
          to {
            transform: translate(var(--x), var(--y));
          }
        }

        @keyframes twinkle {
          from {
            opacity: var(--twinkle-amount);
          }
          to {
            opacity: 1;
          }
        }

        /* v3 with angle and distance with css functions */
        // we'll stay with v2 with javascript calculating the x and y values
        // @keyframes disperse {
        //   to {
        //     transform: translate(
        //       calc(cos(var(--angle)) * var(--distance)),
        //       calc(sin(var(--angle)) * var(--distance))
        //     );
        //   }
        // }
      `}</style>
      <button
        style={
          {
            "--particle-curve": "cubic-bezier(0.2, 0.56, 0, 1)",
          } as React.CSSProperties
        }
        onClick={handleClick}
        className={cn(
          "relative p-4 bg-transparent border-none rounded-full cursor-pointer transition-colors hover:bg-white/15",
          isLiked
            ? "[&_path]:fill-[oklch(0.65_0.3_19.41)] [&_path]:stroke-[oklch(0.65_0.3_19.41)]"
            : "[&_path]:hover:stroke-[oklch(0.65_0.3_19.41)]"
        )}
      >
        <HeartIcon />
        <span className="sr-only">Like this post</span>
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`absolute m-auto inset-0 rounded-full bg-white pointer-events-none [animation:twinkle_var(--twinkle-duration)_infinite_alternate_ease-in-out,_fadeToTransparent_var(--fade-duration)_var(--fade-delay)_forwards,disperse_var(--pop-duration)_forwards_var(--particle-curve)]`}
            style={
              {
                "--x": `${particle.x}px`,
                "--y": `${particle.y}px`,
                "--fade-duration": `${particle.fadeDuration}ms`,
                "--fade-delay": `${particle.fadeDelay}ms`,
                "--pop-duration": `${particle.popDuration}ms`,
                "--twinkle-duration": `${particle.twinkleDuration}ms`,
                "--twinkle-amount": particle.twinkleAmount,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </button>
    </div>
  );
}

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="relative block w-12 h-12"
  >
    <path
      d="M3.68546 5.43796C8.61936 1.29159 11.8685 7.4309 12.0406 7.4309C12.2126 7.43091 15.4617 1.29159 20.3956 5.43796C26.8941 10.8991 13.5 21.8215 12.0406 21.8215C10.5811 21.8215 -2.81297 10.8991 3.68546 5.43796Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      className="transition-all"
    />
  </svg>
);
