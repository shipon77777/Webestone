"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep charcoal background is set in globals.css, this is for accents */}

      {/* Floating Orb 1 */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-green/10 rounded-full blur-[60px] will-change-transform"
      />

      {/* Floating Orb 2 */}
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] will-change-transform"
      />

      {/* Floating Orb 3 */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[100px] will-change-transform"
      />

      {/* Grid overlay or other subtle texture could go here */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
    </div>
  );
}
