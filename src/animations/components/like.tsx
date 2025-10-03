import { useState } from "react";
import { cn } from "../../utils/cn";

// need to match this with the animation duration in the CSS in particle span below
const FADE_DURATION = 1000;

export default function Like() {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; top: number; left: number }>
  >([]);

  const handleClick = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);

    if (newLiked) {
      // create 5 particles with random positions included
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        top: Math.round(Math.random() * 100),
        left: Math.round(Math.random() * 100),
      }));

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id))
        );
      }, FADE_DURATION);
    }
  };

  return (
    <div className="p-8 bg-black rounded w-full flex justify-center">
      <button
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
            className={`absolute w-3 h-3 rounded-full bg-white pointer-events-none animate-[1s_fadeOut_forwards] -translate-1/2`}
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
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
