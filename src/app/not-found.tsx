"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Search, AlertCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] animate-pulse-slower" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-8">
                {/* Animated 404 Text */}
                <div className="relative inline-block">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 select-none"
                    >
                        404
                    </motion.h1>

                    {/* Glitch Overlay Text */}
                    <motion.div
                        animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay"
                    >
                        <span className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-neon-green/20 blur-sm">404</span>
                    </motion.div>

                    {/* Floating Icon Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 p-4 rounded-3xl shadow-2xl"
                    >
                        <AlertCircle className="w-12 h-12 text-neon-green animate-pulse" />
                    </motion.div>
                </div>

                {/* Message */}
                <div className="space-y-4 -mt-10 md:-mt-20 relative z-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold"
                    >
                        Page Not Found
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-neutral-400 max-w-lg mx-auto text-lg"
                    >
                        The page you are looking for keeps disappearing into the void. It might have been moved, deleted, or never existed.
                    </motion.p>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
                >
                    <Link href="/">
                        <MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold rounded-full flex items-center gap-2 group hover:bg-neon-green/90 transition-colors">
                            <Home className="w-5 h-5" />
                            <span>Back to Home</span>
                        </MagneticButton>
                    </Link>

                    <Link href="/services">
                        <MagneticButton className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full flex items-center gap-2 group hover:bg-white/10 hover:border-white/20 transition-all">
                            <Search className="w-5 h-5 group-hover:text-neon-green transition-colors" />
                            <span>Explore Services</span>
                        </MagneticButton>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 md:left-1/4 w-16 h-16 border border-white/5 rounded-xl rotate-12 backdrop-blur-sm bg-white/5 z-0"
            />
            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-10 md:right-1/4 w-24 h-24 border border-neon-green/10 rounded-full backdrop-blur-sm bg-neon-green/5 z-0"
            />
        </main>
    );
}
