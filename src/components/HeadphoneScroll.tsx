"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 40;

export default function HeadphoneScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll (0-1) to frame index (0-39)
    const frameIndexByScroll = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const imgArray: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < FRAME_COUNT; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = `/sequence/frame_${i}.jpg`;
                    img.onload = () => resolve();
                    img.onerror = (e) => {
                        console.error(`Failed to load frame_${i}.jpg`, e);
                        // resolve anyway to avoid blocking everything, 
                        // though you might want better error handling
                        resolve();
                    };
                    imgArray.push(img);
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(imgArray);
            setLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure index is within bounds
        const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)));
        const img = images[safeIndex];

        if (!img) return;

        // Clear and calculate "contain" fit
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Re-render current frame after resize
                const currentIndex = frameIndexByScroll.get();
                renderFrame(currentIndex);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Init

        return () => window.removeEventListener("resize", handleResize);
    }, [images, loaded]); // Re-bind if images load

    // Render loop
    useMotionValueEvent(frameIndexByScroll, "change", (latest) => {
        if (loaded) {
            renderFrame(latest);
        }
    });

    // Also render first frame on load
    useEffect(() => {
        if (loaded) {
            renderFrame(0);
        }
    }, [loaded]);

    // Opacity transforms for text
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.85, 1], [0, 1]);


    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
            {/* Sticky Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pt-24">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/50">
                        Loading Experience...
                    </div>
                )}
            </div>

            {/* Text Overlays - Positioned Absolute over the sticky container won't work easily 
          because the container scrolls away. 
          Alternatively, we put them FIXED or STICKY inside the container, 
          OR we map them to the same scroll progress but place them in a pointer-events-none layer.
      */}

            {/* 
        Strategy: Use fixed overlays that fade in/out based on scroll, 
        OR place them absolutely within the sticky container? 
        Actually, putting them inside the sticky container (which is h-screen) works best.
      */}

            <div className="sticky top-0 h-screen w-full pointer-events-none flex flex-col items-center -mt-[100vh] pt-24">

                {/* Section 1: 0% - Title at top to unobstruct headphones */}
                <motion.div
                    style={{ opacity: opacity1 }}
                    className="absolute top-[20%] text-center w-full px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white/90 mb-4 drop-shadow-lg">
                        Charpaks Pure Sound.
                    </h1>
                    <p className="text-xl text-white/60 font-light tracking-wide">Experience the difference.</p>
                </motion.div>

                {/* Section 2: 30% - Left Aligned */}
                <motion.div style={{ opacity: opacity2 }} className="absolute w-full px-12 md:px-24 flex justify-start">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white/90">
                            Precision Engineering.
                        </h2>
                        <p className="text-lg text-white/60 mt-2 max-w-md">
                            Every component meticulously crafted for audio perfection.
                        </p>
                    </div>
                </motion.div>

                {/* Section 3: 60% - Right Aligned */}
                <motion.div style={{ opacity: opacity3 }} className="absolute w-full px-12 md:px-24 flex justify-end">
                    <div className="text-right">
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white/90">
                            Titanium Drivers.
                        </h2>
                        <p className="text-lg text-white/60 mt-2 max-w-md ml-auto">
                            Ultra-light, rigid cones deliver distortion-free sound.
                        </p>
                    </div>
                </motion.div>

                {/* Section 4: 90% - Center CTA */}
                <motion.div style={{ opacity: opacity4 }} className="absolute text-center pointer-events-auto">
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white/90 mb-8">
                        Hear Everything.
                    </h2>
                    <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform">
                        Pre-order Now
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
