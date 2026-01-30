import { AnimatedMenuProps } from "@/types";
import { motion } from "motion/react";

export const AnimatedDropdown = ({ menu, children }: AnimatedMenuProps) => (
  <motion.div
    key={menu}
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -10, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);
