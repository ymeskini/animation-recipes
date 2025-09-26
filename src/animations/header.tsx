import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  clamp,
  useTransform,
  useMotionTemplate,
} from "motion/react";

function useBoundedScroll(bound: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bound],
    [0, 1]
  );

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious();
    const diff = current - (previous || 0);
    const newScrollYBounded = scrollYBounded.get() + diff;

    scrollYBounded.set(clamp(0, bound, newScrollYBounded));
  });

  return { scrollYBounded, scrollYBoundedProgress };
}

export function Header() {
  const { scrollYBoundedProgress } = useBoundedScroll(100);
  // const scrollYBoundedProgressThrottled = useTransform(
  //   scrollYBoundedProgress,
  //   [0, 0.75, 1],
  //   [0, 0, 1]
  // );
  const height = useTransform(scrollYBoundedProgress, [0, 1], [80, 50]);
  const opacity = useTransform(scrollYBoundedProgress, [0, 1], [1, 0]);
  const logoScale = useTransform(scrollYBoundedProgress, [0, 1], [1, 0.9]);
  const blurValue = useTransform(scrollYBoundedProgress, [0, 1], [1, 0.1]);
  const concatBlurClass = useMotionTemplate`rgba(255, 255, 255, ${blurValue})`;


  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            height,
            backgroundColor: concatBlurClass,
          }}
          className="fixed inset-x-0 flex h-20 backdrop-blur-md shadow"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              style={{ scale: logoScale }}
              className="flex origin-left items-center text-xl font-semibold uppercase"
            >
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </motion.p>
            <motion.nav
              style={{ opacity }}
              className="flex space-x-4 text-xs font-medium text-slate-400"
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="px-8 pt-28">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
