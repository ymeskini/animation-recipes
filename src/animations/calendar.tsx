import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { useMeasure } from "react-use";

export default function Calendar() {
  const [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  const [direction, setDirection] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const month = parse(monthString, "yyyy-MM", new Date());

  function nextMonth() {
    if (isAnimating) return;
    const next = addMonths(month, 1);

    setMonthString(format(next, "yyyy-MM"));
    setDirection(1);
    setIsAnimating(true);
  }

  function previousMonth() {
    if (isAnimating) return;
    const previous = subMonths(month, 1);

    setMonthString(format(previous, "yyyy-MM"));
    setDirection(-1);
    setIsAnimating(true);
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig transition={transition}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white overflow-hidden">
          <div className="py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <ResizablePanel>
                <AnimatePresence
                  initial={false}
                  mode="popLayout"
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    initial="enter"
                    animate="middle"
                    exit="exit"
                    key={monthString}
                  >
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        variants={removeImmediatly}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>
                      <motion.p
                        variants={variants}
                        custom={direction}
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, "MMMM yyyy")}
                      </motion.p>
                      <motion.button
                        variants={removeImmediatly}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 15%, transparent 30%, transparent 70%, white 85%)",
                        }}
                      ></div>
                    </header>
                    <motion.div
                      variants={removeImmediatly}
                      className="grid grid-cols-7 gap-y-6 mt-6 px-8"
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>
                    <motion.div
                      variants={variants}
                      custom={direction}
                      className="grid grid-cols-7 gap-y-6 mt-6 px-8"
                    >
                      {days.map((day) => (
                        <span
                          className={cn(
                            "font-semibold",
                            !isSameMonth(day, month) && "text-stone-300"
                          )}
                          key={day.toString()}
                        >
                          {format(day, "d")}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

const ResizablePanel = ({ children }: { children: ReactNode }) => {
  const [ref, bounds] = useMeasure<HTMLDivElement>();

  return (
    <motion.div
      animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

const transition = { duration: 0.4, type: "spring", bounce: 0 } as const;

const variants = {
  enter: (direction: number) => ({ x: `${100 * direction}%`, opacity: 0 }),
  middle: { x: "0%", opacity: 1 },
  exit: (direction: number) => ({ x: `${-100 * direction}%`, opacity: 0 }),
};

const removeImmediatly = {
  exit: { visibility: "hidden" },
};
