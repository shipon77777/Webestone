"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Share2, Twitter, Linkedin, Link as LinkIcon, Facebook, Clock, User, Calendar, CheckCircle } from "lucide-react";

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    author?: string;
    authorRole?: string;
    featured?: boolean;
};

export default function BlogPostContent({ post }: { post: BlogPost }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isShared, setIsShared] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
    };

    return (
        <article className="min-h-screen bg-black text-white relative">
            {/* 1. Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-neon-green origin-left z-50"
                style={{ scaleX }}
            />

            {/* Back Button */}
            <div className="fixed top-24 left-6 z-40 hidden xl:block">
                <Link href="/blogs" className="flex items-center gap-2 text-neutral-400 hover:text-neon-green transition-colors bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 hover:border-white/20">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Back to Blog</span>
                </Link>
            </div>

            {/* 2. Hero Section */}
            <header className="relative w-full h-[60vh] md:h-[70vh] flex items-end justify-center pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 opacity-30">
                    {post.image?.includes('from-') ? (
                        <div className={`w-full h-full bg-gradient-to-br ${post.image}`}></div>
                    ) : (
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                {/* Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                <div className="relative z-10 container max-w-4xl px-6 text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-4 text-sm font-bold tracking-wider uppercase text-neon-green"
                    >
                        <span className="px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20">{post.category}</span>
                        <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                        <span className="text-white/80">{post.readTime}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center justify-center gap-8 pt-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center">
                                <User className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">{post.author || "Webestone Team"}</div>
                                <div className="text-xs text-neutral-500">{post.authorRole || "Admin"}</div>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-8 bg-white/10"></div>

                        <div className="md:flex items-center gap-3 hidden">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">{post.date}</div>
                                <div className="text-xs text-neutral-500">Published</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* 3. Content Body */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative container max-w-3xl px-6 mx-auto pb-24"
            >
                {/* Floating Share Button (Desktop) */}
                <div className="absolute -left-20 top-0 hidden xl:flex flex-col gap-4 sticky top-32">
                    <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group relative">
                        {isShared ? <CheckCircle className="w-4 h-4 text-neon-green" /> : <LinkIcon className="w-4 h-4" />}
                        <span className="absolute left-full ml-4 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Copy Link</span>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/20 transition-all">
                        <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/20 transition-all">
                        <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/20 transition-all">
                        <Facebook className="w-4 h-4" />
                    </button>
                </div>

                <div
                    className="max-w-none text-lg
                    [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-white
                    [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-neutral-300 [&_p]:mb-6
                    [&_a]:text-neon-green [&_a]:underline hover:[&_a]:text-white [&_a]:transition-colors
                    [&_strong]:text-white [&_strong]:font-bold
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-neutral-300
                    [&_blockquote]:border-l-4 [&_blockquote]:border-neon-green [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:italic [&_blockquote]:text-white/80 [&_blockquote]:bg-white/5 [&_blockquote]:rounded-r-lg [&_blockquote]:mb-8"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Mobile Share Bar */}
                <div className="xl:hidden flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                    <span className="text-neutral-400 font-medium">Share this article</span>
                    <div className="flex gap-4">
                        <button onClick={handleShare} className="p-2 text-neutral-400 hover:text-white transition-colors">
                            {isShared ? <CheckCircle className="w-5 h-5 text-neon-green" /> : <LinkIcon className="w-5 h-5" />}
                        </button>
                        <button className="p-2 text-neutral-400 hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5" /></button>
                        <button className="p-2 text-neutral-400 hover:text-[#0A66C2] transition-colors"><Linkedin className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Recent/Next Navigation Placeholder */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <Link href="/blogs" className="block group">
                        <div className="flex items-center justify-between text-neutral-500 mb-2 text-sm uppercase tracking-wider">
                            <span>Up Next</span>
                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors">Explore More Articles</h3>
                    </Link>
                </div>
            </motion.div>
        </article>
    );
}
