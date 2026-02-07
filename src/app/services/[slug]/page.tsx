import { getData } from "@/actions/admin";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import * as LucideIcons from "lucide-react";
import * as motion from "framer-motion/client";
import { Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pages = await getData("service-pages.json");
    const page = pages?.[slug];

    if (!page) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: page.metaTitle || `${page.h1} - WeBestOne`,
        description: page.metaDescription,
    };
}

export default async function DynamicServicePage({ params }: Props) {
    const { slug } = await params;
    const pages = await getData("service-pages.json");
    const page = pages?.[slug];

    if (!page) {
        // Fallback or notFound
        notFound();
    }

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
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-bold border border-purple-500/30 uppercase tracking-wide"
                        >
                            {page.subheadline || "Specialized Service"}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold leading-tight"
                        >
                            {page.h1.replace(page.h1Highlight, "")}
                            <span className="text-neon-green">{page.h1Highlight}</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-neutral-400 text-lg leading-relaxed max-w-lg"
                        >
                            {page.description}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Link href="/contact" className="inline-block px-8 py-3 bg-neon-green text-black font-bold rounded-full shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all transform hover:scale-105">
                                Get In Touch
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="relative rounded-3xl overflow-hidden aspect-video bg-neutral-900 border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                                </div>
                            </div>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-neutral-800 to-neutral-700"></div>
                        </div>
                        <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-neon-green/20 rounded-3xl"></div>
                    </motion.div>
                </div>
            </section>

            {/* --- Why Section --- */}
            <section className="py-20 px-6 relative z-10 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            {page.whyTitle || "Why choose this service?"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-neutral-300 leading-relaxed text-lg">
                            <p>{page.whyContent}</p>
                            <div className="inline-block px-6 py-2 bg-neon-green/10 text-neon-green rounded-full font-bold border border-neon-green/30">
                                Best in class solutions
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

            {/* --- Features / Content Section --- */}
            <section className="py-24 px-6 relative overflow-hidden bg-white/5">
                <div className="max-w-4xl mx-auto space-y-8 text-center">
                    <h2 className="text-3xl font-bold text-neon-green">Comprehensive Strategy</h2>
                    <p className="text-neutral-400 leading-relaxed text-lg">
                        We don't just provide <b>{slug.replace('-', ' ')}</b>; we provide a roadmap to success. Our approach is data-driven, AI-enhanced, and focused on delivering measurable ROI for your business.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-12">
                        {["Customized Roadmap", "AI-Powered Analysis", "Real-time Monitoring", "Expert Consulting"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-neutral-900/50 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors">
                                <CheckCircle2 className="text-neon-green w-5 h-5" />
                                <span className="font-bold">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Bottom CTA --- */}
            <section className="py-20 px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold">{page.ctaTitle || "Ready to get started?"}</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="px-8 py-4 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform">
                            Book a discovery call
                        </Link>
                        <Link href="/contact" className="px-8 py-4 bg-transparent border border-neon-green text-neon-green font-bold rounded-full hover:bg-neon-green/10 transition-colors">
                            Contact us
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
