"use client";

import React, { useRef } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "@/app/components/ProjectCard";
import { projectData } from "@/public/data/projectData";



gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.config({ force3D: true });



const Projects = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const stickerRef = useRef<HTMLDivElement | null>(null);



    useGSAP(() => {
        // We initialize GSAP matchMedia to handle responsive animations
        const mm = gsap.matchMedia();

        // The sticker animation runs everywhere
        gsap.to(stickerRef.current, {
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            x: 0,
            y: 0,
            ease: "back.out(1.5)",
            scrollTrigger: {
                trigger: stickerRef.current,
                start: "top 90%",
            },
        });

        // The card pinning animation ONLY runs on devices 768px (md) and wider
        mm.add("(min-width: 768px)", () => {
            const cards = gsap.utils.toArray<HTMLElement>(".project-card");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${projectData.length * 100}%`,
                    scrub: 1,
                    pin: true,
                },
            });

            cards.forEach((card, index) => {
                if (index === 0) return;

                tl.fromTo(
                    card,
                    { yPercent: 100 },
                    { yPercent: 0, ease: "none" }
                );
            });
        });

        // MatchMedia automatically cleans up event listeners and inline styles when breakpoints change
    }, { scope: containerRef });

    return (
        <section className="border-y-2">
            <div className="relative flex items-center justify-center py-8">
                <div
                    ref={stickerRef}
                    className="absolute top-[50%] right-[2%] z-40 aspect-square w-[25vw] scale-50 -translate-x-[15vw] -translate-y-[8vh] opacity-0 sm:top-[20%] sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
                >
                    <Image src="/ufo.png" alt="projectIcon" fill className="object-contain" />
                </div>

                <div className="w-[90vw] sm:w-[80vw] md:w-[50vw] lg:w-[30vw]">
                    <svg
                        className="h-auto w-full"
                        width={900}
                        height={200}
                        viewBox="0 0 900 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="100%"
                            height="100%"
                            fill="none"
                        />

                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                                    .letter {
                                        font-family: "Comic Sans MS", "Baloo", cursive;
                                        font-size: 110px;
                                        font-weight: bold;
                                        stroke: #111;
                                        stroke-width: 6;
                                        stroke-linejoin: round;
                                        paint-order: stroke fill;
                                    }
                                `,
                            }}
                        />

                        <text
                            x={20}
                            y={140}
                            className="letter"
                            fill="#e74c3c"
                            transform="rotate(-5 20 140)"
                        >
                            P
                        </text>

                        <text
                            x={110}
                            y={140}
                            className="letter"
                            fill="#3498db"
                            transform="rotate(4 110 140)"
                        >
                            R
                        </text>

                        <text
                            x={200}
                            y={140}
                            className="letter"
                            fill="#2ecc71"
                            transform="rotate(-3 200 140)"
                        >
                            O
                        </text>

                        <text
                            x={290}
                            y={140}
                            className="letter"
                            fill="#f1c40f"
                            transform="rotate(6 290 140)"
                        >
                            J
                        </text>

                        <text
                            x={370}
                            y={140}
                            className="letter"
                            fill="#e67e22"
                            transform="rotate(-4 370 140)"
                        >
                            E
                        </text>

                        <text
                            x={450}
                            y={140}
                            className="letter"
                            fill="#1abc9c"
                            transform="rotate(3 450 140)"
                        >
                            C
                        </text>

                        <text
                            x={540}
                            y={140}
                            className="letter"
                            fill="#9b59b6"
                            transform="rotate(-2 540 140)"
                        >
                            T
                        </text>

                        <text
                            x={620}
                            y={140}
                            className="letter"
                            fill="#e74c3c"
                            transform="rotate(5 620 140)"
                        >
                            S
                        </text>
                    </svg>
                </div>
            </div>

            {/* Changed from h-svh to md:h-svh so mobile can scroll freely */}
            <div
                ref={containerRef}
                className="relative h-auto  md:h-svh projectContainer"
            >
                {projectData.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        className="project-card"
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;