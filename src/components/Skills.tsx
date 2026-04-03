"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import htmlIcon from "@/icons/html.svg";
import cssIcon from "@/icons/css.svg";
import jsIcon from "@/icons/js.svg";
import reactIcon from "@/icons/react.svg";
import nodeIcon from "@/icons/node.svg";
import tsIcon from "@/icons/ts.svg";
import nextIcon from "@/icons/next.svg";
import mongoIcon from "@/icons/mongo.svg";


const SKILLS = [
  { name: "HTML5", level: 92, color: "#e34c26", bg: "rgba(227,76,38,0.1)", icon: <img src={htmlIcon.src} alt="HTML5" width={22} height={22} /> },
  { name: "CSS3", level: 88, color: "#264de4", bg: "rgba(38,77,228,0.1)", icon: <img src={cssIcon.src} alt="HTML5" width={22} height={22} /> },
  { name: "JavaScript", level: 90, color: "#f0db4f", bg: "rgba(240,219,79,0.1)",icon: <img src={jsIcon.src} alt="HTML5" width={22} height={22} /> },
  { name: "React", level: 85, color: "#61dbfb", bg: "rgba(97,219,251,0.08)", icon: <img src={reactIcon.src} alt="HTML5" width={22} height={22} />},
  { name: "Node.js", level: 80, color: "#68a063", bg: "rgba(104,160,99,0.1)",icon: <img src={nodeIcon.src} alt="HTML5" width={22} height={22} /> },
  { name: "TypeScript", level: 75, color: "#007acc", bg: "rgba(0,122,204,0.1)",icon: <img src={tsIcon.src} alt="HTML5" width={22} height={22} /> },
  { name: "Next.js", level: 78, color: "rgba(255,255,255,0.6)", bg: "rgba(0,0,0,0.15)", icon: <img src={nextIcon.src} alt="HTML5" width={22} height={22} /> },
  { name: "MongoDB", level: 70, color: "#475b6d", bg: "rgba(71,91,109,0.15)", icon: <img src={mongoIcon.src} alt="HTML5" width={22} height={22} />},
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
