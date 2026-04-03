"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    name: "Pulse Dashboard",
    desc: "A real-time analytics platform with live data visualization, custom chart components, and role-based access for enterprise teams.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2024",
    featured: true,
    bgGradient: "linear-gradient(135deg,#1a0d04 0%,#2d1508 50%,#1a0d04 100%)",
    icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(232,98,26,0.3)" strokeWidth="1"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  },
  {
    name: "Orbit SaaS",
    desc: "A subscription management platform with tiered pricing, usage analytics, and automated billing flows.",
    tags: ["Next.js", "TypeScript"],
    year: "2024",
    featured: false,
    bgGradient: "linear-gradient(135deg,#040d1a 0%,#082030 50%,#040d1a 100%)",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(97,219,251,0.25)" strokeWidth="1"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="4"/><line x1="3" y1="12" x2="21" y2="12"/></svg>
  },
  {
    name: "Folio CMS",
    desc: "A headless content management system with drag-and-drop editor and multi-channel publishing.",
    tags: ["React", "Firebase"],
    year: "2023",
    featured: false,
    bgGradient: "linear-gradient(135deg,#04100a 0%,#082418 50%,#04100a 100%)",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(104,160,99,0.25)" strokeWidth="1"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
  },
  {
    name: "Stack API",
    desc: "A developer-first REST API platform with live docs, rate limiting, and SDK generation.",
    tags: ["Vue.js", "PostgreSQL"],
    year: "2023",
    featured: false,
    bgGradient: "linear-gradient(135deg,#100a04 0%,#241808 50%,#100a04 100%)",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(240,219,79,0.2)" strokeWidth="1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  }
];

export function Work() {
  return (
    <section id="work" className="min-h-screen py-24 px-8 lg:px-24 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-[11px] tracking-[0.12em] uppercase text-brand font-body font-medium mb-2.5">
            Selected projects
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-none text-text-main">
            My <span className="text-brand">Work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="#"
      ref={ref}
      className={cn(
        "glass-card overflow-hidden block transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,98,26,0.4)]",
        project.featured && "md:col-span-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div 
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          project.featured ? "aspect-[2/1] text-5xl" : "aspect-[16/10] text-[32px]"
        )}
        style={{ background: project.bgGradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(15,9,5,0.8)] via-transparent" />
        <div className="relative z-10">{project.icon}</div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map(tag => (
            <span key={tag} className="bg-brand-dim text-brand-light text-[10px] font-medium px-2.5 py-1 rounded-full tracking-wide font-body">
              {tag}
            </span>
          ))}
        </div>
        <div className="font-display text-base font-bold text-text-main mb-1.5 tracking-tight">
          {project.name}
        </div>
        <div className="text-[13px] text-text-muted leading-relaxed font-light">
          {project.desc}
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-1">
          <span className="text-xs text-brand-light flex items-center gap-1 font-medium">
            View case study
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
          <span className="text-[11px] text-text-dim">
            {project.year}
          </span>
        </div>
      </div>
    </a>
  );
}
