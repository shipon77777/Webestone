import Link from "next/link";
import { getData } from "@/actions/admin";
import * as LucideIcons from "lucide-react";
import * as motion from "framer-motion/client";

type Service = {
    id: string;
    title: string;
    description: string;
    iconName: string;
    color: string;
    href: string;
};

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore
    const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
};

export default async function ServicesPage() {
    const services: Service[] = await getData("services.json") || [];

    return (
        <main className="relative min-h-screen text-white pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold"
                    >
                        Our <span className="text-neon-green">Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-neutral-400 text-lg leading-relaxed"
                    >
                        We provide comprehensive digital solutions tailored to elevate your brand and drive measurable growth in the automated world.
                    </motion.p>
                </div>

                {/* Services Grid */}
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
        </main>
    );
}
