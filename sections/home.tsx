'use client';
import Navbar from '@/app/components/Navbar';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import Hero from './hero';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register the hook
gsap.registerPlugin(useGSAP);
gsap.config({ force3D: true });

const Home = () => {
    const [heroAnimationDone, setHeroAnimationDone] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);


    const handleHeroAnimationDone = useCallback(() => {
        setHeroAnimationDone(true);
    }, []);

    useGSAP(() => {

        gsap.set(containerRef.current, {
            autoAlpha: 1
        })
        if (heroAnimationDone) {


            // 1. Initial Illustration Pop-in & Float
            gsap.fromTo('.illustration',
                {
                    scale: 0.5,
                    autoAlpha: 0,
                },
                {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.5)',
                }
            );


            gsap.fromTo('.scroll-indicator',
                {
                    y: 20,
                    autoAlpha: 0
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    delay: 0.6,
                    ease: 'power3.out',
                    onComplete: () => {

                        gsap.fromTo('.scroll-dot',
                            {
                                y: 0,

                            },
                            {
                                y: 12,
                                yoyo: true,
                                duration: 1.5,
                                repeat: -1,
                                ease: 'none'
                            }
                        );
                    }
                }
            );
        }
    }, {
        scope: containerRef,
        dependencies: [heroAnimationDone]
    });

    return (
        <div ref={containerRef} className='h-svh relative w-full flex flex-col overflow-hidden invisible'>
            <Navbar isHeroAnimationDone={heroAnimationDone} />
            <div className='relative z-10 h-full'>
                <Hero onAnimationComplete={handleHeroAnimationDone} />
            </div>

            {/* Illustration 1 */}
            <div className='illustration invisible opacity-0 absolute z-5 top-[20%] right-[5%]'>
                <Image alt='img' src='/images/illu1.webp' height={200} width={200} className={`h-auto w-[150px] sm:w-[180px] md:w-[250px]`} />
            </div>


            {/* Illustration 2 */}
            <div className='illustration invisible z-5 opacity-0 absolute bottom-[30%] left-[5%]'>
                <Image alt='img' src='/images/illu4.webp' height={200} width={200} className='h-auto w-[80px] sm:w-[120px] md:w-[150px]' />
            </div>

            {/* Scroll Indicator built with Tailwind */}
            <div className='scroll-indicator invisible opacity-0 absolute bottom-8 sm:bottom-10 -right-[2%] sm:left-[10%] will-change-transform   -translate-x-1/2 flex flex-col items-center gap-2 z-20'>
                <span className='text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black'>
                    Scroll
                </span>
                {/* The Mouse Outline */}
                <div className='w-6 h-10 border-2 border-black rounded-full flex justify-center p-1.5'>
                    {/* The Scrolling Dot */}
                    <div className='scroll-dot w-1 h-2.5 bg-black rounded-full' />
                </div>
            </div>
        </div>
    );
};

export default Home;