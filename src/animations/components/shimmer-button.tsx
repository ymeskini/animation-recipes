import { cn } from "../../utils/cn";

export default function ShimmerButton() {
  return (
    <button
      className={cn(
        "group relative block px-12 py-4 border-none rounded-full cursor-pointer overflow-hidden",
        "text-black font-medium",
        `bg-gradient-to-t from-[oklch(0.6_0.19_164)] to-[oklch(0.9_0.2_182)]`,
        "[box-shadow:inset_0px_-1px_2px_hsl(175deg_100%_20%_/_0.5),inset_0px_-3px_6px_hsl(175deg_100%_20%_/_0.4),inset_0px_5px_5px_hsl(175deg_100%_90%_/_0.75)]",
        "before:content-[''] before:absolute before:top-1 before:left-4 before:right-4 before:h-2.5",
        "before:rounded-t-full before:border-t-4 before:border-white before:blur-sm before:opacity-[0.625]"
      )}
    >
      Buy Now
      <span
        className={cn(
          "absolute inset-0 h-full w-full opacity-50 group-hover:translate-x-full",
          "bg-gradient-to-r from-transparent via-[hsl(180deg_100%_90%)] to-transparent",
          "-translate-x-full transition-transform duration-1000"
        )}
      />
    </button>
  );
}
