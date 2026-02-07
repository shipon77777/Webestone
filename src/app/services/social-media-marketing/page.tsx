"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Play, ArrowRight, Video, Youtube, Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useState, useEffect } from "react";

const processSteps = [
    {
        step: "Step 1",
        title: "Strategy & Planning",
        description: "We dive deep into your brand, audience, and goals to craft a data-driven roadmap. We identify the right platforms, content pillars, and tone of voice that resonates.",
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        border: "border-blue-500/50",
        gradient: "from-blue-600/20 via-blue-900/20"
    },
    {
        step: "Step 2",
        title: "Content Creation",
        description: "From photos and videos to captions and community moments, our in-house creative team produces platform-specific content made to connect, engage, and perform.",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/50",
        gradient: "from-yellow-600/20 via-yellow-900/20"
    },
    {
        step: "Step 3",
        title: "Scheduling & Publishing",
        description: "Consistency is key. We manage your content calendar and ensure every post goes live at the optimal time for maximum reach and engagement.",
        color: "text-green-400",
        bg: "bg-green-500/20",
        border: "border-green-500/50",
        gradient: "from-green-600/20 via-green-900/20"
    },
    {
        step: "Step 4",
        title: "Community Management",
        description: "Social media is a two-way street. We monitor comments, messages, and mentions to build real relationships with your audience and foster brand loyalty.",
        color: "text-purple-400",
        bg: "bg-purple-500/20",
        border: "border-purple-500/50",
        gradient: "from-purple-600/20 via-purple-900/20"
    },
    {
        step: "Step 5",
        title: "Analytics & Reporting",
        description: "We don't guess; we track. Detailed monthly reports show you exactly what's working, with actionable insights to continuously optimize performance.",
        color: "text-red-400",
        bg: "bg-red-500/20",
        border: "border-red-500/50",
        gradient: "from-red-600/20 via-red-900/20"
    }
];

const socialPlatforms = [
    {
        name: "Youtube",
        description: "We develop long-form and short-form video strategies built for discovery and audience retention. From branded series to campaign launches.",
        icon: Youtube,
        color: "text-red-500",
        bg: "bg-red-600",
        border: "border-red-500/30",
        gradient: "from-red-900/20 to-yellow-600/20"
    },
    {
        name: "Instagram",
        description: "Build a visually stunning brand presence. We create Reels, Stories, and posts that drive engagement and convert followers into customers.",
        icon: Instagram,
        color: "text-pink-500",
        bg: "bg-gradient-to-tr from-yellow-400 to-purple-600",
        border: "border-pink-500/30",
        gradient: "from-purple-900/20 to-orange-600/20"
    },
    {
        name: "Facebook",
        description: "Leverage the world's largest social network. We manage community groups, run targeted ad campaigns, and optimize your business page for growth.",
        icon: Facebook,
        color: "text-blue-500",
        bg: "bg-blue-600",
        border: "border-blue-500/30",
        gradient: "from-blue-900/20 to-cyan-600/20"
    },
    {
        name: "Twitter / X",
        description: "Join the conversation in real-time. We craft witty tweets, manage customer support, and keep your brand trending on X.",
        icon: Twitter,
        color: "text-neutral-200",
        bg: "bg-black",
        border: "border-white/30",
        gradient: "from-neutral-800/20 to-neutral-600/20"
    }
];

const faqs = [
    {
        question: "What is Social Media Management?",
        answer: "Social media management is the process of analyzing social media audiences and developing a strategy that's tailored to them, creating and distributing content for social media profiles, monitoring online conversations, collaborating with influencers, providing community service, and monitoring, measuring, and reporting on social media performance and ROI."
    },
    {
        question: "What does management consist of?",
        answer: "Our management services include strategy development, content creation (graphics, videos, copywriting), scheduling and publishing, community management (responding to comments/messages), and detailed monthly analytics reporting."
    },
    {
        question: "What platforms do you manage?",
        answer: "We specialize in all major platforms including Instagram, Facebook, YouTube, Twitter (X), LinkedIn, TikTok, and Pinterest. We tailor our strategy to the platforms where your specific audience is most active."
    },
    {
        question: "Do you respond to comments from customers?",
        answer: "Yes! Community management is a key part of our service. We actively monitor and respond to comments, messages, and reviews to foster a positive community around your brand and improve customer satisfaction."
    },
    {
        question: "Do you create the content for businesses?",
        answer: "Absolutely. We have an in-house team of graphic designers, video editors, and copywriters who create high-quality, on-brand content specifically designed to engage your audience and achieve your business goals."
    }
];

