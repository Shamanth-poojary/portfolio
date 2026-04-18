"use client";

import { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Fallback Mock Data in case the database is empty or not yet connected.
const MOCK_PROJECTS = [
  {
    _id: "m1",
    name: "Pulse Dashboard",
    desc: "A real-time analytics platform with live data visualization, custom chart components, and role-based access for enterprise teams.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2024",
    bgGradient: "linear-gradient(135deg,#1a0d04 0%,#2d1508 50%,#1a0d04 100%)",
    imageBase64: "", // No image, will fallback to icon
    icon: <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(232,98,26,0.5)" strokeWidth="1"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  },
  {
    _id: "m2",
    name: "Orbit SaaS",
    desc: "A subscription management platform with tiered pricing, usage analytics, and automated billing flows.",
    tags: ["Next.js", "TypeScript"],
    year: "2024",
    bgGradient: "linear-gradient(135deg,#040d1a 0%,#082030 50%,#040d1a 100%)",
    imageBase64: "",
    icon: <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(97,219,251,0.5)" strokeWidth="1"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="4"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
  },
  {
    _id: "m3",
    name: "Folio CMS",
    desc: "A headless content management system with drag-and-drop editor and multi-channel publishing.",
    tags: ["React", "Firebase"],
    year: "2023",
    bgGradient: "linear-gradient(135deg,#04100a 0%,#082418 50%,#04100a 100%)",
    imageBase64: "",
    icon: <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(104,160,99,0.5)" strokeWidth="1"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
  },
  {
    _id: "m4",
    name: "Stack API",
    desc: "A developer-first REST API platform with live docs, rate limiting, and SDK generation for integrations.",
    tags: ["Vue.js", "PostgreSQL"],
    year: "2023",
    bgGradient: "linear-gradient(135deg,#100a04 0%,#241808 50%,#100a04 100%)",
    imageBase64: "",
    icon: <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(240,219,79,0.5)" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  }
];

const fetcher = (url: string) => fetch(url, { cache: 'no-store' }).then((res) => res.json());

export function Work() {
  const [isSliderView, setIsSliderView] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isSliderView) return;

    let velocity = 0;
    let rafId: number | null = null;
    let lastTime = 0;

    const MAX_VELOCITY = 50;
    const FRICTION = 0.92;
    const ACCELERATION = 0.5;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      velocity *= FRICTION;

      if (Math.abs(velocity) < 0.05) {
        velocity = 0;
        rafId = null;
        
        // RE-ENABLE CSS SNAPPING when movement stops
        container.style.scrollSnapType = 'x mandatory';
        return;
      }

      container.scrollLeft += velocity * (delta / 16);
      rafId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      // DISABLE CSS SNAPPING while physics are active
      container.style.scrollSnapType = 'none'; 
      
      if (rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow native horizontal scroll via trackpad
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      const isAtStart = container.scrollLeft <= 0;
      const isAtEnd = Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 1;

      // Allow native vertical scroll at boundaries
      if ((e.deltaY < 0 && isAtStart) || (e.deltaY > 0 && isAtEnd)) {
        return;
      }

      e.preventDefault();

      velocity += e.deltaY * ACCELERATION;
      velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));

      startAnimation();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isSliderView]);
  
  const { data: dbProjects, isLoading: loading } = useSWR("/api/projects", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const toggleView = (slider: boolean) => {
    setIsSliderView(slider);
    setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const sourceProjects = Array.isArray(dbProjects) && dbProjects.length > 0 ? dbProjects : MOCK_PROJECTS;
  const hasMoreProjects = sourceProjects.length > 3;
  const displayProjects = isSliderView ? sourceProjects : sourceProjects.slice(0, 3);

  return (
    <section id="work" className="py-20 lg:py-24 px-8 lg:px-24 flex flex-col justify-center overflow-visible">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-brand font-body font-medium mb-2.5">
              Selected projects
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-none text-text-main flex items-center gap-4">
              My <span className="text-brand">Work</span>
              {loading && <span className="text-sm font-normal text-text-muted animate-pulse">Loading DB...</span>}
            </h2>
          </div>
          
          <AnimatePresence>
            {isSliderView && (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => toggleView(false)}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-text-main transition-colors mb-2 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Grid
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          ref={scrollContainerRef}
          layout
          className={cn(
            // Added will-change-scroll for hardware acceleration
            "w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gap-6 will-change-[scroll-position]",
            isSliderView 
              // Added touch-pan-x for better mobile trackpad support
              ? "flex overflow-x-auto snap-x snap-mandatory pt-2 pb-12 items-stretch min-h-[380px] [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden touch-pan-x" 
              : "grid grid-cols-1 md:grid-cols-3 md:grid-rows-[minmax(180px,_auto)_minmax(180px,_auto)]"
          )}
        >
          {displayProjects.map((project, i) => {
            let layoutType: 'large' | 'tall' | 'wide' | 'slider';
            let gridClass = "";
            
            if (isSliderView) {
              layoutType = 'slider';
              gridClass = "w-[85vw] md:w-[450px] shrink-0 snap-center";
            } else {
              if (i === 0) {
                layoutType = 'large';
                gridClass = "md:col-span-2 md:row-span-2 h-full min-h-[380px]";
              } else if (i === 1) {
                layoutType = 'tall';
                gridClass = "md:col-span-1 md:row-span-2 h-full min-h-[380px]";
              } else {
                layoutType = 'wide';
                gridClass = "md:col-span-2 md:row-span-1 min-h-[180px]";
              }
            }

            return (
              <ProjectCard 
                key={project._id || `proj-${i}`} 
                project={project} 
                layoutType={layoutType}
                className={gridClass} 
              />
            );
          })}

          <AnimatePresence mode="popLayout">
            {!isSliderView && hasMoreProjects && (
              <motion.div
                layout="position"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => toggleView(true)}
                className="md:col-span-1 md:row-span-1 min-h-[180px] p-5 flex flex-col justify-center items-center cursor-pointer group bg-brand/5 hover:bg-brand/10 transition-colors backdrop-blur-xl rounded-[1.5rem] border border-brand/20 shadow-[0_8px_32px_rgba(232,98,26,0.05)]"
              >
                <div className="grid grid-cols-2 gap-3 mb-6 relative">
                  <div className="w-14 h-14 bg-brand/30 rounded-full group-hover:scale-110 transition-transform duration-500 ease-out shadow-[0_0_15px_rgba(232,98,26,0.3)]"></div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform delay-75 duration-500 ease-out"></div>
                  <div className="w-14 h-14 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform delay-150 duration-500 ease-out"></div>
                  <div className="w-14 h-14 bg-brand/20 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-md rounded-bl-md group-hover:scale-110 transition-transform delay-200 duration-500 ease-out"></div>
                </div>
                <span className="font-display font-semibold text-xl tracking-tight text-text-main group-hover:text-brand transition-colors">
                  All Projects
                </span>
                <span className="text-sm mt-2 text-text-muted">
                  View {sourceProjects.length} cases &rarr;
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {isSliderView && (
          <div className="w-full mt-4 flex justify-center md:hidden">
            <button 
              onClick={() => toggleView(false)}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-text-main shadow-lg"
            >
              Back to Grid
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ 
  project, 
  layoutType, 
  className 
}: { 
  project: any, 
  layoutType: 'large' | 'tall' | 'wide' | 'slider',
  className?: string 
}) {
  const isWide = layoutType === 'wide';
  const isTall = layoutType === 'tall';

  return (
    <motion.div 
      layout="position"
      className={cn(
        "bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-[1.5rem] overflow-hidden flex flex-col hover:border-white/[0.15] hover:bg-white/[0.05] transition-colors duration-500 shadow-[0_8px_40px_rgb(0_0_0_/_0.3)] p-5 gap-4",
        className
      )}
    >
      <motion.div layout="position" className="w-full shrink-0 flex items-center justify-between">
         <h3 className={cn("font-display font-extrabold tracking-tight text-text-main", layoutType === 'large' || layoutType === 'slider' ? "text-xl md:text-2xl" : "text-lg md:text-xl")}>
           {project.name}
         </h3>
         <div className="flex gap-2">
           {project.links?.github && (
             <motion.a 
                layout="position"
                href={project.links.github}
                title="View GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/30 transition-colors"
             >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
             </motion.a>
           )}
           {project.links?.live && (
             <motion.a 
                layout="position"
                href={project.links.live}
                title="View Live Site"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-brand hover:border-brand/30 transition-colors"
             >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
             </motion.a>
           )}
         </div>
      </motion.div>
      
      <div className={cn("flex flex-1 gap-6", isWide ? "flex-col md:flex-row" : "flex-col")}>
         
         <motion.div 
           layout="position"
           className={cn(
             "bg-white/[0.03] rounded-xl border border-white/[0.05] relative overflow-hidden flex items-center justify-center group/img shrink-0",
             isWide ? "w-full md:w-1/3 min-h-[140px]" : "w-full h-[180px]"
           )}
         >
           {project.imageBase64 ? (
             <img src={project.imageBase64} alt={project.name} className="object-cover w-full h-full opacity-90 group-hover/img:scale-105 transition-transform duration-700 ease-out" />
           ) : (
             <>
               <div className="absolute inset-0 opacity-[0.2]" style={{ background: project.bgGradient || 'rgba(255,255,255,0.05)' }}></div>
               <div className="relative z-10 flex flex-col items-center gap-4 text-white/50 group-hover/img:scale-110 group-hover/img:text-white/80 transition-all duration-700 ease-out">
                  {project.icon || (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  )}
                  {(layoutType === 'large' || layoutType === 'slider') && (
                     <span className="text-sm font-medium tracking-wide uppercase">Project Preview</span>
                  )}
               </div>
             </>
           )}
         </motion.div>

         <motion.div 
           layout="position"
           className={cn("flex gap-4 shrink-0", isWide ? "w-full md:w-[40%] flex-col" : isTall ? "flex-col" : "flex-col md:flex-row")}
         >
            <div className={cn("bg-white/[0.03] border border-white/[0.05] p-5 rounded-2xl text-sm leading-relaxed text-text-muted flex-[2]")}>
              <span className="block text-[10px] uppercase text-brand-light/60 font-bold mb-2 tracking-wider">Description</span>
              {project.desc}
            </div>

            <div className={cn("bg-white/[0.03] border border-white/[0.05] p-5 rounded-2xl flex flex-col justify-center flex-[1]")}>
              <span className="block text-[10px] uppercase text-brand-light/60 font-bold mb-3 tracking-wider">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.tags && project.tags.map((t: string) => (
                  <span key={t} className="text-[11px] font-medium bg-brand/10 text-brand-light px-2.5 py-1 rounded-md border border-brand/20 whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </div>
            </div>
         </motion.div>

      </div>
    </motion.div>
  );
}