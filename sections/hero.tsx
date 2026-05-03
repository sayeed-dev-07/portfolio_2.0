'use client'
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

// Register the GSAP React hook
gsap.registerPlugin(useGSAP, SplitText);

gsap.config({ force3D: true })

interface HeroProps {
    onAnimationComplete?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAnimationComplete }) => {
    // Strongly type the refs to HTMLDivElement
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const leftContentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    // --> ADDED: Ref for the name content container
    const nameContentRef = useRef<HTMLDivElement>(null);

    const hasCompletedRef = useRef(false);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        let splitText: SplitText | null = null;
        let tl: GSAPTimeline | null = null;
        let isActive = true;

        document.fonts.ready.then(() => {
            if (!isActive || !lineRef.current || !leftContentRef.current || !textRef.current || !nameContentRef.current) return;

            splitText = new SplitText(textRef.current, {
                type: 'words, lines',
                mask: 'lines'
            })

            const timeline = gsap.timeline({
                defaults: { ease: 'power4.out', duration: 1.2 },
                onComplete: () => {
                    if (hasCompletedRef.current) return;
                    hasCompletedRef.current = true;
                }
            });
            tl = timeline;

            mm.add({
                isMobile: "(max-width: 639px)",
                isDesktop: "(min-width: 640px)",
            }, (context) => {
                const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };

                timeline.fromTo(lineRef.current,
                    isMobile
                        ? { scaleX: 0, transformOrigin: 'left' }
                        : { scaleY: 0, transformOrigin: 'top' },
                    isMobile
                        ? { scaleX: 1 }
                        : { scaleY: 1 }
                );
            });

            timeline
                // 1. Staggered PortFolio Text reveal overlaps with the main line
                .fromTo(splitText.words,
                    { yPercent: 105 },
                    { yPercent: 0, stagger: 0.15 },
                    "-=0.8"
                )

                // 2. Left side details stagger in (Removed onComplete from here)
                .fromTo(leftContentRef.current.children,
                    { autoAlpha: 0, x: 20 },
                    { autoAlpha: 1, x: 0, stagger: 0.2, duration: 0.8 },
                    "-=0.9"
                )


                .fromTo(".drawn-border",
                    { clipPath: "inset(0% 100% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 0.9,
                        ease: 'sine.inOut',
                        onComplete: () => onAnimationComplete?.()
                    }, '<'
                )
        })

        return () => {
            isActive = false;
            tl?.kill();
            mm.revert();
            splitText?.revert();
        };

    }, { scope: containerRef });

    return (
        <div
            className="w-full h-full flex items-end justify-end max-w-container py-4"
            ref={containerRef}
        >
            <div className="flex font-neulis items-stretch gap-6 md:gap-8 sm:flex-row flex-col">

                {/* Left side: Personal Details */}
                <div
                    ref={leftContentRef}
                    className="flex flex-col justify-end text-right pb-3 md:pb-5"
                >

                    <div ref={nameContentRef} className="relative inline-block ml-auto pb-2">
                        <p className="text-lg md:text-xl font-bold">Sayeed Shorif</p>

                        {/* --> ADDED: SVG hand-drawn line, positioned absolutely below name */}
                        <div className="drawn-border absolute bottom-0 right-0 h-[6px] w-[95%] -translate-y-1">
                            {/* Jagged, sketch path line design */}
                            <svg
                                viewBox="0 0 250 10"
                                preserveAspectRatio="none"
                                className="w-full h-full fill-none stroke-[#e26d5c] stroke-[4px] stroke-round"
                            >
                                <path d="M5,5 C20,2 35,8 50,5 C65,2 80,8 95,5 C110,2 125,8 140,5 C155,2 170,8 185,5 C200,2 215,8 230,5 C240,2 248,8 250,5" />
                            </svg>
                        </div>
                    </div>

                    <div className="mt-3 md:mt-4 text-sm md:text-base text-gray-600">
                        <p>Web Developer</p>
                        <p>& Web Designer</p>
                    </div>

                    <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-500">2026</p>
                </div>

                {/* Vertical Divider Line */}
                <div
                    ref={lineRef}
                    className="h-[2px] w-full sm:h-auto sm:w-[2px] bg-black shrink-0  my-2 md:my-3"
                />

                {/* Right side: Stacked PORTFOLIO text */}
                <div className="text-[4rem] px-1 sm:text-[8rem] md:text-[11rem] font-black leading-[0.8]  flex flex-col uppercase font-kaku ">
                    <p ref={textRef}>
                        Port <br /> Folio
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Hero;