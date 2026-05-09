"use client";

import { useRef } from "react";
import gsap from "gsap";


interface TextProps {
  text: string;
}

export default function TextBorderAnimation({ text = "Programming" }: TextProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(lineRef.current, {
      scaleX: 1,
      transformOrigin: "left", // Anchors to the left side while growing
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: "right", // Anchors to the right side while shrinking
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden cursor-pointer group"
    >
      <span className=' font-semibold text-black wrap-break-word'>
        {text}
      </span>

      {/* Container for the line */}
      <div className="relative mt-1 h-px sm:h-1 w-full">
        {/* We only need ONE div now! */}
        <div
          ref={lineRef}
          className="absolute left-0 -mt-1.5 top-0 h-full w-full bg-black"
          style={{ transform: "scaleX(0)" }} // Initially hidden
        />
      </div>
    </div>
  );
}