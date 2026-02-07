"use client";

import { useState, useEffect } from "react";
import { getData, saveData, uploadFile } from "@/actions/admin";
import { Save, Plus, Trash, Edit, Upload } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    // Data States
    const [activeTab, setActiveTab] = useState("general");
    const [services, setServices] = useState<any[]>([]);
    const [video, setVideo] = useState<any>({});
    const [socials, setSocials] = useState<any>({});
    const [site, setSite] = useState<any>({});
    const [servicePages, setServicePages] = useState<any>({});
    const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const checkAuth = () => {
        if (password === "admin123") setIsAuthenticated(true); // Simple hardcoded password
    };

    const fetchData = async () => {
        setLoading(true);
        const s = await getData("services.json");
        const v = await getData("video.json");
        const soc = await getData("socials.json");
        const si = await getData("site.json");
        const sp = await getData("service-pages.json");
        if (s) {
            setServices(s);
            if (s.length > 0) {
                // Set initial selection if not set
                const firstSlug = s[0].href.split('/').pop() || "";
                setSelectedServiceSlug(firstSlug);
            }
        }
        if (v) setVideo(v);
        if (soc) setSocials(soc);
        if (si) setSite(si);
        if (sp) setServicePages(sp);
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) fetchData();
    }, [isAuthenticated]);

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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="bg-neutral-900 p-8 rounded-xl border border-white/10 space-y-4">
                    <h1 className="text-2xl font-bold">Admin Access</h1>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full bg-black border border-white/20 p-2 rounded text-white"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={checkAuth} className="w-full bg-neon-green text-black font-bold py-2 rounded">Login</button>
                    <p className="text-xs text-neutral-500">Hint: admin123</p>
                </div>
            </div>
        );
    }

    if (loading) return <div className="min-h-screen bg-black text-white p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <h1 className="text-4xl font-bold mb-8 text-neon-green">Content Admin</h1>

            <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                <button onClick={() => setActiveTab("general")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "general" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>General</button>
                <button onClick={() => setActiveTab("services")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "services" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Service List</button>
                <button onClick={() => setActiveTab("seo")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "seo" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Service Pages (SEO)</button>
                <button onClick={() => setActiveTab("video")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "video" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Video</button>
                <button onClick={() => setActiveTab("socials")} className={`px-4 py-2 rounded whitespace-nowrap ${activeTab === "socials" ? "bg-neon-green text-black" : "bg-neutral-800"}`}>Socials</button>
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
        </div>
    );
}
