
import React from 'react';

import Home from '@/sections/home';
import Projects from '@/sections/projects';

import ParallaxImageSection from './components/ParalaxBg';
import AboutMe from '@/sections/aboutMe';
import Journey from '@/sections/Journey';
import Skills from '@/sections/Skills';

const page = () => {
  return (
    <div className='font-neulis'>
      <div id='home' >
        <Home />
      </div>

      <div id='projects' className='relative z-10'>
        <Projects />
      </div>
      <div >
        <ParallaxImageSection />
      </div>
      <div className='relative z-10 min-h-screen bg-background border-y-2'>
        <AboutMe />
        <Journey />
      </div>
      <div>
        <Skills/>
      </div>


    </div>
  );
};

export default page;