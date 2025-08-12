import { AnimatedMenuProps } from "@/types";
import { motion } from "motion/react";

export const AnimatedMenu = ({ menu, children }: AnimatedMenuProps) => (
  <motion.div
    key={menu}
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 100, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
