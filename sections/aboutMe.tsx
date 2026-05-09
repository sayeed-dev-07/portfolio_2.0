'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Image from 'next/image';
import StickerAnimation from '@/app/components/StickerAnimation';

gsap.registerPlugin(ScrollTrigger);
gsap.config({
    force3D: true
});

const AboutMe = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const stickerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Main entrance timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        });

        // 1. Bouncy entrance for the big heading
        tl.fromTo(".about-heading",
            { y: 50, opacity: 0, rotate: -10 },
            { y: 0, opacity: 1, rotate: -4, duration: 0.8, ease: "power2.out" }
        );

        // 2. Slide in the text below the heading
        tl.fromTo(".intro-text",
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
            "-=0.4"
        );

        // 3. Drop in the bio card like a piece of paper
        tl.fromTo(cardRef.current,
            { y: -50, opacity: 0, rotate: 5 },
            { y: 0, opacity: 1, rotate: 2, duration: 0.8, ease: "back.out(1.2)" },
            "-=0.4"
        )
            .to(stickerRef.current, {
                opacity: 1,
                scale: 1.3,
                duration: 0.5,
                ease: "back.out(1.2)"
            })

    }, { scope: containerRef });

    return (
        // Adjusted padding: py-12 on mobile, py-20 on larger screens
        <section ref={containerRef} className="relative w-full py-[5%] bg-[#fe9066] flex items-center justify-center border-b-2 border-black overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute right-0 lg:-left-8 top-40 lg:top-14 w-28 sm:w-36 md:w-48 aspect-square -rotate-12">
                    <Image
                        alt=""
                        src="/images/star.png"
                        fill
                        className="object-contain drop-shadow-[4px_4px_0px_rgba(17,17,17,0.25)]"
                        sizes="(max-width: 768px) 112px, 192px"
                    />
                </div>
                <StickerAnimation imgLink='/images/fish.png' style='absolute right-3 top-8 w-20 sm:w-28 md:w-36 aspect-square  rotate-12' />
                <div className="absolute bottom-4 left-[42%] hidden sm:block w-24 md:w-32 aspect-square  rotate-6">
                    <Image
                        alt=""
                        src="/images/bird.svg"
                        fill
                        className="object-contain"
                        sizes="128px"
                    />
                </div>
            </div>

            {/* Adjusted gap: gap-10 on mobile, gap-16 on larger screens */}
            <div className="relative max-w-container py-12 md:py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10">

                {/* Left Column: Heading and Intro */}
                <div className="flex flex-col items-start space-y-4 md:space-y-6">
                    <div className="inline-block relative">
                        {/* Scaled text slightly better for extra small screens */}
                        <h2 className="about-heading text-[2.5rem] leading-[0.9] xs:text-5xl sm:text-6xl lg:text-[7rem] font-black uppercase text-[#fffdf2] sm:drop-shadow-[6px_6px_0px_#111111] drop-shadow-[2px_2px_0px_#111111] tracking-tighter font-futura will-change-transform">
                            About <br /> Me.
                        </h2>
                    </div>

                    {/* Scaled intro text down for mobile to prevent overflow */}
                    <h3 className="intro-text will-change-transform text-2xl sm:text-3xl md:text-5xl font-bold text-black mt-2 sm:mt-4 font-kaku leading-tight">
                        Hi, I&apos;m <br className="md:hidden" />
                        {/* Added whitespace-nowrap so your name doesn't break into two lines in the box */}
                        <span className="text-[#F18961] bg-[#fffdf2] px-2 py-1 rotate-2 inline-block font-futura shadow-[4px_4px_0px_#111111] whitespace-nowrap mt-2 md:mt-0">
                            Sayeed Shorif
                        </span>
                    </h3>
                </div>

                {/* Right Column: The Scrapbook Bio Card */}
                <div className="w-full max-w-xl mx-auto lg:mx-0 mt-4 md:mt-0 relative">


                    <div ref={stickerRef} className='absolute top-0 right-0 z-50 w-[25%] sm:w-[20%] md:w-[18%] aspect-square translate-x-[30%] scale-50 opacity-0 -translate-y-[30%] pointer-events-none'>
                        <Image
                            alt='sticker'
                            src={'/1.webp'}
                            className='object-contain drop-shadow-md'
                            fill
                            sizes='(max-width: 768px) 100px, 150px'
                        />
                    </div>

                    <div
                        ref={cardRef}
                        className="bg-[#fffdf2] will-change-transform border-4 border-black p-5 sm:p-8 md:p-12 shadow-[6px_6px_0px_#111111] sm:shadow-[12px_12px_0px_#111111] relative"
                    >
                        {/* Scaled the tape down on mobile (w-24 h-8) and up on sm+ (sm:w-32 sm:h-10) */}
                        <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 w-24 h-8 sm:w-32 sm:h-10 bg-white/90 border-2 border-black/80 rotate-[-4deg] z-20 shadow-sm"></div>

                        <p className="text-base sm:text-lg md:text-2xl font-medium leading-relaxed text-black/90">
                            I am a highly motivated <strong className="text-black font-black">Frontend Developer</strong> with a deep passion for bringing static designs to life.
                        </p>

                        <p className="text-base sm:text-lg md:text-2xl font-medium leading-relaxed text-black/90 mt-4 md:mt-6">
                            My absolute favorite hobby is crafting
                            <span className="bg-[#F18961] px-2 py-0.5 border border-black font-bold -rotate-2 inline-block mx-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                                playful UIs
                            </span>
                            and interactive web experiences. I love experimenting with different animation libraries to make the web feel more human.
                        </p>

                        <p className="text-base sm:text-lg md:text-2xl font-medium leading-relaxed text-black/90 mt-4 md:mt-6">
                            Beyond just making things look cool, I am obsessed with building <strong className="text-black font-black underline decoration-[crimson] decoration-[3px] md:decoration-4 underline-offset-3">responsive and highly optimized</strong> animations that run flawlessly across all kinds of devices.
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;
