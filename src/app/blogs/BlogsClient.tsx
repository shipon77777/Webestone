"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Search, Zap, Code, PenTool, Cpu, Globe, Rocket } from "lucide-react";

import { categories } from "@/data/blogData";

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readTime: string;
    image: string;
    featured?: boolean;
    [key: string]: any;
};

// --- Components ---

// 1. 3D Tilt Card Component ("Trick" UI)
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const checkIsMobile = () => {
        if (typeof window !== 'undefined') {
            return window.matchMedia("(max-width: 768px)").matches;
        }
        return false;
    };

    const transform = useTransform(
        [xSpring, ySpring],
        ([latestX, latestY]) => `rotateX(${latestX}deg) rotateY(${latestY}deg)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || checkIsMobile()) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(yPct * -10); // Rotate X based on Y position (tilt up/down)
        y.set(xPct * 10);  // Rotate Y based on X position (tilt left/right)
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform: checkIsMobile() ? "none" : transform
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            {children}
        </motion.div>
    );
}

// 2. Blog Card
function BlogCard({ post, index }: { post: BlogPost, index: number }) {
    return (
        <TiltCard className="group h-full">
            <Link href={`/blogs/${post.id}`} className="block h-full">
                <div className="relative h-full bg-neutral-900/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden p-6 hover:border-white/20 transition-colors">

                    {/* Background Gradient/Image Placeholder */}
                    <div className="absolute top-0 right-0 w-full h-1/2 opacity-20 group-hover:opacity-30 transition-opacity blur-3xl rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none">
                        {post.image?.includes('from-') ? (
                            <div className={`w-full h-full bg-gradient-to-br ${post.image}`}></div>
                        ) : (
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                        )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border border-white/10 ${post.category === "AI & Tech" ? "text-cyan-400 bg-cyan-400/10" :
                                    post.category === "Design" ? "text-purple-400 bg-purple-400/10" :
                                        post.category === "Development" ? "text-green-400 bg-green-400/10" :
                                            "text-orange-400 bg-orange-400/10"
                                    }`}>
                                    {post.category}
                                </span>
                                <span className="text-neutral-500 text-xs font-mono">{post.readTime}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors leading-tight">
                                {post.title}
                            </h3>
                            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                                {post.excerpt}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <span className="text-neutral-500 text-xs">{post.date}</span>
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-colors">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </TiltCard>
    );
}

// 3. Featured Card
function FeaturedPost({ post }: { post: BlogPost }) {
    if (!post) return null;

    return (
        <TiltCard className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[500px]">
            <Link href={`/blogs/${post.id}`} className="block h-full relative group rounded-3xl overflow-hidden border border-white/10 hover:border-neon-green/30 transition-colors">
                {/* Background Image Area */}
                <div className="absolute inset-0 opacity-20">
                    {post.image?.includes('from-') ? (
                        <div className={`w-full h-full bg-gradient-to-br ${post.image}`}></div>
                    ) : (
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                    )}
                </div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                    <div className="max-w-3xl space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3"
                        >
                            <span className="px-4 py-1.5 bg-neon-green text-black font-bold text-xs uppercase tracking-wider rounded-full">Featured</span>
                            <span className="text-white/60 text-sm">{post.date}</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neon-green transition-all"
                        >
                            {post.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-neutral-300 max-w-xl"
                        >
                            {post.excerpt}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="inline-flex items-center gap-2 text-neon-green font-bold border-b border-neon-green pb-1 hover:gap-4 transition-all">
                                Read Article <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hidden md:block">
                    <Zap className="w-8 h-8 text-yellow-400 fill-current" />
                </div>
            </Link>
        </TiltCard>
    );
}

export default function BlogsClient({ initialPosts }: { initialPosts: BlogPost[] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(initialPosts);

    // Filter Logic
    useEffect(() => {
        let result = initialPosts;

        // Category Filter
        if (activeCategory !== "All") {
            result = result.filter(post => post.category === activeCategory);
        }

        // Search Filter
        if (searchQuery) {
            result = result.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredPosts(result);
    }, [activeCategory, searchQuery, initialPosts]);

    const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
    const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6 relative overflow-hidden">

            {/* Background Grid Pattern */}
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-bold tracking-tighter text-white"
                        >
                            Insights
                            <span className="text-neon-green">.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-neutral-400 max-w-md"
                        >
                            Explore our latest thoughts on design, technology, and the future of digital products.
                        </motion.p>
                    </div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full md:w-auto relative"
                    >
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-80 bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-full py-3 px-6 pl-12 text-white placeholder-neutral-500 focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 outline-none transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    </motion.div>
                </div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "text-black bg-neon-green" : "text-neutral-400 bg-white/5 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">

                    {/* Featured Post (Spans full width if exists) */}
                    {featuredPost && <FeaturedPost post={featuredPost} />}

                    {/* Other Posts */}
                    {otherPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <BlogCard post={post} index={index} />
                        </motion.div>
                    ))}

                    {/* Empty State */}
                    {filteredPosts.length === 0 && (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mx-auto border border-white/10">
                                <Search className="w-8 h-8 text-neutral-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">No articles found</h3>
                            <p className="text-neutral-400">Try adjusting your search or category filter.</p>
                            <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="text-neon-green hover:underline">Clear Filters</button>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
