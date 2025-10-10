import { useState } from "react";
import { cn } from "../../utils/cn";
import { convertPolarToCartesian, normalize, random } from "../../utils/math";

// need to match this with the animation duration in the CSS in particle span below
const FADE_DURATION = 1000;
// `JITTER` is the amount of variance allowed for each angle.
// Tweak this value to control how orderly/chaotic the animation appears.
const JITTER = 40;
const NUM_OF_PARTICLES = 20;

type Particle = {
  id: string;
  x: number;
  y: number;
};

export default function Like() {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);

    if (newLiked) {
      const newParticles = Array.from(
        { length: NUM_OF_PARTICLES },
        (_, index) => {
          const angle =
            normalize(index, [0, NUM_OF_PARTICLES], [0, 360]) +
            random(-JITTER, JITTER);
          const distance = random(40, 50);
          const [x, y] = convertPolarToCartesian(angle, distance);
          return {
            x,
            y,
            id: crypto.randomUUID(),
          };
        }
      );

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, FADE_DURATION + 100);
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
            "--fade-duration": `${FADE_DURATION}ms`,
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
            className={`absolute m-auto inset-0 w-3 h-3 rounded-full bg-white pointer-events-none [animation:fadeToTransparent_var(--fade-duration)_forwards,disperse_500ms_forwards_var(--particle-curve)]`}
            style={
              {
                "--x": `${particle.x}px`,
                "--y": `${particle.y}px`,
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
