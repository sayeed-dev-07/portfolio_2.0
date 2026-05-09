'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    {
        id: "frontend",
        title: "Frontend Core",
        color: "bg-[#cbf0f8]", // Pastel Blue
        skills: [
            "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
            "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"
        ]
    },
    {
        id: "motion",
        title: "Motion & UI",
        color: "bg-[#fffdf2]", // Off-White/Cream
        skills: [
            "GSAP", "ScrollTrigger", "SVG Animation",
            "Framer Motion", "Micro-Interactions", "UI Motion Design"
        ]
    },
    {
        id: "creative",
        title: "Creative",
        color: "bg-[#ffb7b2]", // Pastel Pink
        skills: [
            "Figma", "Typography Systems", "Layout Composition",
            "UI Aesthetics", "Adobe Illustrator"
        ]
    },
    {
        id: "engineering",
        title: "Engineering",
        color: "bg-[#e2f0cb]", // Pastel Green
        skills: [
            "Performance Optimization", "Lazy Loading", "Component Architecture",
            "Accessibility Basics", "SEO Fundamentals", "TanStack Query",
            "Zustand", "Restful APIs"
        ]
    }
];

const Skills = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".skill-card");

        // 1. Enter animation for the cards
        gsap.fromTo(
            cards,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,

                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );

    }, { scope: sectionRef });

    // --- HOVER ANIMATION HANDLERS (Exactly matching Journey section) ---
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        // Pops the sticker up from the TOP
        gsap.to(e.currentTarget.querySelector('.card-sticker'), {
            overwrite: true,
            yPercent: -80,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(1.3)"
        });

        // Lifts the card slightly and expands the shadow from 8px to 12px
        gsap.to(e.currentTarget.querySelector('.card-content'), {
            overwrite: true,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        // Drops the sticker back down behind the card
        gsap.to(e.currentTarget.querySelector('.card-sticker'), {
            overwrite: true,
            yPercent: 0,

            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in"
        });

        // Resets card back to normal (Skills original shadow is 8px)
        gsap.to(e.currentTarget.querySelector('.card-content'), {
            overwrite: true,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    return (
        <section ref={sectionRef} className="w-full px-4 sm:px-6 md:px-12 bg-[#F18961] border-b-2 border-black ">
            <div className="max-w-container py-20">

                {/* Section Header */}
                <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
                    <h2 className="text-5xl md:text-7xl font-black uppercase text-[#fffdf2] drop-shadow-[4px_4px_0px_#111111] tracking-tighter font-futura">
                        My Toolkit
                    </h2>
                    <p className="mt-4 text-lg md:text-xl font-bold text-black font-kaku bg-[#FFFF64] px-4 py-1 border-2 border-black shadow-[3px_3px_0px_#111111] rotate-1 inline-block">
                        What I use to build the web.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start md:gap-12 lg:gap-14">
                    {skillsData.map((category) => {

                        return (
                            <div
                                key={category.id}
                                className={`skill-card relative  cursor-default`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* THE STICKER (z-10 puts it behind the card content, top-4 puts it low enough to be hidden) */}
                                <div className='card-sticker absolute top-4 left-[10%] z-10 w-[30%] sm:w-[25%] md:w-[22%] aspect-square opacity-0 pointer-events-none will-change-transform'>
                                    <Image
                                        alt='sticker'
                                        src={'/ss.webp'}
                                        className='object-contain drop-shadow-md'
                                        fill
                                        sizes='(max-width: 768px) 100px, 150px'
                                    />
                                </div>

                                {/* THE CARD CONTENT (z-20 puts it in front of the sticker) */}
                                <div className={`card-content ${category.color} z-20 border-4 border-black p-3 md:p-4.5 lg:p-8 shadow-[4px_4px_0px_#111111] relative flex flex-col h-full will-change-transform`}>

                                    {/* Decorative Tape */}
                                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/70 border-2 border-black/20  backdrop-blur-sm z-30 shadow-sm`}></div>

                                    {/* Category Title */}
                                    <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-6 font-futura border-b-4 border-black/10 pb-4 inline-block w-fit">
                                        {category.title}
                                    </h3>

                                    {/* Skill Tags */}
                                    <div className="flex flex-wrap gap-3">
                                        {category.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="skill-tag px-4 py-2 text-sm sm:text-base font-bold bg-white text-black border-2 border-black rounded-sm shadow-[3px_3px_0px_#111111] cursor-crosshair"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Skills;