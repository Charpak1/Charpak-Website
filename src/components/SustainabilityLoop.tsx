"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Recycle, Leaf, Truck, ShoppingBag, Factory, PenTool, Package } from "lucide-react";

// Data extracted from the circular economy diagram
const steps = [
    {
        id: 1,
        title: "Raw Materials & Reprocessing",
        color: "#F28C28", // Orange
        icon: <Recycle className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Sourcing sustainable materials and reprocessing recycled content."
    },
    {
        id: 2,
        title: "Charpak Design & Production",
        color: "#0A2342", // Dark Blue (Brand Color)
        icon: <PenTool className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Innovative design and precision manufacturing at our facility."
    },
    {
        id: 3,
        title: "Co-Packers",
        color: "#E91E63", // Pink/Red
        icon: <Package className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Efficient packing solutions for product distribution."
    },
    {
        id: 4,
        title: "UK & Export",
        color: "#8E24AA", // Purple
        icon: <Truck className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Logistics and delivery to domestic and international markets."
    },
    {
        id: 5,
        title: "Product in Store",
        color: "#7CB342", // Light Green
        icon: <ShoppingBag className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Retail display and availability for consumers."
    },
    {
        id: 6,
        title: "Consumption",
        color: "#00ACC1", // Teal
        icon: <Leaf className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Consumer use and enjoyment of the product."
    },
    {
        id: 7,
        title: "Recycling",
        color: "#43A047", // Green
        icon: <Recycle className="w-16 h-16 md:w-24 md:h-24 mb-4" />,
        description: "Closing the loop: Collecting and recycling material for reuse."
    }
];

export default function SustainabilityLoop() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % steps.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + steps.length) % steps.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[80vh] w-full bg-[#FAFAFA] overflow-hidden flex flex-col items-center justify-center">

            {/* Header */}
            <div className="absolute top-10 z-20 text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-[#0A2342] mb-2">Sustainable Development Goals</h2>
                <p className="text-[#0A2342]/60 text-lg">Our Circular Economy Process</p>
            </div>

            {/* Main Slide Area */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -100, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="w-full h-full flex flex-col items-center justify-center px-6"
                        style={{ backgroundColor: steps[current].color }}
                    >
                        <div className="text-white text-center max-w-4xl p-8 md:p-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                            <div className="flex justify-center">{steps[current].icon}</div>
                            <h3 className="text-4xl md:text-6xl font-bold mb-6">{steps[current].title}</h3>
                            <p className="text-xl md:text-2xl font-light opacity-90">{steps[current].description}</p>

                            {/* Step Counter */}
                            <div className="mt-8 flex gap-2 justify-center">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-3 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-white" : "w-3 bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-10 z-30 p-4 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transition-colors"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-10 z-30 p-4 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transition-colors"
            >
                <ChevronRight size={32} />
            </button>

        </section>
    );
}
