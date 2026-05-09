/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Home from '@/sections/home';
import Projects from '@/sections/projects';
import ParallaxImageSection from './ParalaxBg';
import AboutMe from '@/sections/aboutMe';
import Journey from '@/sections/Journey';
import Skills from '@/sections/Skills';
import IntroOverlay from './IntroOverlay';
import ContactPage from './contact/test';
import ContactMain from '@/sections/ContactMain';

const INTRO_SESSION_KEY = 'portfolio-intro-played';

const PortfolioPageClient = () => {
    // 1. Add a mounted state to track when we are safely on the client
    const [mounted, setMounted] = useState(false);
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    const [shouldPlayIntro, setShouldPlayIntro] = useState(false);

    useEffect(() => {
        // 2. Read sessionStorage ONLY after hydration completes
        const hasPlayedIntro = sessionStorage.getItem(INTRO_SESSION_KEY) === 'true';

        if (hasPlayedIntro) {
            setIsIntroComplete(true);
        } else {
            setShouldPlayIntro(true);
        }

        // 3. Signal that it is safe to render the real content
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        document.body.style.overflow = isIntroComplete ? '' : 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isIntroComplete, mounted]);

    const handleIntroComplete = useCallback(() => {
        setIsIntroComplete(true);
        setShouldPlayIntro(false);
        sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    }, []);

    // 4. PREVENT HYDRATION MISMATCH
    // Render a blank screen with your site's background color on the server and first client pass.
    // This perfectly matches, preventing errors, and avoids flashing unstyled content.
    if (!mounted) {
        return <div className="min-h-screen bg-background" />;
    }

    return (
        <div className='font-neulis'>
            {!isIntroComplete && (
                <IntroOverlay shouldPlay={shouldPlayIntro} onComplete={handleIntroComplete} />
            )}

            <div id='home'>
                <Home isIntroComplete={isIntroComplete} />
            </div>

            <div id='projects' className='relative z-10'>
                <Projects />
            </div>
            <div>
                <ParallaxImageSection />
            </div>
            <div id='about' className='relative z-10 min-h-screen bg-background border-y-2'>
                <AboutMe />
                <Journey />
            </div>
            <div id='skills'>
                <Skills />
            </div>
            <div id='contact'>
                <ContactMain />
            </div>
        </div>
    );
};

export default PortfolioPageClient;