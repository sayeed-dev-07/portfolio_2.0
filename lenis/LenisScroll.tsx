/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// 1. Type the Context
const LenisContext = createContext<Lenis | null>(null);

// 2. Type the return value of the custom hook
export const useLenis = (): Lenis | null => useContext(LenisContext);

// 3. Define the props interface for the Provider
interface LenisProviderProps {
    children: ReactNode;
}


export const LenisProvider = ({ children }: LenisProviderProps) => {
    // 4. Type the state
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {

        const instance = new Lenis({
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.5,
            touchMultiplier: 1.5,
            smoothTouch: true
        } as any);

        setLenis(instance);

        instance.on('scroll', ScrollTrigger.update);

        // 5. Type the time parameter for GSAP ticker
        const update = (time: number) => {
            instance.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            instance.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
};