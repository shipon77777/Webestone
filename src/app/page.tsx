import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurPromises from "@/components/OurPromises";
import LatestInsights from "@/components/LatestInsights";
import VideoSection from "@/components/VideoSection";
import { getData, getBlogPosts } from "@/actions/admin";

export default async function Home() {
  const services = await getData("services.json") || [];
  const video = await getData("video.json") || { headline: "Experience the Future", subheadline: "Showreel", youtubeUrl: "" };
  const blogPosts = await getBlogPosts();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between">

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto">
        <Hero />
        <ServiceGrid initialServices={services} />
        <WhyChooseUs />
        <OurPromises />
        <VideoSection initialVideo={video} />
        <LatestInsights initialPosts={blogPosts as any} />
      </div>
    </main>
  );
}
