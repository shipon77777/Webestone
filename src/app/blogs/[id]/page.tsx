import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogData"; // Correct path
import BlogPostContent from "./BlogPostContent";
import { Metadata } from "next";

// --- Types ---
type Props = {
    params: Promise<{ id: string }>;
};

// --- Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

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
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

// --- Page Component ---
export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return <BlogPostContent post={post} />;
}
