import Image from 'next/image';
import React from 'react';

const ParallaxImageSection = () => {
    return (
        <section className="relative h-screen w-full [clip-path:inset(0_0_0_0)]">
            {/* 
                The image container is fixed to the viewport.
                Because of the clip-path on the parent, this fixed container 
                is only visible when the parent section is scrolled into view.
            */}
            <div className="fixed inset-0 w-full h-full -z-10">
                <Image
                    src="/paralax.webp"
                    alt="Section Divider Background"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority={false}
                />

                {/* Optional: A subtle dark overlay just in case you want to overlay text later */}
                <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            </div>

            {/* Optional Content Container */}
            {/* If you want text inside this section, put it here. Otherwise, leave it empty. */}
            <div className="flex h-full w-full items-center justify-center">
                {/* <h2 className="text-white text-5xl font-bold">Your Text Here</h2> */}
            </div>
        </section>
    );
};

export default ParallaxImageSection;