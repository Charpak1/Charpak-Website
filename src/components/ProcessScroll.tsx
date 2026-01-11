"use client";

import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const stages = [
    {
        title: "The Design Brief",
        duration: "1 Hour",
        description: "We start by understanding your vision and requirements.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2070",
    },
    {
        title: "Concept Development",
        duration: "3 Days (or less)",
        description: "Our design team brings your ideas to life with initial concepts.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    },
    {
        title: "Prototypes & Samples",
        duration: "1 Week (or less)",
        description: "Physical samples are created for your review and testing.",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2070",
    },
    {
        title: "Tooling & Engineering",
        duration: "6 Weeks (or less)",
        description: "Precision tooling is engineered for mass production.",
        image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=2070",
    },
    {
        title: "Production & Quality",
        duration: "7 Weeks (or less)",
        description: "Full-scale manufacturing with rigorous quality control.",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070",
    },
    {
        title: "Delivery Of Your Product ✓",
        duration: "8 Weeks (or less)",
        description: "Your finished product is delivered on time, every time.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070",
    },
];

export default function ProcessScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStage, setActiveStage] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Map scroll progress (0-1) to stage index (0-5)
        const index = Math.min(stages.length - 1, Math.floor(latest * stages.length));
        setActiveStage(index);
    });

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505] text-white">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                {/* Background Graphic/Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />

                {/* Dynamic Background Image */}
                <div className="absolute inset-0 w-full h-full opacity-40 transition-opacity duration-1000">
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={activeStage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={stages[activeStage].image}
                                alt={stages[activeStage].title}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content Container */}
                <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center">

                    {/* Stage Counter */}
                    <motion.div
                        key={`count-${activeStage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#6B90FF] font-bold tracking-widest uppercase mb-4 text-sm md:text-base"
                    >
                        Stage {activeStage + 1}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        key={`title-${activeStage}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-4xl md:text-6xl font-bold mb-4 ${activeStage === 5 ? "text-[#00D26A]" : "text-white"}`}
                    >
                        {stages[activeStage].title}
                    </motion.h2>

                    {/* Description (Added for context) */}
                    <motion.p
                        key={`desc-${activeStage}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        className="text-lg md:text-xl max-w-2xl mb-8"
                    >
                        {stages[activeStage].description}
                    </motion.p>

                    {/* Duration Badge */}
                    <div className="inline-block border border-white/30 rounded-full px-6 py-2 text-sm md:text-base backdrop-blur-sm bg-black/30">
                        Typical Duration: <span className="font-bold text-white">{stages[activeStage].duration}</span>
                    </div>

                    {/* Timeline Visualizer */}
                    <div className="mt-12 flex gap-2 md:gap-4 items-center">
                        {stages.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${i <= activeStage
                                        ? (i === activeStage ? "w-12 bg-[#6B90FF]" : "w-4 bg-[#6B90FF]/50")
                                        : "w-2 bg-white/20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
