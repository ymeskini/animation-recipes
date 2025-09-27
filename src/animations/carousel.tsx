import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";

const images = [
  "/images/carousel/1.jpeg",
  "/images/carousel/2.jpeg",
  "/images/carousel/3.jpeg",
  "/images/carousel/4.jpeg",
  "/images/carousel/5.jpeg",
  "/images/carousel/6.jpeg",
];

const collapsedAspectRatio = 1 / 3;
const fullAspectRatio = 3 / 2;

export function Carousel() {
  const [index, setIndex] = useState(0);

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.75, 0, 1] }}>
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              // ease in a bezier curve found from open source
              // trying to mimic apple
              className="flex"
            >
              {images.map((src, i) => (
                <img key={i} src={src} className="aspect-[3/2] object-cover" />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex right-0 left-0 h-14 absolute bottom-6 justify-center inset-x-0 overflow-hidden w-full">
            <motion.div
              animate={{
                x: `-${(index * 100 * (1 / 3))}%`,
              }}
              className="flex aspect-[3/2]"
            >
              {images.map((src, i) => {
                const isImageSelected = i === index;

                return (
                  <motion.button
                    onClick={() => setIndex(i)}
                    className="shrink-0"
                    animate={{
                      aspectRatio: isImageSelected
                        ? fullAspectRatio
                        : collapsedAspectRatio,
                    }}
                    key={i}
                  >
                    <img src={src} className="h-full object-cover" />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
