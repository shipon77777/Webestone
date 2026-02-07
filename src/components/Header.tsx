"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Search, Share2, MousePointerClick, MonitorPlay, Mountain, PenTool, Zap, Home, Globe, Edit3, Gamepad2, Bot, Megaphone } from "lucide-react";
import { getData } from "@/actions/admin";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesHovered, setIsServicesHovered] = useState(false);
    const [site, setSite] = useState<any>({
        logoUrl: "",
        siteName: "WeBestOne",
        logoText: "W"
    });

    useEffect(() => {
        const fetchSite = async () => {
            const data = await getData("site.json");
            if (data) setSite(data);
        };
        fetchSite();
    }, []);

    const servicesList = [
        { title: "Digital Marketing", description: "Full-Service Strategy", icon: Megaphone, href: "/services/digital-marketing" },
        { title: "SEO", description: "Search Engine Optimization", icon: Search, href: "/services/seo" },
        { title: "Social Media", description: "Marketing Campaigns", icon: Share2, href: "/services/social-media-marketing" },
        { title: "PPC", description: "Pay Per Click Ads", icon: MousePointerClick, href: "/services/ppc" },
        { title: "Video Editing", description: "Cinematic Content", icon: MonitorPlay, href: "/services/video-editing" },
        { title: "Motion Graphics", description: "Modern Animations", icon: Mountain, href: "/services/motion-graphics" },
        { title: "UI/UX Design", description: "User-Focused Design", icon: PenTool, href: "/services/ui-ux-design" },
        { title: "Web Dev", description: "Responsive Websites", icon: Zap, href: "/services/web-development" },
        { title: "Interior Design", description: "Spatial Identity", icon: Home, href: "/services/interior-design" },
        { title: "Shopify SEO", description: "Store Optimization", icon: Globe, href: "/services/shopify-seo" },
        { title: "Content Writing", description: "Persuasive Copy", icon: Edit3, href: "/services/content-writing" },
        { title: "App Design", description: "Intuitive Interfaces", icon: Gamepad2, href: "/services/app-design" },
        { title: "AI Solutions", description: "Automated Systems", icon: Bot, href: "/services/ai-solutions" },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Work", href: "#work" },
        { name: "Services", href: "/services" },
        { name: "Blogs", href: "#blogs" },
        { name: "Contact", href: "/contact" },
        { name: "About us", href: "/about" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-neon-green rounded-lg flex items-center justify-center text-black font-bold text-xl overflow-hidden relative">
                        {site.logoUrl ? (
                            <img src={site.logoUrl} alt={site.siteName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="relative z-10">{site.logoText}</span>
                        )}
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-neon-green">
                        {site.siteName}
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => link.name === "Services" ? setIsServicesHovered(true) : null}
                            onMouseLeave={() => link.name === "Services" ? setIsServicesHovered(false) : null}
                        >
                            <Link
                                href={link.href}
                                className="text-sm font-medium text-neutral-300 hover:text-neon-green transition-colors relative py-4"
                            >
                                {link.name}
                                <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-neon-green transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                            {/* Mega Menu for Services */}
                            {link.name === "Services" && isServicesHovered && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] p-6 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl grid grid-cols-3 gap-6 z-50 mt-2"
                                >
                                    {/* Decorative Glow */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-neon-green/20 rounded-full blur-[50px] pointer-events-none"></div>

                                    {servicesList.map((service, index) => (
                                        <Link
                                            key={index}
                                            href={service.href}
                                            className="group/item flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                        >
                                            <div className={`p-2 rounded-lg bg-white/5 border border-white/5 text-neon-green group-hover/item:bg-neon-green group-hover/item:text-black transition-all duration-300`}>
                                                <service.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm mb-1 group-hover/item:text-neon-green transition-colors">{service.title}</h4>
                                                <p className="text-xs text-neutral-400 leading-snug line-clamp-2">{service.description}</p>
                                            </div>
                                        </Link>
                                    ))}

                                    <div className="col-span-3 pt-4 mt-2 border-t border-white/5 flex justify-between items-center px-4">
                                        <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Explore all our capabilities</span>
                                        <Link href="/services" className="text-sm font-bold text-neon-green hover:underline flex items-center gap-1 group/link">
                                            View All Services
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-neutral-300 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-neutral-900 border-b border-white/10 p-6"
                >
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium text-neutral-300 hover:text-neon-green transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </header>
    );
}
