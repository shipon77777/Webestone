export const categories = ["All", "AI & Tech", "Design", "Development", "Marketing", "Business"];

export const blogPosts = [
    {
        id: "1", // Changed to string for easier URL param matching
        title: "The Future of AI in Web Development",
        excerpt: "How artificial intelligence is reshaping the way we build and interact with the web.",
        content: `
            <p>Artificial Intelligence is no longer just a buzzword; it's a fundamental shift in how we approach web development. From code generation to intelligent design systems, AI is accelerating the development lifecycle and enabling new possibilities.</p>
            
            <h2>Automated Coding and Refactoring</h2>
            <p>Tools like GitHub Copilot and ChatGPT are changing how developers write code. By automating repetitive tasks and suggesting optimizations, developers can focus on higher-level architecture and problem-solving.</p>

            <h2>Intelligent UX/UI</h2>
            <p>AI-driven design tools can now generate layouts, color palettes, and even entire component libraries based on simple text prompts. This allows for rapid prototyping and iteration, ensuring that the final product is both beautiful and functional.</p>

            <h2>Conclusion</h2>
            <p>As we move forward, the collaboration between human creativity and machine efficiency will define the next generation of web experiences. Embracing these tools is not just an option—it's a necessity for staying competitive.</p>
        `,
        date: "May 15, 2024",
        category: "AI & Tech",
        readTime: "5 min read",
        image: "from-purple-600 to-blue-600",
        author: "Sarah Jenkins",
        authorRole: "Senior Tech Lead",
        featured: true
    },
    {
        id: "2",
        title: "Mastering Minimalist UI Design",
        excerpt: "Why less is more when it comes to user interface design in 2024.",
        content: `
            <p>Minimalism isn't just about using less color or whitespace; it's about clarity of purpose. In a world full of digital noise, users crave interfaces that are easy to navigate and understand.</p>
            
            <h2>Focus on Content</h2>
            <p>The core of minimalism is prioritizing content over decoration. Every element on the screen should serve a specific function. If it doesn't add value, remove it.</p>

            <h2>Typography as Design</h2>
            <p>With fewer graphical elements, typography becomes the hero. Bold, clean fonts can guide the user's eye and establish hierarchy without the need for boxes or borders.</p>
        `,
        date: "May 12, 2024",
        category: "Design",
        readTime: "4 min read",
        image: "from-emerald-500 to-teal-500",
        author: "Michael Chen",
        authorRole: "Design Director",
        featured: false
    },
    {
        id: "3",
        title: "SEO Strategies for Modern Single Page Applications",
        excerpt: "Optimizing Single Page Applications for search engines without compromising performance.",
        content: `
            <p>SPAs offer a fantastic user experience but have traditionally struggled with SEO. However, with modern frameworks like Next.js, we can have the best of both worlds.</p>
            
            <h2>Server-Side Rendering (SSR)</h2>
            <p>SSR ensures that search engines see a fully rendered page upon initial load, improving crawlability and indexing.</p>

            <h2>Dynamic Meta Tags</h2>
            <p>Managing metadata dynamically for each route is crucial. Ensure your title tags and descriptions accurately reflect the content of the current view.</p>
        `,
        date: "May 10, 2024",
        category: "Marketing",
        readTime: "6 min read",
        image: "from-orange-500 to-red-500",
        author: "Emma White",
        authorRole: "SEO Specialist",
        featured: false
    },
    {
        id: "4",
        title: "Next.js 15: What's New?",
        excerpt: "A deep dive into the latest features and improvements in the Next.js ecosystem.",
        content: `
            <p>Next.js continues to evolve, bringing powerful new features to the React ecosystem. Version 15 introduces improvements to the App Router, better caching strategies, and enhanced developer experience.</p>
        `,
        date: "May 08, 2024",
        category: "Development",
        readTime: "8 min read",
        image: "from-black to-neutral-800",
        author: "David Lee",
        authorRole: "Full Stack Developer",
        featured: false
    },
    {
        id: "5",
        title: "Building Scalable SaaS Products",
        excerpt: "Key architectural decisions for building software that grows with your user base.",
        content: `
            <p>Scalability starts at the architectural level. Choosing the right database, caching strategy, and separation of concerns early on can save significant technical debt later.</p>
        `,
        date: "May 05, 2024",
        category: "Business",
        readTime: "7 min read",
        image: "from-indigo-500 to-purple-500",
        author: "Alex Johnson",
        authorRole: "CTO",
        featured: false
    },
    {
        id: "6",
        title: "The Psychology of Color in Marketing",
        excerpt: "Understanding how color choices influence user behavior and brand perception.",
        content: `
            <p>Colors evoke emotions. Understanding color psychology allows marketers to subtly influence how a brand is perceived and drive specific actions from users.</p>
        `,
        date: "May 01, 2024",
        category: "Marketing",
        readTime: "5 min read",
        image: "from-pink-500 to-rose-500",
        author: "Sophie Moore",
        authorRole: "Creative Director",
        featured: false
    },
];
