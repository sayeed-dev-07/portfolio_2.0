"use client";

import React, { useRef } from 'react';
import DetailsButton from './Button';
import Image from 'next/image';

// GSAP Imports
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

// Assuming ProjectType is exported from your data file
import { ProjectType } from '@/public/data/projectData';

gsap.config({
    force3D: true
});

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

if (typeof window !== "undefined") {
    CustomEase.create("customCurve", "0.05, 0.71, 0.12, 0.99");
}

interface ProjectCardProps {
    project: ProjectType;
    index: number;
    className?: string;
}

const ProjectCard = ({ project, index, className = '' }: ProjectCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            imageContainerRef.current,
            {
                clipPath: "inset(100% 0% 0% 0%)"
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.2,
                ease: "customCurve",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    pinnedContainer: ".projectContainer",
                }
            }
        );
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className={`
            ${className} 
            ${project.bg} /* Reverted back to using the data's background color */
            border-b-2 md:border-b-0 md:border-l-2 h-auto  will-change-transform 
            border-t-2 
            [--tab-size:3rem] md:[--tab-size:4rem]
            
            /* Mobile: Relative blocks that naturally stack on top of each other. Full width/height. */
            relative w-full 
            
            /* Desktop: Absolute positioning, full height, calculated width to create the visual stack */
            md:absolute md:top-0 md:left-0 md:h-full md:w-[calc(100%-var(--dynamic-offset))]
            `}
            style={{
                zIndex: index,
                '--dynamic-offset': `calc(${index} * var(--tab-size))`
            } as React.CSSProperties}
        >
            {/* Flex row is used for ALL screen sizes so the tab is always on the right */}
            <div className='flex flex-row h-full w-full relative'>
                {/* sticker  */}
                <div
                    className="absolute top-[10%] right-[2%] z-40 aspect-square w-[25vw]  -translate-x-[15vw] -translate-y-[8vh]  sm:top-[20%] sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
                >
                    <Image src="/images/illu6.webp" alt="projectIcon" fill className="object-contain" />
                </div>
                <div
                    className="absolute md:bottom-2 -bottom-[10%] right-[2%] z-40 aspect-square   -translate-x-[15vw] -translate-y-[8vh]    sm:w-[10vw] w-[15vw] md:w-[5vw]"
                >
                    <Image src="/images/illu2.webp" alt="projectIcon" fill className="object-contain" />
                </div>

                {/* MAIN CONTENT AREA */}
                <div className="flex-1 py-10 flex flex-col justify-center max-w-container relative z-50 p-2.5 md:p-12 xl:p-16 overflow-hidden">
                    <h3 className="text-3xl md:text-6xl font-bold mb-3 md:mb-6 font-kaku shrink-0 text-black">
                        {project.name}
                    </h3>

                    {/* Tech stack tags */}

                    <div className="mb-6 md:mb-10 max-w-xl flex flex-wrap gap-3 shrink-0">
                        {project.tech.map((techItem, i) => {

                            const tilt = i % 2 === 0 ? '-rotate-2' : 'rotate-2';

                            return (
                                <span
                                    key={i}
                                    className={`px-3 py-1.5 text-xs md:text-sm font-bold uppercase tracking-wider bg-[#fffaf0] text-black border-2 border-black ${tilt} hover:rotate-0 hover:scale-105 transition-all duration-200 cursor-default`}
                                >
                                    {techItem}
                                </span>
                            );
                        })}
                    </div>

                    <div
                        ref={imageContainerRef}
                        className="w-full max-w-2xl h-[30vh] md:h-[50vh] bg-black/5 mb-6 md:mb-8 flex items-center justify-center overflow-hidden border  shadow-xl relative shrink-0"
                    >
                        <Image
                            alt={`${project.name} preview`}
                            fill
                            src={project.img}
                            loading='eager'
                            sizes='(max-width: 768px) 100vw, 50vw'
                            className='object-top object-cover'
                        />
                    </div>

                    <div className="pb-4 md:pb-0 shrink-0">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <DetailsButton text='View Project' />
                        </a>
                    </div>
                </div>

                {/* THE TAB SECTION */}
                <div className="w-[var(--tab-size)] h-auto border-l-2  flex items-center justify-center shrink-0 bg-black/5 text-black">
                    <span className="text-lg md:text-2xl font-bold tracking-widest uppercase [writing-mode:vertical-rl]">
                        {project.name}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;