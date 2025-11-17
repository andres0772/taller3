import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
};

export const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div initial="initial" animate="in" variants={pageVariants} transition={{ duration: 0.5 }}>
    {children}
  </motion.div>
);