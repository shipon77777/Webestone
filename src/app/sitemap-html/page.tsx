import { getData } from "@/actions/admin";
import Link from "next/link";
import { Globe, ArrowRight, Layers, Layout, Mail, HelpCircle } from "lucide-react";

export const metadata = {
    title: "Sitemap - WeBestOne",
    description: "Navigate through our platform with our structured site map.",
};

export default async function SitemapHTML() {
    const services = await getData("services.json") || [];

    const mainLinks = [
        { name: "Home", href: "/" },
        { name: "Services Overview", href: "/services" },
        { name: "About Us", href: "/about" },
        { name: "Blogs", href: "/blogs" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6 overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-5xl mx-auto space-y-16 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                        Site <span className="text-neon-green">Map</span>
                    </h1>
                    <p className="text-neutral-400 text-lg">Detailed directory of all our paths and services.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Main Pages */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
                            <Layout className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold">Main Pages</h2>
                        </div>
                        <ul className="space-y-4">
                            {mainLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="group flex items-center justify-between text-neutral-400 hover:text-white transition-colors text-lg">
                                        {link.name}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-neon-green" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dynamic Services */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="flex items-center gap-3 text-white border-b border-white/10 pb-4">
                            <Layers className="w-6 h-6 text-neon-green" />
                            <h2 className="text-2xl font-bold">Services</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {services.map((service: any) => (
                                <Link
                                    key={service.href}
                                    href={service.href}
                                    className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-neutral-300 group-hover:text-white font-medium">{service.title}</span>
                                        <Globe className="w-4 h-4 text-neutral-600 group-hover:text-neon-green transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-20 border-t border-white/5 text-center">
                    <p className="text-neutral-500 text-sm">
                        Need more help? <Link href="/contact" className="text-neon-green hover:underline">Contact our support</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
