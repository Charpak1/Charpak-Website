"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${isScrolled ? "bg-[#0A2342]/90 backdrop-blur-md py-2" : "bg-[#0A2342] py-4"
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="relative h-10 w-40">
                    {/* Note: Ensure this path matches the file I just copied */}
                    <Image
                        src="/Photos/Logos/Charpak Logo Horizontal.png"
                        alt="Charpak Logo"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex gap-8 items-center text-white text-sm font-semibold uppercase tracking-wide">
                        {["Home", "About Us", "Markets", "Materials", "Innovation", "News"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="hover:text-[#6B90FF] transition-colors relative group">
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6B90FF] transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="#" className="bg-[#6B90FF] hover:bg-[#5580EE] text-white px-6 py-2.5 rounded transition-transform hover:-translate-y-0.5 shadow-lg">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Toggle (Simplified) */}
                <button className="md:hidden text-white text-2xl">
                    <span className="sr-only">Menu</span>
                    ☰
                </button>
            </div>

            {/* Animated Bottom Line (recreating the lightBarSlide) */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#6B90FF] to-transparent animate-slide-light"></div>
            </div>
        </header>
    );
}
