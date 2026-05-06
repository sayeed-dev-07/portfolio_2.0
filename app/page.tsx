
import React from 'react';

import Home from '@/sections/home';
import Projects from '@/sections/projects';
import Image from 'next/image';
import ParallaxImageSection from './components/ParalaxBg';

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

      </div>

    </div>
  );
};

export default page;