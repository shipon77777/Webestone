"use client";

import { useState, useEffect } from "react";
import { getData, saveData, uploadFile, getBlogPosts, saveBlogPost, deleteBlogPost, updateBlogPost } from "@/actions/admin";
import { Save, Plus, Trash, Edit, Upload, FileText, X } from "lucide-react";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously, signOut, onAuthStateChanged } from "firebase/auth";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Data States
    const [activeTab, setActiveTab] = useState("general");
    const [services, setServices] = useState<any[]>([]);
    const [video, setVideo] = useState<any>({});
    const [socials, setSocials] = useState<any>({});
    const [site, setSite] = useState<any>({});
    const [servicePages, setServicePages] = useState<any>({});
    const [contactInfo, setContactInfo] = useState<any>({});
    const [teamMembers, setTeamMembers] = useState<any[]>([]);
    const [selectedServiceSlug, setSelectedServiceSlug] = useState("");

    // Blog States
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                fetchData();
            } else {
                setIsAuthenticated(false);
                setServices([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            setError("Invalid email or password.");
        }
    };

    const handleGoogleLogin = async () => {
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: any) {
            setError("Google login failed.");
        }
    };

    const handleAnonymousLogin = async () => {
        setError("");
        try {
            await signInAnonymously(auth);
        } catch (err: any) {
            setError("Anonymous login failed.");
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    const fetchData = async () => {
        setLoading(true);
        const s = await getData("services.json");
        const v = await getData("video.json");
        const soc = await getData("socials.json");
        const si = await getData("site.json");
        const sp = await getData("service-pages.json");
        const c = await getData("contact.json");
        const t = await getData("team.json");
        const bp = await getBlogPosts();

        if (s) {
            setServices(s);
            if (iconNameCorrection(s)) { /* Optional fix for icon names if needed later */ }
            if (s.length > 0) {
                const firstSlug = s[0].href.split('/').pop() || "";
                setSelectedServiceSlug(firstSlug);
            }
        }
        if (v) setVideo(v);
        if (soc) setSocials(soc);
        if (si) setSite(si);
        if (sp) setServicePages(sp);
        if (c) setContactInfo(c);
        if (t) setTeamMembers(t);
        if (bp) setBlogPosts(bp);
        setLoading(false);
    };

    // Helper to fix icon names if needed
    const iconNameCorrection = (services: any[]) => {
        return false;
    };

    const handleSaveBlogPost = async (post: any) => {
        if (post.id) {
            const { id, ...data } = post;
            const res = await updateBlogPost(id, data);
            if (res.success) {
                alert("Blog post updated!");
                setIsBlogModalOpen(false);
                setEditingPost(null);
                fetchData();
            } else {
                alert("Failed to update post: " + res.error);
            }
        } else {
            const res = await saveBlogPost(post);
            if (res.success) {
                alert("Blog post created!");
                setIsBlogModalOpen(false);
                setEditingPost(null);
                fetchData();
            } else {
                alert("Failed to create post: " + res.error);
            }
        }
    };

    const handleDeleteBlog = async (id: string) => {
        if (confirm("Are you sure you want to delete this post?")) {
            const res = await deleteBlogPost(id);
            if (res.success) {
                setBlogPosts(blogPosts.filter(p => p.id !== id));
            } else {
                alert("Failed to delete post");
            }
        }
    };

    const handleSaveServices = async () => {
        await saveData("services.json", services);
        alert("Services saved!");
    };

    const handleSaveVideo = async () => {
        await saveData("video.json", video);
        alert("Video settings saved!");
    };

    const handleSaveSocials = async () => {
        await saveData("socials.json", socials);
        alert("Social links saved!");
    };

    const handleSaveSite = async () => {
        await saveData("site.json", site);
        alert("Site settings saved!");
    };

    const handleSaveServicePages = async () => {
        await saveData("service-pages.json", servicePages);
        alert("Service page content saved!");
    };

    const handleSaveContact = async () => {
        await saveData("contact.json", contactInfo);
        alert("Contact info saved!");
    };

    const handleSaveTeam = async () => {
        await saveData("team.json", teamMembers);
        alert("Team members saved!");
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData);
        if (result.success) {
            setSite({ ...site, logoUrl: result.url });
            alert("Logo uploaded! Click 'Save General Settings' to apply.");
        } else {
            alert("Upload failed: " + result.error);
        }
        setUploading(false);
    };

    const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editingPost) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData);
        if (result.success) {
            setEditingPost({ ...editingPost, image: result.url });
            alert("Image uploaded!");
        } else {
            alert("Upload failed: " + result.error);
        }
        setUploading(false);
    };

    // --- Team Image Upload ---
    const handleTeamImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData);
        if (result.success) {
            const updatedTeam = [...teamMembers];
            updatedTeam[index].image = result.url;
            setTeamMembers(updatedTeam);
            alert("Image uploaded! Don't forget to save.");
        } else {
            alert("Upload failed: " + result.error);
        }
        setUploading(false);
    };


    const addService = () => {
        const newId = (Math.max(...services.map((s: any) => parseInt(s.id) || 0)) + 1).toString();
        setServices([...services, { id: newId, title: "New Service", description: "", iconName: "Search", color: "text-white", href: "#" }]);
    };

    const removeService = (index: number) => {
        const newServices = [...services];
        newServices.splice(index, 1);
        setServices(newServices);
    };

    const updateService = (index: number, field: string, value: string) => {
        const newServices = [...services];
        newServices[index] = { ...newServices[index], [field]: value };
        setServices(newServices);
    };

    const addTeamMember = () => {
        setTeamMembers([...teamMembers, { name: "New Member", role: "Role", image: "", color: "from-blue-500 to-cyan-500" }]);
    };

    const removeTeamMember = (index: number) => {
        const updated = [...teamMembers];
        updated.splice(index, 1);
        setTeamMembers(updated);
    };

    const updateTeamMember = (index: number, field: string, value: string) => {
        const updated = [...teamMembers];
        updated[index] = { ...updated[index], [field]: value };
        setTeamMembers(updated);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="bg-neutral-900 p-8 rounded-xl border border-white/10 space-y-6 w-full max-w-md">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-neon-green">Admin Access</h1>
                        <p className="text-neutral-400 text-sm mt-2">Sign in to manage content</p>
                    </div>

                    {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded text-sm text-center">{error}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-black border border-white/20 p-3 rounded text-white focus:border-neon-green outline-none transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-black border border-white/20 p-3 rounded text-white focus:border-neon-green outline-none transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="w-full bg-neon-green text-black font-bold py-3 rounded hover:bg-neon-green/90 transition-colors">
                            Sign In with Email
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-neutral-900 px-2 text-neutral-500">Or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            Google
                        </button>
                        <button onClick={handleAnonymousLogin} className="flex items-center justify-center gap-2 bg-neutral-800 text-white font-bold py-3 rounded hover:bg-neutral-700 transition-colors">
                            Guest
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) return <div className="min-h-screen bg-black text-white p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-neon-green">Content Admin</h1>
                <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400 border border-red-500/30 px-4 py-2 rounded transition-colors">
                    Logout
                </button>
            </div>

            <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                <button onClick={() => setActiveTab("general")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "general" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>General</button>
                <button onClick={() => setActiveTab("services")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "services" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Service List</button>
                <button onClick={() => setActiveTab("blog")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "blog" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Blog</button>
                <button onClick={() => setActiveTab("seo")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "seo" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Service Pages (SEO)</button>
                <button onClick={() => setActiveTab("video")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "video" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Video</button>
                <button onClick={() => setActiveTab("socials")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "socials" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Socials</button>
                <button onClick={() => setActiveTab("contact")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "contact" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Contact Info</button>
                <button onClick={() => setActiveTab("team")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "team" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Team Members</button>
            </div>

            {/* General Tab */}
            {activeTab === "general" && (
                <div className="space-y-6 max-w-2xl">
                    <h2 className="text-2xl font-bold">General Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Site Name</label>
                            <input value={site.siteName} onChange={(e) => setSite({ ...site, siteName: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Logo Text (Initial)</label>
                            <input value={site.logoText} onChange={(e) => setSite({ ...site, logoText: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Logo Image URL (Manual)</label>
                            <input placeholder="e.g. /logo.png or https://..." value={site.logoUrl} onChange={(e) => setSite({ ...site, logoUrl: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                        </div>

                        <div className="p-6 bg-neutral-900 border border-dashed border-white/20 rounded-xl space-y-4">
                            <label className="block text-sm font-bold text-white mb-1">Upload New Logo (PNG/WebP)</label>

                            {site.logoUrl && (
                                <div className="flex items-center gap-4 p-4 bg-black rounded-lg">
                                    <img src={site.logoUrl.startsWith('/') ? site.logoUrl : site.logoUrl} alt="Logo Preview" className="h-12 w-auto object-contain bg-white/5 p-1 rounded" />
                                    <div className="text-xs text-neutral-500 truncate flex-1">{site.logoUrl}</div>
                                    <button onClick={() => setSite({ ...site, logoUrl: "" })} className="text-red-500 text-xs hover:underline">Remove</button>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 py-3 px-4 rounded-lg text-center transition-colors">
                                    <span className="flex items-center justify-center gap-2 text-sm">
                                        <Upload size={16} /> {uploading ? "Uploading..." : "Click to select file"}
                                    </span>
                                    <input type="file" className="hidden" accept="image/png, image/webp, image/jpeg" onChange={handleLogoUpload} disabled={uploading} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSaveSite} className="flex items-center gap-2 bg-neon-green text-black font-bold px-6 py-3 rounded hover:bg-green-400 transition-colors"><Save size={20} /> Save General Settings</button>
                </div>
            )}

            {/* Services Tab */}
            {activeTab === "services" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Manage Services</h2>
                        <button onClick={addService} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"><Plus size={16} /> Add Service</button>
                    </div>
                    <div className="grid gap-6">
                        {services.map((service, i) => (
                            <div key={i} className="bg-neutral-900 p-6 rounded-xl border border-white/10 space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-lg">Service #{i + 1}</h3>
                                    <button onClick={() => removeService(i)} className="text-red-500 hover:text-red-400"><Trash size={18} /></button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input placeholder="Title" value={service.title} onChange={(e) => updateService(i, "title", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />
                                    <input placeholder="Icon Name (Lucide)" value={service.iconName} onChange={(e) => updateService(i, "iconName", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />
                                    <input placeholder="Color Class (e.g. text-red-500)" value={service.color} onChange={(e) => updateService(i, "color", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />
                                    <input placeholder="Href Link" value={service.href} onChange={(e) => updateService(i, "href", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />
                                    <textarea placeholder="Description" value={service.description} onChange={(e) => updateService(i, "description", e.target.value)} className="bg-black border border-white/20 p-2 rounded col-span-2 h-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSaveServices} className="flex items-center gap-2 bg-neon-green text-black font-bold px-6 py-3 rounded-full hover:bg-green-400 fixed bottom-8 right-8 shadow-lg"><Save size={20} /> Save Changes</button>
                </div>
            )}

            {/* SEO / Page Content Tab */}
            {activeTab === "seo" && (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">Service Page Content</h2>
                            <p className="text-neutral-400 text-sm">Edit SEO and text for individual service pages</p>
                        </div>
                        <select
                            value={selectedServiceSlug}
                            onChange={(e) => setSelectedServiceSlug(e.target.value)}
                            className="bg-neutral-900 border border-white/20 p-3 rounded-lg text-white w-full md:w-64"
                        >
                            {services.map((s, i) => {
                                const slug = s.href.split('/').pop() || "";
                                return <option key={s.id || i} value={slug}>{s.title}</option>;
                            })}
                        </select>
                    </div>

                    {selectedServiceSlug && (
                        <div className="bg-neutral-900 p-8 rounded-2xl border border-white/10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* SEO Section */}
                                <div className="space-y-4">
                                    <h3 className="text-neon-green font-bold border-b border-white/5 pb-2">SEO Meta Tags</h3>
                                    <div>
                                        <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Meta Title</label>
                                        <input
                                            value={servicePages[selectedServiceSlug]?.metaTitle || ""}
                                            onChange={(e) => setServicePages({
                                                ...servicePages,
                                                [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), metaTitle: e.target.value }
                                            })}
                                            className="w-full bg-black border border-white/20 p-3 rounded"
                                            placeholder="SEO Browser Title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Meta Description</label>
                                        <textarea
                                            value={servicePages[selectedServiceSlug]?.metaDescription || ""}
                                            onChange={(e) => setServicePages({
                                                ...servicePages,
                                                [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), metaDescription: e.target.value }
                                            })}
                                            className="w-full bg-black border border-white/20 p-3 rounded h-24"
                                            placeholder="Short summary for Google results"
                                        />
                                    </div>
                                </div>

                                {/* Page Content Section */}
                                <div className="space-y-4">
                                    <h3 className="text-blue-400 font-bold border-b border-white/5 pb-2">Hero Section (H1)</h3>
                                    <div>
                                        <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Full H1 Title</label>
                                        <input
                                            value={servicePages[selectedServiceSlug]?.h1 || ""}
                                            onChange={(e) => setServicePages({
                                                ...servicePages,
                                                [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), h1: e.target.value }
                                            })}
                                            className="w-full bg-black border border-white/20 p-3 rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Highlight Text (Neon Color)</label>
                                        <input
                                            value={servicePages[selectedServiceSlug]?.h1Highlight || ""}
                                            onChange={(e) => setServicePages({
                                                ...servicePages,
                                                [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), h1Highlight: e.target.value }
                                            })}
                                            className="w-full bg-black border border-white/20 p-3 rounded"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Hero Subheadline</label>
                                    <input
                                        value={servicePages[selectedServiceSlug]?.subheadline || ""}
                                        onChange={(e) => setServicePages({
                                            ...servicePages,
                                            [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), subheadline: e.target.value }
                                        })}
                                        className="w-full bg-black border border-white/20 p-3 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Main Description</label>
                                    <textarea
                                        value={servicePages[selectedServiceSlug]?.description || ""}
                                        onChange={(e) => setServicePages({
                                            ...servicePages,
                                            [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), description: e.target.value }
                                        })}
                                        className="w-full bg-black border border-white/20 p-3 rounded h-20"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 pt-4">
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">"Why Choose" Section Title</label>
                                    <input
                                        value={servicePages[selectedServiceSlug]?.whyTitle || ""}
                                        onChange={(e) => setServicePages({
                                            ...servicePages,
                                            [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), whyTitle: e.target.value }
                                        })}
                                        className="w-full bg-black border border-white/20 p-3 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">"Why Choose" Content</label>
                                    <textarea
                                        value={servicePages[selectedServiceSlug]?.whyContent || ""}
                                        onChange={(e) => setServicePages({
                                            ...servicePages,
                                            [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), whyContent: e.target.value }
                                        })}
                                        className="w-full bg-black border border-white/20 p-3 rounded h-24"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-neutral-500 mb-1 uppercase tracking-wider">Bottom CTA Title</label>
                                <input
                                    value={servicePages[selectedServiceSlug]?.ctaTitle || ""}
                                    onChange={(e) => setServicePages({
                                        ...servicePages,
                                        [selectedServiceSlug]: { ...(servicePages[selectedServiceSlug] || {}), ctaTitle: e.target.value }
                                    })}
                                    className="w-full bg-black border border-white/20 p-3 rounded"
                                />
                            </div>

                            <div className="flex justify-end pt-6">
                                <button onClick={handleSaveServicePages} className="flex items-center gap-2 bg-neon-green text-black font-bold px-8 py-3 rounded-full hover:bg-green-400 shadow-lg transition-transform hover:scale-105"><Save size={20} /> Save Page Content</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Video Tab */}
            {activeTab === "video" && (
                <div className="space-y-6 max-w-2xl">
                    <h2 className="text-2xl font-bold">Video Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Headline</label>
                            <input value={video.headline} onChange={(e) => setVideo({ ...video, headline: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Subheadline</label>
                            <input value={video.subheadline} onChange={(e) => setVideo({ ...video, subheadline: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">YouTube Embed URL</label>
                            <input value={video.youtubeUrl} onChange={(e) => setVideo({ ...video, youtubeUrl: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                        </div>
                    </div>
                    <button onClick={handleSaveVideo} className="flex items-center gap-2 bg-neon-green text-black font-bold px-6 py-3 rounded hover:bg-green-400"><Save size={20} /> Save Video Settings</button>
                </div>
            )}

            {/* Socials Tab */}
            {activeTab === "socials" && (
                <div className="space-y-6 max-w-2xl">
                    <h2 className="text-2xl font-bold">Social Media Links</h2>
                    <div className="space-y-4">
                        {Object.keys(socials).map((key) => (
                            <div key={key}>
                                <label className="block text-sm text-neutral-400 mb-1 capitalize">{key}</label>
                                <input value={socials[key]} onChange={(e) => setSocials({ ...socials, [key]: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSaveSocials} className="flex items-center gap-2 bg-neon-green text-black font-bold px-6 py-3 rounded hover:bg-green-400"><Save size={20} /> Save Socials</button>
                </div>
            )}

            {/* Contact Info Tab */}
            {activeTab === "contact" && (
                <div className="space-y-6 max-w-2xl">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Email Address</label>
                            <input value={contactInfo.email || ""} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" placeholder="hello@webestone.com" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Phone Number</label>
                            <input value={contactInfo.phone || ""} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" placeholder="+1 (234) 567-890" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Display Phone (Formatted)</label>
                            <input value={contactInfo.displayPhone || ""} onChange={(e) => setContactInfo({ ...contactInfo, displayPhone: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" placeholder="+1 234 567 890" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Address Line 1</label>
                            <input value={contactInfo.address1 || ""} onChange={(e) => setContactInfo({ ...contactInfo, address1: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" placeholder="123 Innovation Blvd" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Address Line 2</label>
                            <input value={contactInfo.address2 || ""} onChange={(e) => setContactInfo({ ...contactInfo, address2: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" placeholder="Tech City, TC 90210" />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">Google Maps Link</label>
                            <input value={contactInfo.mapLink || ""} onChange={(e) => setContactInfo({ ...contactInfo, mapLink: e.target.value })} className="w-full bg-neutral-900 border border-white/20 p-3 rounded" placeholder="https://maps.google.com/..." />
                        </div>
                    </div>
                    <button onClick={handleSaveContact} className="flex items-center gap-2 bg-neon-green text-black font-bold px-6 py-3 rounded hover:bg-green-400"><Save size={20} /> Save Contact Info</button>
                </div>
            )}

            {/* Team Members Tab */}
            {activeTab === "team" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Manage Team Members</h2>
                        <button onClick={addTeamMember} className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"><Plus size={16} /> Add Member</button>
                    </div>
                    <div className="grid gap-6">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="bg-neutral-900 p-6 rounded-xl border border-white/10 space-y-4">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-lg">Member #{i + 1}</h3>
                                    <button onClick={() => removeTeamMember(i)} className="text-red-500 hover:text-red-400"><Trash size={18} /></button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input placeholder="Name" value={member.name} onChange={(e) => updateTeamMember(i, "name", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />
                                    <input placeholder="Role" value={member.role} onChange={(e) => updateTeamMember(i, "role", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />
                                    <input placeholder="Color Gradient (Tailwind)" value={member.color} onChange={(e) => updateTeamMember(i, "color", e.target.value)} className="bg-black border border-white/20 p-2 rounded" />

                                    <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                                        <input placeholder="Image URL" value={member.image} onChange={(e) => updateTeamMember(i, "image", e.target.value)} className="flex-1 bg-black border border-white/20 p-2 rounded" />

                                        <label className="cursor-pointer bg-white/10 p-2 rounded hover:bg-white/20 transition-colors">
                                            <Upload size={16} />
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleTeamImageUpload(e, i)} disabled={uploading} />
                                        </label>
                                    </div>

                                </div>
                                {member.image && (
                                    <div className="w-20 h-20 rounded-full overflow-hidden border border-white/10">
                                        <img src={member.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSaveTeam} className="flex items-center gap-2 bg-neon-green text-black font-bold px-6 py-3 rounded-full hover:bg-green-400 fixed bottom-8 right-8 shadow-lg"><Save size={20} /> Save Changes</button>
                </div>
            )}


            {/* Blog Tab */}
            {activeTab === "blog" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
                        <button onClick={() => { setEditingPost({ title: "", excerpt: "", content: "", category: "AI & Tech", readTime: "5 min read", image: "from-blue-500 to-purple-500", date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }); setIsBlogModalOpen(true); }} className="flex items-center gap-2 bg-neon-green text-black px-4 py-2 rounded hover:bg-green-400 font-bold"><Plus size={16} /> New Post</button>
                    </div>

                    <div className="grid gap-4">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="bg-neutral-900 p-6 rounded-xl border border-white/10 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-white">{post.title}</h3>
                                    <div className="text-sm text-neutral-400 flex gap-4 mt-1">
                                        <span>{post.date}</span>
                                        <span className="px-2 py-0.5 bg-white/10 rounded text-xs">{post.category}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingPost(post); setIsBlogModalOpen(true); }} className="p-2 bg-blue-600/20 text-blue-400 rounded hover:bg-blue-600/30 transition-colors"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteBlog(post.id)} className="p-2 bg-red-600/20 text-red-500 rounded hover:bg-red-600/30 transition-colors"><Trash size={16} /></button>
                                </div>
                            </div>
                        ))}
                        {blogPosts.length === 0 && <div className="text-neutral-500 text-center py-10">No blog posts found.</div>}
                    </div>
                </div>
            )}

            {/* Blog Edit Modal */}
            {isBlogModalOpen && editingPost && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
                        <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-neutral-900 z-10">
                            <h3 className="text-xl font-bold text-white">{editingPost.id ? "Edit Post" : "New Post"}</h3>
                            <button onClick={() => setIsBlogModalOpen(false)} className="text-neutral-400 hover:text-white"><X size={24} /></button>
                        </div>

                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Title</label>
                                    <input value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none text-white" placeholder="Post Title" />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">ID (Auto-generated)</label>
                                    <input value={editingPost.id || "New"} disabled className="w-full bg-neutral-800 border border-white/10 p-3 rounded text-neutral-500 cursor-not-allowed" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm text-neutral-400 mb-1">Excerpt</label>
                                    <textarea value={editingPost.excerpt} onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none h-20 text-white" placeholder="Short summary..." />
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Category</label>
                                    <select value={editingPost.category} onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none text-white">
                                        {["AI & Tech", "Design", "Development", "Marketing", "Business", "General"].map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Read Time</label>
                                    <input value={editingPost.readTime} onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none text-white" placeholder="e.g. 5 min read" />
                                </div>

                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Date</label>
                                    <input type="text" value={editingPost.date} onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none text-white" placeholder="May 15, 2024" />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Author</label>
                                    <input value={editingPost.author || ""} onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none text-white" placeholder="Author Name" />
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <label className="block text-sm text-neutral-400">Featured Image (URL or Upload)</label>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <input
                                            value={editingPost.image}
                                            onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                                            className="flex-1 bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none text-white text-sm"
                                            placeholder="e.g. /uploads/image.png or from-blue-500 to-purple-500"
                                        />
                                        <label className="cursor-pointer bg-white/10 hover:bg-white/20 border border-white/10 py-3 px-6 rounded-lg text-center transition-colors whitespace-nowrap flex items-center gap-2">
                                            <Upload size={16} />
                                            <span className="text-sm font-medium">{uploading ? "Uploading..." : "Upload Image"}</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleBlogImageUpload} disabled={uploading} />
                                        </label>
                                    </div>
                                    {editingPost.image && !editingPost.image.includes(' ') && (
                                        <div className="mt-2 h-32 w-full rounded-lg overflow-hidden border border-white/10 bg-black flex items-center justify-center">
                                            {editingPost.image.startsWith('from-') ? (
                                                <div className={`w-full h-full bg-gradient-to-br ${editingPost.image}`}></div>
                                            ) : (
                                                <img src={editingPost.image} alt="Preview" className="h-full w-full object-cover" />
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="col-span-2">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <label className="block text-sm text-neutral-400 mb-1">Content (HTML Supported)</label>
                                            <p className="text-xs text-neutral-500">Use standard HTML tags for layout.</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditingPost({ ...editingPost, content: editingPost.content + "<h2>Subtitle</h2>\n" })} className="text-[10px] px-2 py-1 bg-white/5 rounded hover:bg-white/10 border border-white/10">H2</button>
                                            <button onClick={() => setEditingPost({ ...editingPost, content: editingPost.content + "<p>Paragraph text...</p>\n" })} className="text-[10px] px-2 py-1 bg-white/5 rounded hover:bg-white/10 border border-white/10">Para</button>
                                            <button onClick={() => setEditingPost({ ...editingPost, content: editingPost.content + "<strong>Bold Text</strong>" })} className="text-[10px] px-2 py-1 bg-white/5 rounded hover:bg-white/10 border border-white/10">Bold</button>
                                            <button onClick={() => setEditingPost({ ...editingPost, content: editingPost.content + "<ul>\n  <li>Item 1</li>\n</ul>\n" })} className="text-[10px] px-2 py-1 bg-white/5 rounded hover:bg-white/10 border border-white/10">List</button>
                                        </div>
                                    </div>
                                    <textarea value={editingPost.content} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} className="w-full bg-black border border-white/20 p-3 rounded focus:border-neon-green outline-none h-80 font-mono text-sm text-white" placeholder="<p>Write your content here...</p>" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/10 flex justify-end gap-4 sticky bottom-0 bg-neutral-900 z-10">
                            <button onClick={() => setIsBlogModalOpen(false)} className="px-6 py-2 rounded hover:bg-white/5 transition-colors text-white">Cancel</button>
                            <button onClick={() => handleSaveBlogPost(editingPost)} className="px-6 py-2 bg-neon-green text-black font-bold rounded hover:bg-green-400 transition-colors">Save Post</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
