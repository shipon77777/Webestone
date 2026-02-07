"use client";

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "framer-motion";
import { Users, Target, Zap, Award, Megaphone, CheckCircle2, ArrowRight, Play, Globe, Shield, Rocket } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

const stats = [
    { label: "Global Clients", value: "50+", icon: Globe },
    { label: "Projects Done", value: "120+", icon: CheckCircle2 },
    { label: "Team Experts", value: "15+", icon: Users },
    { label: "Industry Awards", value: "10+", icon: Award },
];

const values = [
    { title: "Innovation First", desc: "We don't just follow trends; we create them using the latest in AI and tech.", icon: Rocket, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { title: "Transparency", desc: "Clear communication and measurable results. No smoke and mirrors.", icon: Shield, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
    { title: "Excellence", desc: "We are committed to delivering nothing short of perfection in every pixel.", icon: Award, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
];

const teamMembers = [
    { name: "Alex Morgan", role: "CEO & Founder", color: "from-blue-500 to-cyan-500" },
    { name: "Sarah Chen", role: "CTO", color: "from-purple-500 to-pink-500" },
    { name: "Michael Ross", role: "Head of Marketing", color: "from-orange-500 to-red-500" },
    { name: "Emily Davis", role: "Creative Director", color: "from-green-500 to-emerald-500" },
    { name: "David Kim", role: "Lead Developer", color: "from-indigo-500 to-blue-600" },
    { name: "Jessica Lee", role: "SEO Specialist", color: "from-yellow-400 to-orange-500" },
    { name: "Ryan Wilson", role: "Content Strategist", color: "from-pink-500 to-rose-500" },
    { name: "Olivia Taylor", role: "UI/UX Designer", color: "from-cyan-400 to-blue-500" }
];

function CountUp({ value, className }: { value: string; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20, duration: 2000 });
    const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

    const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericPart);
        }
    }, [isInView, numericPart, motionValue]);

    return (
        <span ref={ref} className={`flex items-baseline ${className}`}>
            <motion.span>{displayValue}</motion.span>
            <span>{suffix}</span>
        </span>
    );
}

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <main ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-neon-green/30">

            {/* --- Global Background Effects --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-green/5 rounded-full blur-[120px] animate-pulse-slower" />
                <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
            </div>

            {/* --- Hero Section ("Your guide in Automated world") --- */}
            <section className="relative z-10 pt-32 pb-24 px-6 min-h-[90vh] flex items-center">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Eyebrow Label */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-[2px] bg-neon-green"></div>
                            <span className="text-neon-green font-bold tracking-widest text-sm uppercase">Innovation Meets Automation</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
                            Your guide in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500">Automated world</span>
                        </h1>

                        <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
                            Your brand does not need just another post. It needs attention, engagement, and conversions. At WeBestOne, we combine creativity, data, and artificial intelligence to turn ideas into measurable business growth. From design and marketing to intelligent automation, every solution we create is made to stand out, perform, and succeed.
                        </p>

                        <div className="pt-4">
                            <MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] transition-shadow flex items-center gap-2">
                                Start My Growth <ArrowRight className="w-5 h-5" />
                            </MagneticButton>
                        </div>
                    </motion.div>

                    {/* Right Column: AI Visual Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Glassmorphism Card Container */}
                        <div className="relative rounded-[2rem] bg-neutral-900 border border-white/10 p-2 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                            {/* Inner Content Area */}
                            <div className="bg-neutral-950 rounded-[1.5rem] p-8 md:p-12 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
                                {/* SEO Badge */}
                                <div className="absolute top-6 right-6 px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wide">
                                    SEO Optimized
                                </div>

                                {/* Glowing AI Icon */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-neon-green blur-[40px] opacity-20 animate-pulse"></div>
                                    <div className="relative z-10 w-24 h-24 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                                        <span className="text-3xl font-bold text-neon-green">AI</span>
                                    </div>
                                </div>

                                {/* Progress Bar Simulation */}
                                <div className="w-full max-w-[200px] space-y-2">
                                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="h-full w-1/2 bg-neon-green rounded-full"
                                        />
                                    </div>
                                    <p className="text-xs text-neutral-500 font-mono tracking-widest uppercase">Analyzing Data</p>
                                </div>

                                {/* Stats Row */}
                                <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-8">
                                    <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-white">98%</div>
                                        <div className="text-xs text-neutral-500">Accuracy</div>
                                    </div>
                                    <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                                        <div className="text-2xl font-bold text-white">10x</div>
                                        <div className="text-xs text-neutral-500">Growth</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Glow Effect */}
                        <div className="absolute -inset-10 bg-gradient-to-tr from-neon-green/10 via-blue-500/10 to-purple-500/10 blur-3xl -z-10 rounded-full opacity-50"></div>
                    </motion.div>
                </div>
            </section>

            {/* --- Floating Stats --- */}
            <section className="relative z-20 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className="p-8 rounded-3xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 hover:border-neon-green/30 hover:shadow-[0_0_30px_rgba(0,255,157,0.1)] transition-all group text-center flex flex-col items-center justify-center h-full"
                        >
                            <div className="w-16 h-16 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-neon-green group-hover:text-black transition-colors duration-300">
                                <stat.icon className="w-8 h-8 text-neon-green group-hover:text-black transition-colors" />
                            </div>
                            <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                                <CountUp value={stat.value} />
                            </div>
                            <p className="text-sm font-mono text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Mission & Vision (Glassmorphism Cards) --- */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative p-10 rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md group hover:border-blue-500/50 transition-colors"
                    >
                        <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 ring-1 ring-blue-500/50">
                                <Target className="w-7 h-7" />
                            </div>
                            <h2 className="text-4xl font-bold">Our Mission</h2>
                            <p className="text-lg text-neutral-300 leading-relaxed">
                                To empower businesses with intelligent, automated solutions that drive growth and efficiency. We believe in a future where technology amplifies human creativity, not replaces it.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative p-10 rounded-[2.5rem] overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md group hover:border-purple-500/50 transition-colors"
                    >
                        <div className="absolute inset-0 bg-purple-600/5 group-hover:bg-purple-600/10 transition-colors"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 ring-1 ring-purple-500/50">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h2 className="text-4xl font-bold">Our Vision</h2>
                            <p className="text-lg text-neutral-300 leading-relaxed">
                                To be the global leader in Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO), setting the standard for the next generation of the web.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Core Values --- */}
            <section className="py-24 px-6 relative z-10 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-neon-green">Values</span></h2>
                        <p className="text-neutral-400">The principles that drive our innovation.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((val, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`p-8 rounded-3xl border ${val.border} ${val.bg} hover:bg-opacity-20 transition-all backdrop-blur-sm group`}
                            >
                                <val.icon className={`w-10 h-10 ${val.color} mb-6 group-hover:scale-110 transition-transform`} />
                                <h3 className="text-2xl font-bold text-white mb-3">{val.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Interactive Team Section --- */}
            <section className="py-32 px-6 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-4">
                            <h2 className="text-5xl md:text-6xl font-bold">Meet The <span className="text-neon-green">Squad</span></h2>
                            <p className="text-neutral-400 text-lg max-w-xl">The brilliant minds engineering your digital success.</p>
                        </div>
                        <MagneticButton className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-full backdrop-blur-md">
                            Join the Team <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                        </MagneticButton>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer"
                            >
                                {/* Background Gradient Placeholder */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>

                                {/* Image Placeholder Visuals */}
                                <div className="absolute inset-0 opacity-30 bg-[url('/grid.svg')] mix-blend-overlay"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm">
                                        <Users className="w-12 h-12 text-white/50" />
                                    </div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors">{member.name}</h3>
                                    <p className="text-white/70 font-medium">{member.role}</p>

                                    <div className="mt-4 pt-4 border-t border-white/10 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                                            <Shield className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
