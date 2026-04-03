"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SKILLS = [
  { name: "HTML5", level: 92, color: "#e34c26", bg: "rgba(227,76,38,0.1)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 3h18l-1.5 13.5L12 21l-7.5-4.5L3 3Z" stroke="#e34c26" strokeWidth="1.5"/></svg> },
  { name: "CSS3", level: 88, color: "#264de4", bg: "rgba(38,77,228,0.1)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 3h18l-1.5 13.5L12 21l-7.5-4.5L3 3Z" stroke="#264de4" strokeWidth="1.5"/></svg> },
  { name: "JavaScript", level: 90, color: "#f0db4f", bg: "rgba(240,219,79,0.1)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#f0db4f" strokeWidth="1.5"/><path d="M8 16v-4m0 0V8m0 4h4m4 4V8" stroke="#f0db4f" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "React", level: 85, color: "#61dbfb", bg: "rgba(97,219,251,0.08)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" fill="#61dbfb"/><circle cx="12" cy="12" r="8" stroke="#61dbfb" strokeWidth="1.3"/><ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="#61dbfb" strokeWidth="1.3"/></svg> },
  { name: "Node.js", level: 80, color: "#68a063", bg: "rgba(104,160,99,0.1)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#68a063" strokeWidth="1.5"/><path d="M9 9h6M9 12h6M9 15h4" stroke="#68a063" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "TypeScript", level: 75, color: "#007acc", bg: "rgba(0,122,204,0.1)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#007acc" strokeWidth="1.5"/><path d="M8 12h8M12 8v8" stroke="#007acc" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "Next.js", level: 78, color: "rgba(255,255,255,0.6)", bg: "rgba(0,0,0,0.15)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18M3 21L21 3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "MongoDB", level: 70, color: "#475b6d", bg: "rgba(71,91,109,0.15)", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="9" ry="6" stroke="#475b6d" strokeWidth="1.5"/><path d="M3 12c0 3.314 4.03 6 9 6s9-2.686 9-6" stroke="#475b6d" strokeWidth="1.5"/><line x1="12" y1="6" x2="12" y2="18" stroke="#475b6d" strokeWidth="1.5"/></svg> },
];

export function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 px-8 lg:px-24 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-[11px] tracking-[0.12em] uppercase text-brand font-body font-medium mb-2.5">
            What I work with
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-none text-text-main">
            Skills & <span className="text-brand">Stack</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: typeof SKILLS[0], index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div 
      ref={ref}
      className={cn(
        "glass-card p-5 rounded-2xl cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(232,98,26,0.3)] hover:bg-surface-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div 
        className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-xl"
        style={{ background: skill.bg }}
      >
        {skill.icon}
      </div>
      <div className="font-display text-sm font-semibold text-text-main mb-1.5">
        {skill.name}
      </div>
      <div className="h-[3px] bg-border-1 rounded-sm overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-brand to-brand-light rounded-sm transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ 
            width: isVisible ? `${skill.level}%` : '0%',
            transitionDelay: `${300 + index * 100}ms`
          }}
        />
      </div>
    </div>
  );
}
