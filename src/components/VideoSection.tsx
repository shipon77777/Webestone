"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

type VideoData = {
    headline: string;
    subheadline: string;
    youtubeUrl: string;
};

export default function VideoSection({ initialVideo }: { initialVideo: VideoData }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const { headline, subheadline, youtubeUrl } = initialVideo;

    const getEmbedUrl = (url: string) => {
        if (!url) return "";
        if (url.includes("embed/")) return url;

        let videoId = "";
        if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("watch?v=")) {
            videoId = url.split("watch?v=")[1].split("&")[0];
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
    };

    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="text-neon-green font-mono text-sm tracking-widest uppercase mb-4 block">{subheadline}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        {headline}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,255,157,0.1)] group"
                >
                    {/* Glow Effect Behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 -z-10"></div>

                    {!isPlaying ? (
                        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-center cursor-pointer group p-8" onClick={() => setIsPlaying(true)}>
                            {/* Dashboard Background Pattern */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                            {/* Top Badge */}
                            <div className="absolute top-6 right-6 px-4 py-1.5 bg-blue-600/10 border border-blue-500/30 rounded-full">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">SEO Optimized</span>
                            </div>

                            {/* Centered AI Logo Box */}
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="relative w-24 h-24 bg-neutral-900 rounded-2xl border border-white/5 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,255,157,0.1)] group-hover:shadow-[0_0_60px_rgba(0,255,157,0.2)]"
                            >
                                <div className="absolute inset-0 bg-neon-green/5 blur-xl rounded-2xl"></div>
                                <span className="text-3xl font-black text-neon-green relative z-10 tracking-tighter">AI</span>
                            </motion.div>

                            {/* Progress Bar Area */}
                            <div className="w-full max-w-xs space-y-3 mb-12">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: "65%" }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                        className="h-full bg-neon-green shadow-[0_0_15px_rgba(0,255,157,0.5)]"
                                    ></motion.div>
                                </div>
                                <div className="flex justify-center">
                                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em] animate-pulse">Analyzing Data</span>
                                </div>
                            </div>

                            {/* Stats Boxes */}
                            <div className="flex gap-4 w-full max-w-md">
                                <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 text-center backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                                    <p className="text-2xl font-bold text-white mb-1">98%</p>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Accuracy</p>
                                </div>
                                <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 text-center backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                                    <p className="text-2xl font-bold text-white mb-1">10x</p>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Growth</p>
                                </div>
                            </div>

                            {/* Center Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:bg-neon-green group-hover:border-neon-green transition-all shadow-2xl"
                                >
                                    <Play className="w-8 h-8 text-white group-hover:text-black fill-current ml-1" />
                                </motion.div>
                            </div>

                        </div>
                    ) : (
                        <iframe
                            className="w-full h-full"
                            src={getEmbedUrl(youtubeUrl)}
                            title="Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
