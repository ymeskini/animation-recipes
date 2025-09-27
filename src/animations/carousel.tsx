import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { useKey } from "react-use";

const images = [
  "/images/carousel/1.jpeg",
  "/images/carousel/2.jpeg",
  "/images/carousel/3.jpeg",
  "/images/carousel/4.jpeg",
  "/images/carousel/5.jpeg",
  "/images/carousel/6.jpeg",
];

const ButtonControls = ({
  index,
  setNext,
  setPrevious,
}: {
  index: number;
  setNext: () => void;
  setPrevious: () => void;
}) => (
  <>
    <AnimatePresence initial={false}>
      {index > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          whileHover={{ opacity: 1 }}
          className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
          onClick={setPrevious}
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
          onClick={setNext}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  </>
);

export function Carousel() {
  const [index, setIndex] = useState(0);

  useKey(
    "ArrowRight",
    () => {
      if (index < images.length - 1) {
        setIndex((index) => index + 1);
      }
    },
    {},
    [index]
  );

  useKey(
    "ArrowLeft",
    () => {
      if (index > 0) {
        setIndex((index) => index - 1);
      }
    },
    {},
    [index]
  );

  return (
    // ease in a bezier curve found from open source
    // trying to mimic apple
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.75, 0, 1] }}>
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {images.map((src, i) => (
                <img key={i} src={src} className="aspect-[3/2] object-cover" />
              ))}
            </motion.div>

            <ButtonControls
              index={index}
              setNext={() =>
                setIndex((i) => Math.min(i + 1, images.length - 1))
              }
              setPrevious={() => setIndex((i) => Math.max(i - 1, 0))}
            />
          </div>

          <div className="flex right-0 left-0 h-14 absolute bottom-6 justify-center inset-x-0 overflow-hidden w-full">
            <motion.div
              animate={{
                x: `-${index * 100 + 12}%`,
              }}
              className="flex aspect-[3/2]"
            >
              {images.map((src, i) => (
                <motion.button
                  initial={false}
                  key={i}
                  onClick={() => setIndex(i)}
                  className="shrink-0"
                  animate={{
                    opacity: index === i ? 1 : 0.5,
                    marginLeft: index === i ? "12%" : "0%",
                    marginRight: index === i ? "12%" : "0%",
                  }}
                  whileHover={{ opacity: 1 }}
                >
                  <img src={src} className="h-full object-cover aspect-[3/2]" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* indicator to make sure the selected image is horizontally centered */}
      <div className="flex justify-center">
        <div className="relative right-0 left-0 rounded-full bg-white border aspect-[3/2] bottom-4 size-2"></div>
      </div>
    </MotionConfig>
  );
}
