"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight, Clock, Target, Users, Search, Settings } from "lucide-react";

export default function WhyChooseUs() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Orbiting Visuals */}
                <div className="relative h-[500px] flex items-center justify-center">
                    {/* Central Core */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 w-40 h-40 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                    >
                        <div className="text-center">
                            <Clock className="w-12 h-12 text-neon-green mx-auto mb-2" />
                            <span className="text-xs text-neutral-400 font-mono">EFFICIENCY</span>
                        </div>
                    </motion.div>

                    {/* Orbit Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[300px] h-[300px] border border-white/5 rounded-full animate-spin-slow"></div>
                        <div className="w-[450px] h-[450px] border border-white/5 rounded-full absolute animate-reverse-spin-slower"></div>
                    </div>

                    {/* Orbiting Icons */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Item 1 */}
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                            <Search className="w-6 h-6 text-blue-400" />
                        </div>
                        {/* Item 2 */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                            <Target className="w-5 h-5 text-purple-400" />
                        </div>
                        {/* Item 3 */}
                        <div className="absolute bottom-1/4 right-[10%] w-12 h-12 bg-black border border-white/10 rounded-full flex items-center justify-center shadow-lg">
                            <Settings className="w-5 h-5 text-orange-400" />
                        </div>
                    </motion.div>
                </div>

                {/* Right: Content */}
                <div className="space-y-8 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-neon-green font-mono text-sm tracking-widest uppercase mb-2 block">Our Team</span>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
                            Why brands choose <br /> WeBestOne.
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                            We are not here to just run campaigns. We are here to build growth engines for your business. Our focus is simple: more visibility, more engagement, and more conversions.
                        </p>

                        <MagneticButton className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold text-white shadow-lg hover:shadow-red-500/20 transition-all flex items-center gap-2 group">
                            <span>Meet Our Team</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </MagneticButton>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
