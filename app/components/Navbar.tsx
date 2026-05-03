/* eslint-disable react-hooks/refs */
"use client";

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navbarData } from '@/public/data/NavbarData';
import Link from 'next/link';
import { ArrowBendUpRightIcon } from '@phosphor-icons/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.config({ force3D: true });

interface NavbarProps {
    isHeroAnimationDone: boolean;
}

const Navbar = ({ isHeroAnimationDone }: NavbarProps) => {
    const data = navbarData;
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const hamburgerTl = useRef<GSAPTimeline | null>(null);
    const modalTl = useRef<GSAPTimeline | null>(null);
    const hasEnteredRef = useRef(false);
    const [isOpen, setIsOpen] = useState(false);

    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;

    useGSAP(() => {
        if (!navbarRef.current) return;

        if (!isHeroAnimationDone && !hasEnteredRef.current) {
            gsap.set(navbarRef.current, {
                autoAlpha: 0,
                yPercent: -100,
            });
        }
    }, { scope: navbarRef, dependencies: [isHeroAnimationDone] });

    useGSAP(() => {
        // 1. Hamburger Timeline
        hamburgerTl.current = gsap.timeline({ paused: true })
            .to(".line-1", { y: 10, rotate: 45, duration: 0.3, ease: "power2.inOut" }, 0)
            .to(".line-2", { opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0)
            .to(".line-3", { y: -10, rotate: -45, duration: 0.3, ease: "power2.inOut" }, 0);

        // 2. ScrollTrigger for Floating Button
        gsap.set(".floating-hamburger", { scale: 0, autoAlpha: 0 });

        ScrollTrigger.create({
            start: "100vh top",
            onEnter: () => gsap.to(".floating-hamburger", { scale: 1, autoAlpha: 1, duration: 0.4, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(".floating-hamburger", { scale: 0, autoAlpha: 0, duration: 0.3, ease: "power2.in" }),
        });

        // 3. MatchMedia for Modal & Backdrop
        const mm = gsap.matchMedia();
        mm.add({
            isDesktop: "(min-width: 768px)",
            isMobile: "(max-width: 767px)"
        }, (context) => {
            const { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

            gsap.set(".nav-modal", { clearProps: "all", display: 'visible' });
            gsap.set(".nav-backdrop", { clearProps: "all" }); // Reset backdrop on resize

            modalTl.current = gsap.timeline({ paused: true });

            if (isDesktop) {
                // Animate backdrop and modal at the same time (using position parameter '0')
                modalTl.current
                    .to(".nav-backdrop", { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0)
                    .to(".nav-modal", {
                        autoAlpha: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "power3.out"
                    }, 0);
            }

            if (isMobile) {
                gsap.set(".nav-modal", { autoAlpha: 0, yPercent: -100 });
                modalTl.current
                    .to(".nav-backdrop", { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 0)
                    .to(".nav-modal", {
                        autoAlpha: 1,
                        yPercent: 0,
                        duration: 0.5,
                        ease: "power3.out"
                    }, 0);
            }

            if (isOpenRef.current) {
                modalTl.current.progress(1);
            }
        });

        return () => {
            mm.revert();
        };
    }, { scope: navbarRef });

    useGSAP(() => {
        if (!navbarRef.current || !isHeroAnimationDone || hasEnteredRef.current) {
            return;
        }

        hasEnteredRef.current = true;

        gsap.to(navbarRef.current, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
        });
    }, { scope: navbarRef, dependencies: [isHeroAnimationDone] });

    useGSAP(() => {
        if (hamburgerTl.current && modalTl.current) {
            if (isOpen) {
                hamburgerTl.current.play();
                modalTl.current.play();
            } else {
                hamburgerTl.current.reverse();
                modalTl.current.reverse();
            }
        }
    }, { scope: navbarRef, dependencies: [isOpen] });

    return (
        <div ref={navbarRef} className='bg-white border-b-2 border-black relative z-50'>
            {/* --- HEADER BAR --- */}
            <div className='max-w-container flex py-1 sm:py-2 justify-between items-center relative z-[60] bg-white md:bg-transparent px-4'>
                {/* LOGO */}
                <Link href={'/'} className='relative' onClick={() => setIsOpen(false)}>
                    <Image
                        src={data.logo.imgLink}
                        alt={data.logo.alt}
                        width={200}
                        height={50}
                        className='w-auto h-[60px] md:h-[70px] object-contain'
                    />
                </Link>

                {/* MAIN TOP HAMBURGER TOGGLE */}
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative p-4 sm:p-6 flex flex-col justify-center items-center bg-[#e3e3ff] rounded-full gap-1.5 cursor-pointer focus:outline-none border-black border tap-highlight-transparent ${isOpen ? 'shadow-[4px_4px_0_0_#000]' : 'shadow-none'} transition-shadow duration-300`}
                        aria-label="Toggle Menu"
                        aria-expanded={isOpen}
                    >
                        <span className="line-1 w-8 sm:w-10 h-1 bg-black rounded-full block transform origin-center will-change-transform" />
                        <span className="line-2 w-8 sm:w-10 h-1 bg-black rounded-full block will-change-opacity" />
                        <span className="line-3 w-8 sm:w-10 h-1 bg-black rounded-full block transform origin-center will-change-transform" />
                    </button>
                </div>
            </div>

            {/* --- FLOATING HAMBURGER TOGGLE --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="floating-hamburger fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[70] p-4 sm:p-6 flex flex-col justify-center items-center bg-[#e3e3ff] rounded-full gap-1.5 cursor-pointer focus:outline-none border-black border-2 tap-highlight-transparent shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all duration-300 invisible"
                aria-label="Toggle Menu Floating"
                aria-expanded={isOpen}
            >
                <span className="line-1 w-8 sm:w-10 h-1 bg-black rounded-full block transform origin-center will-change-transform" />
                <span className="line-2 w-8 sm:w-10 h-1 bg-black rounded-full block will-change-opacity" />
                <span className="line-3 w-8 sm:w-10 h-1 bg-black rounded-full block transform origin-center will-change-transform" />
            </button>

            {/* --- MODAL OVERLAY --- */}
            <div className={`fixed inset-0 z-[50] flex items-center justify-center ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

                {/* BACKDROP BLUR ELEMENT */}
                <div
                    className="nav-backdrop absolute inset-0 bg-black/10 backdrop-blur-sm invisible opacity-0"
                    onClick={() => setIsOpen(false)} // Clicking the blur closes the modal
                />

                {/* MODAL BOX */}
                <div className="nav-modal relative invisible opacity-0 md:rotate-6 bg-white w-full h-full md:w-[750px] md:h-auto md:min-h-[450px] md:rounded-xl md:shadow-[10px_10px_0_0_#000] border-black md:border-2 flex flex-col justify-center p-8 sm:p-12 overflow-y-auto will-change-transform">
                    <h2 className="text-center font-extrabold text-2xl mb-10 uppercase font-syne">
                        Menu
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
                        {data.links.map((item) => (
                            <Link
                                key={item.id}
                                href={item.link}
                                onClick={() => setIsOpen(false)}
                                className="group relative flex items-center pb-4 border-b border-black border-dashed overflow-hidden"
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget.querySelector('.nav-text'), { x: 40, duration: 0.7, ease: 'power3.out', color: 'crimson' });
                                    gsap.to(e.currentTarget.querySelector('.nav-icon'), { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power3.out', color: 'crimson' });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget.querySelector('.nav-text'), { x: 0, duration: 0.7, ease: 'power3.out', color: 'black' });
                                    gsap.to(e.currentTarget.querySelector('.nav-icon'), { autoAlpha: 0, x: -20, duration: 0.7, ease: 'power3.out', color: 'black' });
                                }}
                            >
                                <span className="nav-icon absolute left-0 opacity-0 -translate-x-5 text-2xl flex items-center justify-center will-change-transform">
                                    <ArrowBendUpRightIcon />
                                </span>
                                <span className="nav-text relative text-2xl sm:text-3xl font-black uppercase tracking-wide will-change-transform">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
