"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50, damping: 20 } },
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden z-10 pt-20">
            <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-8"
                >
                    <motion.div variants={item} className="flex items-center gap-2">
                        <span className="w-10 h-[1px] bg-neon-green"></span>
                        <span className="text-neon-green uppercase tracking-widest text-sm font-semibold">Innovation Meets Automation</span>
                    </motion.div>

                    <motion.h1
                        variants={item}
                        className="text-5xl md:text-7xl font-bold tracking-tight pb-2 text-white leading-[1.1]"
                    >
                        Your guide in{" "}
                        <span className="bg-gradient-to-r from-neon-green via-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block">
                            Automated world
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-lg text-neutral-400 max-w-xl leading-relaxed"
                    >
                        Your brand does not need just another post. It needs attention, engagement, and conversions. At WeBestOne, we combine creativity, data, and artificial intelligence to turn ideas into measurable business growth. From design and marketing to intelligent automation, every solution we create is made to stand out, perform, and succeed.
                    </motion.p>

                    <motion.div variants={item} className="pt-4 flex justify-start">
                        {/* Wrapper for magnetic effect */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <MagneticButton className="relative px-8 py-4 bg-neon-green rounded-full leading-none flex items-center divide-x divide-transparent border border-neon-green/50 hover:bg-neon-green/90 transition-colors duration-300 shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                                <span className="flex items-center space-x-5">
                                    <span className="pr-4 text-black font-bold group-hover:text-black transition-colors">Start My Growth</span>
                                </span>
                                <span className="pl-4 text-black transition-transform group-hover:translate-x-1 duration-200">
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Visual Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-[1000px]"
                >
                    {/* Abstract Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-neon-green/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Glass Stack Layer 1 (Back) */}
                    <motion.div
                        animate={{ rotateX: [10, 15, 10], rotateY: [-5, -10, -5], y: [-20, 0, -20] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[80%] h-[60%] bg-white/5 border border-white/5 rounded-3xl backdrop-blur-sm -z-10 transform-gpu rotate-6"
                    ></motion.div>

                    {/* Glass Stack Layer 2 (Middle) */}
                    <motion.div
                        animate={{ rotateX: [10, 5, 10], rotateY: [-5, 0, -5], y: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute w-[85%] h-[65%] bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl -z-5 transform-gpu -rotate-3 flex items-center justify-center"
                    >
                        <div className="w-full h-full p-8 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    </motion.div>

                    {/* Glass Stack Layer 3 (Front - Main) */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-[90%] h-[70%] bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        {/* Content Inside Card */}
                        <div className="relative z-10 text-center space-y-4">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-20 h-20 mx-auto bg-neon-green/20 rounded-2xl flex items-center justify-center border border-neon-green/50 shadow-[0_0_30px_rgba(0,255,157,0.3)]"
                            >
                                <div className="text-neon-green font-bold text-3xl">AI</div>
                            </motion.div>

                            <div className="space-y-2">
                                <div className="h-2 w-32 bg-white/10 rounded-full mx-auto overflow-hidden">
                                    <motion.div
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="h-full w-1/2 bg-neon-green"
                                    />
                                </div>
                                <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase">Analyzing Data</p>
                            </div>

                            {/* Floating Metrics */}
                            <div className="grid grid-cols-2 gap-4 mt-8 px-8">
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                    <div className="text-xl font-bold text-white">98%</div>
                                    <div className="text-[10px] text-neutral-500">Accuracy</div>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                                    <div className="text-xl font-bold text-white">10x</div>
                                    <div className="text-[10px] text-neutral-500">Growth</div>
                                </div>
                            </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </motion.div>

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[15%] right-[5%] px-4 py-2 bg-blue-600/20 border border-blue-500/50 backdrop-blur-md rounded-full text-blue-400 text-xs font-bold shadow-lg"
                    >
                        SEO OPTIMIZED
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Orbs */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-[10%] w-4 h-4 rounded-full bg-neon-green/20 blur-sm pointer-events-none"
            />
        </section>
    );
}
