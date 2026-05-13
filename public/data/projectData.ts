export interface ProjectType {
    id: number;
    name: string;
    tech: string[];
    live: string;
    img: string;
    bg: string; // Added bg property back
}

export const projectData: ProjectType[] = [
    {
        id: 3,
        name: 'MSR Portfolio',
        tech: ['React', 'Next.js', 'GSAP', 'Lenis'],
        live: 'https://portfolio-gules-chi-w96bn9yl4m.vercel.app/',
        img: '/projectImg/msrImg.PNG',
        bg: 'bg-[#f3ffe3]',
    },
    {
        id: 1,
        name: 'AniSearch',
        tech: [
            'React',
            'Next.js',
            'GSAP',
            'Framer Motion',
            'TanStack Query',
            'Lenis',
            'shadcn/ui',
            'TypeScript',
        ],
        live: 'https://anime-vault-nextjs-ts.vercel.app/',
        img: '/projectImg/anisearch.PNG',
        bg: 'bg-[#e3f2ff]', 
    },
    {
        id: 2,
        name: 'Sellora',
        tech: ['React', 'Next.js', 'GSAP', 'Framer Motion', 'TypeScript'],
        live: 'https://sellora-theta.vercel.app/',
        img: '/projectImg/sellora.PNG',
        bg: 'bg-[#fe9066]',
    },

    {
        id: 4,
        name: 'No Good Co.',
        tech: ['React', 'Next.js', 'GSAP', 'TypeScript'],
        live: 'https://no-good-co.vercel.app/',
        img: '/projectImg/nogood.PNG',
        bg: 'bg-[#fce4ec]', // Added a distinct 4th color
    }
];