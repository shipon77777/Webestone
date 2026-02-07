"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { getData } from "@/actions/admin";

export default function Footer() {
    const services = [
        "AI SEO Services",
        "GEO Services",
        "AEO Services",
        "Social Media Management",
        "Digital Marketing",
        "WordPress Development",
        "Website Design",
        "Paid Promotions",
        "Video Productions",
    ];

    const [socials, setSocials] = useState<any>({
        facebook: "#",
        instagram: "#",
        linkedin: "#",
        youtube: "#",
        whatsapp: "#",
        email: "webestone@gmail.com"
    });

    useEffect(() => {
        // Fetch socials client-side for simplicity in Footer
        const fetchSocials = async () => {
            const data = await getData("socials.json");
            if (data) setSocials(data);
        };
        fetchSocials();
    }, []);

    return (
        <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/5 pt-20 pb-10 overflow-hidden text-neutral-300">

            {/* Bottom Left Green Glow */}
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-green/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Top Right Blue Glow */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Column 1: Brand & Contact (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-start gap-4">
                            {/* Logo similar to image: Green box with Blue W */}
                            <div className="w-16 h-16 bg-neon-green rounded-lg flex items-center justify-center text-blue-700 font-bold text-4xl shrink-0 shadow-lg shadow-neon-green/20">
                                W
                            </div>
                            <div className="space-y-1 pt-1">
                                <p className="text-white font-medium">Drop us an email</p>
                                <a href={`mailto:${socials.email}`} className="text-lg text-white font-bold hover:text-neon-green transition-colors block">
                                    {socials.email}
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-white font-bold text-lg">Location</h3>
                                <p className="text-neutral-400">Dhaka, Bangladesh</p>
                            </div>
                            {/* Mini Map */}
                            <div className="relative group/map overflow-hidden rounded-2xl h-40 w-full border border-white/5 bg-neutral-900 shadow-2xl">
                                <div className="absolute inset-0 bg-black/60 group-hover/map:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.8223908687!2d90.279237!3d23.7808875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087021c81%3A0x629533f81156637e!2sDhaka!5e0!3m2!1sen!2sbd!4v1707292200000!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%) invert(90%) hue-rotate(180deg)' }}
                                    className="group-hover/map:filter-none transition-all duration-700 scale-110 group-hover/map:scale-100"
                                    loading="lazy"
                                    title="Google Maps Location"
                                ></iframe>
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none z-20"></div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Core Services (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <h3 className="text-white font-bold text-lg">Core Services</h3>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link href="#" className="hover:text-neon-green transition-colors text-sm">
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Our Work & About (2 cols) */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-white font-bold text-lg">Our Work</h3>
                            <ul className="space-y-3">
                                <li><Link href="#case-studies" className="hover:text-neon-green transition-colors text-sm">Case studies</Link></li>
                                <li><Link href="/blogs" className="hover:text-neon-green transition-colors text-sm">Blogs</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-white font-bold text-lg">About Us</h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="hover:text-neon-green transition-colors text-sm">Who are we</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Socials & Button (3 cols) */}
                    <div className="lg:col-span-3 space-y-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <h3 className="text-white font-bold text-lg">Get in Touch</h3>
                            <div className="flex items-center gap-4">
                                <Link href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-110 transition-transform"><Facebook className="w-5 h-5 fill-current" /></Link>
                                <Link href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></Link>
                                <Link href={socials.whatsapp.startsWith('http') ? socials.whatsapp : `https://wa.me/${socials.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><MessageCircle className="w-5 h-5 fill-current" /></Link>
                                <Link href={socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><Linkedin className="w-5 h-5 fill-current" /></Link>
                                <Link href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"><Youtube className="w-5 h-5 fill-current" /></Link>
                            </div>
                        </div>

                        {/* Email Button Widget */}
                        <div className="self-start lg:self-end mt-8 lg:mt-auto">
                            <a href={`mailto:${socials.email}`} className="inline-flex items-center gap-3 bg-neon-green hover:bg-neon-green/90 text-blue-900 px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-neon-green/20">
                                <div className="p-1 bg-white/20 rounded">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col text-left leading-none">
                                    <span className="text-[10px] uppercase font-bold text-blue-950">Contact us on</span>
                                    <span className="text-xl">Email</span>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-20 pt-8 border-t border-white/5 text-center text-neutral-600 text-sm">
                    <p>© {new Date().getFullYear()} WeBestOne. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
