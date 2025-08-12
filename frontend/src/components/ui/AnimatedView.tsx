import { AnimatedViewProps } from "@/types";
import { motion, AnimatePresence } from "motion/react";

export const AnimatedView = ({ view, children }: AnimatedViewProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={view}
      initial={{ x: 50, opacity: 0, scale: 0.98 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: -50, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