export default function SocialMediaMarketing() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // New State for Platforms Slider
    const [currentPlatform, setCurrentPlatform] = useState(0);
    const [isPlatformHovered, setIsPlatformHovered] = useState(false);

    // FAQ State
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Auto-scroll for Process Slider
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % processSteps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered]);

    // Auto-scroll for Platform Slider
    useEffect(() => {
        if (isPlatformHovered) return;
        const timer = setInterval(() => {
            setCurrentPlatform((prev) => (prev + 1) % socialPlatforms.length);
        }, 4000); // Slightly faster rotation
        return () => clearInterval(timer);
    }, [isPlatformHovered]);

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % processSteps.length);
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev - 1 + processSteps.length) % processSteps.length);
    };

    // --- Render ---
    return (
        <main className="relative min-h-screen text-white pt-20 overflow-hidden">
            {/* ... Hero and Process Sections remain unchanged ... */}

            {/* --- Hero Section --- */}
            <section className="relative min-h-[90vh] flex items-center px-6">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold leading-tight"
                        >
                            Social Media <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-blue-500">Marketing Services</span>
                        </motion.h1>

                        <p className="text-xl text-neutral-300 max-w-lg">
                            Webestone is your solution for high converting social media marketing that brings real business growth.
                        </p>

                        <div className="py-4">
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-wide">
                                Creating Meaningful <br /> Social Connections
                            </h3>
                        </div>

                        <MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_40px_rgba(0,255,157,0.6)] transition-shadow">
                            Get in touch
                        </MagneticButton>
                    </div>

                    {/* Visual Placeholder for Phone/Reel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative w-[300px] h-[600px] bg-black border-4 border-neutral-800 rounded-[3rem] overflow-hidden shadow-2xl">
                            {/* Screen Content Placeholder */}
                            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center group cursor-pointer">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                                <div className="z-20 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                                </div>
                                <div className="absolute bottom-8 left-6 right-6 z-20 space-y-2">
                                    <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/20 rounded-full" />
                                </div>
                            </div>
                        </div>
                        {/* Decorative Elements around phone */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[650px] border border-neon-green/20 rounded-[3.5rem]" />
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[700px] border border-blue-500/10 rounded-[4rem]" />
                    </motion.div>
                </div>
            </section>

            {/* --- Process Section --- */}
            <section className="py-24 px-6 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Our Social Media <br />
                            <span className="text-neon-green">Management Process</span>
                        </h2>
                    </div>

                    {/* Process Slider */}
                    <div
                        className="relative w-full max-w-4xl mx-auto aspect-[16/7] rounded-3xl overflow-hidden shadow-2xl"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${processSteps[currentStep].gradient} to-black border ${processSteps[currentStep].border} backdrop-blur-xl transition-colors duration-500`}></div>

                                <div className="relative z-10 h-full flex flex-col justify-center p-12 space-y-6">
                                    <div className={`px-4 py-1 ${processSteps[currentStep].bg} ${processSteps[currentStep].color} border ${processSteps[currentStep].border} rounded-full w-fit text-xs font-bold uppercase tracking-wider`}>
                                        {processSteps[currentStep].step}
                                    </div>
                                    <h3 className={`text-4xl font-bold ${processSteps[currentStep].color} uppercase tracking-tighter`}>{processSteps[currentStep].title}</h3>
                                    <p className="text-neutral-300 text-lg max-w-2xl leading-relaxed">
                                        {processSteps[currentStep].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button onClick={prevStep} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center cursor-pointer border border-white/10 transition-colors z-20 group">
                            <ArrowRight className="w-5 h-5 text-white rotate-180 group-hover:text-neon-green transition-colors" />
                        </button>
                        <button onClick={nextStep} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center cursor-pointer border border-white/10 transition-colors z-20 group">
                            <ArrowRight className="w-5 h-5 text-white group-hover:text-neon-green transition-colors" />
                        </button>

                        {/* Progress Bar */}
                        <div className="absolute bottom-8 left-12 right-12 h-1 bg-white/10 rounded-full overflow-hidden z-20">
                            <motion.div
                                className="h-full bg-neon-green rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((currentStep + 1) / processSteps.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Platforms Slider Section --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div
                        className="relative rounded-3xl min-h-[400px] overflow-hidden"
                        onMouseEnter={() => setIsPlatformHovered(true)}
                        onMouseLeave={() => setIsPlatformHovered(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPlatform}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className={`absolute inset-0 bg-gradient-to-br ${socialPlatforms[currentPlatform].gradient} border ${socialPlatforms[currentPlatform].border} rounded-3xl p-12 flex flex-col justify-between`}
                            >
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-[60px]" />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 ${socialPlatforms[currentPlatform].bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                        {/* Dynamic Icon Component */}
                                        {(() => {
                                            const Icon = socialPlatforms[currentPlatform].icon;
                                            return <Icon className="w-8 h-8 text-white fill-current" />;
                                        })()}
                                    </div>
                                    <h3 className="text-5xl font-black text-white/90 uppercase mb-4 tracking-tighter">
                                        {socialPlatforms[currentPlatform].name}
                                    </h3>
                                </div>

                                <p className="text-neutral-300 relative z-10 text-lg leading-relaxed max-w-sm">
                                    {socialPlatforms[currentPlatform].description}
                                </p>

                                {/* Decorative Floating Icons */}
                                <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 animate-pulse-slow">
                                    <Play className="w-8 h-8 text-white fill-current opacity-50" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider Indicators */}
                        <div className="absolute bottom-6 left-12 flex gap-2 z-20">
                            {socialPlatforms.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPlatform(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentPlatform ? "w-8 bg-white" : "bg-white/30 hover:bg-white/50"}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Achieve Success Across <br />
                            <span className="text-neon-green">Every Social Platform</span>
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Our team brings the skills, strategy, and creative firepower your brand needs to thrive across every major social platform. We understand the unique opportunities, audiences, and content styles that work best on each, and we tailor your strategy to match.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Why Us Section --- */}
            <section className="py-24 px-6 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Why Do You Need a <span className="text-purple-400">Social Media Marketing</span> <br />
                            Management Company?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "Your customers are already on social media", desc: "Nearly 4 billion people use social media daily. Be where they are." },
                            { title: "People are searching for your business", desc: "Instagram and TikTok are now major search engines. Optimize for discovery." },
                            { title: "Conversations are happening—be part of them", desc: "Manage your presence, help you respond, and build trust." },
                            { title: "You need to stand out from the competition", desc: "77% of small businesses are promoting on social media. Rise above the noise." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors flex gap-6 items-start group">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-3xl font-bold text-neon-green mb-8">Frequently Asked Questions (FAQs)</h2>

                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                onClick={() => toggleFaq(i)}
                                className={`group border rounded-xl p-6 cursor-pointer transition-all duration-300 ${openFaq === i ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'bg-yellow-500/5 border-yellow-500/30 hover:bg-yellow-500/10'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className={`font-bold uppercase text-sm tracking-wide transition-colors ${openFaq === i ? 'text-yellow-400' : 'text-yellow-100'}`}>
                                        {faq.question}
                                    </h3>
                                    <div className={`w-6 h-6 rounded-full border border-yellow-500/50 flex items-center justify-center transition-transform duration-300 ${openFaq === i ? 'rotate-180 bg-yellow-500/20' : ''}`}>
                                        <ArrowRight className={`w-3 h-3 text-yellow-500 transition-transform ${openFaq === i ? '-rotate-90' : 'rotate-90'}`} />
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-neutral-300 text-sm leading-relaxed border-t border-yellow-500/20 pt-4">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <div className="pt-8">
                            <MagneticButton className="px-8 py-3 bg-neon-green text-black font-bold rounded-full">
                                Get in touch
                            </MagneticButton>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative min-h-[400px]">
                        {/* Floating Social Icons */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-0 top-10"
                        >
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg"><Facebook className="w-6 h-6 fill-current" /></div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute right-20 top-40"
                        >
                            <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg"><Instagram className="w-8 h-8" /></div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute right-10 bottom-40"
                        >
                            <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"><Youtube className="w-6 h-6 fill-current" /></div>
                        </motion.div>

                        <motion.div
                            animate={{ scale: [1, 1.1, 1], y: [0, 10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-32 bottom-10"
                        >
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"><MessageCircle className="w-5 h-5 fill-current" /></div>
                        </motion.div>

                        {/* Social Row at Bottom */}
                        <div className="absolute bottom-0 right-0 flex gap-4">
                            {[Facebook, Youtube, Instagram, Twitter].map((Icon, i) => (
                                <motion.div key={i} whileHover={{ y: -5, scale: 1.1 }} className="cursor-pointer">
                                    <Icon className={`w-6 h-6 ${i === 0 ? 'text-blue-600' : i === 1 ? 'text-red-600' : i === 2 ? 'text-pink-500' : 'text-white'}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
