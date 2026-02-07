"use client";

import { motion } from "framer-motion";
import {
    Play, Search, BarChart3, Mail, Monitor, DollarSign, PenTool, Globe, Gamepad2, Video,
    Share2, Megaphone, Smartphone, CheckCircle2, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const servicesGrid = [
    { title: "Search Engine Optimization (SEO)", desc: "Combine AI-powered automation with white hat SEO practices to ensure your brand remains visible in AI search results.", icon: Search },
    { title: "Franchise SEO", desc: "Amplify market reach and improve your AI visibility with Thrive's franchise SEO services. AI-driven insights ensure corporate and individual franchise prominence.", icon: Globe },
    { title: "Local SEO", desc: "Generate more leads and sales with hyperlocal digital marketing services. Use automation to reduce manual efforts while maintaining oversight.", icon: Map },
    { title: "Technical SEO", desc: "Establish a strong online foundation. Our technical SEO experts run crawl error reports and check HTTPS status codes.", icon: Monitor },
    { title: "Link Building", desc: "Acquire a steady stream of traffic from high-authority websites. Leverage guest posts and collaborations.", icon: Share2 },
    { title: "Web Design & Development", desc: "Build custom, mobile-ready, and search engine-optimized websites that support your digital marketing campaigns.", icon: PenTool },
    { title: "Custom Website Design", desc: "Capture your target audience's attention with a professional custom web design. Analyze your industry demands effectively.", icon: Monitor },
    { title: "Social Media Marketing", desc: "Build strong brand awareness. Measure online behavior to develop strategies that drive measurable growth across all platforms.", icon: Megaphone },
    { title: "Pay Per Click (PPC) Management", desc: "Reach highly-targeted audience segments through data-driven PPC campaigns. Conduct thorough keyword research and optimize landing pages.", icon: DollarSign },
    { title: "Video Production", desc: "Create a buzz in the online community with captivating video content strategies.", icon: Video },
    { title: "Content Writing", desc: "Our content specialists stay up-to-date with the latest trends to produce compelling copy.", icon: Edit3 },
    { title: "Online Reputation Management (ORM)", desc: "Strengthen your brand reputation and manage online reviews effectively.", icon: Star }
];

import { Map, Edit3, Star } from "lucide-react"; // Import missing icons

const digitalServices = [
    {
        title: "Creative",
        items: ["Logo & Branding", "Graphic Design", "Copywriting", "Video & Photography", "Explainer Videos"],
        gradient: "from-pink-500 to-rose-600"
    },
    {
        title: "Websites",
        items: ["Web Design & Build", "Ecommerce", "Custom Development", "Landing Pages & CRO", "Support & Maintenance"],
        gradient: "from-orange-500 to-amber-500"
    },
    {
        title: "Digital Marketing",
        items: ["PPC", "SEO", "Social Media", "Sales & Marketing Automation", "Email Marketing"],
        gradient: "from-blue-600 to-indigo-600"
    }
];

const reasons = [
    { title: "AI driven Solutions", active: true },
    { title: "Customized Strategies", active: false },
    { title: "Experienced Team", active: false },
    { title: "Transparent Reporting", active: false },
    { title: "Maintenance and Support", active: false }
];

const faqs = [
    { q: "What are AI search optimization services?", a: "AI search optimization involves strategies to improve visibility specifically for AI-driven search engines and answer engines." },
    { q: "What platforms do your AI search services target?", a: "We target major search engines integrating AI like Google (SGE), Bing, and emerging AI search tools." },
    { q: "How much do AI SEO services cost?", a: "Costs vary based on the scope and complexity of your needs. We offer customized packages to fit different budgets." },
    { q: "What content strategy do you use in your SEO services?", a: "We focus on creating high-quality, authoritative content that directly answers user queries and aligns with search intent." },
    { q: "Is AI SEO better than traditional SEO?", a: "It's an evolution. While traditional SEO fundamentals like technical health and backlinks remain crucial, AI SEO adapts to how AI interprets content." },
    { q: "How long does it take to see results from AI SEO?", a: "SEO is a long-term strategy, but AI-driven optimizations can sometimes accelerate visibility improvements, typically seen within 3-6 months." },
];

export default function DigitalMarketingServices() {
    const [activeReason, setActiveReason] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <main className="relative min-h-screen text-white pt-20 overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
            </div>

            {/* --- Hero Section --- */}
            <section className="relative py-20 px-6 z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-bold border border-purple-500/30 uppercase tracking-wide">
                            Digital Marketing Services
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Your digital dreams are just <br />
                            <span className="text-neon-green">one team away...</span>
                        </h1>
                        <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
                            Digital marketing is a vast landscape, but our agency of techie wizards has combined decades of experience and a deep understanding of how to make your business grow. We’re here to help with every marketing channel, be it Facebook, NextDoor, or anything in between.
                        </p>
                        <MagneticButton className="px-8 py-3 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-shadow">
                            Get In Touch
                        </MagneticButton>
                    </div>

                    <div className="relative group">
                        {/* Video Placeholder */}
                        <div className="relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                                </div>
                            </div>
                            {/* Placeholder Image Overlay (Simulated) */}
                            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-neutral-800 to-neutral-700"></div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-neon-green/20 rounded-3xl"></div>
                    </div>
                </div>
            </section>

            {/* --- Why Use Digital Marketing --- */}
            <section className="py-20 px-6 relative z-10 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Why should you use <span className="text-neon-green">digital marketing services?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-neutral-300 leading-relaxed">
                            <p>
                                Today’s digital marketing services are AI driven which means smarter targeting, personalized messaging, and faster optimization. With AI, campaigns perform better, budgets are used more efficiently, and businesses grow faster with data based decisions.
                            </p>
                            <div className="inline-block px-6 py-2 bg-neon-green/10 text-neon-green rounded-full font-bold border border-neon-green/30">
                                Building tomorrow's trends today
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                                </div>
                            </div>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-blue-900/40 to-black"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Results Driven Marketing (Visual Section) --- */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10 z-0"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Results-driven Marketing</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Monitor, title: "Web Design", desc: "Create a brand and communicate your value." },
                            { icon: Search, title: "SEO", desc: "Find new clients organically and grow a foundation." },
                            { icon: DollarSign, title: "PPC", desc: "Put your business in front of the right people today." },
                            { icon: Mail, title: "Email & SMS", desc: "Get more out of your current website visitors." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-4 hover:border-neon-green/50 transition-colors"
                            >
                                <div className="p-4 rounded-full bg-white/5 border border-white/10 text-neon-green">
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                <p className="text-sm text-neutral-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-8 max-w-sm mx-auto mt-8 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-[40px]"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="w-12 h-12 bg-yellow-500 text-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-yellow-400">Social Media</h3>
                            <p className="text-neutral-300 text-sm">Increase awareness by engaging with your audience.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Detailed Services Grid --- */}
            <section className="py-24 px-6 bg-neutral-900/50">
                <div className="max-w-7xl mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Thrive's Digital <span className="text-neon-green">Marketing Services</span></h2>
                        <p className="text-neutral-400">Build Brand Recognition as an Industry Leader and Increase Profitability</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicesGrid.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left hover:bg-white/10 transition-colors group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <service.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors underline decoration-transparent group-hover:decoration-blue-400 underline-offset-4">{service.title}</h3>
                                </div>
                                <p className="text-sm text-neutral-400 leading-relaxed">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Digital Services Categories --- */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto space-y-12 text-center">
                    <h2 className="text-4xl font-bold">Digital Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {digitalServices.map((cat, i) => (
                            <div key={i} className={`rounded-3xl overflow-hidden bg-gradient-to-br ${cat.gradient} p-1`}>
                                <div className="bg-neutral-900 h-full w-full rounded-[20px] p-8 flex flex-col items-start min-h-[400px] relative overflow-hidden group">
                                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${cat.gradient}`}></div>
                                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-full blur-[60px] group-hover:opacity-20 transition-opacity`}></div>

                                    <h3 className={`text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${cat.gradient}`}>
                                        {cat.title}
                                    </h3>

                                    <ul className="space-y-4 w-full">
                                        {cat.items.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors">
                                                <CheckCircle2 className="w-5 h-5 text-neon-green shrink-0" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Packages Section (Coffee Bag Style) --- */}
            <section className="py-24 px-6 bg-neutral-900 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "SEO Strategy", desc: "SEO is important because it can help businesses to attract more traffic to their website.", icon: Search, color: "text-orange-400" },
                        { title: "Google Ads", desc: "This type of advertising is often used to promote products or services effectively.", icon: Monitor, color: "text-blue-400" },
                        { title: "Paid Media", desc: "Paid social ads can be targeted to specific demographics, interests effectively.", icon: Megaphone, color: "text-pink-400" },
                        { title: "Analytics", desc: "Google Analytics provides insights into who is visiting your website and where from.", icon: BarChart3, color: "text-green-400" }
                    ].map((pkg, i) => (
                        <div key={i} className="bg-neutral-950/50 border border-white/10 rounded-2xl p-8 text-center hover:border-neon-green/30 transition-colors group">
                            <div className="w-24 h-32 mx-auto bg-[#eaddcf] rounded-t-lg relative mb-6 flex flex-col items-center justify-center shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300">
                                {/* Coffee Bag Styling */}
                                <div className="absolute top-0 w-full h-4 bg-[#d6c4b0] skew-y-1"></div>
                                <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2`}>
                                    <pkg.icon className={`w-6 h-6 ${pkg.color}`} />
                                </div>
                                <span className="text-xs font-bold text-neutral-800 uppercase tracking-tighter">{pkg.title}</span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-3">{pkg.title}</h3>
                            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                                {pkg.desc}
                            </p>

                            <button className="px-6 py-2 bg-neon-green text-black text-xs font-bold rounded-full hover:bg-neon-green/80 transition-colors">
                                Choose Your Blend
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Why Choose Webestone --- */}
            <section className="py-24 px-6 bg-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Webestone for <span className="text-neon-green">Best Digital Marketing Services</span></h2>
                        <p className="text-neutral-400">Here's why it is vital to choose Webestone for a reliable digital marketing agency</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-4">
                            {reasons.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    onClick={() => setActiveReason(i)}
                                    animate={{
                                        backgroundColor: activeReason === i ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.2)',
                                        scale: activeReason === i ? 1.02 : 1
                                    }}
                                    className="p-4 rounded-full cursor-pointer flex items-center justify-between group transition-all"
                                >
                                    <span className={`font-bold ${activeReason === i ? 'text-black' : 'text-green-400'} pl-4`}>{reason.title}</span>
                                    {activeReason === i && <CheckCircle2 className="w-6 h-6 text-black mr-4" />}
                                </motion.div>
                            ))}
                        </div>

                        {/* Illustration Placeholder */}
                        <div className="relative h-[400px] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                            <div className="relative z-10 text-center space-y-4">
                                <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                    <Play className="w-8 h-8 text-neon-green fill-current" />
                                </div>
                                <p className="text-neutral-500 font-mono text-sm">Interactive Demo Preview</p>
                            </div>

                            {/* Floating Elements */}
                            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 p-3 bg-blue-500 rounded-xl shadow-lg">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </motion.div>
                            <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-10 p-3 bg-purple-500 rounded-xl shadow-lg">
                                <Megaphone className="w-6 h-6 text-white" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-neon-green">Frequently Asked Questions (FAQs)</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border-b border-white/10 pb-4">
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full flex items-center justify-between text-left py-2 hover:text-neon-green transition-colors"
                                    >
                                        <span className="font-bold flex items-center gap-3">
                                            <span className="w-6 h-6 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-bold">+</span>
                                            {faq.q}
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-neutral-400 text-sm pl-9 pt-2 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Right Column (Phone Illustration) */}
                    <div className="relative flex justify-center items-center h-full min-h-[400px]">
                        <motion.div
                            animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-64 h-[500px] bg-green-600 rounded-[3rem] border-8 border-green-700 shadow-2xl transform rotate-12 flex flex-col items-center justify-end overflow-hidden"
                        >
                            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-green-500 to-green-700"></div>
                            {/* Keypad simulation */}
                            <div className="relative z-10 w-full px-6 pb-12 grid grid-cols-3 gap-3">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-full aspect-square bg-white/20 rounded-md"></div>
                                ))}
                                <div className="col-start-2 w-full aspect-square bg-white/20 rounded-md"></div>
                            </div>
                            {/* Antenna */}
                            <div className="absolute -top-16 -left-4 w-4 h-24 bg-green-700 rotate-[-15deg] rounded-full"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- Bottom CTA --- */}
            <section className="py-20 px-6 bg-white/5 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's move your <span className="text-purple-500">SEO strategy forward</span></h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <MagneticButton className="px-8 py-4 bg-neon-green text-black font-bold rounded-full">
                        Book a discovery call
                    </MagneticButton>
                    <MagneticButton className="px-8 py-4 bg-transparent border border-neon-green text-neon-green font-bold rounded-full hover:bg-neon-green/10 transition-colors">
                        Contact us
                    </MagneticButton>
                </div>
            </section>
        </main>
    );
}
