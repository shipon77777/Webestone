"use client";

import { motion } from "framer-motion";
import { Binoculars, ChartColumnIncreasing, ShieldCheck, Rocket } from "lucide-react";

const promises = [
    {
        icon: <Binoculars className="w-10 h-10 text-orange-400 group-hover:text-neon-green transition-colors" />,
        title: "No Hidden Fees",
        description: "Transparent pricing without surprises.",
        bg: "bg-orange-500/10",
    },
    {
        icon: <ChartColumnIncreasing className="w-10 h-10 text-purple-400 group-hover:text-neon-green transition-colors" />,
        title: "ROI Focused",
        description: "Strategies built for measurable returns.",
        bg: "bg-purple-500/10",
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-emerald-400 group-hover:text-neon-green transition-colors" />,
        title: "Always On Time",
        description: "We respect your deadlines, always.",
        bg: "bg-emerald-500/10",
    },
    {
        icon: <Rocket className="w-10 h-10 text-blue-400 group-hover:text-neon-green transition-colors" />,
        title: "Dedicated Support",
        description: "Always here when you need us.",
        bg: "bg-blue-500/10",
    },
];

export default function OurPromises() {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-white/5 relative z-10">
            <div className="max-w-7xl mx-auto text-center space-y-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-neon-green font-mono text-sm tracking-widest uppercase block mb-4">Workflow</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white relative inline-block">
                        Our promises to every client.
                        <svg className="absolute w-full h-3 -bottom-2 text-neon-green/50 left-0" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99996C18.4475 2.66663 80.9167 -2.49997 197.99 1.99996" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {promises.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neon-green/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm shadow-xl"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            {/* Minimal description */}
                            <p className="text-sm text-neutral-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
