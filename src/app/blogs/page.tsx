import { getBlogPosts } from "@/actions/admin";
import BlogsClient from "./BlogsClient";
import { blogPosts as fallbackPosts } from "@/data/blogData";

export const revalidate = 60; // Revalidate every minute

export const metadata = {
    title: "Webestone Blog | Insights & Thoughts",
    description: "Explore our latest thoughts on design, technology, and the future of digital products.",
};

export default async function BlogsPage() {
    let posts = await getBlogPosts();

    // If no posts in DB yet, use fallback data so the page isn't empty on first load
    if (!posts || posts.length === 0) {
        posts = fallbackPosts;
    }

    return <BlogsClient initialPosts={posts as any} />;
}
