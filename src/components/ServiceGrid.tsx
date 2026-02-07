"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";

type Service = {
    id: string;
    title: string;
    description: string;
    iconName: string;
    color: string;
    href: string;
};

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore
    const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
};

export default function ServiceGrid({ initialServices }: { initialServices: Service[] }) {
    const [services, setServices] = useState<Service[]>(initialServices);

    return (
        <section className="py-24 px-4 bg-background relative z-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto container">
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2"
                    >
                        Our Expertise
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-neutral-400 max-w-2xl mx-auto"
                    >
                        From traditional web solutions to cutting-edge AI optimization strategies, we cover all aspects of your digital growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link href={service.href} key={index} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative p-8 h-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-neon-green/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex flex-col items-start gap-4 shadow-lg hover:shadow-neon-green/10"
                            >
                                {/* Icon Container */}
                                <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <DynamicIcon name={service.iconName} className="w-8 h-8" />
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-green transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Decorative Corner Glow */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
