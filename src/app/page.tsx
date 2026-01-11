import HeadphoneScroll from "@/components/HeadphoneScroll";
import SlideshowHero from "@/components/SlideshowHero";
import ProcessScroll from "@/components/ProcessScroll";
import SustainabilityLoop from "@/components/SustainabilityLoop";

export default function Home() {
  return (
    <main>
      <HeadphoneScroll />
      <SlideshowHero />
      <ProcessScroll />
      <SustainabilityLoop />

      {/* Footer / Further Content Area */}
      <section className="min-h-[50vh] bg-white flex items-center justify-center text-[#0A2342]">
        <p className="text-xl font-semibold opacity-50">Content continues below...</p>
      </section>
    </main>
  );
}
