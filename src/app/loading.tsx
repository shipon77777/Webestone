
"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/90 backdrop-blur-xl">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="relative flex flex-col items-center justify-center gap-8">
                {/* Central Cyber Core */}
                <div className="relative w-24 h-24">
                    {/* Outer Rotating Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t-2 border-r-2 border-neon-green/30 shadow-[0_0_20px_rgba(0,255,157,0.2)]"
                    ></motion.div>

                    {/* Middle Counter-Rotating Ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-b-2 border-l-2 border-blue-500/50"
                    ></motion.div>

                    {/* Inner Pulsing Core */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-8 rounded-full bg-neon-green shadow-[0_0_30px_rgba(0,255,157,0.6)]"
                    ></motion.div>
                </div>

                {/* Loading Text with Glitch/Typewriter Effect */}
                <div className="space-y-2 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="text-neon-green font-mono text-sm tracking-[0.5em] font-bold"
                    >
                        INITIALIZING...
                    </motion.div>

                    {/* Progress Bar Line */}
                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green to-transparent w-1/2 h-full opacity-70"
                        ></motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
