import { XMarkIcon } from "@heroicons/react/24/solid";
import * as RadixToast from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "../../utils/cn";

export default function Toast() {
  const [toasts, setToasts] = useState<{ message: string; id: string }[]>([]);

  return (
    <div className="flex self-start p-4">
      <button
        onClick={() =>
          setToasts([
            ...toasts,
            { message: getRandomMessage(), id: window.crypto.randomUUID() },
          ])
        }
        className="w-28 rounded border-t border-white/20 bg-sky-500 py-2 text-white"
      >
        Notify
      </button>
      <RadixToast.Provider>
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <RadixToast.Root
              key={toast.id}
              duration={3000}
              asChild
              forceMount
              onOpenChange={() => {
                setToasts((toasts) => toasts.filter((t) => t.id !== toast.id));
              }}
            >
              <motion.li
                className={cn(
                  "flex items-center justify-between rounded-lg bg-slate-800 p-4 border border-slate-700 px-6 py-4",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                )}
                layout
                transition={{ duration: 0.6, type: "spring", bounce: 0 }}
                // 300 is the width of the toast + margin (in Viewport)
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ opacity: 0, z: -1, transition: { duration: 0.2 } }}
              >
                <RadixToast.Description className="text-white text-sm font-medium">
                  {toast.message}
                </RadixToast.Description>
                <RadixToast.Close className="text-slate-600 rounded hover:text-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 focus-visible:text-gray-200">
                  <XMarkIcon className="size-5" />
                </RadixToast.Close>
              </motion.li>
            </RadixToast.Root>
          ))}
        </AnimatePresence>

        <RadixToast.Viewport className="fixed top-4 right-4 w-80 flex flex-col-reverse gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 rounded-lg" />
      </RadixToast.Provider>
    </div>
  );
}

const messages = [
  "Changes Saved!",
  "Message Sent!",
  "Profile Updated!",
  "Settings Changed!",
  "Item Deleted!",
  "Action Completed!",
  "Upload Successful!",
  "Download Finished!",
  "Task Added!",
  "Reminder Set!",
  "Subscription Activated!",
  "Password Changed!",
  "Email Verified!",
  "Backup Created!",
  "Sync Completed!",
  "Connection Established!",
  "Update Available!",
  "Friend Request Sent!",
  "Comment Posted!",
  "Like Added!",
];
function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}
