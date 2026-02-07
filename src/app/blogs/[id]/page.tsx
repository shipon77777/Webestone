import { notFound } from "next/navigation";
import { blogPosts as fallbackPosts } from "@/data/blogData"; // Alias for clarity
import { getBlogPostById, getBlogPosts } from "@/actions/admin";
import BlogPostContent from "./BlogPostContent";
import { Metadata } from "next";

// --- Types ---
type Props = {
    params: Promise<{ id: string }>;
};

// --- Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    let post: any = await getBlogPostById(id);

    // Fallback if not in DB
    if (!post) {
        post = fallbackPosts.find((p) => p.id === id);
    }

    if (!post) {
        return {
            title: "Post Not Found | Webestone",
        };
    }

    return {
        title: `${post.title} | Webestone Blog`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author || "Webestone Team"],
        },
    };
}

// --- Static Params for SSG ---
export async function generateStaticParams() {
    const dbPosts = await getBlogPosts();

    // Combine DB posts and fallback posts for static paths (deduplicated)
    const allIds = new Set([
        ...dbPosts.map((p) => p.id),
        ...fallbackPosts.map((p) => p.id)
    ]);

    return Array.from(allIds).map((id) => ({
        id: id,
    }));
}

// --- Page Component ---
export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;

    // Try to fetch from DB
    let post: any = await getBlogPostById(id);

    // Try mock data if not found
    if (!post) {
        post = fallbackPosts.find((p) => p.id === id);
    }

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
}
