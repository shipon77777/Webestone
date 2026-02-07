"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-neon-green/50 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] transition-all duration-500 backdrop-blur-sm"
        >
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-4 w-fit rounded-xl bg-white/5 text-neon-green border border-white/10 group-hover:bg-neon-green/10 group-hover:scale-110 transition-all duration-300">
                    {icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-neutral-100 group-hover:text-neon-green transition-colors">
                    {title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed mb-8 flex-grow">
                    {description}
                </p>

                <div className="flex items-center text-sm font-medium text-neutral-300 group-hover:text-white mt-auto">
                    <span className="mr-2">Learn more</span>
                    <MoveRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
}
