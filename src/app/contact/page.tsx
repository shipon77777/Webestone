"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { getData } from "@/actions/admin";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [contactInfo, setContactInfo] = useState<any>({});

    useEffect(() => {
        const fetchContactInfo = async () => {
            const data = await getData("contact.json");
            if (data) setContactInfo(data);
        };
        fetchContactInfo();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 50 } },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });

            // Reset success status after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message);
        }
    };

    return (
        <main className="relative min-h-screen text-white overflow-hidden pt-20 flex flex-col items-center">

            <div className="relative z-10 w-full max-w-7xl px-6 py-12 space-y-12 flex-1 flex flex-col md:flex-row gap-12 items-start justify-center">

                {/* Left Column: Contact Info */}
                <motion.div
                    className="w-full md:w-1/2 space-y-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h1
                        variants={item}
                        className="text-4xl md:text-6xl font-bold"
                    >
                        Let's <span className="text-neon-green">Connect</span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        className="text-neutral-400 max-w-lg leading-relaxed text-lg"
                    >
                        Ready to accelerate your growth? Reach out to us for a consultation, and let's discuss how we can elevate your brand with AI-powered strategies.
                    </motion.p>

                    <motion.div variants={item} className="space-y-6 pt-4">
                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-neon-green group-hover:bg-neon-green group-hover:text-black transition-colors duration-300">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500 uppercase">Email Us</h3>
                                <a href={`mailto:${contactInfo.email || "hello@webestone.com"}`} className="text-lg font-semibold hover:text-neon-green transition-colors">
                                    {contactInfo.email || "hello@webestone.com"}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-blue-400 group-hover:bg-blue-400 group-hover:text-black transition-colors duration-300">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500 uppercase">Call Us</h3>
                                <a href={`tel:${contactInfo.phone || "+8801333600272"}`} className="text-lg font-semibold hover:text-blue-400 transition-colors">
                                    {contactInfo.displayPhone || "+880 1333-600272"}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-purple-400 group-hover:bg-purple-400 group-hover:text-black transition-colors duration-300">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-neutral-500 uppercase">Visit Us</h3>
                                <a href={contactInfo.mapLink || "#"} target="_blank" rel="noopener noreferrer" className="block text-lg font-semibold leading-tight hover:text-purple-400 transition-colors">
                                    {contactInfo.address1 || "123 Innovation Blvd"}, <br />
                                    {contactInfo.address2 || "Tech City, TC 90210"}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Interactive Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 50 }}
                    className="w-full md:w-1/2 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl hover:border-neon-green/30 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm text-neutral-400">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-green focus:bg-white/5 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm text-neutral-400">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-green focus:bg-white/5 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm text-neutral-400">Subject</label>
                            <select
                                id="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-green focus:bg-white/5 transition-all appearance-none cursor-pointer"
                            >
                                <option className="bg-neutral-900" value="General Inquiry">General Inquiry</option>
                                <option className="bg-neutral-900" value="Project Proposal">Project Proposal</option>
                                <option className="bg-neutral-900" value="Partnership">Partnership</option>
                                <option className="bg-neutral-900" value="Careers">Careers</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm text-neutral-400">Message</label>
                            <textarea
                                id="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-green focus:bg-white/5 transition-all resize-none"
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#00ff9d", color: "#000" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === "loading"}
                            type="submit"
                            className="w-full py-4 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 group transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </motion.button>

                        {/* Status Messages */}
                        {status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <p className="text-sm font-medium">Message sent successfully! We'll be in touch soon.</p>
                            </motion.div>
                        )}

                        {status === "error" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                            >
                                <AlertCircle className="w-5 h-5" />
                                <p className="text-sm font-medium">{errorMessage || "Failed to send message. Please try again."}</p>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
