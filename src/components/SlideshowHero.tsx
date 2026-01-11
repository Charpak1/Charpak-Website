"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    "/Photos/Images/Hero Section/hero-1.jpg",
    "/Photos/Images/Hero Section/hero-2.jpg",
    "/Photos/Images/Hero Section/hero-3.jpg",
];

export default function SlideshowHero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Slideshow */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={slides[currentSlide]}
                            alt="Hero Slide"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342]/80 to-[#1C4E80]/70 z-10"></div>

            {/* Content */}
            <div className="relative z-30 container mx-auto px-6 text-center text-white max-w-4xl pt-20 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Design-led Packaging for a Sustainable Future
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
                        From concept to manufacture, we create premium thermoformed packaging solutions that drive the circular economy.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <button className="px-8 py-4 bg-[#6B90FF] text-white font-bold rounded-md hover:bg-[#5580EE] transition-transform hover:-translate-y-1 shadow-lg uppercase tracking-wider">
                            Our Markets
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-[#0A2342] transition-colors uppercase tracking-wider">
                            Our Mission
                        </button>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}
