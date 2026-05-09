'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

gsap.config({
    force3D: true
})

const journeyData = [
    {
        id: 1,
        title: "Frontend Developer (Paid Intern)",
        organization: "MSR Creation",
        duration: "Nov 2025 — Present",
        description: "Currently working on project-based tasks, building responsive and highly optimized UI components in a fast-paced environment.",
        status: "Ongoing",
        badgeColor: "bg-[#e2f0cb]",
        cardColor: "bg-[#fffdf2]"
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        organization: "Bd Calling It.",
        duration: "Aug 2025 — Nov 2025",
        description: "Developed and maintained responsive user interfaces using React and TailwindCSS.",
        status: "Completed",
        badgeColor: "bg-[#cbf0f8]",
        cardColor: "bg-[#fffdf2]"
    },
    {
        id: 3,
        title: "Full-Stack Course",
        organization: "The Odin Project",
        duration: "2025 — Ongoing",
        description: "Following a full-stack open-source curriculum to strengthen problem-solving skills, clean code practices, and modern web development.",
        status: "Ongoing",
        badgeColor: "bg-[#ffb7b2]",
        cardColor: "bg-[#fffdf2]"
    },
    {
        id: 4,
        title: "Diploma in CST",
        organization: "Rangpur Polytechnic Institute",
        duration: "2022 — 2025",
        description: "Built strong fundamentals in software engineering, data structures, algorithms, and problem-solving.",
        status: "Completed",
        badgeColor: "bg-[#e0e0e0]",
        cardColor: "bg-[#fffdf2]"
    },
];

const Journey = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(".journey-card");

        // Initial scroll-in entrance animation
        gsap.fromTo(
            cards,
            {
                y: 100,
                opacity: 0,
                // rotation: () => gsap.utils.random(-10, 10)
            },
            {
                y: 0,
                opacity: 1,
                // rotation: (index, target) => {
                //     return target.classList.contains('rotate-left') ? -2 : 2;
                // },
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );
    }, { scope: sectionRef });

    // Hover Animation Handlers
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {

        gsap.to(e.currentTarget.querySelector('.card-sticker'), {
            overwrite: true,
            yPercent: -80,
            rotation: 12,
            autoAlpha: 1,
            duration: 0.5,
            ease: "back.out(1.3)"
        });


    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        // Drop the sticker back down behind the card
        gsap.to(e.currentTarget.querySelector('.card-sticker'), {
            overwrite: true,
            yPercent: 0,
            rotation: 0,
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.in"
        });


        gsap.to(e.currentTarget.querySelector('.card-content'), {
            y: 0,
            x: 0,
            overwrite: true,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-[#f4f1eb] border-black overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute left-2 top-20 w-20 sm:w-28 md:w-36 aspect-square  rotate-12">
                    <Image
                        alt=""
                        src="/images/crab.png"
                        fill
                        className="object-contain drop-shadow-[3px_3px_0px_rgba(241,137,97,0.35)]"
                        sizes="(max-width: 768px) 80px, 144px"
                    />
                </div>
                <div className="absolute right-0 bottom-0
                 w-24 sm:w-30 md:w-40 aspect-square -rotate-6">
                    <Image
                        alt=""
                        src="/images/birdBig.png"
                        fill
                        className="object-contain drop-shadow-[4px_4px_0px_rgba(17,17,17,0.2)]"
                        sizes="(max-width: 768px) 128px, 224px"
                    />
                </div>
                <div className="absolute bottom-12 left-[8%] hidden md:block w-32 aspect-square opacity-30 -rotate-12">
                    <Image
                        alt=""
                        src="/images/illu9.webp"
                        fill
                        className="object-contain"
                        sizes="128px"
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-container py-20">

                {/* Section Header */}
                <div className="mb-12  md:mb-16 flex flex-col items-center text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase text-black drop-shadow-[3px_3px_0px_#F18961] tracking-tighter font-futura">
                        My Journey
                    </h2>
                    <p className="mt-4 text-lg md:text-xl font-bold text-black font-kaku bg-[#E2F0CB] px-4 py-1 border-2 border-black shadow-[3px_3px_0px_#111111] rotate-1 inline-block">
                        Education, internships, and the continuous pursuit of mastering the web.
                    </p>
                    {/* <p className="mt-4 text-lg md:text-xl font-medium text-black/70 max-w-2xl">
                        
                    </p> */}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
                    {journeyData.map((item) => {
                        // const isEven = index % 2 === 0;
                        // const rotationClass = isEven ? "rotate-left md:-rotate-2" : "rotate-right md:rotate-2";

                        return (
                            <div
                                key={item.id}
                                className={`relative journey-card  cursor-default`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* THE STICKER (z-10 puts it behind the card content, top-4 puts it low enough to be hidden) */}
                                <div className='card-sticker absolute top-4 right-[10%] z-10 w-[30%] sm:w-[25%] md:w-[22%] aspect-square opacity-0 pointer-events-none will-change-transform'>
                                    <Image
                                        alt='sticker'
                                        src={'/hoverCat.webp'}
                                        className='object-contain drop-shadow-md'
                                        fill
                                        sizes='(max-width: 768px) 100px, 150px'
                                    />
                                </div>

                                {/* THE CARD CONTENT (z-20 puts it in front of the sticker) */}
                                <div className={`card-content ${item.cardColor} z-20 border-4 border-black p-3.5 sm:p-5.5 md:p-8 shadow-[4px_4px_0px_#111111] relative flex flex-col h-full will-change-transform`}>

                                    {/* Tape Element */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 md:w-24 md:h-8 bg-white/60 border-2 border-black/20 rotate-3 backdrop-blur-sm z-30 shadow-sm"></div>

                                    {/* Top Row: Status Badge & Duration */}
                                    <div className="flex justify-between items-start mb-6 flex-wrap gap-y-2.5">
                                        <span className={`${item.badgeColor} px-3 py-1 border-2 border-black font-bold text-xs md:text-sm shadow-[2px_2px_0px_#111111] uppercase tracking-wider`}>
                                            {item.status}
                                        </span>
                                        <span className="font-mono text-sm md:text-base font-bold bg-black text-white px-2 py-1 rotate-1">
                                            {item.duration}
                                        </span>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-grow">
                                        <h3 className="text-2xl md:text-3xl font-black text-black leading-tight mb-2">
                                            {item.title}
                                        </h3>
                                        <h4 className="text-lg md:text-xl font-bold text-[#F18961] mb-4 uppercase tracking-tight">
                                            @ {item.organization}
                                        </h4>
                                        <p className="text-base md:text-lg font-medium text-black/80 leading-relaxed">
                                            {item.description}
                                        </p>
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

export default Journey;
